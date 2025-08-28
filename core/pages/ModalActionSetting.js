import { $, $$, generateUniqueDateId, resolveObjectCookiePattern, resolveObjectVars } from "../utils/helpers.js";
import { actionMode, ApiSettingMode, DefaultFormData, formActionMode, Store } from "../data/index.js";
import { ModalActionSettingForm } from "../components/index.js";
import { validator } from "../form/validate.js";
import { Toast } from "../ui/toast.js";
import { t } from "../i18n/translate.js";

export class ModalActionSettingPage {
  constructor({ targetId, targetAction, onRefresh }) {
    this.targetId = targetId;
    this.targetAction = targetAction;
    switch (targetAction) {
      case formActionMode.CREATE:
        this.dataSource = { ...DefaultFormData.defaultApiSettingData, id: generateUniqueDateId() };
        break;

      case formActionMode.COPY_INSERT:
        this.dataSource = { ...Store.apiSettings.find(api => api.id === targetId), id: generateUniqueDateId() };
        break;

      case formActionMode.UPDATE:
        this.dataSource = { ...Store.apiSettings.find(api => api.id === targetId) };
        break;

      default:
        onRefresh(actionMode.MODAL_API_LIST, null, null);
        alert('Invalid form action mode');
    }

    this.onRefresh = onRefresh;
  }

  get wContainer() { return $('#jun-tool .modal-container .modal-content'); }
  get cblMode() { return this.wContainer.querySelectorAll('.segmented-control-group input[data-action="form-input"]'); }
  get btnSaveChanges() { return $('#jun-tool .modal-container #btn-savechanges'); }
  
  /**
   * Map the form data to the default form data.
   * @param {ApiSetting} input The form data.
   * @returns {ApiSetting} The default form data.
   */
  mapToFormData = (input) => {
    const mappingInput = Object.entries(DefaultFormData.defaultApiSettingData)
      .reduce((preValue, [key, value]) => {
        preValue[key] = input[key] || value;
        return preValue;
      }, {});
    return mappingInput;
  }

  setApiSettingErrorMessage(errorMessages = []) {
    const targetForm = $(`#jun-tool .modal #api-setting-form`);
    if (!targetForm) return;

    // Clear previous error messages
    this.clearErrorMessage();

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

  clearErrorMessage() {
    $$('#jun-tool .modal #api-setting-form .error-message').forEach(el => {
      el.textContent = '';
      el.previousElementSibling.classList.remove('has-error');
    });
  }

  onModeChange(newMode) {
    if (this.settingMode === newMode) return;

    this.dataSource.mode = newMode;
    this.render();
    this.setEvent();
  }

  onSaveChanges() {
    const apiFormData = this.mapToFormData(this.dataSource);
    const [isApiFormError, apiSettingErrorMessages] = validator.validateApiSetting(
      resolveObjectCookiePattern(resolveObjectVars(apiFormData)));
    this.setApiSettingErrorMessage(apiSettingErrorMessages);
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

    Toast.success(t('message.save-changes.api-setting.success'));
    this.render();
  }

  setEvent() {
    this.btnSaveChanges?.addEventListener('click', () => this.onSaveChanges());
    this.cblMode.forEach(input =>
      input?.addEventListener('change', (e) => this.onModeChange(e.target.value)));
  }

  render() {
    this.wContainer.innerHTML = `
      <div id="api-setting-layout">
        ${ModalActionSettingForm(this.dataSource)}
      </div>`;
  }

  static init(props) {
    const instance = new ModalActionSettingPage(props);
    instance.render();
    instance.setEvent();
  }
}
