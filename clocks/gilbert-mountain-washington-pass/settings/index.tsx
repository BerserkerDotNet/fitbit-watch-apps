import { KPayProductStatus } from "@berserkerdotnet/k-pay/settings/KPayProductStatus";
import { SettingKeys } from "@berserkerdotnet/common-constants";

function settingsComponent(props) {
  return (
    <Page>
      <KPayProductStatus settings={props.settings} />
      <Section
        title={
          <Text bold align="center">
            General
          </Text>
        }>
          <Toggle settingsKey={SettingKeys.smallClockFont} label="Use smaller font for the clock" />
          <Toggle settingsKey={SettingKeys.hideStatsOnTap} label="Hide stats when tap on the clock" />
          <Toggle settingsKey={SettingKeys.tapToCycleStats} label="Tap to cycle stats" />
      </Section>
    </Page>
  );
}

registerSettingsPage(settingsComponent);
