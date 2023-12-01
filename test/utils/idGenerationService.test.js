const { describe, expect, test, beforeAll, afterAll } = require('@jest/globals');

const mysqlConn = require('../../utils/dbConnection').mysqlConnTest;
const schoolSchema = require('../../model/admin/schoolSchema').schoolSchema;
const { schData1 } = require('../utils-test');
const { getLowerBoundYear, createStudentId, extractPrevIdNumber, generateNextId } = require('../../utils/idGenerationService');



describe('ID Generation Module', () => {    
    const tableName = 'schools';

    // setup "schools" table
    beforeAll(async () => {         
        await schoolSchema(mysqlConn);
        await mysqlConn(tableName).insert(schData1);
    });

    // drop table and close db connection handle
    afterAll(async () => {
        await mysqlConn.schema.dropTable(tableName);
        await mysqlConn.destroy();
        console.log('Inside IdGenService.test: DB connection handle destroyed...');
    });
         
    //1. Unit test
    test('get lower bound year', () => {
        expect(getLowerBoundYear('2022-2023')).toBe('2022');
    });

    //2. Unit test
    test('create Student Id', () => {   
        const schlData = { schlAcronym: 'NLS', sessYear: '2020-2021', termId: 1 };
        expect(createStudentId(schlData)).toBe('NLS202010001');
    });

    //3. Unit test
    test('extract Prev ID Number', () => {
        const targetField = 'last_student_no';
        const tempObj = {
            code: 200,
            status: 'success',
            message: 'none',
            payload: [{ last_student_no: 1003 }]
        };

        expect(extractPrevIdNumber(targetField, tempObj)).toBe(1003);
    });

    //4. Integration test
    // Note: if you comment out "Afterall()" above, the wrong error info 
    // that "update" was not completed will stop. 
    // It appears a bug in Knex.js library is responsible for this, because
    // update actually happened correctly    
    test('Generate next ID (for student)', async () => {
        const clientId = 123456781;
        const targetField = 'last_student_no'; // generate next id for this
        const schlData = { schlAcronym: 'NLS', sessYear: '2020-2021', termId: 1 };
        
        const value = await generateNextId(targetField, clientId, schlData, mysqlConn); 
        expect(value).toBe('NLS202011001');
    });

});

