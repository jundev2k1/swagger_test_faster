// ================================================
// File: type.js
// Description: Contains functions for type checking
// Copyright (c) 2025. Jun Dev
// ================================================


// ============ Store type ====================
/**
 * @typedef {Object} StoreKeys
 * @property {string} envSettingKey - The key of the environment settings.
 * @property {string} envVariableKey - The key of the environment variables.
 * @property {string} apiSettingsKey - The key of the API settings.
 * @property {string} currentEnvKey - The key of the current environment.
 * @property {string} currentLangKey - The key of the current language.
 */

// ============ Form data type ====================

/**
 * @typedef {Object} ApiSetting
 * @property {string} id - The ID of the API.
 * @property {string} name - The name of the API.
 * @property {number} priority - The priority of the API.
 * @property {string} desc - The description of the API.
 * @property {string} method - The HTTP method of the API.
 * @property {string} color - The color of the API.
 * @property {string} endpoint - The endpoint of the API.
 * @property {string} request - The request of the API.
 * @property {boolean} isAuth - Whether the API is authenticated or not.
 * @property {string} mode - The mode of the API.
 * @property {string} refTo - The ID of the API to reference.
 * @property {number} callAfter - The delay time before calling the API.
 * @property {string} successEvent - The event to execute when the API is successful.
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
 * @typedef { Object } ActionMode
 * @property {'lobby'} LOBBY Lobby page
 * @property {'api_list'} API_LIST Modal: API list page
 * @property {'api_setting'} API_SETTING Modal: API setting page
 * @property {'environment_settings'} ENVIRONMENT_SETTINGS Modal: Environment settings page
 * @property {'environment_variables'} ENVIRONMENT_VARIABLES Modal: Environment variables page
 *
 * - Modal tabs for the application.
 * @typedef { Object } ModalTab
 * @property {'api'} API modalTab
 * @property {'environment'} ENVIRONMENT modalTab
 *
 * - HTTP methods for the application.
 * @typedef { Object } HttpMethod
 * @property {'GET'} GET
 * @property {'POST'} POST
 * @property {'PUT'} PUT
 * @property {'PATCH'} PATCH
 * @property {'DELETE'} DELETE
 * @property {'OPTIONS'} OPTIONS
 * @property {'HEAD'} HEAD
 *
 * - Color options for Api actions, used in dropdowns or UI elements.
 * @typedef { Object } ColorEnum
 * @property {'primary'} PRIMARY Primary color
 * @property {'secondary'} SECONDARY Secondary color
 * @property {'success'} SUCCESS Success color
 * @property {'danger'} DANGER Danger color
 * @property {'warning'} WARNING Warning color
 * @property {'info'} INFO Info color
 *
 * - Color options for Api actions, used in dropdowns or UI elements.
 * @typedef { Object } ColorOption
 * @property { ColorEnum } value ColorEnum (Primary, Secondary, Success, Danger, Warning, Info)
 * @property { string } translateKey Key of the translation
 * 
 * - API setting modes
 * @typedef { Object } ApiSettingMode
 * @property {'api'} API
 * @property {'hub'} HUB
 * @property {'hub_method'} HUB_METHOD
 */

// ============ Page data type ====================

/**
 * @typedef {Object} ApiFilter
 * @property {string} search - The search keyword.
 * @property {string} mode - The mode of the API.
 * @property {string} method - The HTTP method of the API.
 * @property {string} sort - The field to order by.
 * @property {string} sortDirection - The direction to order by.
 */

/**
 * @typedef {[isError: boolean, message: string]} ValidateFieldResult
 * @property { boolean } isError - Whether the form is valid or not.
 * @property { string } message - The error message.
 *
 */

/**
 * @typedef { Object } ErrorInfo
 * @property { string } field - The field name.
 * @property { string } message - The error message.
 */

/**
 * @typedef {[isError: boolean, errors: ErrorInfo[]]} ValidateFormResult
 * @property { boolean } isError - Whether the form is valid or not.
 * @property { ErrorInfo[] } errors - The list of errors.
 */
