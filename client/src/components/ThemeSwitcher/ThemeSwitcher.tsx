import { useState } from "react";

import DarkModeIcon from "../../assets/icons/dark-mode.svg?react";
import LightModeIcon from "../../assets/icons/light-mode.svg?react";
import { ToggleButton, ToggleButtonGroup } from "../ToggleButtonGroup";

const STORAGE_KEY = "theme";
const DARK_VALUE = "dark";
const LIGHT_VALUE = "light";

function getInitialTheme() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === DARK_VALUE || saved === LIGHT_VALUE) {
      return saved;
    }
    return LIGHT_VALUE;
  } catch {
    return LIGHT_VALUE;
  }
}

const options = [
  {
    label: <LightModeIcon width={20} height={20} />,
    value: LIGHT_VALUE,
  },
  {
    label: <DarkModeIcon width={20} height={20} />,
    value: DARK_VALUE,
  },
];

export function ThemeSwitcher() {
  const [value, setValue] = useState(() => getInitialTheme());

  function setTheme(theme: string) {
    document.documentElement.dataset.theme = theme;
    setValue(theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {}
  }

  return (
    <ToggleButtonGroup
      selectionMode="single"
      selectedKeys={[value]}
      disallowEmptySelection
      aria-label="Light/dark theme toggle"
      onSelectionChange={(keys) => {
        const selected = keys.values().next().value;
        if (selected) {
          setTheme(String(selected));
        }
      }}
    >
      {options.map((option) => (
        <ToggleButton key={option.value} id={option.value}>
          {option.label}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}
