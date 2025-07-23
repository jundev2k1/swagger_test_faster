// =============================================
// File: uiBuilder.js
// Description: Contains functions for building the UI for the application
// Copyright (c) 2025. Jun Dev
// ============================================

import { DefaultUI, EnvDropdownItems, EnvSettingForm, EnvVariableForm, ApiSettingForm, ModalApiListItem, TabSettings } from "../components/index.js";
import { actionMode, ColorEnums, HttpMethods, MethodColors } from "../data/constants.js";
import { t } from "../i18n/translate.js";
import { tryGetUrlPath } from "../utils/helpers.js";

export class UIBuilder {
  static createDefaultUI() {
    return DefaultUI();
  }

  static getHeaderModal(action = actionMode.LOBBY) {
    const headers = Object.freeze({
      [actionMode.API_LIST]: t('modal.header.api-list'),
      [actionMode.API_SETTING]: t('modal.header.api-setting'),
      [actionMode.ENVIRONMENT_SETTINGS]: t('modal.header.env-setting'),
      [actionMode.ENVIRONMENT_VARIABLES]: t('modal.header.env-variable'),
    });
    return headers[action] || t('modal.header.default');
  }

  static createApiActionGroupItems = (datasource = []) => {
    return datasource.map(({ id, name, method, endpoint, color }) => `
      <li class="api-action-group-item bg-${color} bg-${color}-hover">
        <a href="javascript:void" class="btn-control api-action-control" data-api-id="${id}">
          <span class="api-method badge ${MethodColors[method] || MethodColors[HttpMethods.GET]}">${method}</span>
          ${name}
        </a>
        <p class="font-sm m-0 p-3 pt-0 truncate" title="${endpoint}">${t('modal.api-list-item.endpoint-to')}: ${tryGetUrlPath(endpoint)}</p>
      </li>
    `).join('') || '';
  }

  static createEnvDropdownItems(dataSource = []) {
    return EnvDropdownItems(dataSource);
  }

  static createTabModalTabs(action = actionMode.LOBBY) {
    return TabSettings(action);
  }

  static createModalContentContainer(action = actionMode.LOBBY, innerHTML = '') {
    switch (action) {
      case actionMode.API_LIST:
        return `
          <div id="api-list-layout">
            <ul class="api-list">${innerHTML}</ul>
            <button class="btn-control light" id="btn-add-new-api">${t('modal.api-list.add-new')}</button>
          </div>
        `;

      case actionMode.API_SETTING:
        return `<div id="api-setting-layout">${innerHTML}</div>`;

      case actionMode.ENVIRONMENT_SETTINGS:
        return `<div id="enviroment-setting-layout">${innerHTML}</div>`;

      case actionMode.ENVIRONMENT_VARIABLES:
        return `<div id="enviroment-setting-layout">${innerHTML}</div>`;

      // Clear content
      default:
        return '';
    }
  }

}
