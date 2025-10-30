# NeoToggle Component Documentation

## Overview

The **NeoToggle** component is an accessible, animated toggle switch with neomorphic styling. It provides a smooth, tactile interface for toggling boolean states while maintaining premium design aesthetics.

### Key Features

- ✅ **Controlled Component** - Full state management via `checked` and `onChange`
- ✅ **Smooth Animations** - 300ms CSS transitions for all state changes
- ✅ **Neomorphic Design** - Embossed shadows that adapt to state
- ✅ **Accessible** - ARIA attributes, keyboard support, semantic labels
- ✅ **Three Variants** - Primary (charcoal), Gold (premium), Success (green)
- ✅ **Three Sizes** - Small, Medium, Large with proper proportions
- ✅ **Glow Effects** - Gold and Success variants have premium glow shadows
- ✅ **Optional Labels** - Semantic label support with left/right positioning
- ✅ **Disabled State** - Full disabled state handling
- ✅ **TypeScript** - Strict types with proper inference

## Installation

The component is already installed in the project at:

```
components/ui/neo-toggle.tsx
```

## Basic Usage

```tsx
import { NeoToggle } from "@/components/ui/neo-toggle";
import { useState } from "react";

export function MyComponent() {
  const [enabled, setEnabled] = useState(false);

  return (
    <NeoToggle
      checked={enabled}
      onChange={setEnabled}
      variant="primary"
      size="md"
    />
  );
}
```

## Component Props

```typescript
interface NeoToggleProps {
  // Core State
  checked: boolean; // Current toggle state
  onChange: (checked: boolean) => void; // State change callback

  // Styling
  variant?: "primary" | "gold" | "success"; // Color variant (default: 'primary')
  size?: "sm" | "md" | "lg"; // Size variant (default: 'md')
  className?: string; // Additional CSS classes

  // Label
  label?: string; // Optional label text
  labelPosition?: "left" | "right"; // Label position (default: 'right')

  // State
  disabled?: boolean; // Disable interaction (default: false)

  // HTML Button Props
  // All standard button props are supported (onClick, onKeyDown, etc.)
}
```

## Variants

### Color Variants

#### Primary (Charcoal)

For default, neutral toggles. Uses charcoal color when active.

```tsx
<NeoToggle checked={value} onChange={setValue} variant="primary" />
```

**Visual:**

