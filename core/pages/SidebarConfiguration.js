import { $ } from "../utils/helpers.js";
import { SidebarConfiguration } from "../components/index.js";

export class SidebarConfigurationPage {
  constructor({ onRefresh }) {
    this.onRefresh = onRefresh;
  }

  get wContainer() { return $('#jun-tool #tool-sidebar .sidebar-content'); }

  onSaveChanges() {

  }

  setEvent() {

  }

  render() {
    this.wContainer.innerHTML = SidebarConfiguration();
  }

  static init(props) {
    const instance = new SidebarConfigurationPage(props);
    instance.render();
    instance.setEvent();
  }
}
