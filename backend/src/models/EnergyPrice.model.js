import mongoose from 'mongoose';

const ENERGY_COMMODITIES = ['crude_oil', 'natural_gas', 'coal', 'electricity', 'lng', 'brent'];

const energyPriceSchema = new mongoose.Schema(
  {
    countryName: { type: String, required: true, trim: true },
    iso3: { type: String, required: true, uppercase: true, minlength: 3, maxlength: 3 },
    commodity: { type: String, required: true, enum: ENERGY_COMMODITIES },
    price: { type: Number, required: true, min: 0 },
    currency: { type: String, default: 'USD', uppercase: true },
    unit: { type: String, required: true, trim: true },
    source: { type: String, required: true, enum: ['iea', 'bp', 'manual', 'simulated'] },
    recordedAt: { type: Date, required: true },
    conflictEventId: { type: mongoose.Schema.Types.ObjectId, ref: 'ConflictEvent' },
    region: { type: String, trim: true },
    metadata: mongoose.Schema.Types.Mixed
  },
  { timestamps: true }
);

energyPriceSchema.index({ iso3: 1, commodity: 1, recordedAt: -1 });

export const EnergyPrice = mongoose.model('EnergyPrice', energyPriceSchema);
