const tokenService = require('../../../utils/admin/tokenService');

// refactor as more implementation is added to tested functions
describe('test suite for token services', () => {

    test('get admin api key', () => {
        const apiKeyType = 'ADMIN';
        const apiKey = tokenService.getAPIKey(apiKeyType);
        expect(apiKey).toBe('24RTZY5678PPY568WRESXT34ADMIN');
    });

    test('get user api key', () => {
        const apiKeyType = 'USER';
        const apiKey = tokenService.getAPIKey(apiKeyType);
        expect(apiKey).toBe('24RTZY5678PPY568WRESXT34FTR');
    });

    test('get client id', () => {
        const clientId = tokenService.getClientId();
        expect(clientId).toBe(123456789);
    });

    test('get bearer\'s token', () => {
        const bearerToken = tokenService.getBearerToken();
        expect(bearerToken).toBe('xxxx');
    });  
    
    test('confirms validity of API key', () => {
        const apiKey = '24RTZY5678PPY568WRESXT34FTR';
        const apiKeyType = 'USER';
        const validApiKey = tokenService.isValidAPIKey(apiKey, apiKeyType);

        expect(validApiKey).toBe(true);
    });

    test('confirms validity of API key', () => {
        const apiKey = '24RTZY5678PPY568WRESXT34ADMIN';
        const apiKeyType = 'ADMIN';
        const validApiKey = tokenService.isValidAPIKey(apiKey, apiKeyType);

        expect(validApiKey).toBe(true);
    });

});