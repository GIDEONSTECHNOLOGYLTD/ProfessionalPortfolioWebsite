const mongoose = require('mongoose');
const validator = require('validator');

const newsletterSubscriberSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  name: {
    type: String,
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  status: {
    type: String,
    enum: ['active', 'unsubscribed'],
    default: 'active'
  },
  subscribedAt: {
    type: Date,
    default: Date.now
  },
  unsubscribedAt: {
    type: Date
  },
  source: {
    type: String,
    enum: ['website', 'manual', 'import'],
    default: 'website'
  },
  preferences: {
    frequency: {
      type: String,
      enum: ['weekly', 'monthly', 'quarterly'],
      default: 'monthly'
    },
    topics: [{
      type: String,
      enum: ['tech_insights', 'case_studies', 'offers', 'updates']
    }]
  }
}, {
  timestamps: true
});

// Index for better performance
newsletterSubscriberSchema.index({ email: 1 });
newsletterSubscriberSchema.index({ status: 1 });

// Method to unsubscribe
newsletterSubscriberSchema.methods.unsubscribe = function() {
  this.status = 'unsubscribed';
  this.unsubscribedAt = new Date();
  return this.save();
};

// Method to resubscribe
newsletterSubscriberSchema.methods.resubscribe = function() {
  this.status = 'active';
  this.unsubscribedAt = undefined;
  return this.save();
};

module.exports = mongoose.model('NewsletterSubscriber', newsletterSubscriberSchema);
