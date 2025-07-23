import { translate, t, defaultLang, supportedLanguages } from './translate.js';
import { httpMethods, colorEnums, actionMode, modalTabs, toastType, methodColors } from './data.js';

/**
 * Get the first element that matches the selector.
 * @param {string} selector DOM Selector 
 * @returns {Element|null} The first element that matches the selector or null if no elements match.
 */
function $(selector = '') {
  return document.querySelector(selector);
}

/**
 * Get all elements that match the selector.
 * @param {string} selector DOM Selector
 * @returns {NodeList} A NodeList of elements that match the selector.
 */
function $$(selector = '') {
  return document.querySelectorAll(selector) || [];
}

/**
 * Try to parse a JSON string and return the parsed object.
 * @param {string} jsonString JSON string to parse 
 * @returns {Object|null} The parsed object if successful, or null if parsing fails.
 */
function tryParseJSON(jsonString, defaultValue = null) {
  try {
    return JSON.parse(jsonString) || defaultValue;
  } catch (e) {
    console.error("Error parsing JSON:", e);
    return defaultValue;
  }
}

function escapeHTML(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function tryGetUrlPath(url = '') {
  try {
    const result = new URL(url).pathname;
    return result;
  } catch {
    return url;
  }
}

class Toast {
  get container() {
    return $('#jun-tool #toast-container');
  }

  /**
   * Show toast
   * @param {toastType} type Toast type
   * @param {string} message Message
   * @param {number} duration Duration
   */
  show(type, message, duration) {
    const toast = document.createElement('div');
    toast.className = `jun-toast ${type}`;
    toast.textContent = message;

    toast.style.setProperty('--hide-delay', `${duration}ms`);

    this.container?.appendChild(toast);
    const totalDuration = duration + 300;
    setTimeout(() => {
      toast.remove();
    }, totalDuration + 100);
  }

  static success(message, duration = 3000) {
    new Toast().show(toastType.Success, message, duration);
  }

  static warning(message, duration = 3000) {
    new Toast().show(toastType.Warn, message, duration);
  }

  static error(message, duration = 3000) {
    new Toast().show(toastType.Error, message, duration);
  }

  static info(message, duration = 3000) {
    new Toast().show(toastType.Info, message, duration);
  }
}

/**
 * Validator for form inputs and settings.
 */
const validator = (() => {
  /**
   * Validate if a value is required (not empty or null).
   * @param {string | null} value Value to validate
   * @returns {[boolean, string]} Validation result.
   */
  const isRequired = (value) => {
    const isValid = value && value.trim() !== '';
    return [isValid, isValid ? '' : t('validation.required')];
  }

  /**
   * Validate if a value is a valid URL.
   * @param {string} value URL value to validate
   * @returns {[boolean, string]} Validation result.
   */
  const isValidUrl = (value) => {
    try {
      new URL(value);
      return [true, ''];
    } catch (e) {
      return [false, t('validation.invalid-url')];
    }
  }

  /**
   * Validate if a value is a valid HTTP method.
   * @param {string} value HTTP method value to validate
   * @returns {[boolean, string]} Validation result.
   */
  const isValidHttpMethod = (value) => {
    const isValid = Object.values(httpMethods).includes(value);
    return [isValid, isValid ? '' : t('validation.invalid-http-method')];
  }

  /**
   * Validate if a value is a valid color enum.
   * @param {string} value Color value to validate
   * @returns {[boolean, string]} Validation result.
   */
  const isValidColor = (value) => {
    const isValid = Object.values(colorEnums).includes(value);
    return [isValid, isValid ? '' : t('validation.invalid-color')];
  }

  /**
   * Validate if a value is a valid JSON string.
   * @param {string} value JSON string to validate
   * @returns {[boolean, string]} Validation result.
   */
  const isValidJson = (value) => {
    if (value.trim() === '') return [true, ''];
    try {
      JSON.parse(value);
      return [true, ''];
    } catch (e) {
      return [false, t('validation.invalid-json')];
    }
  }

  /**
   * Validate if a value is a valid environment name.
   * @param {string} value Environment name to validate
   * @returns {[boolean, string]} Validation result.
   */
  const isValidEnvName = (value) => {
    const isValid = value && value.trim() !== '' && /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(value);
    return [isValid, isValid ? '' : t('validation.invalid-env-name')];
  }

  const isDuplicateValue = (dataSource = [], selector) => {
    if (typeof (selector) !== 'function') throw Error('The `selector` parameter must be a function at `isDuplicateValue`.');

    const duplicateRow = [];
    const distincField = {};
    dataSource.map(selector).forEach((item, index) => {
      const isExist = !!distincField[item];
      if (isExist) duplicateRow.push(index);

      distincField[item] = '1';
    });

    return [duplicateRow.length === 0, duplicateRow];
  }

  const apiSettingValidations = Object.freeze({
    name: [isRequired],
    endpoint: [isRequired, isValidUrl],
    method: [isValidHttpMethod],
    color: [isValidColor],
    request: [isValidJson],
  });
  const envSettingValidations = Object.freeze({
    id: [isRequired],
    value: [isRequired],
  });
  const variableSettingValidations = Object.freeze({
    name: [isValidEnvName],
    value: [isRequired],
  });
  return {
    isRequired,
    isValidUrl,
    isValidHttpMethod,
    isValidColor,
    isValidJson,
    isValidEnvName,
    /**
     * Validate a form data object against a set of validations.
     * @param {Object} formData Form input data to validate
     * @param {*} options Validation rules for each field in the form data
     * @returns {[boolean, { field: string, message: string }[]]} Validation result.
     */
    validate(formData, options = {}) {
      const errors = Object.entries(formData)
        .map(([key, value]) => {
          const errorMessage = options[key]
            ?.map(callback => callback(value)[1])
            .filter(message => message && message !== '')
            .join(', ') || '';
          return { field: key, message: errorMessage };
        })
        .filter(error => error.message !== '');
      const isError = errors.length > 0;
      return [isError, errors];
    },
    /**
     * Validate a list of items against a set of validations.
     * @param {Object} formData Form input data, an array of items to validate
     * @param {Object} validations Validation rules for each item in the list
     * @returns {[boolean, { itemIndex: number, isError: boolean, errors: { field: string, message: string }[] }[]]} Validation result.
     */
    validateList(formData = [], validations) {
      const errors = formData
        .map((item, index) => {
          const [isError, errorMessage] = this.validate(item, validations);
          return {
            itemIndex: index,
            isError,
            errors: errorMessage.map(err => ({ field: err.field, message: err.message }))
          };
        })
        .flat()
        .filter(error => error.isError);
      const hasError = errors.length > 0;
      return [hasError, errors];
    },
    validateApiSetting(formData) {
      return this.validate(formData, apiSettingValidations);
    },
    validateApiSettingItem(name, value) {
      const result = apiSettingValidations[name]
        ?.map((callback) => callback(value)[1])
        .filter(error => error && error !== '')
        .join(', ');
      return result;
    },
    validateVariableSetting(formData) {
      const [isValid, duplicateRows] = isDuplicateValue(formData, item => item.name);
      if (!isValid) return [
        true,
        duplicateRows.map(row => ({ itemIndex: row, isError: true, errors: [{ field: 'name', message: t('validation.duplicate-field') }] }))];

      return this.validateList(formData, variableSettingValidations);
    },
    validateVariableSettingItem(name, value) {
      const result = variableSettingValidations[name]
        ?.map((callback) => callback(value)[1])
        .filter(error => error && error !== '')
        .join(', ');
      return result;
    },
    validateEnvSetting(formData) {
      const [isValid, duplicateRows] = isDuplicateValue(formData, item => item.value);
      if (!isValid)
        return [
          true,
          duplicateRows.map(row => ({ itemIndex: row, isError: true, errors: [{ field: 'value', message: t('validation.duplicate-field') }] }))];

      return this.validateList(formData, envSettingValidations);
    },
    validateEnvSettingItem(name, value) {
      const result = envSettingValidations[name]
        ?.map((callback) => callback(value)[1])
        .filter(error => error && error !== '')
        .join(', ');
      return result;
    },
  }
})();

function renderJSONFormattedStrict(data) {
  const container = document.createElement('div');
  container.className = 'json-viewer';

  function render(value, depth) {
    const lines = [];

    if (Array.isArray(value)) {
      lines.push(makeLine('[', depth));

      value.forEach((item, i) => {
        const childLines = render(item, depth + 1);
        const lastLine = childLines[childLines.length - 1];
        if (lastLine) {
          lastLine.appendChild(document.createTextNode(i < value.length - 1 ? ',' : ''));
        }
        lines.push(...childLines);
      });

      lines.push(makeLine(']', depth));
      return lines;
    }

    if (typeof value === 'object' && value !== null) {
      lines.push(makeLine('{', depth));

      const keys = Object.keys(value);
      keys.forEach((key, i) => {
        const line = makeLine('', depth + 1);

        const keySpan = document.createElement('span');
        keySpan.className = 'key';
        keySpan.textContent = `"${key}"`;
        line.appendChild(keySpan);
        line.appendChild(document.createTextNode(': '));

        const val = value[key];

        if (typeof val === 'object' && val !== null) {
          lines.push(line); // key line
          const childLines = render(val, depth + 1);
          const last = childLines[childLines.length - 1];
          if (last) last.appendChild(document.createTextNode(i < keys.length - 1 ? ',' : ''));
          lines.push(...childLines);
        } else {
          const valSpan = document.createElement('span');
          valSpan.className = 'value ' + getTypeClass(val);
          valSpan.textContent = formatValue(val);
          valSpan.title = valSpan.textContent;
          valSpan.classList.add('copyable');
          line.appendChild(valSpan);
          line.appendChild(document.createTextNode(i < keys.length - 1 ? ',' : ''));
          lines.push(line);
        }
      });

      lines.push(makeLine('}', depth));
      return lines;
    }

    // Primitive value (string, number, etc.)
    const valLine = makeLine('', depth);
    const valSpan = document.createElement('span');
    valSpan.className = 'value ' + getTypeClass(value);
    valSpan.textContent = formatValue(value);
    valSpan.title = valSpan.textContent;
    valSpan.classList.add('copyable');
    valLine.appendChild(valSpan);
    return [valLine];
  }

  function makeLine(text, depth) {
    const div = document.createElement('div');
    div.style.paddingLeft = depth * 16 + 'px';
    if (text) div.textContent = text;
    return div;
  }

  function formatValue(val) {
    if (val === null) return 'null';
    if (typeof val === 'string') return `"${val}"`;
    if (typeof val === 'boolean') return val ? 'true' : 'false';
    return String(val);
  }

  function getTypeClass(val) {
    if (val === null) return 'null';
    switch (typeof val) {
      case 'string': return 'string';
      case 'number': return 'number';
      case 'boolean': return 'boolean';
      default: return '';
    }
  }

  // Render and attach all lines
  const allLines = render(data, 0);
  allLines.forEach(line => container.appendChild(line));
  return container;
}

/**
 * Builds the UI for the application.
 */
const uiBuilder = (() => {
  const createDefaultUI = () => `
    <aside id="tool-sidebar">
      <div class="sidebar-header">
        <button class="btn-control badge light" id="btn-toggle-sidebar">≡</button>
        <h1>Jun's Tool</h1>
        <div class="dropdown">
          <button class="btn-control icon-badge light dropdown-toggle" id="btn-change-language">🌍</button>
          <ul class="dropdown-menu" data-target-id="btn-change-language">
            ${supportedLanguages.map(lang => `
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

class SwaggerFaster {
  // ================================================
  // Local variable
  // ================================================
  #envSettingKey = 'juntool-enviroment-settings';
  #envVariableKey = 'juntool-enviroment-variables';
  #apiSettingsKey = 'juntool-api-settings';
  #currentEnvKey = 'juntool-env';
  #currentLangKey = 'juntool-lang';

  #modalFormIds = Object.freeze({
    [actionMode.API_SETTING]: 'api-setting-form',
    [actionMode.ENVIRONMENT_SETTINGS]: 'enviroment-setting-form',
    [actionMode.ENVIRONMENT_VARIABLES]: 'enviroment-variable-form',
  });

  get #defaultApiSettingData() {
    return {
      id: this.targetId,
      name: '',
      desc: '',
      endpoint: '',
      method: httpMethods.GET,
      color: colorEnums.Primary,
      request: '',
      isAuth: false,
    }
  };
  get #defaultEnvSettingData() {
    return {
      id: crypto.randomUUID(),
      value: '',
    };
  }
  get #defaultEnvVariableData() {
    return {
      envId: this.currentEnv,
      items: [],
    }
  };
  get #defaultEnvVariableItem() {
    return {
      id: crypto.randomUUID(),
      name: '',
      value: '',
      isHardSetting: false,
    };
  }
  get #defaultHardEnvVariableItems() {
    return [
      { id: crypto.randomUUID(), name: 'host', value: '', isHardSetting: true },
    ];
  }
  /** @type {Array<[string, string]>} Environment variables to replace in API requests */
  get #envReplacer() {
    return this.envVariables
      .find(env => env.envId === this.currentEnv)
      ?.items
      .map(env => [env.name, env.value]) || [];
  };

  // ================================================
  // Class constructor
  // ================================================
  constructor() {
    /** Dynamic data, used when handling form
     *  @type {{ type: string, dataSource: any }} */
    this.formData = { type: '', dataSource: {} };
    /** @type {actionMode} Current action mode */
    this.currentAction = actionMode.LOBBY;
    /** @type {string|null} Target API ID */
    this.targetId = null;
    /** @type {boolean} Page change state */
    this.isPageDataChange = false;
    this.timeoutId = null;
    this.apiResponse = null;
    /** @type {string} Pre-authentication token, used to store the token before login */
    this.preAuthToken = '';
    /** @type {string} Pre-session key, used to store the session key before login */
    this.preSessionKey = '';
    this.isFetching = false;
  }

  /** Your enviroment settings 
   *  @type {{ id: string, name: string }[]} */
  get envSettings() { return tryParseJSON(localStorage.getItem(this.#envSettingKey), []); }
  set envSettings(value) { localStorage.setItem(this.#envSettingKey, JSON.stringify(value)); }
  /** Your enviroment variables
   *  @type {{ envId: string, items: { id: string,name: string, value: string }[] }[]} */
  get envVariables() { return tryParseJSON(localStorage.getItem(this.#envVariableKey), []); }
  set envVariables(value) { localStorage.setItem(this.#envVariableKey, JSON.stringify(value)); }
  /** Your api setting
   *  @type {{ id: string, name: string, desc: string, endpoint: string, method: httpMethods, color: colorEnums, request: Object, isAuth: boolean }[]} */
  get apiSettings() { return tryParseJSON(localStorage.getItem(this.#apiSettingsKey), []); }
  set apiSettings(value) { localStorage.setItem(this.#apiSettingsKey, JSON.stringify(value)); }
  /** @type {string} Selected environment */
  get currentEnv() {
    const value = localStorage.getItem(this.#currentEnvKey);
    if (!value && this.envSettings.length > 0) {
      this.currentEnv = this.envSettings[0].id;
      return this.envSettings[0].id;
    }
    return localStorage.getItem(this.#currentEnvKey) || '';
  }
  set currentEnv(value) { localStorage.setItem(this.#currentEnvKey, value); }
  /** @type {string} Current language */
  get currentLang() { return localStorage.getItem(this.#currentLangKey) || defaultLang; }
  set currentLang(value) { localStorage.setItem(this.#currentLangKey, value); }

  // ================================================
  // Properties to get elements in the page
  // ================================================
  get btnToggleSidebar() { return $('#jun-tool #btn-toggle-sidebar'); }
  get btnCopyResponse() { return $('#jun-tool .response-result #btn-copy-response'); }
  get wApiResponse() { return $('#jun-tool .response-result .card'); }
  get wApiActionGroup() { return $('#jun-tool .api-action-group'); }
  get wModal() { return $('#jun-tool .modal'); }
  get wHeaderModal() { return $('#jun-tool .modal .modal-header'); }
  get hTitleModal() { return $('#jun-tool .modal #title-modal'); }
  get wTabModal() { return $('#jun-tool .modal .modal-tabs'); }
  get wTabButtons() { return $$('#jun-tool .modal .modal-tabs .tab-button'); }
  get wContentModal() { return $('#jun-tool .modal .modal-content'); }
  get wOverlayModal() { return $('#jun-tool .modal .modal-overlay'); }
  get btnLocale() { return $('#jun-tool #btn-change-language'); }
  get btnClose() { return $('#jun-tool #btn-close-modal'); }
  get btnApiSettingItems() { return $$('#jun-tool .modal .api-list-item [data-api-id]'); }
  get btnCopyApiSettingItems() { return $$('#jun-tool .modal .api-list-item button[data-action="copy-insert-api"]'); }
  get btnRemoveApiSettingItems() { return $$('#jun-tool .modal .api-list-item button[data-action="delete-api"]'); }
  get btnAddNewApi() { return $('#jun-tool #btn-add-new-api'); }
  get btnAddNewEnv() { return $('#jun-tool #btn-add-new-env'); }
  get btnRemoveEnvs() { return $$('#jun-tool button[data-action="delete-environment"]'); }
  get btnAddNewVariable() { return $('#jun-tool #btn-add-new-var'); }
  get btnAddRemoveVars() { return $$('#jun-tool button[data-action="delete-variable"]'); }
  get btnBack() { return $('#jun-tool #btn-modal-back'); }
  get btnSaveChanges() { return $('#jun-tool #btn-savechanges'); }
  get btnOpenSetting() { return $('#jun-tool #btn-open-setting'); }

  // ================================================
  // Api Functions
  // ================================================

  /**
   * Fetch API settings from the server.
   * @param {{
   *  id: string,
   *  name: string,
   *  desc: string,
   *  endpoint: string,
   *  method: httpMethods,
   *  color: colorEnums,
   *  request: Object,
   *  isAuth: boolean }} apiSetting API setting object to fetch 
   */
  async #fetchApiSettings(apiSetting) {
    const { name, endpoint, method, request, isAuth } = apiSetting || {};
    if (!endpoint) {
      console.warn('No API endpoint provided for fetching settings.');
      Toast.warning(t('message.fetch-api.endpoint-empty'));
      return;
    }

    try {
      const option = {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...(isAuth ? { 'Authorization': `Bearer ${this.preAuthToken}` } : {})
        },
        body: request && method !== httpMethods.GET
          ? this.resolveObjectVars(request)
          : undefined,
      };
      const response = await fetch(this.resolveVars(endpoint), option);
      const data = await response.json();
      this.apiResponse = data;
      this.#displayResponseChange();

      response.ok && isAuth && this.#autoSetToken(data?.data?.token || '');

      console.log(`API settings fetched successfully for ${name}`);
      Toast.success(t('message.fetch-api.success'));
    }
    catch (error) {
      this.apiResponse = null;
      Toast.error(t('message.fetch-api.fetch-error'));
      console.error(`Error fetching API settings for ${name}:`, error);
    } finally {
      this.isFetching = false;
    }
  }

  #autoSetToken(token = '', isAuth = true) {
    this.preAuthToken = token;
    const swaggerUi = window.ui;
    if (swaggerUi && swaggerUi.preauthorizeApiKey) {
      if (isAuth) {
        swaggerUi.preauthorizeApiKey('bearerAuth', `Bearer ${token}`);
        console.log('Token set using preauthorizeApiKey');
      }
      else {
        swaggerUi.preauthorizeApiKey('bearerAuth', '');
        console.log('No token set.');
      }
    } else {
      console.error('Swagger UI instance or preauthorizeApiKey not found');
      Toast.error(t('message.fetch-api.swagger-not-found'));
    }
  }

  #displayResponseChange() {
    this.btnCopyResponse.disabled = !this.apiResponse;

    if (!this.apiResponse) {
      this.wApiResponse.textContent = t('message.api-response.empty');
      return;
    }

    const jsonContent = renderJSONFormattedStrict(this.apiResponse);
    this.wApiResponse.innerHTML = jsonContent.innerHTML;
    this.wApiResponse.querySelectorAll('.copyable').forEach(element => {
      element.addEventListener('click', (event) => {
        event.preventDefault();
        let text = event.target.textContent.trim();
        if (/^".*"$/.test(text))
          text = text.replace(/^"(.*)"$/, '$1');

        navigator.clipboard.writeText(text)
          .then(() => {
            Toast.success(t('tooltip.copy.success'));
          }).catch(() => {
            Toast.error(t('tooltip.copy.fail'));
          });
      })
    })
  }

  // ================================================
  // Common Functions
  // ================================================

  /**
   * Bind events to the page elements.
   * @param {string} input Input string to resolve variables
   * @returns {string} Resolved input string with environment variables replaced
   */
  resolveVars(input = '') {
    if (!input || !this.#envReplacer || this.#envReplacer.length === 0) return input;

    let result = input;
    for (const [name, value] of this.#envReplacer) {
      const regex = new RegExp(`\\$\\{${name}\\}`, 'g');
      result = result.replace(regex, value);
    }
    return result;
  }

  /**
   * 
   * @param {*} input
   * @returns {*}
   */
  resolveObjectVars(input) {
    const convert = (obj) => {
      return Object.entries(obj)
        .reduce((result, [key, val]) => {
          result[key] = typeof (val) === 'string' ? this.resolveVars(val) : val;
          return result;
        }, {});
    }
    switch (typeof (input)) {
      case 'object':
        return Array.isArray(input)
          ? Array.from(input).map(item => convert(item))
          : convert(input);

      case 'string':
        return this.resolveVars(input);

      default:
        return input;
    }
  }

  /**
   * Find missing replacers in the input string.
   * @param {string} input Input string to search for missing replacers
   * @returns {string[]} Array of missing replacer names
   */
  findMissingReplacers(input = '') {
    if (!input) return [];

    const matches = [...input.matchAll(/\$\{(.*?)\}/g)].map(m => m[1]);
    const definedNames = new Set(this.#envReplacer ? this.#envReplacer.map(([k]) => k) : []);
    const missing = matches.filter(name => !definedNames.has(name));

    return [...new Set(missing)];
  }

  /**
   * Map to input form data based on the action type.
   * @param {Object} input Input object to set default values for
   * @param {actionMode} type Type of action to determine which default data to use
   * @returns {Object} Input object with default values set based on the action type
   */
  mapToFormData(input, type) {
    const autoMapping = (input, defaultInput) => {
      const mappingInput = Object.entries(defaultInput)
        .reduce((preValue, [key, value]) => {
          preValue[key] = input[key] || value;
          return preValue;
        }, {});
      return mappingInput;
    }
    switch (type) {
      case actionMode.API_SETTING:
        return autoMapping(input, this.#defaultApiSettingData);

      case actionMode.ENVIRONMENT_SETTINGS:
        return autoMapping(input, this.#defaultEnvSettingData);

      case actionMode.ENVIRONMENT_VARIABLES:
        return autoMapping(input, this.#defaultEnvVariableItem);

      default:
        return {};
    }
  }

  /**
   * Set error message for a specific input element in the form.
   * @param {KeyboardEvent} event Input event that triggered the error message
   * @param {string} errorMessage Error message to display for the input element
   */
  #setInputErrorMessage(event, errorMessage) {
    const targetGroup = event.target.parentElement;
    if (!targetGroup) return;

    const errorElement = targetGroup.querySelector('.error-message');
    if (!errorElement) return;

    errorElement.textContent = errorMessage || '';
    event.target.classList.toggle('has-error', errorMessage && errorMessage !== '');
  }

  /**
   * Set error messages for environment settings in the form.
   * @param {[{ itemIndex: number, errors: [{ field: string, message: string }]}]} errorMessages Error messages for each item 
   */
  #setEnvErrorMessage(errorMessages = []) {
    const formId = this.#modalFormIds[actionMode.ENVIRONMENT_SETTINGS];
    const targetForm = $(`#jun-tool .modal #${formId}`);
    if (!targetForm) return;

    // Clear previous error messages
    this.#clearErrorMessage();

    $$('#jun-tool .modal .form-group').forEach((el, index) => {
      const messages = errorMessages.find(err => err.itemIndex === index)?.errors || [];
      const input = el.querySelector(`[data-action="input"]`);
      if (!input) return;

      const errorElement = input.nextElementSibling;
      if (errorElement && errorElement.classList.contains('error-message')) {
        const errorMessage = messages[0]?.message || '';
        errorElement.textContent = errorMessage || '';
        input.classList.toggle('has-error', !!errorMessage);
      }
    });
  }

  /**
   * Set error messages for environment variables in the form.
   * @param {[{ itemIndex: number, errors: [{ field: string, message: string }]}]} errorMessages Error messages for each item 
   */
  #setVariableErrorMessage(errorMessages = []) {
    const formId = this.#modalFormIds[actionMode.ENVIRONMENT_VARIABLES];
    const targetForm = $(`#jun-tool .modal #${formId}`);
    if (!targetForm) return;

    // Clear previous error messages
    this.#clearErrorMessage();

    $$('#jun-tool .modal .list-wrapper .form-group').forEach((el, index) => {
      const messages = errorMessages.find(err => err.itemIndex === index)?.errors || [];
      messages.forEach(({ field, message }) => {
        const input = el.querySelector(`[data-env-input-type="${field}"]`);
        if (!input) return;

        const errorElement = input.nextElementSibling;
        if (errorElement && errorElement.classList.contains('error-message')) {
          errorElement.textContent = message;
          input.classList.toggle('has-error', !!message);
        }
      });
    });
  }

  /**
   * Set error messages for API settings in the form.
   * @param {[{ itemIndex: number, errors: [{ field: string, message: string }]}]} errorMessages Error messages for each item 
   */
  #setApiSettingErrorMessage(errorMessages = []) {
    const formId = this.#modalFormIds[actionMode.API_SETTING];
    const targetForm = $(`#jun-tool .modal #${formId}`);
    if (!targetForm) return;

    // Clear previous error messages
    this.#clearErrorMessage();

    $$('#jun-tool .modal .form-group').forEach(el => {
      const input = el.querySelector('input, textarea, select');
      if (!input) return;

      const field = input.name || input.id;
      const errorMessage = errorMessages.find(err => err.field === field)?.message || '';
      const errorElement = input.nextElementSibling;

      if (errorElement && errorElement.classList.contains('error-message')) {
        errorElement.textContent = errorMessage;
        input.classList.toggle('has-error', !!errorMessage);
      }
    });
  }

  /**
   * Clear all error messages in the modal.
   */
  #clearErrorMessage() {
    $$('#jun-tool .error-message').forEach(el => {
      el.textContent = '';
      el.previousElementSibling.classList.remove('has-error');
    });
  }

  // ================================================
  // Event Functions
  // ================================================

  /**
   * Execute the event every time you click on the sidebar API action item.
   * @param {MouseEvent} event Click event
   */
  async #onLobbyApiItemClick(event) {
    event.preventDefault();
    const apiId = event.target.dataset['apiId'];
    if (!apiId) return;

    const targetApi = this.apiSettings.find(api => api.id === apiId);
    if (!targetApi) return;

    this.isFetching = true;
    await this.#fetchApiSettings(targetApi);
  }

  /**
   * Execute the event every time you open modal
   * @param {actionMode} mode The page will open
   */
  #onOpenModal(mode = actionMode.API_LIST) {
    if (mode)
      this.currentAction = mode;

    this.#onPageBinding();
  }

  /**
   * Execute the event every time you close modal
   */
  #onCloseModal() {
    this.currentAction = actionMode.LOBBY;
    this.#onPageBinding();
  }

  /**
   * Execute the event every time you switch tabs.
   * @param {MouseEvent} event Click event
   */
  #onTabChange(event) {
    event.preventDefault();
    const isActiveTab = event.target.classList.contains('active');
    if (isActiveTab) return;

    this.currentAction = event.target.dataset['modalTab'] === modalTabs.API
      ? actionMode.API_LIST
      : actionMode.ENVIRONMENT_VARIABLES;

    this.isPageDataChange = true;
    this.#onPageBinding();
  }

  /**
   * Execute the event every time you switch language.
   * @param {MouseEvent} event Click event
   */
  #onLanguageChange(event) {
    event.preventDefault();
    const selectedLang = event.target.dataset['lang'] || defaultLang;
    this.currentLang = selectedLang;
    localStorage.setItem(this.#currentLangKey, selectedLang);

    event.target.closest('.dropdown-menu')?.classList.remove('show');
    this.refreshPage();
  }

  /**
   * Execute the event every time you switch environment.
   * @param {InputEvent} event Select input change event
   */
  #onEnvironmentChange(event) {
    const value = event.target.value;
    const targetOption = event.target.selectedOptions[0];
    const isAddNewEnvCommand = value === 'add-new'
      || targetOption.attributes['command']?.value === 'add-new-env';
    if (isAddNewEnvCommand) {
      event.target.value = this.currentEnv || '';
      this.currentAction = actionMode.ENVIRONMENT_SETTINGS;
    } else {
      this.currentEnv = event.target.value;
    }

    this.isPageDataChange = true;
    this.#onPageBinding();
  }

  /**
   * Environment input change event
   * @param {InputEvent} event Text input event
   */
  #onEnvInputChange(event) {
    const envId = event.target.closest('.form-group').dataset['targetId'] || '';
    if (!envId) return;

    clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(() => {
      const targetItem = this.formData.dataSource.find(item => item.id === envId);
      const inputValue = event.target?.value.trim() || '';
      targetItem.value = inputValue;

      const isDuplicate = this.formData.dataSource.some(env => env.id != envId && env.value == inputValue);
      this.#setInputErrorMessage(event, isDuplicate ? t('validation.duplicate-field') : '');
    }, 300);
  }

  /**
   * Environment variable change event
   * @param {InputEvent} event Input event for environment variable
   */
  #onEnvVariableChange(event) {
    const type = event.target.closest('.list-wrapper').dataset['envType'] || '';
    if (!['soft-setting', 'hard-setting'].includes(type)) return;

    clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(() => {
      const inputName = event.target.dataset['envInputType'] || '';
      if (!inputName) return;

      if (type === 'soft-setting') {
        const variableId = event.target.closest('.form-group').dataset['targetId'] || '';
        if (!variableId) return;

        const inputValue = event.target.value.trim();

        // Validate the input value
        const errorMessage = validator.validateVariableSettingItem(inputName, inputValue);
        this.#setInputErrorMessage(event, errorMessage);

        const variableItem = this.formData.dataSource.find(item => item.id === variableId);
        // If the variable item already exists, update its value
        if (variableItem) {
          variableItem[event.target.dataset['envInputType']] = inputValue;
          return;
        }

        // If the variable item does not exist, create a new one
        const newVariable = { id: variableId, isHardSetting: false };
        newVariable[inputName] = inputValue;
        this.formData.dataSource = [...this.formData.dataSource, newVariable];
      } else if (type === 'hard-setting') {
        const name = event.target.name.trim();
        const value = event.target.value.trim();
        const errorMessage = validator.validateVariableSettingItem(inputName, value);
        this.#setInputErrorMessage(event, errorMessage);

        const variableItem = this.formData.dataSource
          .find(item => item.isHardSetting && item.name === event.target.name);
        // If the variable item already exists, update its value
        if (variableItem) {
          variableItem.value = event.target.value;
          return;
        }

        // Create a new hard setting item if it doesn't exist
        const newItem = {
          id: crypto.randomUUID(),
          isHardSetting: true,
          name,
          value,
        };

        this.formData.dataSource = [...this.formData.dataSource, newItem];
      }
    }, 300);
  }

  /**
   * Handle input changes in API settings form.
   * @param {InputEvent} event Input event for API settings
   */
  #onApiSettingInputChange(event) {
    if (!event.target.name) return;

    switch (event.target.type) {
      case 'checkbox':
        this.formData.dataSource[event.target.name] = event.target.checked;
        break;

      default:
        const value = this.resolveVars(event.target.value.trim());
        const missingReplacers = this.findMissingReplacers(value);
        if (missingReplacers.length > 0) {
          this.#setInputErrorMessage(event, t('validation.missing-replacer', missingReplacers.join(', ')));
          return;
        }

        const errorMessage = validator.validateApiSettingItem(event.target.name, value);
        this.#setInputErrorMessage(event, errorMessage);
        this.formData.dataSource[event.target.name] = event.target.value.trim();
        break;
    }
  }

  /**
   * Save changes form event in modal
   * @param {MouseEvent} event Click event
   */
  #onSaveChanges(event) {
    event.preventDefault();
    if (!confirm(t('dialog.confirm-save'))) return;

    switch (this.formData.type) {
      case actionMode.ENVIRONMENT_SETTINGS:
        this.#saveEnvChanges();
        break;

      case actionMode.ENVIRONMENT_VARIABLES:
        this.#saveVariableChanges();
        break;

      case actionMode.API_SETTING:
        this.#saveApiSettingChanges();
        return;

      default:
        throw new Error(`${t('message.save-changes.fail')} (${this.formData.type})`);
    }
  }

  /**
   * Save environment changes
   */
  #saveEnvChanges() {
    const envFormDatas = this.formData.dataSource
      .map(item => this.mapToFormData(item, actionMode.ENVIRONMENT_SETTINGS));
    const [isEnvFormError, envErrorMessages] = validator.validateEnvSetting(envFormDatas);
    this.#setEnvErrorMessage(envErrorMessages);
    if (isEnvFormError) return;

    this.envSettings = [...envFormDatas];
    if (!this.currentEnv || !this.envSettings.some(i => i.id == this.currentEnv))
      this.currentEnv = this.envSettings[0]?.id || '';

    if (this.envSettings.length === 0) this.currentEnv = '';

    const validEnvVars = this.envVariables.filter(item => this.envSettings.some(env => env.id === item.envId));
    this.envVariables = [...validEnvVars];
    Toast.success('message.save-changes.env.success');
  }

  /**
   * Save variable changes
   */
  #saveVariableChanges() {
    const varFormDatas = this.formData.dataSource
      .map(item => this.mapToFormData(item, actionMode.ENVIRONMENT_VARIABLES));
    const [isVariableFormError, varErrorMessages] = validator.validateVariableSetting(varFormDatas);
    this.#setVariableErrorMessage(varErrorMessages);
    if (isVariableFormError) return;

    const currentVars = [...this.envVariables];
    const targetVarIndex = currentVars.findIndex(item => item.envId === this.currentEnv);
    if (targetVarIndex < 0) {
      const newEnvVar = this.#defaultEnvVariableData;
      newEnvVar.envId = this.currentEnv;
      newEnvVar.items = [...this.formData.dataSource];
      this.envVariables = [...this.envVariables, newEnvVar];
    } else {
      const updateEnvVars = [...this.envVariables];
      updateEnvVars[targetVarIndex].items = [...this.formData.dataSource];
      this.envVariables = [...updateEnvVars];
    }
    Toast.success('message.save-changes.variable.success');
  }

  /**
   * Save API setting changes
   */
  #saveApiSettingChanges() {
    const apiFormData = this.mapToFormData(this.formData.dataSource, actionMode.API_SETTING);
    const [isApiFormError, apiSettingErrorMessages] = validator.validateApiSetting(this.resolveObjectVars(apiFormData));
    this.#setApiSettingErrorMessage(apiSettingErrorMessages);
    if (isApiFormError) return;

    const settingIndex = this.apiSettings.findIndex(setting => setting.id === this.targetId);
    if (settingIndex < 0) {
      this.apiSettings = [apiFormData, ...this.apiSettings];
    } else {
      const settings = [...this.apiSettings];
      settings[settingIndex] = apiFormData;
      this.apiSettings = [...settings];
    }

    this.targetId = null;
    this.isPageDataChange = true;
    this.currentAction = actionMode.API_LIST;
    this.#onPageBinding();
    Toast.success('message.save-changes.api-setting.success');
  }

  /**
   * Execute function when binding page, reset data from local storage data
   */
  #onPageChange() {
    if (this.isPageDataChange) {
      this.#setFormData();
      this.#clearErrorMessage();
    }

    this.btnBack.classList.toggle(
      'd-none',
      this.currentAction === actionMode.API_LIST || this.currentAction === actionMode.ENVIRONMENT_VARIABLES);

    this.btnSaveChanges.classList.toggle(
      'd-none',
      ![actionMode.API_SETTING, actionMode.ENVIRONMENT_SETTINGS, actionMode.ENVIRONMENT_VARIABLES].includes(this.currentAction));

    this.isPageDataChange = false;
  }

  /**
   * The function use to bind all of action
   */
  #onPageBinding() {
    // Show or hide the modal based on the current action
    if (this.currentAction === actionMode.LOBBY) {
      this.wModal.classList.add('d-none');
    } else {
      this.wModal.classList.remove('d-none');
    }

    // Handle after setting the current action
    this.#onPageChange();

    // Set the form data based on the current action
    const apiActionItems = uiBuilder.createApiActionGroupItems(this.resolveObjectVars(this.apiSettings));
    this.wApiActionGroup.innerHTML = apiActionItems;

    // Set the title and modal container based on the current action
    this.hTitleModal.innerText = uiBuilder.getHeaderModal(this.currentAction);
    const tabHTML = uiBuilder.createTabSettingElement(this.currentAction);
    this.wTabModal.innerHTML = tabHTML;

    // Set the content of the modal container based on the current action
    const modalContent = uiBuilder.createContainnerContent(
      this.currentAction,
      this.resolveObjectVars(this.formData.dataSource),
      this.currentEnv);
    const modalContainerUi = uiBuilder.createModalContentContainer(this.currentAction, modalContent);
    this.wContentModal.innerHTML = modalContainerUi;

    // Binding data for controls and set events
    this.#loadEnvDropdownList();
    this.#displayResponseChange();
    this.#setModalEvent();
    this.#setLobbyEvent();
  }

  // ================================================
  // Binding Functions
  // ================================================

  #setFormItemChanges() {
    const targetForm = this.wContentModal.querySelector('form');
    if (!targetForm) return;

    const envInputs = targetForm.querySelectorAll('[data-action="input"]');
    envInputs.forEach(element => element.addEventListener('keyup', (e) => this.#onEnvInputChange(e)));

    const variableInputs = targetForm.querySelectorAll('input[data-env-input-type]');
    variableInputs.forEach(element => element.addEventListener('keyup', (e) => this.#onEnvVariableChange(e)));

    const apiSettingControls = targetForm.querySelectorAll('[data-action="form-input"]');
    apiSettingControls.forEach(element => element.addEventListener('change', (e) => this.#onApiSettingInputChange(e)));
  }

  /**
   * Load all of environment dropdown list
   */
  #loadEnvDropdownList() {
    const envControls = $$('select[control="ddl-select-environment"]');
    const envSelections = uiBuilder.createEnvDropdownItems(this.envSettings, this.currentEnv);
    envControls.forEach((dropdown) => {
      dropdown.innerHTML = envSelections;
      dropdown.addEventListener('change', (e) => this.#onEnvironmentChange(e));
    });
  }

  /**
   * Set form data based on the current action.
   */
  #setFormData() {
    switch (this.currentAction) {
      case actionMode.API_LIST:
        this.targetId = null;
        this.formData = {
          type: actionMode.API_LIST,
          dataSource: [...this.apiSettings],
        };
        break;

      case actionMode.API_SETTING:
        this.formData = {
          type: actionMode.API_SETTING,
          dataSource: this.apiSettings.find(api => api.id === this.targetId) || this.#defaultApiSettingData,
        };
        break;

      case actionMode.ENVIRONMENT_SETTINGS:
        this.targetId = null;
        this.formData = {
          type: actionMode.ENVIRONMENT_SETTINGS,
          dataSource: [...this.envSettings],
        };
        break;

      case actionMode.ENVIRONMENT_VARIABLES:
        this.targetId = null;
        const missingHardEnvs = this.#defaultHardEnvVariableItems
          .filter(item => !this.envVariables
            .some(env => env.envId === this.currentEnv
              && env.items.some(i => i.isHardSetting && i.name === item.name)));
        const envVarIndex = this.envVariables.findIndex(item => item.envId === this.currentEnv);
        if (envVarIndex >= 0) {
          const newVars = [...this.envVariables];
          newVars[envVarIndex].items = [...missingHardEnvs, ...this.envVariables[envVarIndex].items];
          this.envVariables = newVars;
        }

        this.formData = {
          type: actionMode.ENVIRONMENT_VARIABLES,
          dataSource: [...this.envVariables.find(item => item.envId === this.currentEnv)?.items || []],
        };
        break;

      default:
        this.targetId = null;
        this.formData = {
          type: '',
          datasource: {},
        };
        break;
    };
  }

  /**
   * Set event for lobby API action items.
   */
  #setLobbyEvent() {
    this.wApiActionGroup.querySelectorAll('.api-action-group-item .api-action-control').forEach((element) => {
      element.addEventListener('click', (event) => this.#onLobbyApiItemClick(event));
    });
  }

  /**
   * Set event for modal elements
   */
  #setModalEvent() {
    this.wTabButtons.forEach((btn) => {
      btn.addEventListener('click', (e) => this.#onTabChange(e));
    });

    // Set event for api list items, redirect to API setting page
    this.btnApiSettingItems.forEach((item) => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const apiId = e.target.closest('a').dataset['apiId'];
        if (apiId) {
          this.targetId = apiId;
          this.currentAction = actionMode.API_SETTING;

          this.isPageDataChange = true;
          this.#onPageBinding();
        }
      });
    });

    this.btnRemoveApiSettingItems.forEach((item) => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const apiId = e.target.closest('.api-list-item').querySelector('[data-api-id]')?.dataset['apiId'] || '';
        if (!apiId) return;

        if (!confirm(t('dialog.confirm-delete'))) return;

        const newSettings = this.apiSettings.filter(setting => setting.id !== apiId);
        this.apiSettings = [...newSettings];

        this.#onPageBinding();
      });
    });

    this.btnCopyApiSettingItems.forEach((item) => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const apiId = e.target.closest('.api-list-item').querySelector('[data-api-id]')?.dataset['apiId'] || '';
        if (!apiId) return;

        const targetItem = this.apiSettings.find(setting => setting.id === apiId);
        this.formData = { type: actionMode.API_SETTING, dataSource: { ...targetItem, id: crypto.randomUUID() } };
        this.currentAction = actionMode.API_SETTING;

        this.#onPageBinding();
      });
    });

    this.btnAddNewApi?.addEventListener('click', (e) => {
      e.preventDefault();
      this.currentAction = actionMode.API_SETTING;
      this.targetId = crypto.randomUUID();
      this.isPageDataChange = true;

      this.#onPageBinding();
    });

    this.btnAddNewEnv?.addEventListener('click', (e) => {
      e.preventDefault();

      this.formData.dataSource = [...this.formData.dataSource, this.#defaultEnvSettingData];
      this.#onPageBinding();
    });

    this.btnRemoveEnvs.forEach(element => {
      element.addEventListener('click', (event) => {
        event.preventDefault();
        if (!confirm(t('dialog.confirm-delete'))) return;

        const targetId = event.target.closest('.form-group')
          ?.dataset['targetId'] || '';
        const newForms = this.formData.dataSource.filter(data => data.id !== targetId);
        this.formData.dataSource = [...newForms];

        this.#onPageBinding();
      });
    });

    this.btnAddNewVariable?.addEventListener('click', (e) => {
      e.preventDefault();
      const newItem = {
        id: crypto.randomUUID(),
        isHardSetting: false,
        name: '',
        value: '',
      };
      this.formData.dataSource = [...this.formData.dataSource, newItem];

      this.#onPageBinding(false);
    });

    this.btnAddRemoveVars.forEach(element => {
      element.addEventListener('click', (event) => {
        event.preventDefault();
        if (!confirm(t('dialog.confirm-delete'))) return;

        const targetId = event.target.closest('.form-group')
          ?.dataset['targetId'] || '';

        const newForms = this.formData.dataSource.filter(data => data.id !== targetId);
        this.formData.dataSource = [...newForms];

        this.#onPageBinding();
      });
    });

    this.#setFormItemChanges();
  }

  /**
   * Set event for language change button
   */
  #setLocaleEvent() {
    this.btnLocale.addEventListener('click', (event) => {
      event.stopPropagation();
      const menu = this.btnLocale.parentElement.querySelector(`[data-target-id="${this.btnLocale.id}"]`);
      menu?.classList.toggle('show');
    });

    const dropdownItems = $$(`[data-target-id="${this.btnLocale.id}"] li a`);
    dropdownItems.forEach((ddlItem) => {
      ddlItem.addEventListener('click', (event) => this.#onLanguageChange(event));
    });

    document.addEventListener('click', (event) => {
      const menu = this.btnLocale.parentElement.querySelector('.dropdown-menu');
      if (menu.classList.contains('show') && !menu.contains(event.target)) {
        menu.classList.remove('show');
      }
    })
  }

  /**
   * Set UI events for the sidebar and modal.
   */
  #setUiEvent() {
    this.btnToggleSidebar.addEventListener('click', (e) => {
      e.preventDefault();
      const sidebar = $('#tool-sidebar');
      sidebar.classList.toggle('collapsed');
    });

    // Modal events
    this.btnOpenSetting.addEventListener('click', (e) => {
      e.preventDefault();

      this.isPageDataChange = true;
      this.#onOpenModal();
    });
    this.btnClose.addEventListener('click', (e) => {
      e.preventDefault();
      this.#onCloseModal();
    });
    this.wOverlayModal.addEventListener('click', (e) => {
      e.preventDefault();
      this.#onCloseModal();
    });
    this.btnBack.addEventListener('click', (e) => {
      e.preventDefault();

      // Redirect to the previous action
      const redirectAction = this.currentAction === actionMode.API_SETTING
        ? actionMode.API_LIST
        : actionMode.ENVIRONMENT_VARIABLES;

      // Refresh the modal with the new action
      this.isPageDataChange = true;
      this.#onOpenModal(redirectAction);
    });
    this.btnSaveChanges.addEventListener('click', (e) => {
      clearTimeout(this.timeoutId);
      this.timeoutId = setTimeout(() => {
        this.#onSaveChanges(e)
      }, 250);
    });

    this.#setLocaleEvent();

    this.btnCopyResponse?.addEventListener('click', (e) => {
      e.preventDefault();
      if (!this.apiResponse) return;

      navigator.clipboard.writeText(JSON.stringify(this.apiResponse))
        .then(() => {
          Toast.success(t('tooltip.copy.success'));
        }).catch(() => {
          Toast.error(t('tooltip.copy.fail'));
        });
    });
  }

  /**
   * Render the UI components on the page.
   */
  #renderUI() {
    const rootElement = $('#jun-tool');
    const rootNode = rootElement || document.createElement('div');
    rootNode.id = 'jun-tool';
    rootNode.innerHTML = uiBuilder.createDefaultUI();

    if (!rootElement) document.body.appendChild(rootNode);
  }

  // ================================================
  // Public
  // ================================================

  /**
   * Refresh the page by re-rendering the UI and setting up event listeners.
   *
   * This method is used to initialize the page when it is first loaded, and to
   * re-render the page when the user navigates to a different page.
   */
  refreshPage() {
    this.#renderUI();
    this.#setUiEvent();
    this.#onPageBinding();
  }

  /**
   * Initialize the SwaggerFaster class and set up the initial state.
   *
   * This method is a static initializer that creates a new instance of the class,
   * renders the UI, sets up event listeners, and binds the UI to the page.
   */
  static init() {
    const instance = new SwaggerFaster();
    console.log("SwaggerFaster initialized");
    instance.refreshPage();
    console.log("SwaggerFaster executed");
  }
}

console.log("SwaggerFaster loaded");
// Execute class
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => SwaggerFaster.init());
} else {
  SwaggerFaster.init();
}
