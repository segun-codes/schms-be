const mysqlConn = require('../../utils/dbConnection').mysqlConn;

const schoolSchema = require('../../model/admin/schoolSchema').schoolSchema;
const { performWrite, performRead, performReadAll, performDelete, performUpdate } = require('../../utils/dbOperations-one');
const { schData } = require('../utils-test');



describe('Database access operations', () => {
    const tableName1 = 'schools';
    const tableName2 = 'students';
    
    beforeAll(async () => {             
        await schoolSchema();
        await mysqlConn(tableName1).insert(schData); 
    });

    // drop table and close db connection handle
    afterAll(async () => {
        await mysqlConn.schema.dropTable(tableName1);
        await mysqlConn.schema.dropTable(tableName2);
        await mysqlConn.destroy();
        console.log('Inside dbOps.test: DB connection handle destroyed...');
    });

    // 1.
    test('expect code 201 returned after write to db', async () => {
        const message = 'students';
        const studentData =  {
            student_id: 'NLS202011001',
            first_name: 'Lanre',
            middle_name: 'Gbenga',
            last_name: 'Amadi',
            dob: '1994-09-25',
            genotype: 'AA',
            blood_group: 'B+',
            photo_url: 'http://pix.com/nafowa-pix-collection/lanre.jpeg',
            address_id: '1001',
            date_of_first_resumpt: '2023-12-04',
            expected_grad_date: '2027-04-12',
            status: 'active',
            class_id: 'g1',  
            teacher_id: 'NLS202310001T',
            minder_id: 'NLS202310001M',
            parent_id: 'NLS202310001P'
        }; 

        const response = await performWrite(tableName2, studentData, message);
        expect(response.code).toBe(201);
    });
});