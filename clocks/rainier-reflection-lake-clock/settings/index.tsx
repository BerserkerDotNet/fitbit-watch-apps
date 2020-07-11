import { KPayProductStatus } from "@berserkerdotnet/k-pay/settings/KPayProductStatus";

function settingsComponent(props) {
  return (
    <Page>
      <KPayProductStatus settings={props.settings} />
      <Section
        title={
          <Text bold align="center">
            Font Settings
          </Text>
        }>
          <Toggle settingsKey="thinFont" label="Thin clock" />
      </Section>
    </Page>
  );
}

registerSettingsPage(settingsComponent);
