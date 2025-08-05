import { $ } from "../utils/helpers.js";
import { SidebarHubList } from "../components/index.js";

export class SidebarHubPage {
  constructor({ onRefresh }) {
    this.onRefresh = onRefresh;
  }

  get wContainer() { return $('#jun-tool #tool-sidebar .sidebar-content'); }

  onSaveChanges() {

  }

  setEvent() {

  }

  render() {
    this.wContainer.innerHTML = SidebarHubList();
  }

  static init(props) {
    const instance = new SidebarHubPage(props);
    instance.render();
    instance.setEvent();
  }
}
