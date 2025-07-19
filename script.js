const defaultLang = 'vi';
const supportedLanguages = Object.freeze(['en', 'vi', 'zh-TW']);

const translate = Object.freeze({
  'lang': {
    'en': 'English',
    'vi': 'Tiếng Việt',
    'zh-TW': '繁體中文',
  },
  'color.primary': {
    'en': 'Primary',
    'vi': 'Chính',
    'zh-TW': '主要',
  },
  'color.secondary': {
    'en': 'Secondary',
    'vi': 'Phụ',
    'zh-TW': '次要',
  },
  'color.success': {
    'en': 'Success',
    'vi': 'Thành công',
    'zh-TW': '成功',
  },
  'color.danger': {
    'en': 'Danger',
    'vi': 'Nguy hiểm',
    'zh-TW': '危險',
  },
  'color.warning': {
    'en': 'Warning',
    'vi': 'Cảnh báo',
    'zh-TW': '警告',
  },
  'color.info': {
    'en': 'Info',
    'vi': 'Thông tin',
    'zh-TW': '資訊',
  },
  'btn.back': {
    'en': 'Back',
    'vi': 'Trở lại',
    'zh-TW': '返回',
  },
  'btn.setting': {
    'en': 'Settings',
    'vi': 'Cài đặt',
    'zh-TW': '設定',
  },
  'btn.add-new': {
    'en': 'Add new',
    'vi': 'Thêm mới',
    'zh-TW': '新增',
  },
  'btn.save-changes': {
    'en': 'Save Changes',
    'vi': 'Lưu thay đổi',
    'zh-TW': '儲存變更',
  },
  'btn.close': {
    'en': 'Close',
    'vi': 'Đóng',
    'zh-TW': '關閉',
  },
  'tooltip.copy': {
    'en': 'Copy to clipboard',
    'vi': 'Sao chép vào clipboard',
    'zh-TW': '複製到剪貼簿',
  },
  'tooltip.delete': {
    'en': 'Delete this item',
    'vi': 'Xóa mục này',
    'zh-TW': '刪除此項目',
  },
  'ddl.select-environment': {
    'en': 'Select Environment',
    'vi': 'Chọn môi trường',
    'zh-TW': '選擇環境',
  },
  'sidebar.env.title': {
    'en': 'Environment',
    'vi': 'Môi trường',
    'zh-TW': '環境',
  },
  'sidebar.api.title': {
    'en': 'API Action',
    'vi': 'Hành động API',
    'zh-TW': 'API 操作',
  },
  'sidebar.response.title': {
    'en': 'Response Result',
    'vi': 'Kết quả phản hồi',
    'zh-TW': '回應結果',
  },
  'sidebar.response.copy': {
    'en': 'Copy full response',
    'vi': 'Sao chép toàn bộ phản hồi',
    'zh-TW': '複製完整回應',
  },
  'modal.tab.env': {
    'en': 'Environment Settings',
    'vi': 'Cài đặt môi trường',
    'zh-TW': '環境設定',
  },
  'modal.tab.api': {
    'en': 'API Settings',
    'vi': 'Cài đặt API',
    'zh-TW': 'API 設定',
  },
  'modal.header.default': {
    'en': 'Jun Tool Settings',
    'vi': 'Cài đặt công cụ Jun',
    'zh-TW': 'Jun 工具設定',
  },
  'modal.header.api-list': {
    'en': 'API List',
    'vi': 'Danh sách API',
    'zh-TW': 'API 列表',
  },
  'modal.header.api-setting': {
    'en': 'API Settings',
    'vi': 'Cài đặt API',
    'zh-TW': 'API 設定',
  },
  'modal.header.env-setting': {
    'en': 'Environment Settings',
    'vi': 'Cài đặt môi trường',
    'zh-TW': '環境設定',
  },
  'modal.header.env-variable': {
    'en': 'Environment Variables',
    'vi': 'Biến môi trường',
    'zh-TW': '環境變數',
  },
  'modal.api-setting.name': {
    'en': 'API Name',
    'vi': 'Tên API',
    'zh-TW': 'API 名稱',
  },
  'modal.api-setting.desc': {
    'en': 'Description',
    'vi': 'Mô tả',
    'zh-TW': '描述',
  },
  'modal.api-setting.request': {
    'en': 'Request',
    'vi': 'Yêu cầu',
    'zh-TW': '請求',
  },
  'modal.api-setting.response': {
    'en': 'Response',
    'vi': 'Phản hồi',
    'zh-TW': '回應',
  },
  'modal.api-setting.color': {
    'en': 'Color',
    'vi': 'Màu sắc',
    'zh-TW': '顏色',
  },
  'modal.api-setting.http-method': {
    'en': 'HTTP Method',
    'vi': 'Phương thức HTTP',
    'zh-TW': 'HTTP 方法',
  },
  'modal.api-setting.is-auth-api': {
    'en': 'Is auto set token after request Success?',
    'vi': 'Tự động đặt token sau khi yêu cầu thành công?',
    'zh-TW': '請求成功後自動設置令牌？',
  },
  'api-list.empty': {
    'en': 'No APIs found. Please add a new API.',
    'vi': 'Không tìm thấy API nào. Vui lòng thêm API mới.',
    'zh-TW': '未找到任何 API。請添加新的 API。',
  },
  'api-list.add-new': {
    'en': 'Add New API',
    'vi': 'Thêm API mới',
    'zh-TW': '新增 API',
  },
  'api-list.api-name': {
    'en': 'API Name',
    'vi': 'Tên API',
    'zh-TW': 'API 名稱',
  },
  'api-list.api-description': {
    'en': 'API Description',
    'vi': 'Mô tả API',
    'zh-TW': 'API 描述',
  },
  'api-list.api-color': {
    'en': 'API Color',
    'vi': 'Màu sắc API',
    'zh-TW': 'API 顏色',
  },
  'api-list.api-action': {
    'en': 'Actions',
    'vi': 'Hành động',
    'zh-TW': '操作',
  },
});

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
 * Translate a key to the current language.
 * @param {string} key Translation key
 * @param {*} defaultText Default text to return if the key is not found in the translations.
 * @returns {string} The translated text or the default text if the key is not found.
 */
