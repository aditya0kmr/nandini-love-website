import { useSettings } from '../hooks/useSettings'
import { useTheme } from '../context/ThemeContext'

export function SettingsPanel() {
  const [settings, setSettings] = useSettings()
  const { isDarkMode, toggleTheme } = useTheme()

  const toggle = (key: keyof typeof settings) =>
    setSettings({ ...settings, [key]: !settings[key] })

  return (
    <section
      aria-label="Experience settings"
      className="settings-panel glass-card"
      role="region"
    >
      <h3>Experience Settings</h3>

      {/* Theme Toggle */}
      <div className="settings-group">
        <label htmlFor="theme-toggle">
          <input
            id="theme-toggle"
            type="checkbox"
            checked={isDarkMode}
            onChange={toggleTheme}
            aria-label="Toggle dark mode"
          />
          <span>{isDarkMode ? '🌙 Dark Mode' : '☀️ Light Mode'}</span>
        </label>
      </div>

      {/* Sound Effects */}
      <div className="settings-group">
        <label htmlFor="sound-toggle">
          <input
            id="sound-toggle"
            type="checkbox"
            checked={settings.soundEnabled}
            onChange={() => toggle('soundEnabled')}
            aria-label="Enable sound effects"
          />
          <span>Sound effects</span>
        </label>
      </div>

      {/* Animations */}
      <div className="settings-group">
        <label htmlFor="animations-toggle">
          <input
            id="animations-toggle"
            type="checkbox"
            checked={settings.animationsEnabled}
            onChange={() => toggle('animationsEnabled')}
            aria-label="Enable animations"
          />
          <span>Fancy animations</span>
        </label>
      </div>
    </section>
  )
}
