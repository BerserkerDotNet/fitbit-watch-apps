import { settingsStorage } from "settings";
import * as messaging from "messaging";
import { me } from "companion";

export function initializeSettingsTransmitter(...settingKeys: string[]){
  // Event fires when a setting is changed
  settingsStorage.onchange = function(evt : StorageChangeEvent) {
    if(evt.key){
      sendValue(evt.key, evt.newValue);
    }
  }

  if (me.launchReasons.settingsChanged) {
    for(var s of settingKeys) {
      sendValue(s, settingsStorage.getItem(s));
    }
  }

  messaging.peerSocket.onerror = function(err: messaging.ErrorEvent) {
    // Handle any errors
    console.warn("Connection error: " + err.code + " - " + err.message);
  }
}

function sendValue(key: string, value: string | null){
    if(value){
        sendSettingData({
            key: key,
            value: JSON.parse(value)
        });
    }
}

function sendSettingData(data: {key: string, value: any}) {
    // If we have a MessageSocket, send the data to the device
    if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
      messaging.peerSocket.send(data);
    } else {
      console.warn("No peerSocket connection");
    }
  }