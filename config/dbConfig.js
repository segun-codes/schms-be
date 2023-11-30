
const devConfig = {
    CLIENT: 'mysql2',
    HOST: '127.0.0.1', //'localhost'
    PORT: 3306,
    USER: 'root',
    PASSWORD: 'root1234',
    DATABASE: 'nafowa_sch_db'
};

const testConfig = {
    CLIENT: 'mysql2',
    HOST: '127.0.0.1', //'localhost'
    PORT: 3306,
    USER: 'schmbe_test',
    PASSWORD: 'schmbe_test',
    DATABASE: 'nafowa_sch_db_test'
};

// Consider moving this to the database eventually
const schoolNames = [
    { 'nafowa': 'NLS' },
    { 'heritage': 'HSC'}
];

module.exports = { 
    devConfig,
    testConfig 
}