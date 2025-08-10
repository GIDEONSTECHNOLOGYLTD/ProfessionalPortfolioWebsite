const express = require('express');
const Joi = require('joi');
const NewsletterSubscriber = require('../models/Newsletter');
const { sendNewsletterConfirmation } = require('../utils/email');
const { protect, restrictTo } = require('../middleware/auth');

const router = express.Router();

// Validation schema
const subscribeSchema = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().min(2).max(100)
});

// @route   POST /api/newsletter/subscribe
// @desc    Subscribe to newsletter
// @access  Public
router.post('/subscribe', async (req, res) => {
  try {
    // Validate input
    const { error, value } = subscribeSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        error: 'Validation failed',
        message: error.details[0].message
      });
    }

    const { email, name } = value;

    // Check if already subscribed
    let subscriber = await NewsletterSubscriber.findOne({ email });
    
    if (subscriber) {
      if (subscriber.status === 'active') {
        return res.status(400).json({
          error: 'Already subscribed',
          message: 'This email is already subscribed to our newsletter'
        });
      } else {
        // Reactivate subscription
        await subscriber.resubscribe();
        subscriber.name = name || subscriber.name;
        await subscriber.save();
      }
    } else {
      // Create new subscription
      subscriber = await NewsletterSubscriber.create({
        email,
        name,
        preferences: {
          topics: ['tech_insights', 'case_studies', 'offers', 'updates']
        }
      });
    }

    // Send confirmation email
    await sendNewsletterConfirmation(email, name);

    res.status(201).json({
      success: true,
      message: 'Successfully subscribed to newsletter',
      subscriber: {
        email: subscriber.email,
        name: subscriber.name,
        subscribedAt: subscriber.subscribedAt
      }
    });

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    res.status(500).json({
      error: 'Subscription failed',
      message: 'An error occurred while subscribing to newsletter'
    });
  }
});

// @route   POST /api/newsletter/unsubscribe
// @desc    Unsubscribe from newsletter
// @access  Public
router.post('/unsubscribe', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        error: 'Email required',
        message: 'Email address is required for unsubscription'
      });
    }

    const subscriber = await NewsletterSubscriber.findOne({ email });
    
    if (!subscriber) {
      return res.status(404).json({
        error: 'Not found',
        message: 'Email address not found in our newsletter list'
      });
    }

    if (subscriber.status === 'unsubscribed') {
      return res.status(400).json({
        error: 'Already unsubscribed',
        message: 'This email is already unsubscribed'
      });
    }

    await subscriber.unsubscribe();

    res.json({
      success: true,
      message: 'Successfully unsubscribed from newsletter'
    });

  } catch (error) {
    console.error('Newsletter unsubscription error:', error);
    res.status(500).json({
      error: 'Unsubscription failed',
      message: 'An error occurred while unsubscribing'
    });
  }
});

// @route   GET /api/newsletter/subscribers
// @desc    Get all newsletter subscribers (Admin only)
// @access  Private/Admin
router.get('/subscribers', protect, restrictTo('admin', 'super_admin'), async (req, res) => {
  try {
    const { status = 'active', page = 1, limit = 50 } = req.query;
    
    const query = status === 'all' ? {} : { status };
    
    const subscribers = await NewsletterSubscriber.find(query)
      .sort({ subscribedAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await NewsletterSubscriber.countDocuments(query);

    res.json({
      success: true,
      data: {
        subscribers,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });

  } catch (error) {
    console.error('Get subscribers error:', error);
    res.status(500).json({
      error: 'Failed to get subscribers',
      message: 'An error occurred while fetching subscribers'
    });
  }
});

// @route   GET /api/newsletter/stats
// @desc    Get newsletter statistics (Admin only)
// @access  Private/Admin
router.get('/stats', protect, restrictTo('admin', 'super_admin'), async (req, res) => {
  try {
    const totalSubscribers = await NewsletterSubscriber.countDocuments({ status: 'active' });
    const totalUnsubscribed = await NewsletterSubscriber.countDocuments({ status: 'unsubscribed' });
    const thisMonth = new Date();
    thisMonth.setDate(1);
    thisMonth.setHours(0, 0, 0, 0);
    
    const newThisMonth = await NewsletterSubscriber.countDocuments({
      status: 'active',
      subscribedAt: { $gte: thisMonth }
    });

    res.json({
      success: true,
      stats: {
        totalSubscribers,
        totalUnsubscribed,
        newThisMonth,
        totalEverSubscribed: totalSubscribers + totalUnsubscribed
      }
    });

  } catch (error) {
    console.error('Get newsletter stats error:', error);
    res.status(500).json({
      error: 'Failed to get stats',
      message: 'An error occurred while fetching newsletter statistics'
    });
  }
});

module.exports = router;
