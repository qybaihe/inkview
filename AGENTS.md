# InkView Agent Guide

This repository is an agent-ready package for transforming websites into refined modern Chinese ink-wash experiences.

When asked to use InkView:

1. Read `README.md` for repository structure.
2. Read `docs/design-system.md` for the visual language.
3. Read `docs/icon-library.md` before selecting icons.
4. Use `scripts/select_icons.py` to find icon candidates.
5. Use `scripts/copy_icons.py` to copy selected icons into the target website's own asset directory.
6. Preserve the target website's functionality, content hierarchy, and accessibility.

Avoid heavy red-gold antique styling, fantasy/xianxia visuals, low contrast, fake old-paper grime, and decoration that harms scanning or interaction.

Primary transformation prompt:

```text
Preserve the website's information architecture, content priority, conversion goals, and core interactions. Redesign the visual system into a refined modern Chinese ink-wash style: rice-paper surfaces, dry-brush ink lines, restrained cinnabar/jade/indigo/ochre accents, calm spacing, readable typography, and semantically matched local icons from the bundled InkView icon library.
```

