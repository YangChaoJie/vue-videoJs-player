import videojs from 'video.js'
import SettingOptionItem from './SettingMenu/Item/SettingOptionItem.js';
import SettingSubOptionItem from './SettingMenu/Item/SettingSubOptionItem.js';
// const SettingOptionItem = videojs.getComponent('SettingOptionItem');
// const SettingSubOptionItem = videojs.getComponent('SettingSubOptionItem');
const authorised = false;

class QualityMenuItem extends SettingOptionItem {
  constructor(player, options) {
    super(player, {
      ...options, // you must assgin the options
      name: 'QualityMenuItem', // component name, optional
      label: 'Quality',
      icon: 'vjs-icon-hd', // videojs icon classname, optional, for small screen
      entries: [
        {
          label: 'HD',
          value: 720
        },
        {
          label: 'SD',
          value: 480,
          default: true
        },
        {
          label: 'Smooth',
          value: 240
        },
        'Auto' // label & value
      ]
    });

    this.addClass('vjs-setting-quality');
  }

  onChange(...args) {
    super.onChange(...args);
    console.log(this.selected);
  }
}

class QualityMenuItemChild extends SettingSubOptionItem {
  handleClick() {
    if (authorised || this.value === 'Auto' || this.value < 720) {
      super.handleClick();
    } else {
      alert('Please Login');
      this.restore();
    }
  }
}

export {
  QualityMenuItem,
  QualityMenuItemChild
}
