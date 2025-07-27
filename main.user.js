// ================================================
// File:  Main script (main.user.js)
// Description: The main script will be imported from tampermonkey, this file will import other scripts
// Copyright (c) 2025. Jun Dev
// ================================================

import { t } from './core/i18n/translate.js';
import { $, $$ } from './core/utils/helpers.js';
import { Toast, UIBuilder, renderJsonFormattedStrict } from './core/ui/index.js';
import { validator } from './core/form/validate.js';
import { HttpMethods, actionMode, modalTabs, DefaultFormData, Store } from './core/data/index.js';
import { config } from './config.js';

export class SwaggerFaster {
  #modalFormIds = Object.freeze({
    [actionMode.API_SETTING]: 'api-setting-form',
    [actionMode.ENVIRONMENT_SETTINGS]: 'enviroment-setting-form',
    [actionMode.ENVIRONMENT_VARIABLES]: 'enviroment-variable-form',
  });

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
    /** @type {number|null} Timeout ID */
    this.timeoutId = null;
    /** @type {string|null} API response */
    this.apiResponse = null;
    /** @type {string} Pre-authentication token, used to store the token before login */
    this.preAuthToken = '';
    /** @type {string} Pre-session key, used to store the session key before login */
    this.preSessionKey = '';
    /** @type {boolean} Fetching state */
    this.isFetching = false;
    /** @type {boolean} Modal searching state */
    this.isSearching = false;
    /** @type {boolean} Sidebar loading state */
    this.isSidebarLoading = false;
  }

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
   * @param {ApiSetting} apiSetting API setting object to fetch 
   */
  async #fetchApiSettings(apiSetting) {
    const { name, endpoint, method, request, successEvent, isAuth } = apiSetting || {};
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
        body: request && method !== HttpMethods.GET
          ? this.#resolveCookiePattern(this.#resolveObjectVars(request))
          : undefined,
      };
      const response = await fetch(this.#resolveVars(endpoint), option);
      const data = await response.json();
      this.apiResponse = data;
      this.#displayResponseChange();

      if (successEvent.trim()) this.#onFetchSuccess(successEvent);

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

  /**
   * Execute success event
   * @param {string} successEvent Success event 
   */
  #onFetchSuccess(successEvent) {
    this.apiResponse;
    try {
      const script = this.#resolveCookiePattern(this.#resolveVars(successEvent));
      const onSuccess = new Function('data', 'setStore', script);
      onSuccess(this.apiResponse, this.#setTempCookie);
    } catch (error) {
      console.error('Error executing success event:', error);
    }
  }

  /**
   * Set token
   * @param {string} token Token 
   * @param {boolean} isAuth Is auth 
   */
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

  /**
   * Display API response
   */
  #displayResponseChange() {
    this.btnCopyResponse.disabled = !this.apiResponse;

    if (!this.apiResponse) {
      this.wApiResponse.textContent = t('message.api-response.empty');
      return;
    }

    const jsonContent = renderJsonFormattedStrict(this.apiResponse);
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
  // Cookie Functions
  // ================================================
  #resolveObjectCookiePattern(input) {
    const convert = (obj) => Object.fromEntries(
      Object.entries(obj).map(([key, val]) => [
        key,
        typeof val === 'string' ? this.#resolveCookiePattern(val, '') :
        typeof val === 'number' ? this.#resolveCookiePattern(val.toString(), 0) :
        typeof val === 'boolean' ? this.#resolveCookiePattern(val.toString(), false) : val,
      ])
    );

    switch (typeof input) {
      case 'object':
        return Array.isArray(input)
          ? input.map(convert)
          : convert(input);

      case 'string':
        return this.#resolveVars(input);

      default:
        return input;
    }
  }

  /**
   * Resolve cookie pattern
   * @param {string} input Input string to resolve variables 
   */
  #resolveCookiePattern(input, defaultValue = '') {
    return input.replace(/@@(.*?)@@/g, (_, key) => {
      const raw = this.#getTempCookie(key);
      if (!raw) return defaultValue;
      try {
        const decoded = decodeURIComponent(escape(atob(raw)));
        return decoded;
      } catch (e) {
        return defaultValue;
      }
    });
  }
  
  /**
   * Set temporary cookie
   * @param {string} key Cookie key
   * @param {string} value Cookie value
   */
  #setTempCookie(key, value) {
    const encoded = btoa(unescape(encodeURIComponent(value)));
    const expire = new Date(Date.now() + config.tempCookieExpiry).toUTCString();
    document.cookie = `${config.tempCookieKey}${key}=${encoded}; expires=${expire}; path=/`;
  }
  
  /**
   * Get temporary cookie
   * @param {string} name Cookie name
   * @returns {string} Cookie value
   */ 
  #getTempCookie(name) {
    const match = document.cookie.match(new RegExp("(^| )" + config.tempCookieKey + name + "=([^;]+)"));
    return match ? match[2] : '';
  }

  // ================================================
  // Common Functions
  // ================================================

  /**
   * Bind events to the page elements.
   * @param {string} input Input string to resolve variables
   * @returns {string} Resolved input string with environment variables replaced
   */
  #resolveVars(input = '') {
    if (!input || !Store.envReplacer || Store.envReplacer.length === 0) return input;

    let result = input;
    for (const [name, value] of Store.envReplacer) {
      const regex = new RegExp(`\\$\\{${name}\\}`, 'g');
      result = result.replace(regex, value);
    }
    return result;
  }

  /**
   * Resolve variables in an array, object or string.
   * @param {[] | {} | string} input Input array, object or string
   * @returns {string} Resolved input
   */
  #resolveObjectVars(input) {
    const convert = (obj) => Object.fromEntries(
      Object.entries(obj).map(([key, val]) => [
        key,
        typeof val === 'string' ? this.#resolveVars(val) : val,
      ])
    );

    switch (typeof input) {
      case 'object':
        return Array.isArray(input)
          ? input.map(convert)
          : convert(input);

      case 'string':
        return this.#resolveVars(input);

      default:
        return input;
    }
  }

  /**
   * Find missing replacers in the input string.
   * @param {string} input Input string to search for missing replacers
   * @returns {string[]} Array of missing replacer names
   */
  #findMissingReplacers(input = '') {
    if (!input) return [];

    const matches = [...input.matchAll(/\$\{(.*?)\}/g)].map(m => m[1]);
    const definedNames = new Set(Store.envReplacer ? Store.envReplacer.map(([k]) => k) : []);
    const missing = matches.filter(name => !definedNames.has(name));

    return [...new Set(missing)];
  }

  /**
   * Map to input form data based on the action type.
   * @param {Object} input Input object to set default values for
   * @param {actionMode} type Type of action to determine which default data to use
   * @returns {Object} Input object with default values set based on the action type
   */
  #mapToFormData(input, type) {
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
        return autoMapping(input, DefaultFormData.defaultApiSettingData);

      case actionMode.ENVIRONMENT_SETTINGS:
        return autoMapping(input, DefaultFormData.defaultEnvSettingData);

      case actionMode.ENVIRONMENT_VARIABLES:
        return autoMapping(input, DefaultFormData.defaultEnvVariableItem);

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
   * @param {[{ itemIndex: number, errors: ErrorInfo[]}]} errorMessages Error messages for each item 
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
   * @param {[{ itemIndex: number, errors: ErrorInfo[]}]} errorMessages Error messages for each item 
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
   * @param {[{ itemIndex: number, errors: ErrorInfo[]}]} errorMessages Error messages for each item 
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
      const errorElement = input.closest('.form-group').querySelector('.error-message');

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

    const targetApi = Store.apiSettings.find(api => api.id === apiId);
    if (!targetApi) return;

    this.isFetching = true;
    const refSetting = Store.apiSettings.find(api => api.id === targetApi.refTo);
    if (!refSetting){
      await this.#fetchApiSettings(targetApi);
      return;
    }

    await this.#fetchApiSettings(refSetting);
    setTimeout(() => {
      this.#fetchApiSettings(targetApi);
    }, targetApi.callAfter || 0);
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
    Store.currentLang = selectedLang;

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
      event.target.value = Store.currentEnv || '';
      this.currentAction = actionMode.ENVIRONMENT_SETTINGS;
    } else {
      Store.currentEnv = event.target.value;
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
    const inputName = event.target.name;
    if (!inputName) return;

    switch (event.target.type) {
      case 'checkbox':
        this.formData.dataSource[inputName] = event.target.checked;
        break;

      case 'radio':
        this.formData.dataSource[inputName] = event.target.value;
        break;

      default:
        const value = this.#resolveCookiePattern(this.#resolveVars(event.target.value.trim()));
        const missingReplacers = this.#findMissingReplacers(value);
        if (missingReplacers.length > 0) {
          this.#setInputErrorMessage(event, t('validation.missing-replacer', missingReplacers.join(', ')));
          break;
        }

        const errorMessage = validator.validateApiSettingItem(inputName, value);
        this.#setInputErrorMessage(event, errorMessage);
        this.formData.dataSource[inputName] = event.target.value.trim();
    }

    if (inputName === 'mode' || inputName === 'refTo')
      this.#onPageBinding();
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
      .map(item => this.#mapToFormData(item, actionMode.ENVIRONMENT_SETTINGS));
    const [isEnvFormError, envErrorMessages] = validator.validateEnvSetting(envFormDatas);
    this.#setEnvErrorMessage(envErrorMessages);
    if (isEnvFormError) return;

    Store.envSettings = [...envFormDatas];
    if (!Store.currentEnv || !Store.envSettings.some(i => i.id == Store.currentEnv))
      Store.currentEnv = Store.envSettings[0]?.id || '';

    if (Store.envSettings.length === 0) Store.currentEnv = '';

    const validEnvVars = Store.envVariables.filter(item => Store.envSettings.some(env => env.id === item.envId));
    Store.envVariables = [...validEnvVars];
    Toast.success(t('message.save-changes.env.success'));
  }

  /**
   * Save variable changes
   */
  #saveVariableChanges() {
    const varFormDatas = this.formData.dataSource
      .map(item => this.#mapToFormData(item, actionMode.ENVIRONMENT_VARIABLES));
    const [isVariableFormError, varErrorMessages] = validator.validateVariableSetting(varFormDatas);
    this.#setVariableErrorMessage(varErrorMessages);
    if (isVariableFormError) return;

    const currentVars = [...Store.envVariables];
    const targetVarIndex = currentVars.findIndex(item => item.envId === Store.currentEnv);
    if (targetVarIndex < 0) {
      const newEnvVar = DefaultFormData.defaultEnvVariableData;
      newEnvVar.envId = Store.currentEnv;
      newEnvVar.items = [...this.formData.dataSource];
      Store.envVariables = [...Store.envVariables, newEnvVar];
    } else {
      const updateEnvVars = [...Store.envVariables];
      updateEnvVars[targetVarIndex].items = [...this.formData.dataSource];
      Store.envVariables = [...updateEnvVars];
    }
    Toast.success(t('message.save-changes.variable.success'));
  }

  /**
   * Save API setting changes
   */
  #saveApiSettingChanges() {
    const apiFormData = this.#mapToFormData(this.formData.dataSource, actionMode.API_SETTING);
    const [isApiFormError, apiSettingErrorMessages] = validator.validateApiSetting(
      this.#resolveObjectCookiePattern(this.#resolveObjectVars(apiFormData)));
    this.#setApiSettingErrorMessage(apiSettingErrorMessages);
    if (isApiFormError) return;

    const settingIndex = Store.apiSettings.findIndex(setting => setting.id === this.targetId);
    if (settingIndex < 0) {
      Store.apiSettings = [apiFormData, ...Store.apiSettings];
    } else {
      apiFormData.modifiedAt = new Date().toISOString();
      const settings = [...Store.apiSettings];
      settings[settingIndex] = apiFormData;
      Store.apiSettings = [...settings];
    }

    this.targetId = null;
    this.isPageDataChange = true;
    this.currentAction = actionMode.API_LIST;
    this.#onPageBinding();
    Toast.success(t('message.save-changes.api-setting.success'));
  }

  /**
   * Execute function when binding page, reset data from local storage data
   */
  #onPageChange() {
    if (this.isPageDataChange) {
      this.#setFormData();
      this.#clearErrorMessage();
      Store.apiListFilter = { ...DefaultFormData.defaultApiFilter };
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

    // Show or hide the sidebar based on the current action
    $('#tool-sidebar').classList.toggle('collapsed', Store.isCollabsedSidebar);

    // Handle after setting the current action
    this.#onPageChange();

    // Set the form data based on the current action
    const apiActionItems = UIBuilder.createApiActionGroupItems(this.#resolveObjectVars(Store.apiSettings));
    this.wApiActionGroup.innerHTML = apiActionItems;

    // Set the title and modal container based on the current action
    this.hTitleModal.innerText = UIBuilder.getHeaderModal(this.currentAction);
    const tabHTML = UIBuilder.createTabModalTabs(this.currentAction);
    this.wTabModal.innerHTML = tabHTML;

    // Set the content of the modal container based on the current action
    const modalContent = UIBuilder.createContainnerContent(
      this.currentAction,
      this.#resolveObjectVars(this.formData.dataSource),
      Store.currentEnv);
    const modalContainerUi = UIBuilder.createModalContentContainer(this.currentAction, modalContent);
    this.wContentModal.innerHTML = modalContainerUi;

    // Binding data for controls and set events
    this.#loadEnvDropdownList();
    this.#displayResponseChange();
    this.#setModalEvent();
    this.#setLobbyEvent();
  }

  // ================================================
  // Set form Events
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

  #setFormFilterChanges() {
    const searchBox = this.wContentModal.querySelector('input#api-list-filter-search');
    searchBox?.addEventListener('keyup', (e) => {
      e.preventDefault();
      clearTimeout(this.timeoutId);
      this.timeoutId = setTimeout(() => {
        this.isSearching = true;
        const filter = {...Store.apiListFilter};
        filter.search = e.target.value.trim();
        Store.apiListFilter = filter;
        this.#onPageBinding();
        this.isSearching = false;
      }, 500);
    });

    const modeSelect = this.wContentModal.querySelector('select#api-list-filter-mode');
    modeSelect?.addEventListener('change', (e) => {
      e.preventDefault();
      this.isSearching = true;
      const filter = {...Store.apiListFilter};
      filter.mode = e.target.value.trim();
      Store.apiListFilter = filter;
      this.#onPageBinding();
      this.isSearching = false;
    });

    const methodSelect = this.wContentModal.querySelector('select#api-list-filter-method');
    methodSelect?.addEventListener('change', (e) => {
      e.preventDefault();
      this.isSearching = true;
      const filter = {...Store.apiListFilter};
      filter.method = e.target.value.trim();
      Store.apiListFilter = filter;
      this.#onPageBinding();
      this.isSearching = false;
    });

    const sortSelect = this.wContentModal.querySelector('select#api-list-order-by-key');
    sortSelect?.addEventListener('change', (e) => {
      e.preventDefault();
      this.isSearching = true;
      const filter = {...Store.apiListFilter};
      filter.sort = e.target.value.trim();
      Store.apiListFilter = filter;
      this.#onPageBinding();
      this.isSearching = false;
    });

    const sortDirectionSelect = this.wContentModal.querySelector('select#api-list-order-by-direction');
    sortDirectionSelect?.addEventListener('change', (e) => {
      e.preventDefault();
      this.isSearching = true;
      const filter = {...Store.apiListFilter};
      filter.sortDirection = e.target.value.trim();
      Store.apiListFilter = filter;
      this.#onPageBinding();
      this.isSearching = false;
    });
  }

  /**
   * Load all of environment dropdown list
   */
  #loadEnvDropdownList() {
    const envControls = $$('select[control="ddl-select-environment"]');
    const envSelections = UIBuilder.createEnvDropdownItems(Store.envSettings, Store.currentEnv);
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
          dataSource: [...Store.apiSettings],
        };
        break;

      case actionMode.API_SETTING:
        const targetSetting = Store.apiSettings.find(api => api.id === this.targetId) || DefaultFormData.defaultApiSettingData;
        targetSetting.id = this.targetId;
        this.formData = {
          type: actionMode.API_SETTING,
          dataSource: targetSetting,
        };
        break;

      case actionMode.ENVIRONMENT_SETTINGS:
        this.targetId = null;
        this.formData = {
          type: actionMode.ENVIRONMENT_SETTINGS,
          dataSource: [...Store.envSettings],
        };
        break;

      case actionMode.ENVIRONMENT_VARIABLES:
        this.targetId = null;
        const missingHardEnvs = DefaultFormData.defaultHardEnvVariableItems
          .filter(item => !Store.envVariables
            .some(env => env.envId === Store.currentEnv
              && env.items.some(i => i.isHardSetting && i.name === item.name)));
        const envVarIndex = Store.envVariables.findIndex(item => item.envId === Store.currentEnv);
        if (envVarIndex >= 0) {
          const newVars = [...Store.envVariables];
          newVars[envVarIndex].items = [...missingHardEnvs, ...Store.envVariables[envVarIndex].items];
          Store.envVariables = newVars;
        }

        this.formData = {
          type: actionMode.ENVIRONMENT_VARIABLES,
          dataSource: [...Store.envVariables.find(item => item.envId === Store.currentEnv)?.items || []],
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

        const newSettings = Store.apiSettings.filter(setting => setting.id !== apiId);
        Store.apiSettings = [...newSettings];

        this.isPageDataChange = true;
        this.#onPageBinding();
      });
    });

    this.btnCopyApiSettingItems.forEach((item) => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const apiId = e.target.closest('.api-list-item').querySelector('[data-api-id]')?.dataset['apiId'] || '';
        if (!apiId) return;

        const targetItem = Store.apiSettings.find(setting => setting.id === apiId);
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

      this.formData.dataSource = [...this.formData.dataSource, DefaultFormData.defaultEnvSettingData];
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
    this.#setFormFilterChanges();
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

      Store.isCollabsedSidebar = !Store.isCollabsedSidebar;
      this.#onPageBinding();
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

      navigator.clipboard.writeText(JSON.stringify(this.apiResponse, null, 2))
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
    rootNode.innerHTML = UIBuilder.createDefaultUI();

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

SwaggerFaster.init();
