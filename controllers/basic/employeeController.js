const mysqlConn = require('../../utils/dbConnection').mysqlConn;
const idGenerationService = require('../../utils/idGenerationService');
const generateEmployeeId = require('../../utils/idGenerationService').generateNextId;
const getClientId = require('../../utils/admin/tokenService').getClientId;
const { performWrite, performRead, performReadAll, performDelete, performUpdate } = require('../../utils/dbOperations-one');


const tableName = 'employees';
const itemToBeFetched = 'employee';

const writeEmployee = async (employeeData) => {
    const targetField = 'last_employee_no';
    const apiKey = employeeData.apiKey;
    const clientId = getClientId(apiKey);
    const employeeId = await generateEmployeeId(targetField, clientId);

    const employee = { 
        emp_id: employeeId, 
        first_name: employeeData.firstName, 
        middle_name: employeeData.middleName, 
        last_name: employeeData.lastName, 
        dob: employeeData.dob, 
        photo_url: employeeData.photoUrl,
        employment_date: employeeData.employmentDate,
        status_of_employment: employeeData.statusOfEmployment, 
        role: employeeData.role, 
        phone_no: employeeData.phoneNo, 
        email: employeeData.email, 
        address_id: employeeData.addressId
    };  
    
    const writeStatus = await performWrite(tableName, employee, 'employee');

    if (writeStatus.code === 201) {
        writeStatus.employeeId = employeeId;
    }
    
    return writeStatus;
};

const retrieveEmployee = async (employeeId) => {
    const employee = await performRead(tableName, itemToBeFetched, { emp_id: employeeId })
    return employee;
};

const retrieveAllEmployees = async () => {
    const fieldsToSelect = [
        'emp_id', 'first_name', 'middle_name', 'last_name', 
        'dob', 'photo_url',  'employment_date', 'status_of_employment', 
        'role', 'phone_no', 'email', 'address_id'
    ];
    
    const employees = await performReadAll(tableName, 'employees',  fieldsToSelect);

    return employees;
};

const removeEmployee = async (employeeId) => {
    const itemToDelete = itemToBeFetched;
    const queryCriteria = { emp_id: employeeId };

    const removeStatus = await performDelete(tableName, itemToDelete, queryCriteria);

    return removeStatus;
};

const updateEmployee = async (employeeToUpdate) => {
    const itemName = itemToBeFetched;
    const queryCriteria = { emp_id: employeeToUpdate.empId };

    const updateStatus = await performUpdate(tableName, itemName, employeeToUpdate, queryCriteria);

    return updateStatus;
};


module.exports = { 
    writeEmployee,
    retrieveEmployee,
    retrieveAllEmployees,
    removeEmployee,
    updateEmployee,
};