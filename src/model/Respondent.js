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
    admissionDate: Date,
    expContractExpiration: Date,
    educationLevel: String,
    workstationId: String,
    workstationName: String,
    positionName: String,
    dismissalDate: Date,
    dismissalCause: String,
    companyId: Number,
    companyName: String,
    branchId: Number,
    branchName: String,
    visitDate: Date,
    visitDescription: String,
  },
  { versionKey: false }
);

module.exports = mongoose.model('Respondent', respondentSchema);
