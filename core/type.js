// ================================================
// File: type.js
// Description: Contains functions for type checking
// Copyright (c) 2025. Jun Dev
// ================================================


// ============ Form data type ====================

/**
 * @typedef {Object} ApiSetting
 * @property {string} id - The ID of the API.
 * @property {string} name - The name of the API.
 * @property {string} desc - The description of the API.
 * @property {string} method - The HTTP method of the API.
 * @property {string} color - The color of the API.
 * @property {string} endpoint - The endpoint of the API.
 * @property {string} request - The request of the API.
 * @property {boolean} isAuth - Whether the API is authenticated or not.
 */

/**
 * @typedef {Object} EnvSetting
 * @property {string} id - The ID of the environment.
 * @property {string} value - The name of the environment.
 */

/**
 * @typedef {Object} EnvVariable
 * @property {string} envId - The ID of the environment
 * @property {EnvVariableItem[]} items - The key of the environment variable.
 */

/**
 * @typedef {Object} EnvVariableItem
 * @property {string} id - The ID of the environment variable.
 * @property {string} name - The name of the environment variable.
 * @property {string} value - The value of the environment variable.
 * @property {boolean} isHardSetting - Whether the environment variable is hard setting or not.
 */

/**
 * @typedef {Object} AppFormData
 * @property {ActionMode} type - The list of APIs.
 * @property {EnvSetting[] | EnvVariableItem[] | ApiSetting} dataSource - The list of APIs.
 */

// ============ Page data type ====================

/**
 * - Action modes for the application.
 * @typedef { 'lobby' | 'api_list' | 'api_setting' | 'environment_settings' | 'environment_variables' } ActionMode
 * 
 * - Modal tabs for the application.
 * @typedef { 'api' | 'environment' } ModalTab
 * 
 * - Color options for Api actions, used in dropdowns or UI elements.
 * @typedef { { value: ColorEnum, translateKey: string }[] } ColorOption
 */
