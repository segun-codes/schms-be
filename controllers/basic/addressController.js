const mysqlConn = require('../../utils/dbConnection').mysqlConn;
const getClientId = require('../../utils/admin/tokenService').getClientId;
const generateAddressId = require('../../utils/idGenerationService').generateNextId;
const { performWrite, performRead, performReadAll, performDelete, performUpdate } = require('../../utils/dbOperations-one');


const tableName = 'addresses';
const itemToBeFetched = 'address';

const writeAddress = async (addressData) => {
    const targetField = 'last_address_no';
    const apiKey = addressData.apiKey;
    const clientId = getClientId(apiKey);
    const addressId = await generateAddressId(targetField, clientId);

    console.log('clientId: ', clientId);
    console.log('addressId: ', addressId);

    const address = { 
        address_id: addressId,
        emp_id: addressData.empId,
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
    const address = await performRead(tableName, itemToBeFetched, { address_id: addressId });
    return address;
};

const retrieveAllAddresses = async () => {
    const fieldsToSelect = [
        'address_id',
        'emp_id',
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
    const queryCriteria = { address_id: addressId };

    const removeStatus = await performDelete(tableName, itemToDelete, queryCriteria);

    return removeStatus;
};

const updateAddress = async (addressToUpdate) => {
    const itemName = itemToBeFetched;
    const queryCriteria = { address_id: addressToUpdate.addressId };

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