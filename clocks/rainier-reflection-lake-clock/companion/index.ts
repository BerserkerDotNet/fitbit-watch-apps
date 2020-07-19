import { initializeSettingsTransmitter, setDefaultSettings } from "@berserkerdotnet/settings-transmitter"
import { initializeKPay } from "@berserkerdotnet/k-pay/companion";
import { SettingKeys } from "@berserkerdotnet/common-constants";

setDefaultSettings({
    [SettingKeys.smallClockFont]: true,
    [SettingKeys.hideStatsOnTap]: true,
    [SettingKeys.tapToCycleStats]: false,
});
initializeSettingsTransmitter(SettingKeys.smallClockFont, SettingKeys.hideStatsOnTap, SettingKeys.tapToCycleStats);
initializeKPay("Mt. Rainier Reflection Lake");