import { $ } from "../utils/helpers.js";
import { DefaultFormData, Store } from "../data/index.js";
import { ModalActionSettingForm } from "../components/index.js";

export class ModalActionSettingPage {
  constructor({ targetId, onRefresh }) {
    this.targetId = targetId;
    const targetSetting = Store.apiSettings.find(api => api.id === targetId) || DefaultFormData.defaultApiSettingData;
    this.dataSource = { ...targetSetting };
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
