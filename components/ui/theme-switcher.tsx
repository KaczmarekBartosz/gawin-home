'use client';

import { useTheme } from 'lib/design-system';
import { cn } from 'lib/utils';

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  const themes = [
    {
      name: 'wellness-tech',
      label: 'Wellness Tech',
      description: 'Minimalist, health-app inspired',
      preview: 'bg-[#F8F8F8] border-[#FF8C42]',
    },
    {
      name: 'dark-luxury',
      label: 'Dark Luxury',
      description: 'Premium dark with gold',
      preview: 'bg-[#1a1a1a] border-[#d4af37]',
    },
    {
      name: 'hybrid-luxury',
      label: 'Hybrid Luxury',
      description: 'Dark Entry + Light Showroom',
      preview: 'bg-gradient-to-r from-[#1a1a1a] to-[#ffffff] border-[#d4af37]',
    },
  ] as const;

  return (
    <div className="p-6 bg-card rounded-lg border border-border">
      <h3 className="text-lg font-semibold text-foreground mb-4">Theme Switcher</h3>
      <p className="text-sm text-muted-foreground mb-6">
        Current theme: <span className="font-medium text-foreground">{theme}</span>
      </p>

      <div className="grid gap-3">
        {themes.map((t) => (
          <button
            key={t.name}
            onClick={() => setTheme(t.name as any)}
            className={cn(
              'flex items-center gap-4 p-4 rounded-lg border-2 transition-all',
              'hover:shadow-md active:scale-98',
              theme === t.name
                ? 'border-[rgb(var(--accent))] bg-[rgb(var(--accent)/0.05)]'
                : 'border-border bg-card hover:border-[rgb(var(--accent)/0.3)]'
            )}
          >
            {/* Preview box */}
            <div
              className={cn('w-12 h-12 rounded-md border-2', t.preview)}
              aria-hidden="true"
            />

            {/* Info */}
            <div className="flex-1 text-left">
              <div className="font-semibold text-foreground">{t.label}</div>
              <div className="text-sm text-muted-foreground">{t.description}</div>
            </div>

            {/* Active indicator */}
            {theme === t.name && (
              <svg
                className="w-5 h-5 text-[rgb(var(--accent))]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
