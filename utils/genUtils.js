// convert firstName to first_name
const convertToSnakeCase = (property) => {    
    //g => sticky flag, tells "replace()" to replace more than once
    const snakeCasedProperty = property.replace(/[A-Z]/g, (letter) => { return '_' + letter.toLowerCase() });  

    return snakeCasedProperty;
};


// transforms word in snake case to camel case format
const toCamelCase = (property) => {
    let temp;
    let propertyInCamelCase = '';
    let capitalizeNextItem = false;

    for(i = 0; i < property.length; ++i) {
        temp = property.charAt(i);

        if (capitalizeNextItem) {
            propertyInCamelCase += temp.toUpperCase();
            capitalizeNextItem = false;
        } else {
            if (temp === '_')  {
                capitalizeNextItem = true;
            } else {
                propertyInCamelCase += temp;
            }
        }
    }

    return propertyInCamelCase;
};

module.exports = {
    convertToSnakeCase,
    toCamelCase
};