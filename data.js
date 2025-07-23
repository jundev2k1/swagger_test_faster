
/** Modal tabs for the application. */
export const modalTabs = Object.freeze({
  API: 'api',
  ENVIRONMENT: 'environment',
});

/** Action modes for the application. */
export const actionMode = Object.freeze({
  LOBBY: "lobby",
  API_LIST: "api_list",
  API_SETTING: "api_setting",
  ENVIRONMENT_SETTINGS: "environment_settings",
  ENVIRONMENT_VARIABLES: "environment_variables",
});

/** HTTP methods used in API requests. */
export const httpMethods = Object.freeze({
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  PATCH: "PATCH",
  DELETE: "DELETE",
  HEAD: "HEAD",
  OPTIONS: "OPTIONS",
});

/** Color enums and options for Api actions. */
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

/** Color mapping for HTTP methods, used in UI elements. */
export const methodColors = Object.freeze({
  [httpMethods.GET]: 'primary',
  [httpMethods.POST]: 'success',
  [httpMethods.PUT]: 'warning',
  [httpMethods.PATCH]: 'info',
  [httpMethods.DELETE]: 'danger',
  [httpMethods.OPTIONS]: 'secondary',
  [httpMethods.HEAD]: 'secondary',
});

/** Color options for Api actions, used in dropdowns or UI elements. */
export const colorOptions = Object.freeze([
  { value: colorEnums.Primary, translateKey: 'color.primary', },
  { value: colorEnums.Secondary, translateKey: 'color.secondary', },
  { value: colorEnums.Success, translateKey: 'color.success', },
  { value: colorEnums.Danger, translateKey: 'color.danger', },
  { value: colorEnums.Warning, translateKey: 'color.warning', },
  { value: colorEnums.Info, translateKey: 'color.info', },
]);

export const toastType = Object.freeze({
  Success: 'success',
  Warn: 'warning',
  Error: 'error',
  Info: 'info',
});