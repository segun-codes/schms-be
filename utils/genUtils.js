

// convert this firstName to first_name
const convertToSnakeCase = (property) => {
    
    //g => sticky flag, tells "replace()" to replace more than once
    const snakeCasedProperty = property.replace(/[A-Z]/g, (letter) => { return '_' + letter.toLowerCase() });  

    return snakeCasedProperty;
};


module.exports = {
    convertToSnakeCase,
};