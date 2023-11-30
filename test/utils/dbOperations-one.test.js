// const mysqlConn = require('../../utils/dbConnection').mysqlConnTest;

// const schoolSchema = require('../../model/admin/schoolSchema').schoolSchema;
// const { performWrite, performRead, performReadAll, performDelete, performUpdate } = require('../../utils/dbOperations-one');
// const { schData } = require('../utils-test');



// describe('Database access operations', () => {
//     const tableName1 = 'schools';
//     const tableName2 = 'students';
//     const message = 'students';
    
//     beforeAll(async () => {             
//         await schoolSchema(mysqlConn);
//         await mysqlConn(tableName1).insert(schData); 
//     });

//     // drop table and close db connection handle
//     afterAll(async () => {
//         await mysqlConn.schema.dropTable(tableName1);
//         await mysqlConn.schema.dropTable(tableName2);
//         await mysqlConn.destroy();
//         console.log('Inside dbOps.test: DB connection handle destroyed...');
//     });

//     // 1.
//     test('respond with code 201 after write to db', async () => {
//         const studentData =  {
//             student_id: 'NLS202011001',
//             first_name: 'Lanre',
//             middle_name: 'Gbenga',
//             last_name: 'Amadi',
//             dob: '1994-09-25',
//             genotype: 'AA',
//             blood_group: 'B+',
//             photo_url: 'http://pix.com/nafowa-pix-collection/lanre.jpeg',
//             address_id: '1001',
//             date_of_first_resumpt: '2023-12-04',
//             expected_grad_date: '2027-04-12',
//             status: 'active',
//             class_id: 'g1',  
//             teacher_id: 'NLS202310001T',
//             minder_id: 'NLS202310001M',
//             parent_id: 'NLS202310001P'
//         }; 

//         const response = await performWrite(tableName2, studentData, message, mysqlConn);
//         expect(response.code).toBe(201);
//     });

//     //2.
//     test('respond with code 200 after read from db', async () => {
//         const fieldsToSelect = null;
//         const response = await performRead(tableName2, message, { student_id: 'NLS202011001' }, fieldsToSelect, mysqlConn); //performRead(tableName, itemToBeFetched, { student_id: studentId })
//         expect(response.code).toBe(200);
//     });

//     //3. 
//     test('respond with code 200 after read all from db', async () => {
//         const fieldsToSelect = [
//             'student_id', 'first_name', 'middle_name', 
//             'last_name', 'dob', 'genotype', 'blood_group',
//             'photo_url', 'address_id','date_of_first_resumpt', 
//             'expected_grad_date', 'status', 'class_id', 'teacher_id', 
//             'minder_id', 'parent_id'
//         ];

//         const studentData =  {
//             student_id: 'NLS202011002',
//             first_name: 'Tanitoluwa',
//             middle_name: 'Ila-oragun',
//             last_name: 'Pemi',
//             dob: '1994-09-25',
//             genotype: 'AA',
//             blood_group: 'B+',
//             photo_url: 'http://pix.com/nafowa-pix-collection/lanre.jpeg',
//             address_id: '1001',
//             date_of_first_resumpt: '2023-12-04',
//             expected_grad_date: '2027-04-12',
//             status: 'active',
//             class_id: 'g1',  
//             teacher_id: 'NLS202310001T',
//             minder_id: 'NLS202310001M',
//             parent_id: 'NLS202310001P'
//         }; 

//         await performWrite(tableName2, studentData, message);
        
//         const response = await performReadAll(tableName2, message, fieldsToSelect);
//         expect(response.code).toBe(200);
//     });

//     //4.
//     test('respond with code 201 after updating', async () => {
//         const queryCriteria = { student_id: 'NLS202011001' };
//         const itemToUpdate = { genotype: 'BA' };

//         const response = await performUpdate(tableName2, message, itemToUpdate, queryCriteria); // const performUpdate = async (tableName, itemName, itemToUpdate, queryCriteria) => {
//         expect(response.code).toBe(201);
//     });

//     //.5
//     test('respond with code 200 after deleting', async () => {
//         const queryCriteria = { student_id: 'NLS202011001' };

//         const response = await performDelete(tableName2, message,  queryCriteria);
//         expect(response.code).toBe(200);
//     });

// });