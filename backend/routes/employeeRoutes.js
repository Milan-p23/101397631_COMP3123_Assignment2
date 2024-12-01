const express = require('express');
const employeeController = require('../controllers/employeeController');
const { verifyToken } = require('../middlewares/authMiddleware');

const router = express.Router();

// Protect all routes with verifyToken middleware
router.get('/search', verifyToken, employeeController.searchEmployees);
router.get('/', verifyToken, employeeController.getAllEmployees);
router.post('/', verifyToken, employeeController.createEmployee);
router.get('/:eid', verifyToken, employeeController.getEmployeeById);
router.put('/:eid', verifyToken, employeeController.updateEmployee);
router.delete('/:eid', verifyToken, employeeController.deleteEmployee);

module.exports = router;
