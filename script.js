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
  'dialog.confirm-save': {
    'en': 'Do you want to save changes before closing?',
    'vi': 'Bạn có muốn lưu thay đổi trước khi đóng không?',
    'zh-TW': '您要在關閉之前保存更改嗎？',
  },
  'dialog.confirm-delete': {
    'en': 'Are you sure you want to delete this item?',
    'vi': 'Bạn có chắc chắn muốn xóa mục này không?',
    'zh-TW': '您確定要刪除此項目嗎？',
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
  'modal.title.env-var': {
    'en': 'Environment Variables',
    'vi': 'Biến môi trường',
    'zh-TW': '環境變數',
  },
  'modal.title.your-env-var': {
    'en': 'Your Variables ( ${name} )',
    'vi': 'Biến của bạn ( ${name} )',
    'zh-TW': '您的變數 ( ${name} )',
  },
  'modal.env-var.hard-setting.host': {
    'en': 'Host ( ${host} )',
    'vi': 'Máy chủ ( ${host} )',
    'zh-TW': '主機 ( ${host} )',
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
  'modal.api-setting.endpoint': {
    'en': 'Endpoint',
    'vi': 'Điểm cuối',
    'zh-TW': '端點',
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
  'modal.api-list.empty': {
    'en': 'No APIs found. Please add a new API.',
    'vi': 'Không tìm thấy API nào. Vui lòng thêm API mới.',
    'zh-TW': '未找到任何 API。請添加新的 API。',
  },
  'modal.api-list.add-new': {
    'en': 'Add New API',
    'vi': 'Thêm API mới',
    'zh-TW': '新增 API',
  },
  'modal.api-list.api-name': {
    'en': 'API Name',
    'vi': 'Tên API',
    'zh-TW': 'API 名稱',
  },
  'modal.api-list.api-description': {
    'en': 'API Description',
    'vi': 'Mô tả API',
    'zh-TW': 'API 描述',
  },
  'modal.api-list.api-color': {
    'en': 'API Color',
    'vi': 'Màu sắc API',
    'zh-TW': 'API 顏色',
  },
  'modal.api-list.api-action': {
    'en': 'Actions',
    'vi': 'Hành động',
    'zh-TW': '操作',
  },
  'modal.api-list-item.endpoint-to': {
    'en': 'To',
    'vi': 'Đến',
    'zh-TW': '至',
  },
  'modal.env-setting.name': {
    'en': 'Environment Name',
    'vi': 'Tên môi trường',
    'zh-TW': '環境名稱',
  },
  'validation.required': {
    'en': 'This field is required.',
    'vi': 'Trường này là bắt buộc.',
    'zh-TW': '此欄位為必填。',
  },
  'validation.invalid-url': {
    'en': 'Invalid URL format.',
    'vi': 'Định dạng URL không hợp lệ.',
    'zh-TW': '無效的 URL 格式。',
  },
  'validation.invalid-http-method': {
    'en': 'Invalid HTTP method.',
    'vi': 'Phương thức HTTP không hợp lệ.',
    'zh-TW': '無效的 HTTP 方法。',
  },
  'validation.invalid-color': {
    'en': 'Invalid color selection.',
    'vi': 'Lựa chọn màu không hợp lệ.',
    'zh-TW': '無效的顏色選擇。',
  },
  'validation.invalid-json': {
    'en': 'Invalid JSON format.',
    'vi': 'Định dạng JSON không hợp lệ.',
    'zh-TW': '無效的 JSON 格式。',
  },
  'validation.invalid-env-name': {
    'en': 'Invalid environment name. Must start with a letter and contain only letters, numbers, and underscores.',
    'vi': 'Tên môi trường không hợp lệ. Phải bắt đầu bằng chữ cái và chỉ chứa chữ cái, số và dấu gạch dưới.',
    'zh-TW': '無效的環境名稱。必須以字母開頭，並且只能包含字母、數字和下劃線。',
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
  Light: 'light',
  Dark: 'dark',
});

/** Color mapping for HTTP methods, used in UI elements. */
const methodColors = Object.freeze({
  [httpMethods.GET]: 'primary',
  [httpMethods.POST]: 'success',
  [httpMethods.PUT]: 'warning',
  [httpMethods.PATCH]: 'info',
  [httpMethods.DELETE]: 'danger',
  [httpMethods.OPTIONS]: 'secondary',
  [httpMethods.HEAD]: 'secondary',
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

const toastType = Object.freeze({
  Success: 'success',
  Warn: 'warning',
  Error: 'error',
  Info: 'info',
});

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

function showToast(message, type = 'info', duration = 3000) {
  const container = document.getElementById('jun-toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `jun-toast ${type}`;
  toast.textContent = message;

  toast.style.setProperty('--hide-delay', `${duration}ms`);
  container.appendChild(toast);

  const totalDuration = duration + 300;
  setTimeout(() => {
    toast.remove();
  }, totalDuration + 100);
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

  const apiSettingValidations = Object.freeze({
    name: [isRequired],
    endpoint: [isRequired, isValidUrl],
    method: [isValidHttpMethod],
    color: [isValidColor],
    request: [isRequired, isValidJson],
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
        <ul class="api-action-group overflow-scroll-y mh-50vh"></ul>
        <div class="response-result">
          <h3>
            ${t('sidebar.response.title')}
            <button class="btn-control icon-badge light" id="btn-copy-response" title="${t('sidebar.response.copy')}">📃</button>
          </h3>
          <div class="card json-viewer"></div>
        </div>
        <div class="tool-setting">
          <a href="#" id="btn-open-setting" class="btn-control secondary action-control">${t('btn.setting')}</a>
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
    return datasource.map(({ id, name, method, color }) => `
      <li class="api-action-group-item bg-${color} bg-${color}-hover">
        <a href="#" class="btn-control api-action-control" data-api-id="${id}">
          <span class="api-method badge ${methodColors[method] || methodColors[httpMethods.GET]}">${method}</span>
          ${name}
        </a>
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
          <a href="#" id="btn-add-new-env" class="btn-control light">${t('btn.add-new')}</a>
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

  const createEnvVariableForm = ({ envSettings = [], selectedEnv = '', variables = [] }) => {
    const hardSettings = variables.filter(item => item.isHardSetting);
    const hostSetting = hardSettings.find(item => item.name === 'host')?.value || '';
    const softSettings = variables.filter(item => !item.isHardSetting);
    return `
      <form id="enviroment-variable-form">
        <div class="form-group grid-3 mb-2">
          <label for="ddl-select-environment" class="form-label">${t('sidebar.env.title')}:</label>
          <select id="ddl-select-environment" class="form-select span-2" control="ddl-select-environment" required>
            ${createEnvDropdownItems(envSettings, selectedEnv)}
          </select>
        </div>
        <h3>${t('modal.title.env-var')}</h3>
        <div class="list-wrapper" data-env-type="hard-setting">
          <div class="form-group grid-3 gap-1">
            <label for="tb-env-host" class="form-label">${t('modal.env-var.hard-setting.host')}:</label>
            <div class="form-control span-2">
              <input id="tb-env-host" name="host" class="form-input" value="${hostSetting}" data-env-input-type="value" required ${!selectedEnv ? 'disabled' : ''}>
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
                  <input class="form-input" data-env-input-type="value" value="${value}" required>
                  <span class="error-message"></span>
                </div>
                <button class="btn-control icon-badge light" data-action="delete-variable" title="${t('tooltip.delete')}">🗑️</button>
              </div>
            `).join('')}
          ${selectedEnv ? `<a href="#" id="btn-add-new-var" class="btn-control light">${t('btn.add-new')}</a>` : ''}
        </div>
      </form>
    `;
  }

  const createApiSettingForm = ({ name, desc, endpoint, request, color, isAuthApi }) => {
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
          <textarea class="resize-none" id="api-description" name="desc" data-action="form-input">${desc || ''}</textarea>
        </div>
        <div class="grid grid-2">
          <div class="form-group">
            <label for="api-setting-method" class="form-label">${t('modal.api-setting.http-method')}</label>
            <select class="form-select" id="api-setting-method" name="method" data-action="form-input">
              ${Object.entries(httpMethods).map(([key, val]) => `
                <option value="${val}" ${color === val ? 'selected' : ''}>
                  ${key}
                </option>
              `)}
            </select>
          </div>
          <div class="form-group">
            <label for="api-setting-color" class="form-label">${t('modal.api-setting.color')}</label>
            <select class="form-select" id="api-setting-color" name="color" data-action="form-input">
              ${Object.entries(colorEnums).map(([key, val]) => `
                <option value="${val}" ${color === val ? 'selected' : ''}>
                  ${t(`color.${val}`, key)}
                </option>
              `)}
            </select>
          </div>
        </div>
        <div class="form-group">
          <label for="api-setting-endpoint" class="form-label">${t('modal.api-setting.endpoint')}</label>
          <div class="form-control">
            <input id="api-setting-endpoint" name="endpoint" class="form-input" value="${endpoint || ''}" data-action="form-input" required />
            <span class="error-message"></span>
          </div>
        </div>
        <div class="form-group">
          <label for="api-setting-request" class="form-label">${t('modal.api-setting.request')}</label>
          <div class="form-control">
            <textarea id="api-setting-request" name="request" class="resize-none" data-action="form-input" required>${request || ''}</textarea>
            <span class="error-message"></span>
          </div>
        </div>
        <div class="form-group">
          <input type="checkbox" id="api-setting-is-auth" class="form-checkbox" name="is-auth" ${isAuthApi ? 'checked' : ''} data-action="form-input" />
          <label for="api-setting-is-auth">${t('modal.api-setting.is-auth-api')}</label>
        </div>
      </form>
    `;
  }

  const createApiListItem = (datasource = []) => {
    return datasource.map(({ id, name, method, endpoint, color, desc }) => `
      <li class="api-list-item bg-${color || 'primary'} bg-${color || 'primary'}-hover">
        <div class="api-setting-content">
          <p class="api-item-endpoint">${t('modal.api-list-item.endpoint-to')}: ${endpoint}</p>
          <a href="#" data-api-id="${id}">
            <span class="api-method badge ${methodColors[method] || methodColors[httpMethods.GET]}">${method}</span>
            <span class="api-item-title">${name}</span>
          </a>
          <span class="api-item-desc">
            ${desc || ''}
          </span>
        </div>
        <button class="btn-control icon-badge info font-xs" data-action="copy-insert-api" title="${t('tooltip.copy-insert')}">💾</button>
        <button class="btn-control icon-badge dark font-xs" data-action="delete-api" title="${t('tooltip.delete')}">🗑️</button>
      </li>
    `).join('') || '';
  };

  const createContainnerContent = (action = actionMode.LOBBY, dataSource, envSettings = [], selectedEnv) => {
    switch (action) {
      case actionMode.API_LIST:
        return createApiListItem(dataSource) || `<div class="empty-state">${t('modal.api-list.empty')}</div>`;

      case actionMode.API_SETTING:
        return createApiSettingForm(dataSource);

      case actionMode.ENVIRONMENT_SETTINGS:
        return createEnvSettingForm(dataSource);

      case actionMode.ENVIRONMENT_VARIABLES:
        const targetItem = dataSource.find(item => item.envId === selectedEnv);
        return createEnvVariableForm({ envSettings, selectedEnv, variables: targetItem?.items || [] });

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
      req: {},
      res: {},
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
   *  @type {{ id: string, name: string, desc: string, endpoint: string, method: httpMethods, color: colorEnums, req: Object, isAuth: boolean }[]} */
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
   *  req: Object,
   *  isAuth: boolean }} apiSetting API setting object to fetch 
   */
  async #fetchApiSettings(apiSetting) {
    const { name, endpoint, method, req, isAuth } = apiSetting || {};
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
        body: req && method !== httpMethods.GET
          ? JSON.stringify(this.resolveObjectVars(req))
          : undefined,
      };
      const response = await fetch(this.resolveVars(endpoint), option);
      if (!response.ok) {
        Toast.error(t('message.fetch-api.fetch-error'));
        throw new Error(`Failed to fetch API settings: ${response.statusText}`);
      }

      const data = await response.json();
      this.apiResponse = data;
      this.#displayResponseChange();

      isAuth && this.#autoSetToken(data.data.token || '');

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
   * Set default input item form data based on the action type.
   * @param {Object} input Input object to set default values for
   * @param {actionMode} type Type of action to determine which default data to use
   * @returns {Object} Input object with default values set based on the action type
   */
  setDefaultInputItemFormData(input, type) {
    const autoSet = (input, defaultInput) => {
      Object.entries(defaultInput).forEach(([key, value]) => {
        if (!input[key]) input[key] = value;
      });
      return input;
    }
    switch (type) {
      case actionMode.API_SETTING:
        return autoSet(input, this.#defaultApiSettingData);

      case actionMode.ENVIRONMENT_SETTINGS:
        return autoSet(input, this.#defaultEnvSettingData);

      case actionMode.ENVIRONMENT_VARIABLES:
        return autoSet(input, this.#defaultEnvVariableItem);

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
      this.isPageDataChange = true;
    } else {
      this.currentEnv = event.target.value;
    }

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
      targetItem.value = event.target.value;
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
      let targetItem = this.formData.dataSource.find(item => item.envId === this.currentEnv);
      if (!targetItem) {
        this.formData.dataSource = [...this.formData.dataSource, this.#defaultEnvVariableData];
        targetItem = this.formData.dataSource.find(item => item.envId === this.currentEnv);
      };

      const inputName = event.target.dataset['envInputType'] || '';
      if (!inputName) return;

      if (type === 'soft-setting') {
        const variableId = event.target.closest('.form-group').dataset['targetId'] || '';
        if (!variableId) return;

        const inputValue = event.target.value.trim();

        // Validate the input value
        const errorMessage = validator.validateVariableSettingItem(inputName, inputValue);
        this.#setInputErrorMessage(event, errorMessage);
        if (errorMessage) return;

        const variableItem = targetItem.items.find(item => item.id === variableId);
        // If the variable item already exists, update its value
        if (variableItem) {
          variableItem[event.target.dataset['envInputType']] = event.target.value;
          return;
        }

        // If the variable item does not exist, create a new one
        const newVariable = { id: variableId, isHardSetting: false };
        newVariable[inputName] = inputValue;
        targetItem.items = [newVariable];
      } else if (type === 'hard-setting') {
        const name = event.target.name.trim();
        const value = event.target.value.trim();
        const errorMessage = validator.validateVariableSettingItem(inputName, value);
        this.#setInputErrorMessage(event, errorMessage);
        if (errorMessage && errorMessage !== '') return;

        const variableItem = targetItem.items
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

        targetItem.items = [...targetItem.items, newItem];
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
        if (errorMessage) return;

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
        const [isEnvFormError, envErrorMessages] = validator.validateEnvSetting(
          this.formData.dataSource.map(item => this.setDefaultInputItemFormData(item, actionMode.ENVIRONMENT_SETTINGS)));
        this.#setEnvErrorMessage(envErrorMessages);
        if (isEnvFormError) return;

        this.envSettings = this.formData.dataSource;
        if (!this.currentEnv) this.currentEnv = this.envSettings[0]?.id || '';
        if (this.envSettings.length === 0) this.currentEnv = '';
        break;

      case actionMode.ENVIRONMENT_VARIABLES:
        const targetEnvVariables = this.formData.dataSource.find(item => item.envId === this.currentEnv);
        if (!targetEnvVariables) return;

        const [isVariableFormError, varErrorMessages] = validator.validateVariableSetting(
          targetEnvVariables.items.map(item => this.setDefaultInputItemFormData(item, actionMode.ENVIRONMENT_VARIABLES)));
        this.#setVariableErrorMessage(varErrorMessages);
        if (isVariableFormError) return;

        this.envVariables = this.formData.dataSource;
        break;

      case actionMode.API_SETTING:
        const [isApiFormError, apiSettingErrorMessages] = validator.validateApiSetting(
          this.resolveObjectVars(
            this.setDefaultInputItemFormData(this.formData.dataSource, actionMode.API_SETTING)));
        this.#setApiSettingErrorMessage(apiSettingErrorMessages);
        if (isApiFormError) return;

        const settingIndex = this.apiSettings.findIndex(setting => setting.id === this.targetId);
        if (settingIndex < 0) {
          this.apiSettings = [this.formData.dataSource, ...this.apiSettings];
        } else {
          const settings = [...this.apiSettings];
          settings[settingIndex] = this.formData.dataSource
          this.apiSettings = [...settings];
        }

        this.targetId = null;
        this.isPageDataChange = true;
        this.currentAction = actionMode.API_LIST;
        this.#onPageBinding();
        return;

      default:
        throw new Error(`Fail to save changes (action: ${this.formData.type})`);
    }
  }

  /**
   * Execute function when binding page, reset data from local storage data
   */
  #onPageChange() {
    if (this.isPageDataChange)
      this.#setFormData();

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
    const apiActionItems = uiBuilder.createApiActionGroupItems(this.apiSettings);
    this.wApiActionGroup.innerHTML = apiActionItems;

    // Set the title and modal container based on the current action
    this.hTitleModal.innerText = uiBuilder.getHeaderModal(this.currentAction);
    const tabHTML = uiBuilder.createTabSettingElement(this.currentAction);
    this.wTabModal.innerHTML = tabHTML;

    // Set the content of the modal container based on the current action
    const modalContent = uiBuilder.createContainnerContent(
      this.currentAction,
      this.resolveObjectVars(this.formData.dataSource),
      this.envSettings,
      this.currentEnv);
    const modalContainerUi = uiBuilder.createModalContentContainer(this.currentAction, modalContent);
    this.wContentModal.innerHTML = modalContainerUi;

    // Binding data for controls and set events
    this.#loadEnvDropdownList();
    this.#clearErrorMessage();
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
          const newVars = this.envVariables;
          newVars[envVarIndex].items = [...missingHardEnvs, ...this.envVariables[envVarIndex].items];
          this.envVariables = newVars;
        }

        this.formData = {
          type: actionMode.ENVIRONMENT_VARIABLES,
          dataSource: [...this.envVariables],
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
        debugger
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
      this.#onPageBinding(false);
    });

    this.btnRemoveEnvs.forEach(element => {
      element.addEventListener('click', (event) => {
        event.preventDefault();
        if (!confirm(t('dialog.confirm-delete'))) return;

        const targetId = event.target.closest('.form-group')
          ?.dataset['targetId'] || '';
        const newForms = this.formData.dataSource.filter(data => data.id !== targetId);
        this.formData.dataSource = [...newForms];

        this.isPageDataChange = true;
        this.#onPageBinding();
      });
    });

    this.btnAddNewVariable?.addEventListener('click', (e) => {
      e.preventDefault();
      let targetGroup = this.formData.dataSource.find(item => item.envId === this.currentEnv);
      if (!targetGroup) {
        this.formData.dataSource = [...this.formData.dataSource, this.#defaultEnvVariableData];
        targetGroup = this.formData.dataSource.find(item => item.envId === this.currentEnv);
      }
      const newItem = {
        id: crypto.randomUUID(),
        isHardSetting: false,
        name: '',
        value: '',
      };
      targetGroup.items = [...targetGroup.items, newItem];

      this.#onPageBinding(false);
    });

    this.btnAddRemoveVars.forEach(element => {
      element.addEventListener('click', (event) => {
        event.preventDefault();
        if (!confirm(t('dialog.confirm-delete'))) return;

        const targetId = event.target.closest('.form-group')
          ?.dataset['targetId'] || '';
        const targetGroup = this.formData.dataSource.find(data => data.envId === this.currentEnv);
        if (!targetGroup) return;

        const newForms = targetGroup.items.filter(data => data.id !== targetId);
        targetGroup.items = [...newForms];

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
    this.btnSaveChanges.addEventListener('click', (e) => this.#onSaveChanges(e));

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
   */
  refreshPage() {
    this.#renderUI();
    this.#setUiEvent();
    this.#onPageBinding();
  }

  /**
   * Initialize the SwaggerFaster class and set up the initial state.
   */
  static init() {
    const instance = new SwaggerFaster();
    console.log("SwaggerFaster initialized");
    instance.refreshPage();
    console.log("SwaggerFaster executed");
  }
}

// Execute class
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => SwaggerFaster.init());
} else {
  SwaggerFaster.init();
}
