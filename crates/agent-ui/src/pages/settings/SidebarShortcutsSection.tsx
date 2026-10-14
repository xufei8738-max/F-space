import { updateCustomSettings } from "@oneagent/app/lib/settings";
import type { SettingsSectionProps } from "@oneagent/app/pages/settings/types";
import { useLocale } from "@oneagent/ui/i18n";
import { SIDEBAR_SHORTCUTS } from "../../lib/settings/sidebarShortcuts";
import { AgentActivationSwitch, SettingsGroup, SettingsRow } from "./shared";

export function SidebarShortcutsSection({ settings, setSettings }: SettingsSectionProps) {
  const { t } = useLocale();
  return (
    <div className="mx-auto w-full max-w-920px">
      <SettingsGroup title={t("settings.sidebarShortcuts")}>
        {SIDEBAR_SHORTCUTS.map(({ id, labelKey }) => (
          <SettingsRow
            key={id}
            title={t(labelKey)}
            control={
              <AgentActivationSwitch
                checked={settings.customSettings.sidebarShortcuts[id]}
                title={t("settings.showSidebarShortcut").replace("{name}", t(labelKey))}
                onToggle={() =>
                  setSettings((prev) =>
                    updateCustomSettings(prev, {
                      sidebarShortcuts: {
                        ...prev.customSettings.sidebarShortcuts,
                        [id]: !prev.customSettings.sidebarShortcuts[id],
                      },
                    }),
                  )
                }
              />
            }
          />
        ))}
      </SettingsGroup>
    </div>
  );
}
