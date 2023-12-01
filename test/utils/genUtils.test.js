const { describe, expect, test } = require('@jest/globals');
const { convertToSnakeCase, toCamelCase } = require('../../utils/genUtils');



describe('General Utility Module', () => {

    test('convert to camelcase', () => {
        expect(toCamelCase('dog_name')).toBe('dogName');
    });

    test('convert to convertToSnakeCase', () => {
        expect(toCamelCase('dog_name')).toBe('dogName');
    });
});


