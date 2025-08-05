import { $ } from "../utils/helpers.js";
import { Store } from "../data/index.js";
import { ModalVariableSettingForm } from "../components/index.js";

export class ModalVariableSettingPage {
  constructor({ onRefresh }) {
    const variables = [...Store.envVariables] || [];
    this.dataSource = variables.find(env => env.envId === Store.currentEnv)?.items || [];
    this.onRefresh = onRefresh;
  }

  get wContainer() { return $('#jun-tool .modal-container .modal-content'); }

  onSaveChanges() {

  }

  setEvent() {

  }

  render() {
    this.wContainer.innerHTML = `
      <div id="variable-setting-layout">
        ${ModalVariableSettingForm(this.dataSource)}
      </div>`;
  }

  static init(props) {
    const instance = new ModalVariableSettingPage(props);
    instance.render();
    instance.setEvent();
  }
}
