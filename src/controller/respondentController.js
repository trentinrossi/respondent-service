const Respondent = require('../model/Respondent');

async function validateEmail(email) {
  return await Respondent.findOne({ email }).then((resp) => {
    return resp;
  });
}

function getByEmail(req, res) {
  Respondent.findOne({ email: req.params.email }).then((resp) => {
    res.status(200).json(resp);
  });
}

function getAll(req, res) {
  Respondent.find()
    .then((resp) => {
      res.status(200).json(resp);
    })
    .catch((err) => res.status(400).json(err));
}

function insert(req, res) {
  Respondent.findOne({ email: req.body.email }).then((retRespontend) => {
    if (retRespontend === null) {
      const respondentData = ({
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
      } = req.body);

      const respondent = new Respondent(respondentData);

      respondent
        .save()
        .then((resp) => res.status(201).json(resp))
        .catch((err) =>
          res.status(400).json({ error: `Error to insert respondent: ${err}` })
        );
    } else {
      res.status(400).json({ error: 'Respondent already exists' });
    }
  });
}

function update(req, res) {
  // TODO: Implementar uma forma de não atualizar/permitir atualizar o e-mail do respondente
  Respondent.updateOne({ email: req.params.email }, { $set: req.body })
    .then((resp) => res.status(200).json(resp))
    .catch((err) => res.status(400).json(err));
}

function remove(req, res) {
  Respondent.remove({ email: req.params.email })
    .then((resp) => res.status(200).json(resp))
    .catch((err) => res.status(400).json(err));
}

module.exports = {
  getAll,
  getByEmail,
  validateEmail,
  insert,
  update,
  remove,
};
