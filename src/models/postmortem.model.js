import mongoose from 'mongoose';

const postmortemSchema = new mongoose.Schema({
  incidentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Incident',
    required: true,
    unique: true  // One postmortem per incident
  },
  
  // AI Generated Sections
  summary: String,           // What happened in 2 lines
  timeline: String,          // Chronological narrative
  rootCause: String,         // Confirmed root cause
  impact: String,            // How many users, revenue impact
  resolution: String,        // What fix was applied
  lessonsLearned: String,    // Key takeaways
  actionItems: [{
    task: String,
    assignedTo: String,
    dueDate: Date,
    priority: String
  }],
  preventionSteps: String,   // How to prevent next time
  
  generatedBy: String,       // 'ai' or 'manual'
  generatedAt: {
    type: Date,
    default: Date.now
  },
  reviewedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
},  {
  timestamps: true
})

const PostmortemModel = mongoose.model('postmortem', postmortemSchema);
export default PostmortemModel;