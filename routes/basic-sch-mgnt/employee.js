const express = require('express');
const bodyParser = require('body-parser')
const employeeController = require('../../controllers/basic/employeeController');


const employeeRouter = express.Router();

// retrieves a registered employee given empId
employeeRouter.get('/:empId', async (req, res) => {
    const empId = req.params.empId;
    const employee = await employeeController.retrieveEmployee(empId);

    res.status(employee.code).send({ 
        status: employee.status, 
        message: employee.message, 
        payload: employee.payload 
    });
});

// retrieves all registered employees
employeeRouter.get('/', async (req, res) => {
    const employees = await employeeController.retrieveAllEmployees();
    
    res.status(employees.code).send({ 
        status: employees.status, 
        message: employees.message, 
        payload: employees.payload 
    });
});

//  registering a new employee. Creates profile for the employee automatically
employeeRouter.post('/', async (req, res) => {
    const employee = req.body;
    const wStatus = await employeeController.writeEmployee(employee);
    
    res.status(wStatus.code).send({ 
        status: wStatus.status, 
        message: wStatus.message 
    });
});

// update employee profile
employeeRouter.patch('/', async (req, res) => {
    const employeeUpdate = req.body;
    const uStatus = await employeeController.updateEmployee(employeeUpdate);

    res.status(uStatus.code).send({
        status: uStatus.status, 
        message: uStatus.message
    });
});

// delete employee profile
employeeRouter.delete('/:empId', async (req, res) => {
    const empId = req.params.empId;
    const dStatus = await employeeController.removeEmployee(empId);

    res.status(dStatus.code).send({ 
        status: dStatus.status, 
        message: dStatus.message 
    });
});

module.exports = employeeRouter;