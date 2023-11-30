// REWORK ALL THESE FUNCTIONS LATER

/**
 * Use clientId to retrieve apiKey
 * apiKeyType is to make db query more efficient
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


/**
 * Using 1-way hashing algorithm, generates API Key and writes to DB
 * @param apiKeyType: values include USER, ADMIN 
 * @returns 
 */
const getClientId = (apiToken) => {
   // use apiToken to search and fetch clientId from the api_keys table
   return 123456789;   // retrieve clientId from the api_keys table, this should be equivalent unix-timestamp in millisecond
};


const getBearerToken = () => {
   return 'xxxx';
};


const isValidAPIKey = (apiKey, apiKeyType, clientId = null) => {
   const apiValidityStatus = apiKey === getAPIKey(apiKeyType, clientId) ? true : false;
   
   return apiValidityStatus;
};

// generate APIKey
const generateAPIKey = (apiKeyType) => {
   return 'xxx';
};

 /**
  * Uses 1-way hashing algorithm, generates bearer's token
  */
const generateBearerToken = () => {
   return 'xxxx';
};



module.exports = {
   getAPIKey,
   getClientId,
   getBearerToken,
   isValidAPIKey,
};