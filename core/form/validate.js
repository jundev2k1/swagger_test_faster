/**
 * ===============================================
 * File: Form Validator (validate.js)
 * Description: Contains validators for form inputs
 * Copyright (c) 2025. Jun Dev
 * ===============================================
 */

/**
 * Validator for form inputs and settings.
 */
export const validator = (() => {
  /**
   * Validate if a value is required (not empty or null).
   * @param {string | null} value Value to validate
   * @returns {[boolean, string]} Validation result.
   */
  const isRequired = (value) => {
    const isValid = value && value.trim() !== '';
    return [isValid, isValid ? '' : t('validation.required')];
  }

  /**
   * Validate if a value is a valid URL.
   * @param {string} value URL value to validate
   * @returns {[boolean, string]} Validation result.
   */
  const isValidUrl = (value) => {
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
   * @returns {[boolean, string]} Validation result.
   */
  const isValidHttpMethod = (value) => {
    const isValid = Object.values(httpMethods).includes(value);
    return [isValid, isValid ? '' : t('validation.invalid-http-method')];
  }

  /**
   * Validate if a value is a valid color enum.
   * @param {string} value Color value to validate
   * @returns {[boolean, string]} Validation result.
   */
  const isValidColor = (value) => {
    const isValid = Object.values(colorEnums).includes(value);
    return [isValid, isValid ? '' : t('validation.invalid-color')];
  }

  /**
   * Validate if a value is a valid JSON string.
   * @param {string} value JSON string to validate
   * @returns {[boolean, string]} Validation result.
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
   * @returns {[boolean, string]} Validation result.
   */
  const isValidEnvName = (value) => {
    const isValid = value && value.trim() !== '' && /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(value);
    return [isValid, isValid ? '' : t('validation.invalid-env-name')];
  }

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

  const apiSettingValidations = Object.freeze({
    name: [isRequired],
    endpoint: [isRequired, isValidUrl],
    method: [isValidHttpMethod],
    color: [isValidColor],
    request: [isValidJson],
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
     * @returns {[boolean, { field: string, message: string }[]]} Validation result.
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
     * @returns {[boolean, { itemIndex: number, isError: boolean, errors: { field: string, message: string }[] }[]]} Validation result.
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
    validateApiSetting(formData) {
      return this.validate(formData, apiSettingValidations);
    },
    validateApiSettingItem(name, value) {
      const result = apiSettingValidations[name]
        ?.map((callback) => callback(value)[1])
        .filter(error => error && error !== '')
        .join(', ');
      return result;
    },
    validateVariableSetting(formData) {
      const [isValid, duplicateRows] = isDuplicateValue(formData, item => item.name);
      if (!isValid) return [
        true,
        duplicateRows.map(row => ({ itemIndex: row, isError: true, errors: [{ field: 'name', message: t('validation.duplicate-field') }] }))];

      return this.validateList(formData, variableSettingValidations);
    },
    validateVariableSettingItem(name, value) {
      const result = variableSettingValidations[name]
        ?.map((callback) => callback(value)[1])
        .filter(error => error && error !== '')
        .join(', ');
      return result;
    },
    validateEnvSetting(formData) {
      const [isValid, duplicateRows] = isDuplicateValue(formData, item => item.value);
      if (!isValid)
        return [
          true,
          duplicateRows.map(row => ({ itemIndex: row, isError: true, errors: [{ field: 'value', message: t('validation.duplicate-field') }] }))];

      return this.validateList(formData, envSettingValidations);
    },
    validateEnvSettingItem(name, value) {
      const result = envSettingValidations[name]
        ?.map((callback) => callback(value)[1])
        .filter(error => error && error !== '')
        .join(', ');
      return result;
    },
  }
})();
