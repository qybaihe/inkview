# Transformation Prompt

Use this as the redesign brief when planning or implementing a website conversion:

```text
Preserve the website's information architecture, content priority, conversion goals, and core interactions. Redesign the visual system into a refined modern Chinese ink-wash style: rice-paper surfaces, dry-brush ink lines, restrained cinnabar/jade/indigo/ochre accents, calm spacing, readable typography, and semantically matched local icons from the bundled ink-common-icons library. The result should feel elegant, ancient-inspired, and product-grade, not theatrical or theme-park antique.

Replace generic decorative icons only where the bundled ink icons improve meaning. Use ink textures and brush motifs as hierarchy and atmosphere, never as clutter. Avoid heavy red-gold palettes, low contrast, fantasy/xianxia imagery, fake old-paper grime, and decorative elements that interfere with scanning, forms, tables, or calls to action.
```

## Practical Conversion Steps

1. Define design tokens: paper, ink text, muted ink, line, cinnabar, indigo, jade, ochre.
2. Convert global background and main surfaces before touching individual components.
3. Restyle navigation, buttons, cards, forms, and section dividers.
4. Replace or add icons only after layout and hierarchy are stable.
5. Add one or two subtle motifs per page: seal tag, brush divider, pale ink circle, paper layer, or icon-led empty state.
6. Check mobile layout. Brush assets often need smaller opacity or removal on narrow screens.

## Tone Calibration

Subtle modern product:

- Warm paper, black ink, one accent color.
- Sparse icons, high readability.
- Best for SaaS, dashboards, serious products.

Elegant guofeng editorial:

- More negative space, larger imagery, seal accents, section rhythm.
- Best for culture, art, portfolio, education, event sites.

Playful ink UI:

- More icon usage, bolder cinnabar/jade accents, visible brush marks.
- Best for casual tools, learning apps, creative products.
