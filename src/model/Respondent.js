const mongoose = require('mongoose');
const { Schema } = mongoose;

const respondentSchema = new Schema(
  {
    identifier: String,
    type: {
      type: String,
      enum: ['EMPLOYEE', 'CANDIDATE', 'INTERN', 'VISITOR'],
      default: 'EMPLOYEE',
    },
    registration: Number,
    name: { type: String, required: true },
    cpf: String,
    email: { type: String, required: true },
    phone: String,
    admissionDate: { type: Date, default: new Date('1970-01-01T00:00:00') },
    expContractExpiration: {
      type: Date,
      default: new Date('1970-01-01T00:00:00'),
    },
    educationLevel: String,
    workstationId: String,
    workstationName: String,
    positionName: String,
    dismissalDate: { type: Date, default: new Date('1970-01-01T00:00:00') },
    dismissalCause: String,
    companyId: Number,
    companyName: String,
    branchId: Number,
    branchName: String,
    visitDate: { type: Date, default: new Date('1970-01-01T00:00:00') },
    visitDescription: String,
  },
  { versionKey: false }
);

module.exports = mongoose.model('Respondent', respondentSchema);
