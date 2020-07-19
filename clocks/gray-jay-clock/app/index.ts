import document from "document";
import { SettingKeys } from "@berserkerdotnet/common-constants";
import { initializeSettings } from "@berserkerdotnet/app-settings";
import { initializeStats } from "@berserkerdotnet/app-stats";
import { initializeClock } from "@berserkerdotnet/app-clock";
import { initializeKPay } from "@berserkerdotnet/k-pay/app";

var testMode = true;
var showPaidAppPopup = true;
var appId = 125569849;

initializeKPay(testMode, showPaidAppPopup, appId);

const bgImage = <GraphicsElement>document.getElementById("bgImage");
const myClock = <TextElement>document.getElementById("myClock");
const myClockDate = <TextElement>document.getElementById("myClockDate");

const statsConfig = {
  activityImage: <ImageElement>document.getElementById("myStepsImg"),
  activityText: <TextElement>document.getElementById("mySteps"),
  caloriesText: <TextElement>document.getElementById("myCalories"),
  heartRateText: <TextElement>document.getElementById("myHeartRate"),
  statsVisibilityToggles: [bgImage, myClock],
  statsToToggle: <GraphicsElement[]>document.getElementsByClassName("stats"),
  shouldToggleStats: true,
  shouldCycleStats: false,
  showCaloriesAsActivity: false,
  heartRateZoneSettings: {
    "out-of-range": "white",
    "fat-burn": "yellow",
    cardio: "tomato",
    peak: "darkred",
    "below-custom": "white",
    custom: "yellow",
    "above-custom": "darkred"
  }
};

// SETTINGS

initializeSettings(settingsCallback);

function settingsCallback(data: any) {
  if (!data) {
    console.warn("Settings is null!");
    return;
  }

  if (data[SettingKeys.smallClockFont] !== undefined) {
    setFont(data[SettingKeys.smallClockFont]);
  }

  if (data[SettingKeys.hideStatsOnTap] !== undefined) {
    statsConfig.shouldToggleStats = data[SettingKeys.hideStatsOnTap];
  }

  if (data[SettingKeys.tapToCycleStats] !== undefined) {
    statsConfig.shouldCycleStats = data[SettingKeys.tapToCycleStats];
  }
}

function setFont(isSmall: boolean){
    if(isSmall) {
      myClock.text = myClock.text;
      myClock.style.fontFamily = "Seville-Regular";
      myClockDate.style.fontFamily = "Seville-Regular";
    } else {
      myClock.text = myClock.text;
      myClock.style.fontFamily = "Seville-Bold";
      myClockDate.style.fontFamily = "Seville-Bold";
    }
}

// STATS

const refreshStats = initializeStats(statsConfig);

// CLOCKS

initializeClock({
  dateElement: myClockDate,
  timeElement: myClock,
  onTickCallback: refreshStats
});
