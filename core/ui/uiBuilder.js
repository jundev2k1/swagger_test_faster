// =============================================
// File: uiBuilder.js
// Description: Contains functions for building the UI for the application
// Copyright (c) 2025. Jun Dev
// ============================================

import { t } from "../i18n/translate.js";
import { tryGetUrlPath } from "../utils/helpers.js";
import { DefaultUI, EnvDropdownItems, TabSettings, ModalContainnerContent } from "../components/index.js";
import { actionMode, HttpMethods, MethodColors } from "../data/constants.js";

export class UIBuilder {
  /**
   * Create the default UI for the application.
   * @returns {string} The HTML of the default UI.
   */
  static createDefaultUI() {
    return DefaultUI();
  }

  /**
   * Get the header text for the modal based on the current action mode.
   * @param {actionMode} [action] - The current action mode of the application.
   * @returns {string} The translated header text for the modal.
   */
  static getHeaderModal(action = actionMode.LOBBY) {
    const headers = Object.freeze({
      [actionMode.API_LIST]: t('modal.header.api-list'),
      [actionMode.API_SETTING]: t('modal.header.api-setting'),
      [actionMode.ENVIRONMENT_SETTINGS]: t('modal.header.env-setting'),
      [actionMode.ENVIRONMENT_VARIABLES]: t('modal.header.env-variable'),
    });
    return headers[action] || t('modal.header.default');
  }

  /**
   * Render API action group item list UI
   * @param {ApiSetting[]} [datasource] An array of objects that contain the information of the API action group items
   * @returns {string} The HTML of the API action group item list UI
   */
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

  /**
   * Render Environment dropdown options UI
   * @param {EnvSetting[]} [datasource] An array of objects that contain the information of the Environment dropdown options
   * @returns {string} The HTML of the Environment dropdown options UI
   */
  static createEnvDropdownItems(dataSource = []) {
    return EnvDropdownItems(dataSource);
  }

  /**
   * Render the tab setting buttons for the modal based on the current action mode
   * @param {actionMode} [action] - The current action mode of the application
   * @returns {string} The HTML of the tab setting buttons
   */
  static createTabModalTabs(action = actionMode.LOBBY) {
    return TabSettings(action);
  }

  /**
   * Render the modal containner content based on the current action mode.
   * @param {actionMode} [action] - The current action mode of the application.
   * @param {ApiSetting[] | ApiSetting | EnvSetting[] | EnvVariableItem[]} [dataSource] - Data source for the modal containner content.
   * @returns {string} The HTML of the modal containner content.
   */
  static createContainnerContent(action = actionMode.LOBBY, dataSource) {
    return ModalContainnerContent(action, dataSource);
  }

  /**
   * Render the modal content container based on the current action mode
   * @param {actionMode} [action] - The current action mode of the application
   * @param {string} [innerHTML] - The HTML content of the modal content container
   * @returns {string} The HTML of the modal content container
   */
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
