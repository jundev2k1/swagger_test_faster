/**
 * =================================================
 * File: appForm.js
 * Description: Contains properties for default form data
 * Copyright (c) 2025. Jun Dev
 * =================================================
 */

import { ColorEnums, HttpMethods } from "./constants.js";
import { Store } from "./store.js";

/** The default form data */
export class DefaultFormData {
  /** @type {ApiSetting} The default api setting data */
  static get defaultApiSettingData() {
    return {
      id: '',
      name: '',
      desc: '',
      endpoint: '',
      method: HttpMethods.GET,
      color: ColorEnums.Primary,
      request: '',
      isAuth: false,
    }
  };

  /** @type {EnvSetting} The default environment setting data */
  static get defaultEnvSettingData() {
    return {
      id: crypto.randomUUID(),
      value: '',
    };
  }

  /** @type {EnvVariable} The default environment variable group data */
  static get defaultEnvVariableData() {
    return {
      envId: Store.currentEnv,
      items: [],
    }
  };

  /** @type {EnvVariableItem} The default environment variable item data */
  static get defaultEnvVariableItem() {
    return {
      id: crypto.randomUUID(),
      name: '',
      value: '',
      isHardSetting: false,
    };
  }

  /** @type {EnvVariableItem[]} The default environment variable item data list for hard settings */
  static get defaultHardEnvVariableItems() {
    return [
      { id: crypto.randomUUID(), name: 'host', value: '', isHardSetting: true },
    ];
  }
}
