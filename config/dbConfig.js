
const config = {
    CLIENT: 'mysql2',
    HOST: '127.0.0.1', //'localhost'
    PORT: 3306,
    USER: 'root',
    PASSWORD: 'root1234',
    DATABASE: 'nafowa_sch_db'
};

// Consider moving this to the database eventually
const schoolNames = [
    { 'nafowa': 'NLS' },
    { 'heritage': 'HSC'}
];

module.exports = config;