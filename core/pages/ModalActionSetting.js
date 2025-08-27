import { $, generateUniqueDateId } from "../utils/helpers.js";
import { actionMode, DefaultFormData, formActionMode, Store } from "../data/index.js";
import { ModalActionSettingForm } from "../components/index.js";

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

    this.settingMode = this.dataSource.mode;
    this.onRefresh = onRefresh;
  }

  get wContainer() { return $('#jun-tool .modal-container .modal-content'); }

  onSaveChanges() {

  }

  setEvent() {

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