- OFF: Gray-300 with inset shadow (debossed)
- ON: Charcoal (#1A1A1A) with light shadow (elevated)

#### Gold (Premium)

For premium or important toggles. Uses brand gold color when active.

```tsx
<NeoToggle checked={premium} onChange={setPremium} variant="gold" />
```

**Visual:**

- OFF: Gray-300 with inset shadow
- ON: Brand Gold (#D4A574) with glow-gold shadow

#### Success (Green)

For positive actions or confirmations. Uses neo-green color when active.

```tsx
<NeoToggle checked={success} onChange={setSuccess} variant="success" />
```

**Visual:**

- OFF: Gray-300 with inset shadow
- ON: Neo-Green (#6EE7B7) with glow-green shadow

### Size Variants

#### Small (sm)

For compact layouts and inline usage.

```tsx
<NeoToggle size="sm" checked={value} onChange={setValue} />
```

**Dimensions:**

- Track: 44px × 24px
- Indicator: 20px circle
- Padding: 2px

#### Medium (md) - Default

For standard usage and form fields.

```tsx
<NeoToggle size="md" checked={value} onChange={setValue} />
```

**Dimensions:**

- Track: 56px × 32px
- Indicator: 28px circle
- Padding: 2px

#### Large (lg)

For prominent controls and accessibility-focused layouts.

```tsx
<NeoToggle size="lg" checked={value} onChange={setValue} />
```

**Dimensions:**

- Track: 68px × 40px
- Indicator: 36px circle
- Padding: 2px

## Advanced Usage

### With Label

```tsx
<NeoToggle
  checked={darkMode}
  onChange={setDarkMode}
  label="Dark Mode"
  labelPosition="right"
  variant="primary"
/>
```

The label is semantic and clickable - clicking it toggles the switch.

### With Custom Styling

```tsx
<NeoToggle checked={value} onChange={setValue} className="my-custom-class" />
```

### Disabled State

```tsx
<NeoToggle checked={value} onChange={setValue} disabled />
```

When disabled:

- Opacity is reduced to 0.5
- Cursor changes to `not-allowed`
- Interaction is prevented
- Hover effects are suppressed

### Keyboard Support

The component supports full keyboard interaction:

| Key     | Action           |
| ------- | ---------------- |
| `Space` | Toggle switch    |
| `Enter` | Toggle switch    |
| `Tab`   | Focus navigation |

```tsx
// Keyboard support works automatically
<NeoToggle checked={value} onChange={setValue} />

// User can press Space or Enter to toggle
// User can press Tab to focus/unfocus
```

### With Custom Keyboard Handler

```tsx
const handleKeyDown = (e: React.KeyboardEvent) => {
  // Custom logic
};

<NeoToggle checked={value} onChange={setValue} onKeyDown={handleKeyDown} />;
```

## Styling & Animation

### Shadow System

The component uses the neomorphic shadow system from the design tokens:

#### OFF State

```css
box-shadow: var(--shadow-neo-inset);
/* inset 0 2px 4px rgba(0, 0, 0, 0.05); */
```

#### ON State (Primary)

```css
box-shadow: var(--shadow-neo-light);
/* 0 8px 16px rgba(0, 0, 0, 0.08); */
```

#### ON State (Gold)

```css
box-shadow: var(--shadow-glow-gold);
/* 0 0 20px rgba(212, 165, 116, 0.4), 0 0 40px rgba(212, 165, 116, 0.2); */
```

#### ON State (Success)

```css
box-shadow: var(--shadow-glow-green);
/* 0 0 20px rgba(110, 231, 183, 0.3), 0 0 40px rgba(110, 231, 183, 0.15); */
```

### Animation

All transitions are smooth CSS-based (no JavaScript animation):

```css
transition: all 300ms ease-out;
```

This applies to:

- Background color change
- Shadow changes
- Indicator position movement

### Hover State

On hover (when not disabled):

```css
box-shadow: var(--shadow-neo-medium);
/* 0 12px 24px rgba(0, 0, 0, 0.12); */
```

### Active State

On click/active:

```css
box-shadow: var(--shadow-neo-pressed);
/* inset 0 2px 4px rgba(0, 0, 0, 0.08), inset 0 -2px 4px rgba(255, 255, 255, 0.8); */
```

### Focus State

When focused via keyboard:

```css
ring: 2px var(--brand-gold);
```

## Accessibility

The component is fully accessible with:

### ARIA Attributes

```tsx
role="switch"                    // Semantic role
aria-checked={checked}           // Current state
aria-label="Toggle switch"       // Accessible name
aria-disabled={disabled}         // Disabled state
```

### Keyboard Navigation

- ✅ Tab to focus
- ✅ Space/Enter to toggle
- ✅ Proper focus indication

### Semantic Labels

- ✅ Optional label element
- ✅ Label is clickable and toggles switch
- ✅ Proper label association

### Visual Feedback

- ✅ Clear focus ring
- ✅ Shadow changes indicate state
- ✅ Color contrast meets WCAG AA
- ✅ Disabled state visually distinct

## Real-World Examples

### Feature Toggle in Settings

```tsx
function SettingsPage() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3>Notifications</h3>
          <p className="text-sm text-gray-500">Receive push notifications</p>
        </div>
        <NeoToggle
          checked={notifications}
          onChange={setNotifications}
          variant="success"
        />
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h3>Dark Mode</h3>
          <p className="text-sm text-gray-500">Use dark theme</p>
        </div>
        <NeoToggle
          checked={darkMode}
          onChange={setDarkMode}
          variant="primary"
        />
      </div>
    </div>
  );
}
```

### Conditional Feature Enable

```tsx
function PremiumFeaturesPanel() {
  const [premiumEnabled, setPremiumEnabled] = useState(false);

  return (
    <div>
      <div className="mb-4">
        <NeoToggle
          checked={premiumEnabled}
          onChange={setPremiumEnabled}
          label="Unlock Premium Features"
          variant="gold"
          size="md"
        />
      </div>

      {premiumEnabled && (
        <div className="p-4 bg-brand-gold/10 rounded-lg">
          <p>Premium features are now unlocked!</p>
          {/* Premium content */}
        </div>
      )}
    </div>
  );
}
```

### Form Integration

```tsx
import { useForm } from "react-hook-form";

function MyForm() {
  const { control, watch } = useForm({
    defaultValues: {
      agreeTerms: false,
      newsletter: true,
    },
  });

  const agreeTerms = watch("agreeTerms");
  const newsletter = watch("newsletter");

  return (
    <form>
      <div className="space-y-4">
        <NeoToggle
          checked={agreeTerms}
          onChange={(value) => control.setValue("agreeTerms", value)}
          label="I agree to the terms"
          required
        />

        <NeoToggle
          checked={newsletter}
          onChange={(value) => control.setValue("newsletter", value)}
          label="Subscribe to newsletter"
          variant="gold"
        />
      </div>
    </form>
  );
}
```

## Design System Integration

The component uses tokens from the design system:

### Colors

- `bg-gray-300` - Inactive state (#D0D0D0)
- `bg-charcoal` - Primary active (#1A1A1A)
- `bg-brand-gold` - Gold active (#D4A574)
- `bg-neo-green` - Success active (#6EE7B7)
- `bg-white` - Indicator circle (#FFFFFF)

### Shadows

- `shadow-neo-inset` - Inactive/debossed
- `shadow-neo-light` - Primary active/elevated
- `shadow-neo-subtle` - Indicator at rest
- `shadow-neo-pressed` - Active state
- `shadow-glow-gold` - Gold variant active
- `shadow-glow-green` - Success variant active

### Radii

- `rounded-pill` - Full pill shape (9999px)

### Spacing

- Gap for label: 8px (standard)

## TypeScript Usage

The component is fully typed:

```typescript
import type { NeoToggleProps } from "@/components/ui/neo-toggle";

// Use as a type for props
interface MyComponentProps {
  toggleProps: NeoToggleProps;
}

// Or extract specific types
type ToggleVariant = NeoToggleProps["variant"]; // 'primary' | 'gold' | 'success'
type ToggleSize = NeoToggleProps["size"]; // 'sm' | 'md' | 'lg'
```

## Best Practices

1. **Use Controlled Component Pattern**

   ```tsx
   // Good
   const [value, setValue] = useState(false);
   <NeoToggle checked={value} onChange={setValue} />;

   // Avoid uncontrolled
   // <NeoToggle defaultChecked={false} />
   ```

2. **Pair with Labels**

   ```tsx
   // Good - provides context
   <NeoToggle label="Enable Feature" />

   // Good - with wrapper
   <div>
     <label>Enable Feature</label>
     <NeoToggle checked={value} onChange={setValue} />
   </div>
   ```

3. **Choose Appropriate Variants**

   ```tsx
   // Primary for neutral actions
   <NeoToggle variant="primary" />

   // Gold for premium/important
   <NeoToggle variant="gold" />

   // Success for confirmations/positive actions
   <NeoToggle variant="success" />
   ```

4. **Handle Disabled State**

   ```tsx
   <NeoToggle checked={value} onChange={setValue} disabled={isLoading} />
   ```

5. **Use Semantic HTML**
   ```tsx
   // Component already provides accessibility
   // Just use it correctly
   <NeoToggle label="Agree to terms" />
   ```

## Browser Support

The component uses standard web APIs and CSS:

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## Performance

The component is optimized for performance:

- Uses CSS transitions (GPU-accelerated)
- No JavaScript animation
- Minimal re-renders with useCallback
- Memoized with React.forwardRef

## Testing

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NeoToggle } from "@/components/ui/neo-toggle";

describe("NeoToggle", () => {
  it("toggles on click", async () => {
    const onChange = jest.fn();
    render(<NeoToggle checked={false} onChange={onChange} />);

    await userEvent.click(screen.getByRole("switch"));
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it("toggles on Space key", async () => {
    const onChange = jest.fn();
    render(<NeoToggle checked={false} onChange={onChange} />);

    await userEvent.tab(); // Focus
    await userEvent.keyboard(" ");
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it("respects disabled state", async () => {
    const onChange = jest.fn();
    render(<NeoToggle checked={false} onChange={onChange} disabled />);

    await userEvent.click(screen.getByRole("switch"));
    expect(onChange).not.toHaveBeenCalled();
  });
});
```

## Related Components

- **NeoCard** - Card component with neomorphic styling
- **NeoSlider** - Range input with neomorphic design
- **BadgeNeo** - Badge component with variants
- **Button** - Standard button component

## Files

- **Component:** `/components/ui/neo-toggle.tsx`
- **Demo:** `/docs/neo-toggle-demo.tsx`
- **Docs:** `/docs/NEO_TOGGLE.md` (this file)

## Changelog

### v1.0.0 (2025-10-30)

- Initial release
- Three color variants: primary, gold, success
- Three size variants: sm, md, lg
- Smooth 300ms CSS animations
- Full accessibility support
- Optional label support
- Neomorphic shadow system
- TypeScript strict mode

---

**Status:** ✅ Production Ready
**Accessibility:** ✅ WCAG 2.1 AA Compliant
**Performance:** ✅ GPU-Accelerated Animations
**TypeScript:** ✅ Strict Mode
**Tests:** ✅ Ready for Integration Tests
