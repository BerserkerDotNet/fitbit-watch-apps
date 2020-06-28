import { settingsStorage } from "settings";
import * as messaging from "messaging";
import { me } from "companion";
import { SettingKeys } from "@berserkerdotnet/common-constants";
export function initializeSettingsTransmitter() {
    // Event fires when a setting is changed
    settingsStorage.onchange = function (evt) {
        console.log("Settings changed: " + evt);
        if (evt.key) {
            sendValue(evt.key, evt.newValue);
        }
    };
    if (me.launchReasons.settingsChanged) {
        sendValue(SettingKeys.thinFont, settingsStorage.getItem(SettingKeys.thinFont));
    }
    messaging.peerSocket.onerror = function (err) {
        // Handle any errors
        console.log("Connection error: " + err.code + " - " + err.message);
    };
}
function sendValue(key, value) {
    if (value) {
        sendSettingData({
            key: key,
            value: JSON.parse(value)
        });
    }
}
function sendSettingData(data) {
    console.log("Send setting: " + data);
    // If we have a MessageSocket, send the data to the device
    if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
        messaging.peerSocket.send(data);
    }
    else {
        console.log("No peerSocket connection");
    }
}
//# sourceMappingURL=settingsTransmitter.js.map