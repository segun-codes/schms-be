
const isTableExist = async (tableName, mysqlConn) => {
    const tableExist = await mysqlConn.schema.hasTable(tableName);
    
    return tableExist;
}


// sets up "field" so it unique across columns
const makeFieldUnique = async (tableName, field, mysqlConn) => {
    
    try {
        await mysqlConn.schema.alterTable(tableName, (t) => {
            t.unique(field);
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
    makeFieldUnique,
};