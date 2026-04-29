# InkView Design System / 设计系统

## Tokens

```css
:root {
  --ink-bg: #f6f1e6;
  --ink-paper: #fffaf0;
  --ink-paper-deep: #eee3d0;
  --ink-text: #201c18;
  --ink-muted: #6f675d;
  --ink-line: #2a2723;
  --ink-wash: rgba(32, 28, 24, 0.08);
  --ink-cinnabar: #b64232;
  --ink-indigo: #2f536f;
  --ink-jade: #5c7f67;
  --ink-ochre: #b78642;
  --ink-gold: #c8a65a;
}
```

## Good InkView

- Modern product layout first, ink-wash atmosphere second.
- Paper surfaces with crisp text.
- Brush lines as dividers, not borders around everything.
- Cinnabar seals for important labels and status.
- Icons used semantically, not as wallpaper.

## Avoid

- Heavy red and gold.
- Fantasy/xianxia/game UI.
- Dirty paper texture behind small text.
- Decorative objects that block scanning.
- Calligraphy fonts for forms, tables, nav, and buttons.

## Component Notes

- Buttons: solid ink or cinnabar primary, paper secondary, clear focus ring.
- Cards: warm paper fill, subtle ink wash shadow, one dry-brush edge or accent.
- Forms: high-contrast labels, plain paper inputs, no texture inside inputs.
- Navigation: simple text plus restrained icons.
- Empty states: one strong icon, short text, one action.
- Text-heavy UI: use `assets/ink-text-safe-components/` as shells or frames, then place real text with HTML/CSS.
- Decorative UI: use `assets/ink-common-components/` only when the asset is mainly visual and does not compete with copy.
