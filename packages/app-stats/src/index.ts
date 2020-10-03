import { HeartRateSensor } from "heart-rate";
import { BodyPresenceSensor } from "body-presence";
import { today, primaryGoal } from "user-activity";
import { user } from "user-profile";
import { display } from "display";
import { me as appbit } from "appbit";

export interface StatsSettings {
  caloriesText?: TextElement | null;
  caloriesImage?: ImageElement | null;
  activityText?: TextElement | null;
  activityImage?: ImageElement | null;
  heartRateText?: TextElement | null;
  heartRateImage?: ImageElement | null;
  statsVisibilityToggles?: GraphicsElement[] | null;
  statsToToggle?: GraphicsElement[] | null;
  shouldToggleStats: boolean;
  shouldCycleStats: boolean;
  showCaloriesAsActivity: boolean;
  heartRateZoneSettings: HeartRateZoneSettings;
}

export interface HeartRateZoneSettings {
  "out-of-range": string;
  "fat-burn": string;
  cardio: string;
  peak: string;
  "below-custom": string;
  custom: string;
  "above-custom": string;
}

export function initializeStats(uiElements: StatsSettings) : () => void {
    initializeHeartRate(uiElements);
    const refreshActivity = initializeActivities(uiElements);

    return refreshActivity;
}

function initializeHeartRate(uiElements: StatsSettings): void {
  if (HeartRateSensor && uiElements.heartRateText) {
    const hrm = new HeartRateSensor({ frequency: 1 });
    hrm.onreading = () => {
      if (uiElements.heartRateText) {
        if(appbit.permissions.granted("access_user_profile")){
          const zone = user.heartRateZone(hrm.heartRate ?? 0);
          uiElements.heartRateText.style.fill = uiElements.heartRateZoneSettings[zone];
        }
        uiElements.heartRateText.text = valueOrEmptyPlaceholder(hrm.heartRate);
        updateStatImagePosition(uiElements.heartRateText, uiElements.heartRateImage);
      }
    };

    if (BodyPresenceSensor) {
      const body = new BodyPresenceSensor();
      body.onreading =  () => {
        if (!body.present) {
          hrm.stop();
          setEmptyHeartRateText(uiElements);
        } else {
          hrm.start();
        }
      };
      
      body.start();
    }

    display.onchange = () => {
      display.on ? hrm.start() : hrm.stop();
    }

    hrm.start();
  }
}

function setEmptyHeartRateText(uiElements: StatsSettings): void{
  if (uiElements.heartRateText) {
    uiElements.heartRateText.style.fill = uiElements.heartRateZoneSettings["out-of-range"];
    uiElements.heartRateText.text = "--";
  }
}

function initializeActivities(uiElements: StatsSettings) : () => void {
  let statsVisible = true;
  type mainGoal = "steps" | "distance" | "activeMinutes" | "elevationGain" | "calories";
  const defaultActivities = <mainGoal[]>["steps", "distance", "activeMinutes", "elevationGain"];
  let primaryActivities = <mainGoal[]>[primaryGoal.toString()];
  if(uiElements.showCaloriesAsActivity){
    defaultActivities.push("calories");
  } else if (primaryGoal === "calories") {
    primaryActivities = [];
  }

  let activities : mainGoal[]  = defaultActivities;
  if(primaryActivities.length > 0){
    activities = primaryActivities.concat(defaultActivities.filter(e => e !== primaryGoal));
  }

  let currentActivity = 0;
  let activityProperty = activities[currentActivity];

  if (uiElements.statsVisibilityToggles) {
    uiElements.statsVisibilityToggles.forEach(e => {
      e.onclick = () => toggleStats();
    });
  }
  
  if(uiElements.activityText){
    uiElements.activityText.onclick = function(){
      showNextActivity();
    }
  }

  if(uiElements.activityImage){
    uiElements.activityImage.onclick = function(){
      showNextActivity();
    }
  }
  
  const showNextActivity = () => {
    if(!uiElements.shouldCycleStats){
      return;
    }

    currentActivity++;
    if(currentActivity >= activities.length){
      currentActivity = 0;
    }

    activityProperty = activities[currentActivity];
    refreshActivityValue();
  }
  
  const refreshActivityValue = () => {
    if(uiElements.activityImage && uiElements.activityText){
      uiElements.activityText.text = valueOrEmptyPlaceholder(today.adjusted[activityProperty]);
      updateStatImagePosition(uiElements.activityText, uiElements.activityImage);
      uiElements.activityImage.href = `${activityProperty}.png`;
    }

    if(!uiElements.showCaloriesAsActivity && uiElements.caloriesText){
      uiElements.caloriesText.text = valueOrEmptyPlaceholder(today.adjusted.calories);
      updateStatImagePosition(uiElements.caloriesText, uiElements.caloriesImage);
    }

    updateStatImagePosition(uiElements.heartRateText, uiElements.heartRateImage);
  }

  const toggleStats = () => {
      if(!uiElements.statsToToggle){
        return;
      }

      statsVisible = !statsVisible;
      if(!uiElements.shouldToggleStats){
        statsVisible = true;
      }

      const visibility = statsVisible ? "visible" : "hidden"
      uiElements.statsToToggle.forEach(function(element) {
        element.style.visibility = visibility;
      });
  }

  return refreshActivityValue;
}

function valueOrEmptyPlaceholder(value : number | undefined | null) : string {
  return value ? value.toString() : "--";
}

function updateStatImagePosition(textElement: TextElement | undefined | null, img : ImageElement | undefined | null) {
  if(img && textElement){
    img.x = textElement.getBBox().x - img.getBBox().width;
    img.y = textElement.getBBox().y+4;
  }
}