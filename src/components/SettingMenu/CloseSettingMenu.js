import videojs from "@/types/video";

const ClickableComponent = videojs.getComponent('ClickableComponent');

class CloseSettingMenu extends ClickableComponent {
  buildCSSClass() {
    return 'vjs-close-menu-layer vjs-close-setting-menu';
  }

  handleClick() {
    this.options_.menu.menuButton_.hideMenu();
  }
}

videojs.registerComponent('CloseSettingMenu', CloseSettingMenu);

export default CloseSettingMenu;
