const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Notification must belong to a user']
  },
  title: {
    type: String,
    required: [true, 'Notification title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  message: {
    type: String,
    required: [true, 'Notification message is required'],
    trim: true,
    maxlength: [1000, 'Message cannot exceed 1000 characters']
  },
  type: {
    type: String,
    enum: ['info', 'success', 'warning', 'error'],
    default: 'info'
  },
  read: {
    type: Boolean,
    default: false
  },
  readAt: {
    type: Date
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  category: {
    type: String,
    enum: ['project', 'contract', 'payment', 'system', 'general'],
    default: 'general'
  },
  relatedContract: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contract'
  },
  actionUrl: {
    type: String // URL for action button
  },
  expiresAt: {
    type: Date // Auto-delete after this date
  }
}, {
  timestamps: true
});

// Index for better performance
notificationSchema.index({ user: 1, read: 1 });
notificationSchema.index({ createdAt: -1 });
notificationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Method to mark as read
notificationSchema.methods.markAsRead = function() {
  this.read = true;
  this.readAt = new Date();
  return this.save();
};

// Static method to create notification
notificationSchema.statics.createNotification = async function(userId, title, message, type = 'info', options = {}) {
  return await this.create({
    user: userId,
    title,
    message,
    type,
    ...options
  });
};

module.exports = mongoose.model('Notification', notificationSchema);
