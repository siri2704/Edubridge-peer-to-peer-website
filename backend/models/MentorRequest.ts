import mongoose from 'mongoose';

const { Schema } = mongoose;

const MentorRequestSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  expertise: { type: String, required: true },
  bio: { type: String, required: true },
  // Add other relevant fields for the mentor request
  status: {
    type: String,
    enum: ['pending', 'approved', 'denied'],
    default: 'pending', // Default status
  },
}, { timestamps: true });

export default mongoose.models.MentorRequest || mongoose.model('MentorRequest', MentorRequestSchema);