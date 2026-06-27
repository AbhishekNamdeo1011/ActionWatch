import mongoose from 'mongoose';

const timelineSchema = new mongoose.Schema(
  {
    incident: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'incident',
    required: true
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      default: null,
    },
    type: {
      type: String,
      enum: ['system', 'ai', 'update', 'fix', 'comment'],
      default: 'update',
    },
    message: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },
  },
  {
    timestamps: true,
  }
);

const TimelineModel = mongoose.model('timeline', timelineSchema);
export default TimelineModel;