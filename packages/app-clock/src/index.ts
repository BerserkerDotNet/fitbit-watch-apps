import clock from "clock";
import { preferences } from "user-settings";

export interface ClockSettings {
  timeElement: TextElement;
  dateElement: TextElement;
  onTickCallback: () => void;  
}

export function initializeClock(settings: ClockSettings){
  clock.granularity = "minutes";

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  clock.ontick = (evt) => {
    const todayDate = evt.date;
    let hours = todayDate.getHours();
    if (preferences.clockDisplay === "12h") {
      hours = hours % 12 || 12;
    }
  
    const mins = zeroPad(todayDate.getMinutes());
    settings.timeElement.text = `${zeroPad(hours)}:${mins}`;
    settings.dateElement.text = `${days[todayDate.getDay()]} ${zeroPad(todayDate.getDate())}`;
    settings.onTickCallback();
  }
}

function zeroPad(i: number): string {
  return i < 10 ? `0${i}` : i.toString();
}