import mongoose from 'mongoose';

const incidentSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
 severity: {
    type: String,
    enum: ['P0', 'P1', 'P2'],
    required: true
    // P0 = Critical (everything down)
    // P1 = Major (core feature broken)
    // P2 = Minor (small bug, workaround available)
  },
   status: {
    type: String,
    enum: ['open', 'investigating', 'identified', 'monitoring', 'resolved'],
    default: 'open'
  },
   service: {
    // Which service/component is affected
    type: String,
    required: true,
    enum: ['payment', 'auth', 'database', 'api', 'frontend', 'cdn', 'email', 'other']
  },
affectedUsers: {
    type: Number,
    default: 0
  },
  detectedBy: {
    type: String,
    enum: ['webhook', 'monitor', 'manual'],
    default: 'manual'
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  assignedTo: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  
  // AI Generated Fields
  aiRootCauses: [{
    cause: String,
    confidence: String,  // 'high', 'medium', 'low'
    suggestedFix: String
  }],
  aiSimilarIncidents: [{
    incidentId: mongoose.Schema.Types.ObjectId,
    similarity: String,
    resolution: String
  }],
  
  // Timestamps
  detectedAt: {
    type: Date,
    default: Date.now
  },
  resolvedAt: Date,
  
  // Computed field — how long to resolve
  mttr: Number,  // in minutes
  
  // Error details from webhook/monitor
  errorLogs: String,
  errorCode: String,
  
  // Tags for searching
  tags: [String]
  
}, {
  timestamps: true
});
const IncidentModel = mongoose.model('incident', incidentSchema);
export default IncidentModel;
