const mongoose = require('mongoose');
const validator = require('validator');

const contactFormSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  company: {
    type: String,
    trim: true,
    maxlength: [100, 'Company name cannot exceed 100 characters']
  },
  phone: {
    type: String,
    trim: true,
    maxlength: [20, 'Phone number cannot exceed 20 characters']
  },
  subject: {
    type: String,
    trim: true,
    maxlength: [200, 'Subject cannot exceed 200 characters']
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true,
    maxlength: [2000, 'Message cannot exceed 2000 characters']
  },
  serviceType: {
    type: String,
    enum: [
      'software_development',
      'network_infrastructure',
      'cloud_solutions', 
      'mobile_development',
      'database_management',
      'cybersecurity',
      'consultation',
      'general_inquiry'
    ],
    default: 'general_inquiry'
  },
  budget: {
    type: String,
    enum: ['under_5k', '5k_15k', '15k_50k', '50k_plus', 'not_specified'],
    default: 'not_specified'
  },
  timeline: {
    type: String,
    enum: ['urgent', '1_month', '3_months', '6_months', 'flexible'],
    default: 'flexible'
  },
  status: {
    type: String,
    enum: ['new', 'contacted', 'in_progress', 'quoted', 'converted', 'closed'],
    default: 'new'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  source: {
    type: String,
    enum: ['website', 'referral', 'social_media', 'direct'],
    default: 'website'
  },
  notes: [{
    content: String,
    createdBy: String, // Admin who added the note
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  followUpDate: {
    type: Date
  },
  responded: {
    type: Boolean,
    default: false
  },
  respondedAt: {
    type: Date
  }
}, {
  timestamps: true
});

// Index for better performance
contactFormSchema.index({ status: 1 });
contactFormSchema.index({ createdAt: -1 });
contactFormSchema.index({ email: 1 });

// Method to add note
contactFormSchema.methods.addNote = function(content, createdBy) {
  this.notes.push({
    content,
    createdBy,
    createdAt: new Date()
  });
  return this.save();
};

// Method to mark as responded
contactFormSchema.methods.markAsResponded = function() {
  this.responded = true;
  this.respondedAt = new Date();
  return this.save();
};

module.exports = mongoose.model('ContactForm', contactFormSchema);
