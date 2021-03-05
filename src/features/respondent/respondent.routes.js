const express = require('express');
const router = express.Router();
const RespondenController = require('./respondent.controller');
const { body, validationResult } = require('express-validator');

/**
 * Validate if e-mail already exists in database
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const validateEmailExists = async (req, res, next) => {
  const { email } = req.params;

  const respondent = await RespondenController.validateEmail(email);
  if (!respondent) {
    next({
      code: 10404,
      status: 404,
      message: `Respondent not found by given email: ${email}`,
      moreInfo: `Please, inform the correct e-mail`,      
    });
  }

  next();  
};

router.all('*', (req, res, next) => {  
  body('email').isEmail().normalizeEmail();

  // If is necessary to manipulate dates
  // body([
  //   'admissionDate',
  //   'expContractExpiration',
  //   'dismissalDate',
  //   'visitDate',
  // ]);

  next();
});

const pagination = async (req, res, next) => {
  let { offset, limit } = req.query;

  // if (!offset) offset = 0;
  // if (!limit) limit = 500;

  req.offset = parseInt(offset) || 0;
  req.limit = parseInt(limit) || 500;

  next();
};

router.get('/', pagination, RespondenController.getAll);
router.get('/:email', validateEmailExists, RespondenController.getByEmail);
router.post('/', RespondenController.insert);
router.patch('/:email', validateEmailExists, RespondenController.update);
router.delete('/:email', validateEmailExists, RespondenController.remove);

module.exports = router;