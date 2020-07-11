import { settingsStorage } from 'settings';
import * as kpay from './kpay_companion.js';
import * as kpay_common from '../common/kpay/kpay_common.js';

export function initializeKPay(clockName) {
  function trialActive() {
    let trialEndDate = settingsStorage.getItem('kpayTrialEndDate');
    return trialEndDate && (JSON.parse(trialEndDate) > new Date().getTime());
  }

  kpay.setEventHandler((e, data) => {
    console.log('KPAY event handler' + e);
    switch (e) {
      case kpay_common.eventTypes.TrialStarted:
        console.log('KPAY event handler. TRIAL START');
        settingsStorage.setItem('kpayTrialEndDate', data.getTime());
        settingsStorage.setItem('btnEndTrialVisible', true);
        settingsStorage.setItem('kpayStatus', 'trial');   //actual message is generated in settings page
        break;
      case kpay_common.eventTypes.TrialEnded:
        console.log('KPAY event handler. TRIAL END');
        settingsStorage.setItem('btnEndTrialVisible', false);
        settingsStorage.setItem('kpayStatus', `Unlicensed product. Trial period ended.`);
        break;
      case kpay_common.eventTypes.CodeAvailable:
      case kpay_common.eventTypes.PurchaseStarted:
        console.log('KPAY event handler. CodeAvailable');
        settingsStorage.setItem('btnEndTrialVisible', trialActive());
        settingsStorage.setItem('kpayStatus', `To continue using ${clockName} clock, please visit www.kzl.io/code and enter this code: ${data}`);
        break;
      case kpay_common.eventTypes.Licensed:
        console.log('KPAY event handler. Licensed');
        settingsStorage.setItem('btnEndTrialVisible', false);
        settingsStorage.setItem('kpayStatus', `Licensed product. Thank you for your support!`);
        break;
      default:
        break;
    };
  });


  function handleKPayPurchaseSettingChange(newValue) {
    if (newValue) {
      settingsStorage.setItem('btnEndTrialVisible', trialActive());
      kpay.startPurchase();
    }
    else if (trialActive()) {
      settingsStorage.setItem('kpayStatus', 'trial');   //actual message is generated in settings page
      kpay.cancelPurchase();
    }
  }

  settingsStorage.addEventListener('change', evt => {
    if (evt.key == 'kpayPurchase') {
      handleKPayPurchaseSettingChange(JSON.parse(evt.newValue));
    }
  });

  kpay.initialize();
}