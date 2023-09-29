const mysqlConn = require('../utils/dbConnection').mysqlConn;

const isTableExist = async () => {
    const tableExist = await mysqlConn.schema.hasTable('students');
    
    return tableExist;
}

const getDBConnection = async () => {
    try {
        const conn = await mysqlConn.select(mysqlConn.raw('1'));
        
        return conn;
    } catch(err) { 
        console.log('Connection to db failed');
    }
};

const makeStudentIdUnique = async () => {
    try {
            await mysqlConn.schema.alterTable('students', (t) => {
                t.unique('student_id');
        });
    } catch(err) {
        if (err.code === 'ER_DUP_ENTRY') {
           throw err;
        } else {
            console.log('Making student ID unique failed!');
        }
    }
}; 

const studentSchema = async () => { 
    const conn = await getDBConnection();

    if (conn) {
        console.log('MySQL DB Connected');
        
        const tableExists = await isTableExist();

        if (!tableExists) {
            try {
                await mysqlConn.schema
                    .createTable('students', (table) => { 
                        table.primary(['id', 'student_id']); 
                        table.increments('id'); 
                        table.string('student_id');      
                        table.string('first_name');
                        table.string('last_name');
                        console.log('Schema setup successful');    
                    });
                await makeStudentIdUnique();
                console.log('control got here...');
            } catch(err) {
                throw err;
            }
        } else {
            console.log('Existing schema found, no need to create another');
        }                
    }
};


module.exports = {
    studentSchema,
};



          // table.string('middle_name');
            //table.string('last_name');
            // table.string('dob');    // use date data type here
            // table.string('photo');  // let this return url for now
            // table.string('date_of_first_resumption'); // use date data type later  
            // table.string('expected_grad_date'); // use date data type later  
            // table.string('status');
            // table.string('teacher');
            // table.string('parent_first_name');
            // table.string('parent_last_name');
            // table.string('teacher');
            // table.string('parent_phone');
            // table.string('photo_of_father'); // use url for now
            // table.string('photo_of_mother'); // // use url for now

/*
student_id 		(format YYYYXXXX e.g., 20230001 - first 4digits is year, second 4digits represent the unique student id)
firstName
middleName
lastName
date_of_birth
photo 			//api will return link to the photo
date_of_resumption
expected_date_of_graduation
**current_class 	// **to be extracted from table "class" using student_id 
teacher
status (three possibilites - active, graduated, exited; "exited" means student left the school without completing program) 
parent_first_name
parent_last_name
parent_phone
photo_of_father
photo_of_mother
*/