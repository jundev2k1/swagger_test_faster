/**
 * =============================
 * File: ModalContainnerContent.js
 * Type UI: Modal UI
 * Description: Render Modal containner content
 * Copyright (c) 2025. Jun Dev
 * ============================= 
 */

import { t } from '../../i18n/translate.js';
import { actionMode } from '../../data/constants.js';
import { default as ModalApiListItem } from './ModalApiListItem.js';
import { default as ModalApiSettingForm } from '../form/ApiSettingForm.js';
import { default as ModalEnvSettingForm } from '../form/EnvSettingForm.js';
import { default as ModalEnvVariableForm } from '../form/EnvVariableForm.js';


/**
 * Render Modal containner content
 * @param {actionMode} [action] Current action for the modal
 * @param {object} [dataSource] Data source for the modal
 * @param {string} [selectedEnv] Selected environment
 * @returns {string} HTML content of the modal containner
 */
const ModalContainnerContent = (action = actionMode.LOBBY, dataSource, selectedEnv) => {
  switch (action) {
    /**
     * Render API list for the modal containner
     * @param {object[]} [dataSource] Data source for the API list
     * @returns {string} HTML content of the API list
     */
    case actionMode.API_LIST:
      return ModalApiListItem(dataSource) || `<div class="empty-state">${t('modal.api-list.empty')}</div>`;

    /**
     * Render API setting form for the modal containner
     * @param {object} [dataSource] Data source for the API setting form
     * @returns {string} HTML content of the API setting form
     */
    case actionMode.API_SETTING:
      return ModalApiSettingForm(dataSource);

    /**
     * Render Environment setting form for the modal containner
     * @param {object} [dataSource] Data source for the Environment setting form
     * @returns {string} HTML content of the Environment setting form
     */
    case actionMode.ENVIRONMENT_SETTINGS:
      return ModalEnvSettingForm(dataSource);

    /**
     * Render Environment variable form for the modal containner
     * @param {object} [dataSource] Data source for the Environment variable form
     * @param {string} [selectedEnv] Selected environment
     * @returns {string} HTML content of the Environment variable form
     */
    case actionMode.ENVIRONMENT_VARIABLES:
      return ModalEnvVariableForm({ selectedEnv, variables: dataSource });

    default:
      return '';
  }
}

export default ModalContainnerContent;
