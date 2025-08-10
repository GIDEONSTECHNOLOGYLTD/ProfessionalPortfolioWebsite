const express = require('express');
const Joi = require('joi');
const ContactForm = require('../models/Contact');
const { sendContactNotification, sendContactAutoResponse } = require('../utils/email');
const { protect, restrictTo } = require('../middleware/auth');

const router = express.Router();

// Validation schema
const contactSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  company: Joi.string().max(100),
  phone: Joi.string().max(20),
  subject: Joi.string().max(200),
  message: Joi.string().min(10).max(2000).required(),
  serviceType: Joi.string().valid(
    'software_development',
    'network_infrastructure',
    'cloud_solutions',
    'mobile_development',
    'database_management',
    'cybersecurity',
    'consultation',
    'general_inquiry'
  ),
  budget: Joi.string().valid('under_5k', '5k_15k', '15k_50k', '50k_plus', 'not_specified'),
  timeline: Joi.string().valid('urgent', '1_month', '3_months', '6_months', 'flexible')
});

// @route   POST /api/contact
// @desc    Submit contact form
// @access  Public
router.post('/', async (req, res) => {
  try {
    // Validate input
    const { error, value } = contactSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        error: 'Validation failed',
        message: error.details[0].message
      });
    }

    // Create contact form entry
    const contactForm = await ContactForm.create(value);

    // Send notification to admin
    await sendContactNotification(value);

    // Send auto-response to user
    await sendContactAutoResponse(value);

    res.status(201).json({
      success: true,
      message: 'Contact form submitted successfully',
      data: {
        id: contactForm._id,
        name: contactForm.name,
        email: contactForm.email,
        subject: contactForm.subject,
        submittedAt: contactForm.createdAt
      }
    });

  } catch (error) {
    console.error('Contact form submission error:', error);
    res.status(500).json({
      error: 'Submission failed',
      message: 'An error occurred while submitting the contact form'
    });
  }
});

// @route   GET /api/contact
// @desc    Get all contact form submissions (Admin only)
// @access  Private/Admin
router.get('/', protect, restrictTo('admin', 'super_admin'), async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    
    const query = status ? { status } : {};
    
    const contacts = await ContactForm.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await ContactForm.countDocuments(query);

    res.json({
      success: true,
      data: {
        contacts,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });

  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({
      error: 'Failed to get contacts',
      message: 'An error occurred while fetching contact forms'
    });
  }
});

// @route   GET /api/contact/:id
// @desc    Get specific contact form (Admin only)
// @access  Private/Admin
router.get('/:id', protect, restrictTo('admin', 'super_admin'), async (req, res) => {
  try {
    const contact = await ContactForm.findById(req.params.id);
    
    if (!contact) {
      return res.status(404).json({
        error: 'Contact not found',
        message: 'Contact form with this ID does not exist'
      });
    }

    res.json({
      success: true,
      data: contact
    });

  } catch (error) {
    console.error('Get contact error:', error);
    res.status(500).json({
      error: 'Failed to get contact',
      message: 'An error occurred while fetching the contact form'
    });
  }
});

// @route   PUT /api/contact/:id/status
// @desc    Update contact form status (Admin only)
// @access  Private/Admin
router.put('/:id/status', protect, restrictTo('admin', 'super_admin'), async (req, res) => {
  try {
    const { status } = req.body;
    
    const validStatuses = ['new', 'contacted', 'in_progress', 'quoted', 'converted', 'closed'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        error: 'Invalid status',
        message: 'Status must be one of: ' + validStatuses.join(', ')
      });
    }

    const contact = await ContactForm.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!contact) {
      return res.status(404).json({
        error: 'Contact not found',
        message: 'Contact form with this ID does not exist'
      });
    }

    res.json({
      success: true,
      message: 'Contact status updated successfully',
      data: contact
    });

  } catch (error) {
    console.error('Update contact status error:', error);
    res.status(500).json({
      error: 'Failed to update status',
      message: 'An error occurred while updating the contact status'
    });
  }
});

module.exports = router;
