const mongoose = require('mongoose');

const contractSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Contract must belong to a user']
  },
  contractId: {
    type: String,
    unique: true,
    required: true
  },
  title: {
    type: String,
    required: [true, 'Contract title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [2000, 'Description cannot exceed 2000 characters']
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
      'consultation'
    ],
    required: true
  },
  value: {
    type: Number,
    min: [0, 'Contract value cannot be negative']
  },
  currency: {
    type: String,
    default: 'USD',
    enum: ['USD', 'NGN', 'EUR', 'GBP']
  },
  status: {
    type: String,
    enum: ['draft', 'active', 'completed', 'cancelled', 'suspended'],
    default: 'draft'
  },
  startDate: {
    type: Date
  },
  endDate: {
    type: Date
  },
  progress: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },
  milestones: [{
    name: {
      type: String,
      required: true
    },
    description: String,
    dueDate: Date,
    completed: {
      type: Boolean,
      default: false
    },
    completedAt: Date,
    percentage: {
      type: Number,
      min: 0,
      max: 100,
      default: 0
    }
  }],
  documents: [{
    name: String,
    url: String,
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],
  notes: [{
    content: String,
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for contract duration in days
contractSchema.virtual('duration').get(function() {
  if (this.startDate && this.endDate) {
    return Math.ceil((this.endDate - this.startDate) / (1000 * 60 * 60 * 24));
  }
  return null;
});

// Virtual for completed milestones count
contractSchema.virtual('completedMilestones').get(function() {
  return this.milestones.filter(milestone => milestone.completed).length;
});

// Index for better performance
contractSchema.index({ user: 1 });
contractSchema.index({ status: 1 });
contractSchema.index({ contractId: 1 });

// Auto-generate contract ID before saving
contractSchema.pre('save', function(next) {
  if (!this.contractId) {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    this.contractId = `GT-${year}${month}-${random}`;
  }
  next();
});

// Update progress based on completed milestones
contractSchema.methods.updateProgress = function() {
  if (this.milestones.length > 0) {
    const completedCount = this.milestones.filter(m => m.completed).length;
    this.progress = Math.round((completedCount / this.milestones.length) * 100);
  }
  return this.save();
};

module.exports = mongoose.model('Contract', contractSchema);
