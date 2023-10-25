const mysqlConn = require('../../utils/dbConnection').mysqlConn;
const { performWrite, performRead, performReadAll, performDelete, performUpdate } = require('../../utils/dbOperations-one');


const tableName = 'student_addresses';
const itemToBeFetched = 'address';

const writeAddress = async (addressData) => {
    const address = { 
        std_address_id: addressData.stdAddressId,
        student_id: addressData.studentId,
        house_no: addressData.houseNo, 
        street_line_one: addressData.streetLineOne, 
        street_line_two: addressData.streetLineTwo, 
        town_city: addressData.townCity, 
        state_region: addressData.stateRegion, 
        country: addressData.country,
        post_code: addressData.postCode,
    };  
    
    const writeStatus = await performWrite(tableName, address, 'address');
    
    return writeStatus;
};

const retrieveAddress = async (addressId) => {
    const address = await performRead(tableName, itemToBeFetched, { std_address_id: addressId });
    return address;
};

const retrieveAllAddresses = async () => {
    const fieldsToSelect = [
        'std_address_id',
        'student_id', 
        'house_no', 
        'street_line_one', 
        'street_line_two', 
        'town_city', 
        'state_region', 
        'country', 
        'post_code'
    ];
    
    const addresses = await performReadAll(tableName, 'addresses',  fieldsToSelect);

    return addresses;
};

const removeAddress = async (addressId) => {
    const itemToDelete = itemToBeFetched;
    const queryCriteria = { std_address_id: addressId };

    const removeStatus = await performDelete(tableName, itemToDelete, queryCriteria);

    return removeStatus;
};

const updateAddress = async (addressToUpdate) => {
    const itemName = itemToBeFetched;
    const queryCriteria = { std_address_id: addressToUpdate.stdAddressId };

    const updateStatus = await performUpdate(tableName, itemName, addressToUpdate, queryCriteria);

    return updateStatus;
};


module.exports = { 
    writeAddress,
    retrieveAddress,
    retrieveAllAddresses,
    removeAddress,
    updateAddress,
};