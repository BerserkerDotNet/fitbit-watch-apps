import * as kpay from './kpay/release/kpay.js';
import * as kpay_common from '../common/kpay/kpay_common.js';
import './kpay/release/kpay_filetransfer.js';
import './kpay/release/kpay_dialogs.js';
import './kpay/release/kpay_time_trial.js';
import clock from "clock";
import document from "document";
import { preferences } from "user-settings";
import { HeartRateSensor } from "heart-rate";
import { today } from "user-activity";
import { display } from "display";

kpay.initialize();

// Update the clock every minute
clock.granularity = "minutes";

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const myClock = document.getElementById("myClock");
const myClockDate = document.getElementById("myClockDate");
const mySteps = document.getElementById("mySteps");
const myCalories = document.getElementById("myCalories");
const myHeartRate = document.getElementById("myHeartRate");

if (HeartRateSensor) {
  const hrm = new HeartRateSensor({ frequency: 1 });
  hrm.addEventListener("reading", () => {
    myHeartRate.text = hrm.heartRate;
  });

  display.addEventListener("change", () => {
    display.on ? hrm.start() : hrm.stop();
  });

  hrm.start();
}

clock.ontick = (evt) => {
  const todayDate = evt.date;
  const hours = todayDate.getHours();
  if (preferences.clockDisplay === "12h") {
    hours = hours % 12 || 12;
  } else {
    hours = zeroPad(hours);
  }

  const mins = zeroPad(todayDate.getMinutes());
  myClock.text = `${hours}:${mins}`;
  myClockDate.text = `${days[todayDate.getDay()]} ${zeroPad(todayDate.getDate())}`;

  mySteps.text = today.adjusted.steps;
  myCalories.text = today.adjusted.calories;
}

function zeroPad(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}
