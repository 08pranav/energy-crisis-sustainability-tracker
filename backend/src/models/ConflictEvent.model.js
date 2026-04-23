import mongoose from 'mongoose';

const conflictEventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, minlength: 4, maxlength: 180 },
    conflictType: {
      type: String,
      required: true,
      enum: ['war', 'sanctions', 'blockade', 'cyber', 'civil_unrest']
    },
    affectedCountriesIso3: {
      type: [String],
      required: true,
      validate: {
        validator: (arr) => arr.length > 0,
        message: 'At least one affected country is required'
      }
    },
    affectedCommodities: { type: [String], default: [] },
    startDate: { type: Date, required: true },
    endDate: Date,
    severity: { type: String, required: true, enum: ['low', 'medium', 'high', 'critical'] },
    impactScore: { type: Number, required: true, min: 0, max: 100 },
    summary: { type: String, required: true, maxlength: 2000 },
    sourceUrl: String,
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

conflictEventSchema.index({ isActive: 1, severity: 1, startDate: -1 });

export const ConflictEvent = mongoose.model('ConflictEvent', conflictEventSchema);
