import videojs, { VideoJsPlayer } from "@/types/video";

const Menu = videojs.getComponent('Menu');

class SettingMenu extends Menu {
  mainMenuItems: videojs.Component[] = [];
  constructor(player: VideoJsPlayer, options: videojs.MenuOptions) {
    super(player, options);
    this.addClass('vjs-setting-menu');
  }

  init () {
    if (!this.contentEl()) {
      return;
    }
    this.mainMenuItems = this.children().slice(0);

    this.transform(this.mainMenuItems);

    /**
     *  Since the width of setting menu depends on screen width.
     *  If player is initialized on small screen size then resize to a bigger screen,
     *  the width of setting menu will be too wide as the origin width is affected by css,
     *  A class `vjs-setting-menu-ready` as a condition for css on small screen,
     *  therefore the origin width will not be affected.
     */
    this.addClass('vjs-setting-menu-ready');
  }
  createEl() {
    const el = super.createEl();
    el.textContent = '设置';
    // const layer = new CloseSettingMenu(this.player_, {
    //   menu: this
    // });

    // el.insertBefore(layer.el_, el.firstElementChild);
    return el;
  }

  update(children = []) {
    const children_ = this.children().slice(0);

    children_.forEach(child => {
      this.removeChild(child);
    });

    children.forEach(child => {
      this.addChild(child);
    });
  }

  resize(el: DOMRect) {
    (this.contentEl() as HTMLElement).style.width = el.width + 'px';
    (this.contentEl() as HTMLElement).style.height = el.height + 'px';
  }

  getMenuDimension(items: any): DOMRect {
    const player = this.player_;
    const tempMenu = new SettingMenuTemp(player);

    tempMenu.update(items);
    player.addChild(tempMenu);

    const rect = tempMenu.contentEl().getBoundingClientRect();

    // remove subMenuItem form tempMenu first, otherwise they will also be disposed
    tempMenu.update();
    tempMenu.dispose();

    // remove tempMenu in `player.children`
    player.removeChild(tempMenu);

    return rect;
  }

  transform(items: any) {
    const dimensions = this.getMenuDimension(items);
    this.update(items);
    this.resize(dimensions);
  }

  restore() {
    this.transform(this.mainMenuItems);
  }

  removeStyle() {
    this.contentEl().removeAttribute('style');
  }

  hide() {
    // Disable default hide function
    // As the default hide function violate the calculation of menu dimension
  }
}
class SettingMenuTemp extends SettingMenu {
  constructor(player: VideoJsPlayer) {
    super(player, {} as videojs.MenuOptions);
  }
}

videojs.registerComponent('SettingMenu', SettingMenu);

export default SettingMenu;
