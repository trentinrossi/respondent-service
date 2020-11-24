const express = require('express');
const router = express.Router();
const Respondent = require('../model/Respondent');
const RespondenController = require('../controller/respondentController');

router.get('/', RespondenController.getAll);

router.get('/:email', RespondenController.getByEmail);

router.post('/', RespondenController.insert);

router.patch('/:email', RespondenController.update);

router.delete('/:email', RespondenController.remove);

module.exports = router;
