import { me } from "appbit";
import * as fs from "fs";
import * as messaging from "messaging";

const SETTINGS_TYPE = "cbor";
const SETTINGS_FILE = "settings.cbor";

export function initializeSettings(callback: (setting: {}) => void, fileName: string = SETTINGS_FILE) {
    let settings: {};

    settings = loadSettings();
    if(!settings){
        settings = {};
    }
    callback(settings);
    
    messaging.peerSocket.onopen = function() {
        console.log("peerSocket connection open");
    }
    
    messaging.peerSocket.onerror = function(err) {
        console.log("Connection error: " + err.code + " - " + err.message);
    }
    
    messaging.peerSocket.onmessage = function(evt) {
        settings[evt.data.key] = evt.data.value;
        callback(settings);
    }

    me.onunload = function(){
        saveSettings();
    }

    function loadSettings() {
        try {
        return fs.readFileSync(fileName, SETTINGS_TYPE);
        } catch (ex) {
        return {};
        }
    }
    
    function saveSettings() {
        fs.writeFileSync(fileName, settings, SETTINGS_TYPE);
    }
}