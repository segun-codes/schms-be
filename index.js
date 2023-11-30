const schmsApp = require('./app');


const port = process.env.PORT || 3000;

schmsApp.listen(process.env.PORT || port, () => {
    console.log('Server up on port: ', port);
});
