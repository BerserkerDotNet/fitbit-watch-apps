function settingsComponent(props) {
  return (
    <Page>
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
