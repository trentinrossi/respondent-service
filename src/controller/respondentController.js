const Respondent = require('../model/Respondent');

function getAll(req, res) {
  Respondent.find()
    .then((resp) => {
      res.status(200).json(resp);
    })
    .catch((err) => res.status(400).json(err));
}

function getByEmail(req, res) {
  Respondent.findOne({ email: req.params.email }).then((retRespondent) => {
    if (retRespondent === null) {
      res.status(400).json({ error: 'Respondent not found' });
    } else {
      res.status(200).json(retRespondent);
    }
  });
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
  Respondent.findOne({ email: req.params.email }).then((retRespondent) => {
    if (retRespondent === null) {
      res.status(400).json({ error: 'Respondent not found' });
    } else {
      // TODO: Implementar uma forma de não atualizar/permitir atualizar o e-mail do respondente
      Respondent.updateOne({ email: req.params.email }, { $set: req.body })
        .then((resp) => res.status(200).json(resp))
        .catch((err) => res.status(400).json(err));
    }
  });
}

function remove(req, res) {
  Respondent.findOne({ email: req.params.email }).then((retRespondent) => {
    if (retRespondent === null) {
      res.status(400).json({ error: 'Respondent not found' });
    } else {
      Respondent.remove({ email: req.params.email })
        .then((resp) => res.status(200).json(resp))
        .catch((err) => res.status(400).json(err));
    }
  });
}

module.exports = {
  getAll,
  getByEmail,
  insert,
  update,
  remove,
};
