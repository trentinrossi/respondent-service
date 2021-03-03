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
    .catch((err) =>
      next({
        code: 10402,
        status: 400,
        message: err._message,
        moreInfo: err.errors,
      })
    );
}

function insert(req, res, next) {
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
          next({
            code: 10400,
            status: 400,
            message: err._message,
            moreInfo: err.errors,
          })
        );
    } else {
      next({
        code: 10401,
        status: 400,
        message: `Respondent already exists by given e-mail: ${req.body.email}`,
        moreInfo: ``,
      });
    }
  });
}

function update(req, res, next) {
  if (req.body.email && req.params.email !== req.body.email) {
    next({
      code: 10403,
      status: 400,
      message: `It's not allowed to change the e-mail address of a registered respondent.`,
      moreInfo: `For do this, you need to create a new account.`,
    });
  }
  
  Respondent.updateOne({ email: req.params.email }, { $set: req.body })
    .then((resp) => {
      Respondent.findOne({ email: req.params.email }).then((resp) => {
        res.status(200).json(resp);
      });
    })
    .catch((err) =>
      next({
        code: 10402,
        status: 400,
        message: err._message,
        moreInfo: err.errors,
      })
    );
}

function remove(req, res) {
  Respondent.remove({ email: req.params.email })
    .then((resp) => res.status(200).json())
    .catch((err) =>
      next({
        code: 10405,
        status: 400,
        message: err._message,
        moreInfo: err.errors,
      })
    );
}

module.exports = {
  getAll,
  getByEmail,
  validateEmail,
  insert,
  update,
  remove,
};
