/**
 * ============================================
 * File: App Constants (constants.js)
 * Description: Contains constants used in the application
 * Copyright (c) 2025. Jun Dev
 * ============================================
 */

/** Store keys for the application. */
export const storeKeys = Object.freeze({
  envSettingKey: 'juntool-enviroment-settings',
  envVariableKey: 'juntool-enviroment-variables',
  apiSettingsKey: 'juntool-api-settings',
  currentEnvKey: 'juntool-env',
  currentLangKey: 'juntool-lang',
});

/** @type {ModalTab} Modal tabs for the application. */
export const modalTabs = Object.freeze({
  API: 'api',
  ENVIRONMENT: 'environment',
});

/** @type {ActionMode} Action modes for the application. */
export const actionMode = Object.freeze({
  LOBBY: "lobby",
  API_LIST: "api_list",
  API_SETTING: "api_setting",
  ENVIRONMENT_SETTINGS: "environment_settings",
  ENVIRONMENT_VARIABLES: "environment_variables",
});

/** @type {HttpMethod} HTTP methods used in API requests. */
export const httpMethods = Object.freeze({
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  PATCH: "PATCH",
  DELETE: "DELETE",
  HEAD: "HEAD",
  OPTIONS: "OPTIONS",
});

/** @type {ColorEnum} Color enums and options for Api actions. */
export const colorEnums = Object.freeze({
  Primary: 'primary',
  Secondary: 'secondary',
  Success: 'success',
  Danger: 'danger',
  Warning: 'warning',
  Info: 'info',
  Light: 'light',
  Dark: 'dark',
});

/** @type {Object.<HttpMethod, ColorEnum>}  Color mapping for HTTP methods, used in UI elements. */
export const methodColors = Object.freeze({
  [httpMethods.GET]: 'primary',
  [httpMethods.POST]: 'success',
  [httpMethods.PUT]: 'warning',
  [httpMethods.PATCH]: 'info',
  [httpMethods.DELETE]: 'danger',
  [httpMethods.OPTIONS]: 'secondary',
  [httpMethods.HEAD]: 'secondary',
});

/** @type {Object.<ColorEnum, Object>} Color options for Api actions, used in dropdowns or UI elements. */
export const colorOptions = Object.freeze([
  { value: colorEnums.Primary, translateKey: 'color.primary', },
  { value: colorEnums.Secondary, translateKey: 'color.secondary', },
  { value: colorEnums.Success, translateKey: 'color.success', },
  { value: colorEnums.Danger, translateKey: 'color.danger', },
  { value: colorEnums.Warning, translateKey: 'color.warning', },
  { value: colorEnums.Info, translateKey: 'color.info', },
]);
