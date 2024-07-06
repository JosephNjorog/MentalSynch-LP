const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');
const auth = require('../middleware/auth');

// @route   GET api/services
// @desc    Get all services
router.get('/', auth, serviceController.getAllServices);

// @route   GET api/services/:id
// @desc    Get service by ID
router.get('/:id', auth, serviceController.getServiceById);

// @route   POST api/services
// @desc    Create new service
router.post('/', auth, serviceController.createService);

// @route   PUT api/services/:id
// @desc    Update service
router.put('/:id', auth, serviceController.updateService);

// @route   DELETE api/services/:id
// @desc    Delete service
router.delete('/:id', auth, serviceController.deleteService);

module.exports = router;
