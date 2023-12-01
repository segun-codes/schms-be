const { isLogin, isSubscribed, getModuleSubscribed } = require('../../../utils/admin/getwayServices');


/**
 * Set of Unit test for getwayServices
 * To do: Refactor as more features are introduced in getwayServices.js
 */
describe('Getway services', () => {

    test('expect login to be true', () => {
        expect(isLogin()).toBe(true);
    });

    test('expect login to be true', () => {
        expect(isSubscribed()).toBe(true);
    });

    test('expect arrays of module subscribed to', () => {
        const testSubscribedModules = ['basic', 'regular']; 
        const isEquivalent = JSON.stringify(testSubscribedModules) === JSON.stringify(getModuleSubscribed());
    
        expect(isEquivalent).toBe(true);
    });

});

