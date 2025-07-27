// =============================================
// File: uiBuilder.js
// Description: Contains functions for building the UI for the application
// Copyright (c) 2025. Jun Dev
// ============================================

import { t } from "../i18n/translate.js";
import { DefaultUI, EnvDropdownItems, TabSettings, ModalContainnerContent, ApiActionGroupItems, ModalContentContainer } from "../components/index.js";
import { actionMode } from "../data/constants.js";

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
    return ApiActionGroupItems(datasource);
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
    return ModalContentContainer(action, innerHTML);
  }
}
