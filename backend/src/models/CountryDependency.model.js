import mongoose from 'mongoose';

const supplierSchema = new mongoose.Schema(
  {
    country: { type: String, required: true, trim: true },
    sharePct: { type: Number, required: true, min: 0, max: 100 }
  },
  { _id: false }
);

const countryDependencySchema = new mongoose.Schema(
  {
    countryName: { type: String, required: true, trim: true },
    iso3: { type: String, required: true, unique: true, uppercase: true, minlength: 3, maxlength: 3 },
    region: { type: String, required: true, trim: true },
    totalEnergyImportPct: { type: Number, required: true, min: 0, max: 100 },
    fossilDependencyPct: { type: Number, required: true, min: 0, max: 100 },
    renewableSharePct: { type: Number, required: true, min: 0, max: 100 },
    majorSuppliers: { type: [supplierSchema], default: [] },
    riskScore: { type: Number, min: 0, max: 100 },
    year: { type: Number, required: true, min: 1900, max: 2100 },
    source: { type: String, required: true, enum: ['iea', 'bp', 'merged'] }
  },
  { timestamps: true }
);

countryDependencySchema.index({ iso3: 1 }, { unique: true });
countryDependencySchema.index({ year: -1 });

export const CountryDependency = mongoose.model('CountryDependency', countryDependencySchema);
