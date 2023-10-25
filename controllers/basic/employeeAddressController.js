const mysqlConn = require('../../utils/dbConnection').mysqlConn;
const { performWrite, performRead, performReadAll, performDelete, performUpdate } = require('../../utils/dbOperations-one');


const tableName = 'employee_addresses';
const itemToBeFetched = 'address';

const writeAddress = async (addressData) => {
    const address = { 
        emp_address_id: addressData.empAddressId,
        emp_id: addressData.empId,
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
    const address = await performRead(tableName, itemToBeFetched, { emp_address_id: addressId });
    return address;
};

const retrieveAllAddresses = async () => {
    const fieldsToSelect = [
        'emp_address_id',
        'emp_id', 
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
    const queryCriteria = { emp_address_id: addressId };

    const removeStatus = await performDelete(tableName, itemToDelete, queryCriteria);

    return removeStatus;
};

const updateAddress = async (addressToUpdate) => {
    const itemName = itemToBeFetched;
    const queryCriteria = { emp_address_id: addressToUpdate.empAddressId };

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