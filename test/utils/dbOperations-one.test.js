const mysqlConn = require('../../utils/dbConnection').mysqlConn;

const studentSchema = require('../../model/basic/studentSchema').studentSchema;
const schoolSchema = require('../../model/admin/schoolSchema').schoolSchema;
const { performWrite, performRead, performReadAll, performDelete, performUpdate } = require('../../utils/dbOperations-one');


describe('Database access operations', () => {
    const tableName1 = 'schools';
    const tableName2 = 'students';
    
    const studentData =  {
        studentId: 'NLS202011001',
        sessYear: '2020-2021',
        termId: 1,
        firstName: 'Lanre',
        middleName: 'Gbenga',
        lastName: 'Amadi',
        dob: '1994-09-25',
        genotype: 'AA',
        bloodGroup: 'B+',
        photoUrl: 'http://pix.com/nafowa-pix-collection/lanre.jpeg',
        addressId: '1001',
        dateOfFirstResumption: '2023-12-04',
        expectedGradDate: '2027-04-12',
        status: 'active',
        classId: 'g1',  
        teacherId: 'NLS202310001T',
        minderId: 'NLS202310001M',
        parentId: 'NLS202310001P'
    };

    beforeAll(async () => {
        // setup "schools" table
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
              
        await schoolSchema();
        await mysqlConn(tableName1).insert(schData); // await mysqlConn(tableName).insert(dataToInsert);
    });

    // drop table and close db connection handle
    // afterAll(async () => {
    //     await mysqlConn.schema.dropTable(tableName1);
    //     await mysqlConn.schema.dropTable(tableName2);
    //     mysqlConn.destroy();
    // });

    //tableName, itemData, itemName
    //1.
    test('expect code 201 returned after write to db', async () => {
        const message = 'student';
        const response = await performWrite(tableName2, studentData, message);
        expect(response.code).toBe(201);
    });
});