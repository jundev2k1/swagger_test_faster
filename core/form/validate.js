// ===============================================
// File: Form Validator (validate.js)
// Description: Contains validators for form inputs
// Copyright (c) 2025. Jun Dev
// ===============================================

import { t } from '../i18n/translate.js';
import { ApiSettingMode, ColorEnums, HttpMethods } from '../data/constants.js';

/**
 * Validator for form inputs and settings.
 */
export const validator = (() => {
  /**
   * Validate if a value is required (not empty or null).
   * @param {string | null} value Value to validate
   * @returns {ValidateFieldResult} Validation result.
   */
  const isRequired = (value) => {
    const isValid = value && value.trim() !== '';
    return [isValid, isValid ? '' : t('validation.required')];
  }

  /**
   * Validate if a value is a number.
   * @param {string} value Number value to validate
   * @returns {ValidateFieldResult} Validation result.
   */
  const isNumber = (value) => {
    const isValid = !isNaN(parseFloat(value)) && isFinite(value);
    return [isValid, isValid ? '' : t('validation.invalid-number')];
  }

  /**
   * Validate if a value is a valid URL.
   * @param {string} value URL value to validate
   * @returns {ValidateFieldResult} Validation result.
   */
  const isValidUrl = (value) => {
    if (value.trim() === '') return [true, ''];

    try {
      new URL(value);
      return [true, ''];
    } catch (e) {
      return [false, t('validation.invalid-url')];
    }
  }

  /**
   * Validate if a value is a valid HTTP method.
   * @param {string} value HTTP method value to validate
   * @returns {ValidateFieldResult} Validation result.
   */
  const isValidHttpMethod = (value) => {
    const isValid = Object.values(HttpMethods).includes(value);
    return [isValid, isValid ? '' : t('validation.invalid-http-method')];
  }

  /**
   * Validate if a value is a valid color enum.
   * @param {string} value Color value to validate
   * @returns {ValidateFieldResult} Validation result.
   */
  const isValidColor = (value) => {
    const isValid = Object.values(ColorEnums).includes(value);
    return [isValid, isValid ? '' : t('validation.invalid-color')];
  }

  /**
   * Validate if a value is a valid JSON string.
   * @param {string} value JSON string to validate
   * @returns {ValidateFieldResult} Validation result.
   */
  const isValidJson = (value) => {
    if (value.trim() === '') return [true, ''];
    try {
      JSON.parse(value);
      return [true, ''];
    } catch (e) {
      return [false, t('validation.invalid-json')];
    }
  }

  /**
   * Validate if a value is a valid environment name.
   * @param {string} value Environment name to validate
   * @returns {ValidateFieldResult} Validation result.
   */
  const isValidEnvName = (value) => {
    const isValid = value && value.trim() !== '' && /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(value);
    return [isValid, isValid ? '' : t('validation.invalid-env-name')];
  }

  /**
   * Check if there is a duplicate value in a list of objects given a selector function.
   * @param {any[]} dataSource List of objects to check for duplicate value.
   * @param {function(any):any} selector Function that returns the value to check for duplicate.
   * @returns {[boolean, number[]]} A tuple where the first element is a boolean indicating whether the list has duplicate value
   *  and the second element is an array of indices of the duplicate values.
   */
  const isDuplicateValue = (dataSource = [], selector) => {
    if (typeof (selector) !== 'function') throw Error('The `selector` parameter must be a function at `isDuplicateValue`.');

    const duplicateRow = [];
    const distincField = {};
    dataSource.map(selector).forEach((item, index) => {
      const isExist = !!distincField[item];
      if (isExist) duplicateRow.push(index);

      distincField[item] = '1';
    });

    return [duplicateRow.length === 0, duplicateRow];
  }

  /**
   * Check if a value does not exist in a data source array.
   * @param {Array} dataSource - The array to check for the value.
   * @param {*} value - The value to check for existence in the data source.
   * @returns {[boolean, string]} A tuple where the first element is a boolean indicating whether the value does not exist
   * in the data source, and the second element is an error message if the value exists.
   */
  const isNotExistValue = (dataSource = [], value) => {
    const isNotExist = !dataSource.includes(value);
    return [isNotExist, isNotExist ? t('validation.invalid-value') : ''];
  }

  const apiSettingValidations = Object.freeze({
    name: [isRequired],
    priority: [isRequired, isNumber],
    endpoint: [isValidUrl],
    method: [isValidHttpMethod],
    color: [isValidColor],
    request: [isValidJson],
    mode: [isRequired, (value) => isNotExistValue(Object.values(ApiSettingMode), value)],
  });
  const envSettingValidations = Object.freeze({
    id: [isRequired],
    value: [isRequired],
  });
  const variableSettingValidations = Object.freeze({
    name: [isValidEnvName],
    value: [isRequired],
  });
  return {
    isRequired,
    isValidUrl,
    isValidHttpMethod,
    isValidColor,
    isValidJson,
    isValidEnvName,
    /**
     * Validate a form data object against a set of validations.
     * @param {Object} formData Form input data to validate
     * @param {*} options Validation rules for each field in the form data
     * @returns {ValidateFormResult} Validation result.
     */
    validate(formData, options = {}) {
      const errors = Object.entries(formData)
        .map(([key, value]) => {
          const errorMessage = options[key]
            ?.map(callback => callback(value)[1])
            .filter(message => message && message !== '')
            .join(', ') || '';
          return { field: key, message: errorMessage };
        })
        .filter(error => error.message !== '');
      const isError = errors.length > 0;
      return [isError, errors];
    },
    /**
     * Validate a list of items against a set of validations.
     * @param {Object} formData Form input data, an array of items to validate
     * @param {Object} validations Validation rules for each item in the list
     * @returns {[boolean, { itemIndex: number, isError: boolean, errors: ErrorInfo[] }[]]} Validation result.
     */
    validateList(formData = [], validations) {
      const errors = formData
        .map((item, index) => {
          const [isError, errorMessage] = this.validate(item, validations);
          return {
            itemIndex: index,
            isError,
            errors: errorMessage.map(err => ({ field: err.field, message: err.message }))
          };
        })
        .flat()
        .filter(error => error.isError);
      const hasError = errors.length > 0;
      return [hasError, errors];
    },
    /**
     * Validate an API setting object against the default validation rules.
     * @param {ApiSetting} formData Form input data to validate
     * @returns {ValidateFormResult} Validation result.
     */
    validateApiSetting(formData) {
      return this.validate(formData, apiSettingValidations);
    },
    /**
     * Validate a single field of an API setting against the default validation rules.
     * @param {string} name The name of the field to validate
     * @param {*} value The value of the field to validate
     * @returns {string} The concatenated error messages if the field is invalid, or an empty string if it is valid.
     */
    validateApiSettingItem(name, value) {
      const result = apiSettingValidations[name]
        ?.map((callback) => callback(value)[1])
        .filter(error => error && error !== '')
        .join(', ');
      return result || '';
    },
    /**
     * Validate a list of environment variable settings against the default validation rules.
     * @param {EnvVariableItem[]} formData Form input data, an array of environment variable settings to validate
     * @returns {[boolean, { itemIndex: number, isError: boolean, errors: ErrorInfo[] }[]]} Validation result.
     */
    validateVariableSetting(formData) {
      const [isValid, duplicateRows] = isDuplicateValue(formData, item => item.name);
      if (!isValid) return [
        true,
        duplicateRows.map(row => ({ itemIndex: row, isError: true, errors: [{ field: 'name', message: t('validation.duplicate-field') }] }))];

      return this.validateList(formData, variableSettingValidations);
    },
    /**
     * Validate a single field of an environment variable setting against the default validation rules.
     * @param {string} name The name of the field to validate
     * @param {*} value The value of the field to validate
     * @returns {string} The concatenated error messages if the field is invalid, or an empty string if it is valid.
     */
    validateVariableSettingItem(name, value) {
      const result = variableSettingValidations[name]
        ?.map((callback) => callback(value)[1])
        .filter(error => error && error !== '')
        .join(', ');
      return result;
    },
    /**
     * Validate a list of environment settings against the default validation rules.
     * @param {EnvSetting[]} formData Form input data, an array of environment settings to validate
     * @returns {[boolean, { itemIndex: number, isError: boolean, errors: ErrorInfo[] }[]]} Validation result.
     * The first element of the array is a boolean value indicating whether the form is valid or not.
     * The second element of the array is an array of objects, each object contains the following properties:
     * - `itemIndex`: The index of the form item that has an error.
     * - `isError`: A boolean value indicating whether the form item has an error or not.
     * - `errors`: An array of objects, each object contains the following properties:
     * - `field`: The name of the field that has an error.
     * - `message`: The error message of the field.
     */
    validateEnvSetting(formData) {
      const [isValid, duplicateRows] = isDuplicateValue(formData, item => item.value);
      if (!isValid)
        return [
          true,
          duplicateRows.map(row => ({ itemIndex: row, isError: true, errors: [{ field: 'value', message: t('validation.duplicate-field') }] }))];

      return this.validateList(formData, envSettingValidations);
    },
    /**
     * Validate a single field of an environment setting against the default validation rules.
     * @param {string} name The name of the field to validate
     * @param {*} value The value of the field to validate
     * @returns {string} The concatenated error messages if the field is invalid, or an empty string if it is valid.
     */
    validateEnvSettingItem(name, value) {
      const result = envSettingValidations[name]
        ?.map((callback) => callback(value)[1])
        .filter(error => error && error !== '')
        .join(', ');
      return result;
    },
  }
})();
