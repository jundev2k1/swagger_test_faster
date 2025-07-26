// ============================================
// File: App Constants (constants.js)
// Description: Contains constants used in the application
// Copyright (c) 2025. Jun Dev
// ============================================

/** @type {StoreKeys} Store keys for the application. */
export const storeKeys = Object.freeze({
  envSettingKey: 'juntool-enviroment-settings',
  envVariableKey: 'juntool-enviroment-variables',
  apiSettingsKey: 'juntool-api-settings',
  currentEnvKey: 'juntool-env',
  currentLangKey: 'juntool-lang',
  sidebarStateKey: 'juntool-sidebar-state',
  apiListFilterKey: 'juntool-api-list-filter',
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
export const HttpMethods = Object.freeze({
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  PATCH: "PATCH",
  DELETE: "DELETE",
  HEAD: "HEAD",
  OPTIONS: "OPTIONS",
});

/** Color enums and options for Api actions. */
export const ColorEnums = Object.freeze({
  Primary: 'primary',
  Secondary: 'secondary',
  Success: 'success',
  Danger: 'danger',
  Warning: 'warning',
  Info: 'info',
  Light: 'light',
  Dark: 'dark',
});

/** @type {Record<HttpMethod, ColorEnum>} Color mapping for HTTP methods, used in UI elements. */
export const MethodColors = Object.freeze({
  [HttpMethods.GET]: 'primary',
  [HttpMethods.POST]: 'success',
  [HttpMethods.PUT]: 'warning',
  [HttpMethods.PATCH]: 'info',
  [HttpMethods.DELETE]: 'danger',
  [HttpMethods.OPTIONS]: 'secondary',
  [HttpMethods.HEAD]: 'secondary',
});

/** @type {ColorOption[]} Color options for Api actions, used in dropdowns or UI elements. */
export const ColorOptions = Object.freeze([
  { value: ColorEnums.Primary, translateKey: 'color.primary', },
  { value: ColorEnums.Secondary, translateKey: 'color.secondary', },
  { value: ColorEnums.Success, translateKey: 'color.success', },
  { value: ColorEnums.Danger, translateKey: 'color.danger', },
  { value: ColorEnums.Warning, translateKey: 'color.warning', },
  { value: ColorEnums.Info, translateKey: 'color.info', },
]);

/** @type {ApiSettingMode} Api setting modes */
export const ApiSettingMode = Object.freeze({
  API: 'api',
  HUB: 'hub',
  HUB_METHOD: 'hub_method',
});

/** @type {SegmentedInputOption[]} Api setting mode options */
export const ApiSettingModeOptions = Object.freeze([
  { value: ApiSettingMode.API, label: 'api.setting.mode.api', disabled: false },
  { value: ApiSettingMode.HUB, label: 'api.setting.mode.hub', disabled: false },
  { value: ApiSettingMode.HUB_METHOD, label: 'api.setting.mode.hub-method', disabled: false },
]);