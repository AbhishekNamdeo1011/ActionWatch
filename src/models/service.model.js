import mongoose from 'mongoose';
const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  url: {
    // Health check endpoint to ping
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['api', 'database', 'frontend', 'cdn', 'payment', 'auth', 'other']
  },
  checkInterval: {
    type: Number,
    default: 30  // seconds
  },
  status: {
    type: String,
    enum: ['operational', 'degraded', 'outage', 'unknown'],
    default: 'unknown'
  },
  lastChecked: Date,
  lastStatusChange: Date,
  responseTime: Number,  // in ms
  uptimePercentage: {
    type: Number,
    default: 100
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
})

const ServiceModel = mongoose.model('service', serviceSchema);
export default ServiceModel;