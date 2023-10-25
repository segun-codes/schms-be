const mysqlConn = require('../../utils/dbConnection').mysqlConn;

const isTableExist = async (tableName) => {
    const tableExist = await mysqlConn.schema.hasTable(tableName);
    
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

// sets up "field" so it unique across columns
const makeFieldUnique = async (tableName, field) => {
    try {
        await mysqlConn.schema.alterTable(tableName, (t) => {
            !Array.isArray(field) ?  t.unique(field) : t.unique([field[0], field[1]]);
        });
    } catch(err) {
        if (err.code === 'ER_DUP_ENTRY') {
           throw err;
        } else {
            console.log(`Making ${tableName} ID unique failed!`);
        }
    }
};

module.exports = {
    isTableExist,
    getDBConnection,
    makeFieldUnique,
};