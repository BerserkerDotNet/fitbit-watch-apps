import { settingsStorage } from "settings";

export function setDefaultSettings(settings: any){
    for(var s in settings) {
        const item = settingsStorage.getItem(s);
        if(!item){
            settingsStorage.setItem(s, settings[s]);
        }
    }
}