import document from "document";
import { SettingKeys } from "@berserkerdotnet/common-constants";
import { initializeSettings } from "@berserkerdotnet/app-settings";
import { initializeStats } from "@berserkerdotnet/app-stats";
import { initializeClock } from "@berserkerdotnet/app-clock";

const bgImage = <GraphicsElement>document.getElementById("bgImage");
const myClock = <TextElement>document.getElementById("myClock");
const myClockDate = <TextElement>document.getElementById("myClockDate");

// SETTINGS

initializeSettings(settingsCallback);

function settingsCallback(data: {}) {
    if(!data){
        console.warn("Settings is null!");
        return;
    }

    if(data[SettingKeys.thinFont] !== undefined){
        setFont(data[SettingKeys.thinFont]);
    }
}

function setFont(isThin: boolean){
    if(isThin) {
      myClock.style.fontFamily = "Colfax-Thin";
    } else {
      myClock.style.fontFamily = "Colfax-Light";
    }
}

// STATS

const refreshStats = initializeStats({
  activityImage: <ImageElement>document.getElementById("myStepsImg"),
  activityText: <TextElement>document.getElementById("mySteps"),
  caloriesText: <TextElement>document.getElementById("myCalories"),
  heartRateText: <TextElement>document.getElementById("myHeartRate"),
  statsVisibilityToggles: [bgImage, myClock],
  statsToToggle: <GraphicsElement[]>document.getElementsByClassName("stats"),
  showCaloriesAsActivity: false
});

// CLOCKS

initializeClock({
  dateElement: myClockDate,
  timeElement: myClock,
  onTickCallback: refreshStats
});
