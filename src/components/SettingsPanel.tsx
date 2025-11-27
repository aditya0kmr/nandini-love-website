import { useSettings } from "../hooks/useSettings";

export function SettingsPanel() {
  const [settings, setSettings] = useSettings();

  const toggle = (key: keyof typeof settings) =>
    setSettings({ ...settings, [key]: !settings[key] });

  return (
    <section
      aria-label="Experience settings"
      className="settings-panel"
      role="region"
    >
      <h3>Experience Settings</h3>
      <div className="settings-group">
        <label htmlFor="sound-toggle">
          <input
            id="sound-toggle"
            type="checkbox"
            checked={settings.soundEnabled}
            onChange={() => toggle("soundEnabled")}
            aria-label="Enable sound effects"
          />
          <span>Sound effects</span>
        </label>
      </div>
      <div className="settings-group">
        <label htmlFor="animations-toggle">
          <input
            id="animations-toggle"
            type="checkbox"
            checked={settings.animationsEnabled}
            onChange={() => toggle("animationsEnabled")}
            aria-label="Enable animations"
          />
          <span>Fancy animations</span>
        </label>
      </div>
    </section>
  );
}
