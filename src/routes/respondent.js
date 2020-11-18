const express = require('express');
const router = express.Router();
const Respondent = require('../model/Respondent');

router.get('/', (req, res) => {
  Respondent.find()
    .then((resp) => res.status(200).json(resp))
    .catch((err) => res.status(400).json(err));
});

router.get('/:id', (req, res) => {
  Respondent.findById(req.params.id)
    .then((resp) => res.status(200).json(resp))
    .catch((err) => res.status(400).json(err));
});

router.post('/', (req, res) => {
  const {
    identifier,
    type,
    registration,
    name,
    cpf,
    email,
    phone,
    admissionDate,
    expContractExpiration,
    educationLevel,
    workstationId,
    workstationName,
    positionName,
    dismissalDate,
    dismissalCause,
    companyId,
    companyName,
    branchId,
    branchName,
    visitDate,
    visitDescription,
  } = req.body;
  const respondent = new Respondent({
    identifier,
    type,
    registration,
    name,
    cpf,
    email,
    phone,
    admissionDate,
    expContractExpiration,
    educationLevel,
    workstationId,
    workstationName,
    positionName,
    dismissalDate,
    dismissalCause,
    companyId,
    companyName,
    branchId,
    branchName,
    visitDate,
    visitDescription,
  });
  respondent
    .save()
    .then((resp) => res.status(201).json(resp))
    .catch((err) => res.status(400).json(`Error to insert respondent: ${err}`));
});

router.patch('/:id', (req, res) => {
  Respondent.updateOne({ _id: req.params.id }, { $set: req.body })
    .then((resp) => res.status(200).json(resp))
    .catch((err) => res.status(400).json(err));
});

router.delete('/:id', (req, res) => {
  Respondent.remove({ _id: req.params.id })
    .then((resp) => res.status(200).json(resp))
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
