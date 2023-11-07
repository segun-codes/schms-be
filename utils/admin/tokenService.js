
const generateAPIKey = () => {
    return '24RTZY5678PPY568WRESXT34FTR'; // retrieve this from the api_keys table
 };

 const getClientId = (apiToken) => {
    // use apiToken to search and fetch clientId from the api_keys table
    return 123456789;   // retrieve clientId from the api_keys table, this should be equivalent unix-timestamp in millisecond
 };

const generateBearerToken = () => {

};

const isValidAPIKey = () => {
   return true;
};


module.exports = {
   generateAPIKey,
   getClientId,
   generateBearerToken,
   isValidAPIKey,
};