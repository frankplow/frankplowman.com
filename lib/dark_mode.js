'use client'

import { useEffect } from 'react';

export const ColorScheme = {
  Light: 0,
  Dark: 1,
}

export function SetColorScheme() {
  function getColorScheme() {
    const mediaQuery = "(prefers-color-scheme: dark)";
    const mql = window.matchMedia(mediaQuery);
    const hasImplicitPreference = typeof mql.matches === "boolean";
    if (hasImplicitPreference) {
      return mql.matches ? "dark" : "light";
    }
    return "light";
  }
  const colorScheme = getColorScheme();
  document.documentElement.setAttribute("color-scheme", colorScheme);
}

const SetColorSchemeStr = `(function() {
    (${SetColorScheme.toString()})();
})()
`;

export function ThemeSwitcher() {
  return <script dangerouslySetInnerHTML={{ __html: SetColorSchemeStr }}></script>
}
