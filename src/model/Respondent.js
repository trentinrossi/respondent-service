const mongoose = require('mongoose');
const { Schema } = mongoose;

const respondentSchema = new Schema({
  identifier: String,
  type: {
    type: String,
    enum: ['EMPLOYEE', 'CANDIDATE', 'INTERN', 'VISITOR'],
    default: 'EMPLOYEE',
  },
  registration: Number,
  name: String,
  cpf: String,
  email: String,
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
});

module.exports = mongoose.model('Respondent', respondentSchema);
