/**
 * =============================================
 * File: uiBuilder.js
 * Description: Contains functions for building the UI for the application
 * Copyright (c) 2025. Jun Dev
 * ============================================
 */

import { DefaultUI } from "../components/index.js";

export class UIBuilder {
  static createDefaultUI() {
    return DefaultUI();
  }
}


/**
 * Builds the UI for the application.
 */
export const uiBuilder = (() => {
  const createDefaultUI = () => `
    <aside id="tool-sidebar">
      <div class="sidebar-header">
        <button class="btn-control badge light" id="btn-toggle-sidebar">≡</button>
        <h1>Jun's Tool</h1>
        <div class="dropdown">
          <button class="btn-control icon-badge light dropdown-toggle" id="btn-change-language">🌍</button>
          <ul class="dropdown-menu" data-target-id="btn-change-language">
            ${config.supportedLanguages.map(lang => `
              <li><a href="javascript:void" data-lang="${lang}">${translate.lang[lang]}</a></li>
            `).join('')}
          </ul>
        </div>
      </div>
      <div class="sidebar-content">
        <h3>${t('sidebar.env.title')}</h3>
        <div class="form-group">
          <select name="environment" class="form-select" control="ddl-select-environment"></select>
        </div>
  
        <h3>${t('sidebar.api.title')}</h3>
        <ul class="api-action-group overflow-scroll-y mh-50vh"></ul>
        <div class="response-result">
          <h3>
            ${t('sidebar.response.title')}
            <button class="btn-control icon-badge light" id="btn-copy-response" title="${t('sidebar.response.copy')}">📃</button>
          </h3>
          <div class="card json-viewer"></div>
        </div>
        <div class="tool-setting">
          <a href="javascript:void" id="btn-open-setting" class="btn-control secondary action-control">${t('btn.setting')}</a>
        </div>
      </div>
    </aside>
  
    <div class="modal d-none">
      <div class="modal-overlay"></div>
      <div class="modal-container">
        <div class="modal-header">
          <button id="btn-modal-back" class="btn-back d-none">⮜ ${t('btn.back')}</button>
          <h2 id="title-modal">Jun Tool Settings</h2>
        </div>
        <div class="modal-tabs"></div>
        <div class="modal-content"></div>
        <div class="modal-footer">
          <button id="btn-savechanges" type="submit">${t('btn.save-changes')}</button>
          <button id="btn-close-modal" class="close-modal" type="button">${t('btn.close')}</button>
        </div>
      </div>
    </div>

    <div id="toast-container"></div>
  `;

  const createApiActionGroupItems = (datasource = []) => {
    return datasource.map(({ id, name, method, endpoint, color }) => `
      <li class="api-action-group-item bg-${color} bg-${color}-hover">
        <a href="javascript:void" class="btn-control api-action-control" data-api-id="${id}">
          <span class="api-method badge ${methodColors[method] || methodColors[httpMethods.GET]}">${method}</span>
          ${name}
        </a>
        <p class="font-sm m-0 p-3 pt-0 truncate" title="${endpoint}">${t('modal.api-list-item.endpoint-to')}: ${tryGetUrlPath(endpoint)}</p>
      </li>
    `).join('') || '';
  }

  const createTabSettingElement = (action = actionMode.LOBBY) => {
    const isApiSetting = action === actionMode.API_SETTING
      || action === actionMode.API_LIST;
    const isEnvSetting = action === actionMode.ENVIRONMENT_SETTINGS
      || action === actionMode.ENVIRONMENT_VARIABLES;

    return `
      <button class="tab-button ${isApiSetting ? 'active' : ''}" data-modal-tab="api">
        ${t('modal.tab.api')}
      </button>
      <button class="tab-button ${isEnvSetting ? 'active' : ''}" data-modal-tab="environment">
        ${t('modal.tab.env')}
      </button>
    `;
  }

  const createModalContentContainer = (action = actionMode.LOBBY, innerHTML = '') => {
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

  const createEnvSettingForm = (settings = []) => {
    return `
      <form id="enviroment-setting-form">
        <div class="enviroment-manager mb-2">
          ${settings.map(({ id, value }, index) => `
            <div class="form-group grid-6 gap-1" data-target-id="${id}">
              <label for="tb-env-${index}" class="form-label span-2">${t('modal.env-setting.name')}:</label>
              <div class="form-control span-3">
                <input id="tb-env-${index}" type="text" class="form-input" data-action="input" value="${value}" required />
                <span class="error-message"></span>
              </div>
              <button type="button" class="btn-control icon-badge light" data-action="delete-environment" title="${t('tooltip.delete')}">🗑️</button>
            </div>
          `).join('')}
          <a href="javascript:void" id="btn-add-new-env" class="btn-control light">${t('btn.add-new')}</a>
        </div>
      </form>
    `;
  }

  const createEnvDropdownItems = (datasource = [], selectedValue = '') => {
    const defaultOption = `
      <option value="" disabled ${!datasource || datasource.length == 0 ? 'selected' : ''}>
        ${t('ddl.select-environment')}
      </option>`;
    const options = datasource.map(({ id, value }) => `
      <option value="${id}" ${id === selectedValue ? 'selected' : ''}>
        ${value}
      </option>
    `);
    const btnAddNew = `
      <option value="add-new" command="add-new-env">
        ${t('btn.add-new') + '...'}
      </option>
    `;
    return [defaultOption, ...options, btnAddNew].join('');
  }

  const createEnvVariableForm = ({ selectedEnv = '', variables = [] }) => {
    const hardSettings = variables.filter(item => item.isHardSetting);
    const hostSetting = hardSettings.find(item => item.name === 'host')?.value || '';
    const softSettings = variables.filter(item => !item.isHardSetting);
    return `
      <form id="enviroment-variable-form">
        <div class="form-group grid-3 mb-2">
          <label for="ddl-select-environment" class="form-label">${t('sidebar.env.title')}:</label>
          <select id="ddl-select-environment" class="form-select span-2" control="ddl-select-environment" required>
          </select>
        </div>
        <h3>${t('modal.title.env-var')}</h3>
        <div class="list-wrapper" data-env-type="hard-setting">
          <div class="form-group grid-3 gap-1">
            <label for="tb-env-host" class="form-label">${t('modal.env-var.hard-setting.host')}:</label>
            <div class="form-control span-2">
              <input id="tb-env-host" name="host" class="form-input" value="${escapeHTML(hostSetting)}" data-env-input-type="value" required ${!selectedEnv ? 'disabled' : ''}>
              <span class="error-message"></span>
            </div>
          </div>
        </div>
        <h3>${t('modal.title.your-env-var')}</h3>
        <div class="list-wrapper mb-2" data-env-type="soft-setting">
          ${!selectedEnv ? '' : softSettings.map(({ id, name, value }) => `
              <div class="form-group grid-6 gap-1" data-target-id="${id}">
                <div class="form-control span-2">
                  <input class="form-input" data-env-input-type="name" value="${name}" required>
                  <span class="error-message"></span>
                </div>
                <div class="form-control span-3">
                  <input class="form-input" data-env-input-type="value" value="${escapeHTML(value)}" required>
                  <span class="error-message"></span>
                </div>
                <button class="btn-control icon-badge light" data-action="delete-variable" title="${t('tooltip.delete')}">🗑️</button>
              </div>
            `).join('')}
          ${selectedEnv ? `<a href="javascript:void" id="btn-add-new-var" class="btn-control light">${t('btn.add-new')}</a>` : ''}
        </div>
      </form>
    `;
  }

  const createApiSettingForm = ({ name, desc, method, endpoint, request, color, isAuth }) => {
    return `
      <form id="api-setting-form">
        <div class="form-group">
          <label for="api-name" class="form-label">${t('modal.api-setting.name')}</label>
          <div class="form-control">
            <input id="api-name" name="name" class="form-input" value="${name || ''}" data-action="form-input" required />
            <div class="error-message"></div>
          </div>
        </div>
        <div class="form-group">
          <label for="api-description" class="form-label">${t('modal.api-setting.desc')}</label>
          <textarea class="resize-none" id="api-description" name="desc" data-action="form-input">${escapeHTML(desc || '')}</textarea>
        </div>
        <div class="grid grid-2">
          <div class="form-group">
            <label for="api-setting-method" class="form-label">${t('modal.api-setting.http-method')}</label>
            <select class="form-select" id="api-setting-method" name="method" data-action="form-input">
              ${Object.entries(httpMethods).map(([key, val]) => `
                <option value="${val}" ${method === val ? 'selected' : ''}>
                  ${key}
                </option>
              `).join('')}
            </select>
          </div>
          <div class="form-group">
            <label for="api-setting-color" class="form-label">${t('modal.api-setting.color')}</label>
            <select class="form-select" id="api-setting-color" name="color" data-action="form-input">
              ${Object.entries(colorEnums).map(([key, val]) => `
                <option value="${val}" ${color === val ? 'selected' : ''}>
                  ${t(`color.${val}`, key)}
                </option>
              `).join('')}
            </select>
          </div>
        </div>
        <div class="form-group">
          <label for="api-setting-endpoint" class="form-label">${t('modal.api-setting.endpoint')}</label>
          <div class="form-control">
            <input id="api-setting-endpoint" name="endpoint" class="form-input" value="${escapeHTML(endpoint || '')}" data-action="form-input" required />
            <span class="error-message"></span>
          </div>
        </div>
        <div class="form-group">
          <label for="api-setting-request" class="form-label">${t('modal.api-setting.request')}</label>
          <div class="form-control">
            <textarea id="api-setting-request" name="request" class="resize-none" data-action="form-input" required>${escapeHTML(request || '')}</textarea>
            <span class="error-message"></span>
          </div>
        </div>
        <div class="form-group">
          <input type="checkbox" id="api-setting-is-auth" class="form-checkbox" name="isAuth" ${isAuth ? 'checked' : ''} data-action="form-input" />
          <label for="api-setting-is-auth">${t('modal.api-setting.is-auth-api')}</label>
        </div>
      </form>
    `;
  }

  const createApiListItem = (datasource = []) => {
    return datasource.map(({ id, name, method, endpoint, color, desc }) => `
      <li class="api-list-item bg-${color || 'primary'} bg-${color || 'primary'}-hover">
        <div class="api-setting-content">
          <a href="javascript:void" data-api-id="${id}">
            <span class="api-method badge ${methodColors[method] || methodColors[httpMethods.GET]}">${method}</span>
            <span class="api-item-title">${name}</span>
          </a>
          <p class="api-item-endpoint truncate" title=${endpoint}>${t('modal.api-list-item.endpoint-to')}: ${tryGetUrlPath(endpoint)}</p>
          <span class="api-item-desc">
            ${desc || ''}
          </span>
        </div>
        <button class="btn-control icon-badge info font-xs" data-action="copy-insert-api" title="${t('tooltip.copy-insert')}">💾</button>
        <button class="btn-control icon-badge dark font-xs" data-action="delete-api" title="${t('tooltip.delete')}">🗑️</button>
      </li>
    `).join('') || '';
  };

  const createContainnerContent = (action = actionMode.LOBBY, dataSource, selectedEnv) => {
    switch (action) {
      case actionMode.API_LIST:
        return createApiListItem(dataSource) || `<div class="empty-state">${t('modal.api-list.empty')}</div>`;

      case actionMode.API_SETTING:
        return createApiSettingForm(dataSource);

      case actionMode.ENVIRONMENT_SETTINGS:
        return createEnvSettingForm(dataSource);

      case actionMode.ENVIRONMENT_VARIABLES:
        return createEnvVariableForm({ selectedEnv, variables: dataSource });

      default:
        return '';
    }
  }

  const getHeaderModal = (action = actionMode.LOBBY) => {
    const headers = Object.freeze({
      [actionMode.API_LIST]: t('modal.header.api-list'),
      [actionMode.API_SETTING]: t('modal.header.api-setting'),
      [actionMode.ENVIRONMENT_SETTINGS]: t('modal.header.env-setting'),
      [actionMode.ENVIRONMENT_VARIABLES]: t('modal.header.env-variable'),
    });
    return headers[action] || t('modal.header.default');
  }

  return {
    createDefaultUI,
    createApiActionGroupItems,
    getHeaderModal,
    createTabSettingElement,
    createModalContentContainer,
    createEnvDropdownItems,
    createApiListItem,
    createEnvSettingForm,
    createEnvVariableForm,
    createApiSettingForm,
    createContainnerContent,
  };
})();
