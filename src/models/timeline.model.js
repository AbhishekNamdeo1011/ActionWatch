import mongoose from 'mongoose';

const timelineSchema  = new mongoose.Schema({   
   incidentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Incident',
    required: true
  },
  message: {
    type: String,
    required: [true, 'Update message is required']
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['update', 'fix_attempt', 'escalation', 'resolution', 'system'],
    default: 'update'
  },
  isPublic: {
    // Show on public status page?
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const TimelineModel = mongoose.model('timeline', timelineSchema);
export default TimelineModel;