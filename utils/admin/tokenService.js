// REWORK ALL THESE FUNCTIONS LATER

/**
 * Using 1-way hashing algorithm, generates API Key and writes to DB
 * @param apiKeyType: values include USER, ADMIN 
 * @returns 
 */

const generateAPIKey = (apiKeyType) => {};

 /**
  * Using 1-way hashing algorithm, generates bearer's token and writes to DB
  */
const generateBearerToken = () => {};

/**
 * 
 * @param clientId:  
 * @param apiKeyType:  
 * @returns 
 */
const getAPIKey = (apiKeyType, clientId = null) => {
   let apiKey;

   if (apiKeyType === 'ADMIN') {
      apiKey = '24RTZY5678PPY568WRESXT34ADMIN';
   } else if (apiKeyType === 'USER') {
      // make use of "clientId" to fetch apiKey for the registered school
      apiKey = '24RTZY5678PPY568WRESXT34FTR';
   }

   return apiKey;
}

const getBearerToken = () => {}

const getClientId = (apiToken) => {
    // use apiToken to search and fetch clientId from the api_keys table
    return 123456789;   // retrieve clientId from the api_keys table, this should be equivalent unix-timestamp in millisecond
 };

const isValidAPIKey = (apiKey, userAPIKeyType) => {
   const apiValidityStatus = apiKey === getAPIKey(userAPIKeyType) ? true : false;
   
   return apiValidityStatus;
};

const isValidAdminAPIKey = (adminAPIKey) => {
   console.log('AdminAPIKey: ', adminAPIKey);
   const apiKeyType = 'ADMIN';

   return adminAPIKey === getAPIKey(apiKeyType);
};


module.exports = {
   generateAPIKey,
   getClientId,
   generateBearerToken,
   isValidAPIKey,
   isValidAdminAPIKey
};