function t(key, defaultText = key) {
  let lang = localStorage.getItem('juntool-lang') || defaultLang;
  if (!supportedLanguages.includes(lang)) {
    console.warn(`Language ${lang} is not supported, falling back to ${defaultLang}`);
    lang = defaultLang;
  }

  return translate[key] && translate[key][lang]
    ? translate[key][lang]
    : defaultText;
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

/** Modal tabs for the application. */
const modalTabs = Object.freeze({
  API: 'api',
  ENVIRONMENT: 'environment',
});

/** Action modes for the application. */
const actionMode = Object.freeze({
  LOBBY: "lobby",
  API_LIST: "api_list",
  API_SETTING: "api_setting",
  ENVIRONMENT_SETTINGS: "environment_settings",
  ENVIRONMENT_VARIABLES: "environment_variables",
});

/** HTTP methods used in API requests. */
const httpMethods = Object.freeze({
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  PATCH: "PATCH",
  DELETE: "DELETE",
  HEAD: "HEAD",
  OPTIONS: "OPTIONS",
});

/** Color enums and options for Api actions. */
const colorEnums = Object.freeze({
  Primary: 'primary',
  Secondary: 'secondary',
  Success: 'success',
  Danger: 'danger',
  Warning: 'warning',
  Info: 'info',
});

/** Color options for Api actions, used in dropdowns or UI elements. */
const colorOptions = Object.freeze([
  { value: colorEnums.Primary, translateKey: 'color.primary', },
  { value: colorEnums.Secondary, translateKey: 'color.secondary', },
  { value: colorEnums.Success, translateKey: 'color.success', },
  { value: colorEnums.Danger, translateKey: 'color.danger', },
  { value: colorEnums.Warning, translateKey: 'color.warning', },
  { value: colorEnums.Info, translateKey: 'color.info', },
]);

/**
 * Builds the UI for the application.
 */
const uiBuilder = (() => {
  const createDefaultUI = () => `
    <aside id="tool-sidebar">
      <div class="sidebar-header">
        <button class="btn-control icon-badge" id="btn-toggle-sidebar">≡</button>
        <h1>Jun's Tool</h1>
        <div class="dropdown">
          <button class="btn-control icon-badge dropdown-toggle" id="btn-change-language">🌍</button>
          <ul class="dropdown-menu" data-target-id="btn-change-language">
            ${supportedLanguages.map(lang => `
              <li><a href="#" data-lang="${lang}">${translate.lang[lang]}</a></li>
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
        <ul class="api-action-group overflow-scroll-y mh-50vh">
        </ul>
        <div class="response-result">
          <h3>
            ${t('sidebar.response.title')}
            <button class="btn-control icon-badge" id="btn-copy-response" title="${t('sidebar.response.copy')}">📃</button>
          </h3>
          <div class="card"></div>
        </div>
        <div class="tool-setting">
          <a href="#" id="btn-open-setting" class="btn-control action-control">${t('btn.setting')}</a>
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
        <div class="modal-content">
          <div id="enviroment-setting-layout" class="active">
          </div>
  
          <div id="api-list-layout">
            <h3>API List</h3>
            <ul class="api-list"></ul>
          </div>
  
          <div id="api-setting-layout"></div>
        </div>
        <div class="modal-footer">
          <button id="btn-savechanges" type="button">${t('btn.save-changes')}</button>
          <button id="btn-close-modal" class="close-modal">${t('btn.close')}</button>
        </div>
      </div>
    </div>
  `;

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
            <button class="btn-control" id="btn-add-new-api">${t('api-list.add-new')}</button>
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

  const createEnvSettingForm = ({ envSettings = [] }) => {
    return `
      <form id="enviroment-management-form" data-form-type="environment-management">
        <div class="enviroment-manager mb-2">
          ${envSettings.map(env => `
            <div class="form-group grid-6 gap-1">
              <label class="form-label span-2">Name:</label>
              <input type="text" class="form-input span-3" value="${env}" required>
              <button class="btn-control icon-badge" data-action="delete-environment" title="${t('tooltip.delete')}">🗑️</button>
            </div>
          `).join('')}
          <a href="#" class="btn-control" data-action="add-environment">${t('btn.add-new')}</a>
        </div>
      </form>
    `;
  }

  const createEnvDropdownItems = (datasource = [], selectedValue = '') => {
    const defaultOption = `
      <option value="" disabled ${!datasource || datasource.length == 0 ? 'selected' : ''}>
        ${t('ddl.select-environment')}
      </option>`;
    const options = datasource.map(env => `
      <option value="${env}" ${env === selectedValue ? 'selected' : ''}>
        ${env}
      </option>
    `);
    const btnAddNew = `
      <option value="add-new" command="add-new-env">
        ${t('btn.add-new') + '...'}
      </option>
    `;
    return [defaultOption, ...options, btnAddNew].join('');
  }

  const createEnvVariableForm = ({ envSettings = [], selectedEnv = '', variables = [] }) => {
    return `
      <form id="enviroment-variable-form" data-form-type="environment-variable">
        <div class="form-group grid-3 mb-2">
          <label for="ddl-select-environment" class="form-label">Environment:</label>
          <select id="ddl-select-environment" class="form-select span-2" control="ddl-select-environment" required>
            ${createEnvDropdownItems(envSettings, selectedEnv)}
          </select>
        </div>
        <h3>Environment Variables</h3>
        <div class="hard-settings">
          <div class="form-group grid-3 gap-1">
            <label class="form-label">Host setting:</label>
            <input type="text" class="form-input span-2" required>
          </div>
        </div>
        <h3>Your Variables</h3>
        <div class="custom-settings mb-2">
          ${variables.map(({ id, name, value }) => `
            <div class="form-group grid-6 gap-1">
              <input class="form-input custom-name-input span-2" value="${name}" required>
              <input class="form-input custom-value-input span-3" value="${value}" required>
              <button class="btn-control icon-badge" data-targetId="${id}" title="Delete this variable">🗑️</button>
            </div>
          `)}
          <a href="#" class="btn-control" data-action="add-environment">${t('btn.add-new')}</a>
        </div>
      </form>
    `;
  }

  const createApiSettingForm = ({ name, desc, request, response, color, isAuthApi }) => {
    return `
      <form id="api-setting-form" data-form-type="api-request-setting">
        <div class="form-group">
          <label for="api-name" class="form-label">${t('modal.api-setting.name')}</label>
          <div class="form-control">
            <input id="api-name" name="name" class="form-input" value="${name || ''}" required>
            <div class="error-message"></div>
          </div>
        </div>
        <div class="form-group">
          <label for="api-description" class="form-label">${t('modal.api-setting.desc')}</label>
          <textarea class="resize-none" id="api-description" name="desc">${desc || ''}</textarea>
        </div>
        <div class="form-group">
          <label for="api-setting-method" class="form-label">${t('modal.api-setting.http-method')}</label>
          <select class="form-select" id="api-setting-method" name="method">
            ${Object.entries(httpMethods).map(([key, val]) => `
              <option value="${val}" ${color === val ? 'selected' : ''}>
                ${key}
              </option>
            `)}
          </select>
        </div>
        <div class="form-group">
          <label for="api-setting-color" class="form-label">${t('modal.api-setting.color')}</label>
          <select class="form-select" id="api-setting-color" name="color">
            ${Object.entries(colorEnums).map(([key, val]) => `
              <option value="${val}" ${color === val ? 'selected' : ''}>
                ${t(`color.${val}`, key)}
              </option>
            `)}
          </select>
        </div>
        <div class="form-group">
          <label for="request-setting" class="form-label">${t('modal.api-setting.request')}</label>
          <div class="form-control">
            <textarea id="request-setting" name="request" class="resize-none">${request || ''}</textarea>
            <span class="error-message"></span>
          </div>
        </div>
        <div class="form-group">
          <label for="response-setting" class="form-label">${t('modal.api-setting.response')}</label>
          <div class="form-control">
            <textarea id="response-setting" name="response" class="resize-none">${response || ''}</textarea>
            <span class="error-message"></span>
          </div>
        </div>
        <div class="form-group">
          <input type="checkbox" id="is-auth-api" class="form-checkbox" name="is-auth" ${isAuthApi ? 'checked' : ''} />
          <label for="is-auth-api">${t('modal.api-setting.is-auth-api')}</label>
        </div>
      </form>
    `;
  }

  const createApiListItem = (datasource = []) => {
    const methods = Object.freeze({
      [httpMethods.GET]: 'primary',
      [httpMethods.POST]: 'success',
      [httpMethods.PUT]: 'warning',
      [httpMethods.PATCH]: 'info',
      [httpMethods.DELETE]: 'danger',
      [httpMethods.OPTIONS]: 'secondary',
      [httpMethods.HEAD]: 'secondary',
    });
    return datasource.map(({ id, name, method, desc }) => `
      <li class="api-list-item">
        <a href="#" data-api-id="${id}">
          <span class="api-method badge ${methods[method] || 'secondary'}">${method}</span>
          ${name}
        </a>
        <span class="api-action">
          ${desc || ''}
        </span>
      </li>
    `).join('') || '';
  };

  const createContainnerContent = (action = actionMode.LOBBY, dataSource) => {
    switch (action) {
      case actionMode.API_LIST:
        return createApiListItem(dataSource) || `<div class="empty-state">${t('api-list.empty')}</div>`;

      case actionMode.API_SETTING:
        return createApiSettingForm(dataSource);

      case actionMode.ENVIRONMENT_SETTINGS:
        return createEnvSettingForm(dataSource);

      case actionMode.ENVIRONMENT_VARIABLES:
        return createEnvVariableForm(dataSource);

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
  #envSettingKey = 'juntool-enviroment-settings';
  #envVariableKey = 'juntool-enviroment-variables';
  #apiSettingsKey = 'juntool-api-settings';
  #currentEnvKey = 'juntool-env';
  #currentLangKey = 'juntool-lang';

  constructor() {
    /** @type {any} Dynamic data, used when handling form */
    this.formData = {};
    /** @type {[]} Your enviroment settings */
    this.envSettings = [];
    /** @type {[]} Your enviroment variables */
    this.envVariables = [];
    /** @type {[]} Your api setting */
    this.apiSettings = [];
    /** @type {string} Selected environment */
    this.currentEnv = '';
    /** @type {string} Current language */
    this.currentLang = defaultLang;
    /** @type {actionMode} Current action mode */
    this.currentAction = actionMode.LOBBY;
    /** @type {string|null} Target API ID */
    this.targetId = null;
  }

  get btnToggleSidebar() { return $('#jun-tool #btn-toggle-sidebar'); }
  get wModal() { return $('#jun-tool .modal'); }
  get wHeaderModal() { return $('#jun-tool .modal .modal-header'); }
  get hTitleModal() { return $('#jun-tool .modal #title-modal'); }
  get wTabModal() { return $('#jun-tool .modal .modal-tabs'); }
  get wTabButtons() { return $$('#jun-tool .modal .modal-tabs .tab-button'); }
  get wContentModal() { return $('#jun-tool .modal .modal-content'); }
  get wOverlayModal() { return $('#jun-tool .modal .modal-overlay'); }
  get btnLocale() { return $('#jun-tool #btn-change-language'); }
  get btnClose() { return $('#jun-tool #btn-close-modal'); }
  get wApiSettingItems() { return $$('#jun-tool .modal .api-list-item'); }
  get btnAddNewApi() { return $('#jun-tool #btn-add-new-api'); }
  get btnBack() { return $('#jun-tool #btn-modal-back'); }
  get btnSaveChanges() { return $('#jun-tool #btn-savechanges'); }
  get btnOpenSetting() { return $('#jun-tool #btn-open-setting'); }

  #onOpenModal(mode = actionMode.API_LIST) {
    if (mode)
      this.currentAction = mode;

    this.#onPageBinding();
  }

  #onCloseModal() {
    this.currentAction = actionMode.LOBBY;
    this.#onPageBinding();
  }

  #onTabChange(event) {
    event.preventDefault();
    const isActiveTab = event.target.classList.contains('active');
    if (isActiveTab) return;

    this.currentAction = event.target.dataset['modalTab'] === modalTabs.API
      ? actionMode.API_LIST
      : actionMode.ENVIRONMENT_VARIABLES;

    this.#onPageBinding();
  }

  #onLanguageChange(event) {
    event.preventDefault();
    const selectedLang = event.target.dataset['lang'] || defaultLang;
    this.currentLang = selectedLang;
    localStorage.setItem(this.#currentLangKey, selectedLang);

    event.srcElement.closest('.dropdown-menu')?.classList.remove('show');
    this.refreshPage();
  }

  #onEnvironmentChange(event) {
    const value = event.target.value;
    const targetOption = event.target.selectedOptions[0];
    const isAddNewEnvCommand = value === 'add-new'
      || targetOption.attributes['command']?.value === 'add-new-env';
    if (isAddNewEnvCommand) {
      event.target.value = this.currentEnv || '';
      this.currentAction = actionMode.ENVIRONMENT_SETTINGS;
    }

    this.#onPageBinding();
  }

  #onPageChange() {
    this.#setFormData();

    this.btnBack.classList.toggle(
      'd-none',
      this.currentAction === actionMode.API_LIST || this.currentAction === actionMode.ENVIRONMENT_VARIABLES);
  }

  #onPageBinding() {
    // Show or hide the modal based on the current action
    if (this.currentAction === actionMode.LOBBY) {
      this.wModal.classList.add('d-none');
    } else {
      this.wModal.classList.remove('d-none');
    }

    // Handle after setting the current action
    this.#onPageChange();

    // Set the title and modal container based on the current action
    this.hTitleModal.innerText = uiBuilder.getHeaderModal(this.currentAction);
    const tabHTML = uiBuilder.createTabSettingElement(this.currentAction);
    this.wTabModal.innerHTML = tabHTML;

    // Set the content of the modal container based on the current action
    const modalContent = uiBuilder.createContainnerContent(this.currentAction, this.formData)
    const modalContainerUi = uiBuilder.createModalContentContainer(this.currentAction, modalContent);
    this.wContentModal.innerHTML = modalContainerUi;

    // Binding data for controls and set events
    this.#loadEnvDropdownList();
    this.#setModalEvent();
  }

  #loadEnvDropdownList() {
    const envControls = $$('select[control="ddl-select-environment"]');
    const envSelections = uiBuilder.createEnvDropdownItems(this.envSettings, this.currentEnv);
    envControls.forEach((dropdown) => {
      dropdown.innerHTML = envSelections;
      dropdown.addEventListener('change', (e) => this.#onEnvironmentChange(e));
    });
  }

  #setFormData() {
    switch (this.currentAction) {
      case actionMode.API_LIST:
        this.targetId = null;
        this.formData = [...this.apiSettings];
        break;

      case actionMode.API_SETTING:
        this.formData = this.apiSettings.find(api => api.id === this.targetId) || {};
        break;

      case actionMode.ENVIRONMENT_SETTINGS:
        this.targetId = null;
        this.formData = [...this.envSettings];
        break;

      case actionMode.ENVIRONMENT_VARIABLES:
        this.targetId = null;
        this.formData = [...this.envVariables];
        break;

      default:
        this.targetId = null;
        this.formData = {};
        break;
    };
  }

  #setModalEvent() {
    this.wTabButtons.forEach((btn) => {
      btn.addEventListener('click', (e) => this.#onTabChange(e));
    });

    // Set event for api list items, redirect to API setting page
    this.wApiSettingItems.forEach((item) => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const apiId = e.target.dataset['apiId'];
        if (apiId) {
          this.targetId = apiId;
          this.currentAction = actionMode.API_SETTING;
          this.#onPageBinding();
        }
      });
    });

    this.btnAddNewApi.addEventListener('click', (e) => {
      e.preventDefault();
      this.currentAction = actionMode.API_SETTING;
      this.targetId = null;
      this.#onPageBinding();
    });
  }

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

  #setUiEvent() {
    this.btnToggleSidebar.addEventListener('click', (e) => {
      e.preventDefault();
      const sidebar = $('#tool-sidebar');
      sidebar.classList.toggle('collapsed');
    });

    // Modal events
    this.btnOpenSetting.addEventListener('click', (e) => {
      e.preventDefault();

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
      this.#onOpenModal(redirectAction);
    });
    this.btnSaveChanges.addEventListener('click', (e) => {
      e.preventDefault();
      // Handle save changes logic here
    });
    this.#setLocaleEvent();
  }

  #renderUI() {
    const rootNode = $('#jun-tool') || document.createElement('div');
    rootNode.id = 'jun-tool';
    rootNode.innerHTML = uiBuilder.createDefaultUI();
    document.body.appendChild(rootNode);
  }

  #setInitSetting() {
    this.envSettings = tryParseJSON(localStorage.getItem(this.#envSettingKey), []);
    this.envVariables = tryParseJSON(localStorage.getItem(this.#envVariableKey), []);
    this.apiSettings = tryParseJSON(localStorage.getItem(this.#apiSettingsKey), []);
    this.currentEnv = localStorage.getItem(this.#currentEnvKey) || '';
    this.currentLang = localStorage.getItem(this.#currentLangKey) || defaultLang;
  }

  refreshPage() {
    this.#setInitSetting();
    this.#renderUI();
    this.#setUiEvent();
    this.#onPageBinding();
  }

  static init() {
    const instance = new SwaggerFaster();
    console.log("SwaggerFaster initialized");
    instance.refreshPage();
    console.log("SwaggerFaster executed");
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => SwaggerFaster.init());
} else {
  SwaggerFaster.init();
}
