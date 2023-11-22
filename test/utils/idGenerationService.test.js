const { describe, expect, test, beforeAll, afterAll } = require('@jest/globals');

const mysqlConn = require('../../utils/dbConnection').mysqlConn;
const schoolSchema = require('../../model/admin/schoolSchema').schoolSchema;
const { getLowerBoundYear, createStudentId, extractPrevIdNumber, generateNextId } = require('../../utils/idGenerationService');



describe('ID Generation Module', () => {    
    const tableName = 'schools';

    // setup "schools" table
    beforeAll(async () => {
        const schData =  {
            name: 'Nafowa Little Angels School',
            name_acronym: 'NLS',
            type: 'nursery',
            address: '104 Battalion Division',
            last_student_no: 1000,
            last_employee_no: 1001,
            last_parent_no : 1002,
            last_address_no: 1003,
            last_classroom_no: 100,
            client_id: 123456789
          };

        try {            
            await schoolSchema();
            await mysqlConn(tableName).insert(schData);

        } catch(err) { 
            console.log(`Inserting to table ${tableName} failed`);
        }
    });

    // drop table and close db connection handle
    afterAll(async () => {
        await mysqlConn.schema.dropTable(tableName);
        mysqlConn.destroy();
        console.log('End of first set of testing...');
    });
         
    //1. Unit test
    test('Get lower bound year', () => {
        expect(getLowerBoundYear('2022-2023')).toBe('2022');
    });

    //2. Unit test
    test('Create Student Id', () => {   
        const schlData = { schlAcronym: 'NLS', sessYear: '2020-2021', termId: 1 };
        expect(createStudentId(schlData)).toBe('NLS202010001');

    });

    //3. Unit test
    test('Extract Prev ID Number', () => {
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
    test('Generate next ID (for student)', async () => {
        const clientId = 123456789;
        const targetField = 'last_student_no'; // generate next id for this
        const schlData = { schlAcronym: 'NLS', sessYear: '2020-2021', termId: 1 };
        
        const value = await generateNextId(targetField, clientId, schlData);
        expect(value).toBe('NLS202011001');
    });
});

