import { $ } from "../utils/helpers.js";
import { Store } from "../data/index.js";
import { ModalEnvironmentSettingForm } from "../components/index.js";

export class ModalEnvironmentSettingPage {
  constructor({ onRefresh }) {
    this.dataSource = [...Store.envSettings] || [];
    this.onRefresh = onRefresh;
  }

  get wContainer() { return $('#jun-tool .modal-container .modal-content'); }

  onSaveChanges() {

  }

  setEvent() {

  }

  render() {
    this.wContainer.innerHTML = `
      <div id="enviroment-setting-layout">
        ${ModalEnvironmentSettingForm(this.dataSource)}
      </div>`;
  }

  static init(props) {
    const instance = new ModalEnvironmentSettingPage(props);
    instance.render();
    instance.setEvent();
  }
}
