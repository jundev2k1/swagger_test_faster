// ===============================================
// File: store.js
// Description: Store for the application
// Copyright (c) 2025. Jun Dev
// ===============================================

import { tryParseJSON } from "../utils/helpers.js";
import { storeKeys } from "./constants.js";

/** Store for the application. */
export class Store {
  /** @type {string} Current environment */
  static get currentLang() { return localStorage.getItem(storeKeys.currentLangKey) || config.defaultLang; }
  static set currentLang(value) { localStorage.setItem(storeKeys.currentLangKey, value); }

  /** @type {string} Selected environment */
  static get currentEnv() {
    const value = localStorage.getItem(storeKeys.currentEnvKey);
    if (!value && this.envSettings.length > 0) {
      this.currentEnv = this.envSettings[0].id;
      return this.envSettings[0].id;
    }
    return localStorage.getItem(storeKeys.currentEnvKey) || '';
  }
  static set currentEnv(value) { localStorage.setItem(storeKeys.currentEnvKey, value); }

  /** @type {EnvSetting[]} Your enviroment settings */
  static get envSettings() { return tryParseJSON(localStorage.getItem(storeKeys.envSettingKey), []); }
  static set envSettings(value) { localStorage.setItem(storeKeys.envSettingKey, JSON.stringify(value)); }

  /** @type {EnvVariable[]} Your enviroment variables */
  static get envVariables() { return tryParseJSON(localStorage.getItem(storeKeys.envVariableKey), []); }
  static set envVariables(value) { localStorage.setItem(storeKeys.envVariableKey, JSON.stringify(value)); }

  /**  @type {ApiSetting[]} Your api setting */
  static get apiSettings() { return tryParseJSON(localStorage.getItem(storeKeys.apiSettingsKey), []); }
  static set apiSettings(value) { localStorage.setItem(storeKeys.apiSettingsKey, JSON.stringify(value)); }

  /** @type {Array<[variableKey: string, value: string]>} Environment variables to replace in API requests */
  static get envReplacer() {
    return this.envVariables.find(env => env.envId === Store.currentEnv)?.items.map(env => [env.name, env.value]) || [];
  };
}
