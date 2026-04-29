# Ink Text-Safe Component Sheet Prompts

## Shared Base Prompt

Use case: transparent text-safe UI component material library.
Asset type: modern Chinese ink-wash website component shells, frames, and accents.
Primary request: Create 4 separate ink-wash UI component materials on one pure green chroma-key sheet.
Style: refined modern Chinese ink-wash product UI, rice-paper edges, dry-brush black ink outlines, soft grey ink wash, subtle xuan paper fill, restrained cinnabar red, jade green, indigo blue, warm ochre, and muted gold accents.
Text-safe rule: every component must reserve a clean central content zone for real HTML/CSS text. Keep brush texture, seals, paper fibers, and ink wash at the edges or corners. Do not draw readable text, fake text lines, paragraph placeholders, numbers, letters, icons that look like words, or dense texture inside the content zone.
Layer rule: these are transparent PNG materials to use as background shells, overlay frames, or edge accents. They should support live text and responsive layout, not replace real UI components.
Layout: exactly 2 columns by 2 rows, equal spacing, one complete component centered per cell, generous padding, no overlaps, no cropping.
Background: perfectly flat solid #00ff00 chroma-key background. The background must be one uniform color with no shadows, gradients, texture, reflections, floor plane, paper texture, or lighting variation. Do not use #00ff00 anywhere inside any component.
Output constraints: no readable text, no fake text placeholders, no watermarks, no realistic cast shadows, no 3D rendering, no photorealism, no full webpage screenshot.

## 01-text-containers

Components in slot order:
1. safe-paper-card: clean rice-paper card shell, pale ink edge and tiny corner wash only, empty center.
2. safe-section-panel: wide section panel shell, ink texture only along top and bottom edges, empty center.
3. safe-dialog-shell: modal dialog shell, subtle corner marks and paper edge, empty center.
4. safe-floating-note: slightly tilted note shell with a small cinnabar corner dot, empty center.

## 02-headings

Components in slot order:
1. safe-hero-title-plate: large hero title plate, decorative ink along left and right edges, broad blank center.
2. safe-section-heading-rule: brush rule for section heading, line should sit below/around a blank title zone.
3. safe-label-seal-slot: empty cinnabar seal label frame, no characters, clean middle.
4. safe-page-title-band: horizontal page title band, ink at both ends only, clean central title zone.

## 03-controls

Components in slot order:
1. safe-primary-button-shell: cinnabar button shell with blank center and dry-brush edge.
2. safe-secondary-button-shell: pale paper secondary button shell with blank center and thin ink outline.
3. safe-chip-frame: small pill chip shell with blank center and tiny edge dots.
4. safe-toggle-track: toggle track shell with track and knob zones, no labels.

## 04-forms

Components in slot order:
1. safe-input-shell: single-line input shell, clean interior, edge ink only.
2. safe-textarea-shell: multiline textarea shell, clean large interior, soft corner wash.
3. safe-select-shell: select/dropdown shell, clean center and tiny arrow-like ink mark at right edge.
4. safe-form-group-shell: form group panel shell, large clean interior, edge texture outside.

## 05-lists

Components in slot order:
1. safe-list-row: one list row shell, left status/icon dot zone and clean text zone.
2. safe-list-panel: list container shell, no fake row text, only outer border and faint separators near edges.
3. safe-feature-row-shell: feature row shell, left icon circle and large clean text area.
4. safe-step-card: step card shell, small node ornament at corner and blank center.

## 06-data

Components in slot order:
1. safe-stat-card: metric card shell, clean space for live number and label.
2. safe-chart-frame: chart frame overlay with subtle axes-like edge marks, transparent clean chart area.
3. safe-table-shell: table container shell, no fake rows, clean body area.
4. safe-dashboard-panel: wide dashboard panel shell, edge wash only, clean interior.

## 07-content

Components in slot order:
1. safe-article-shell: article card shell with left media rectangle zone and right clean text zone.
2. safe-media-caption-frame: media frame with separate clean caption band.
3. safe-profile-shell: profile card shell with avatar circle zone and clean info area.
4. safe-pricing-shell: pricing card shell, clean zones for price, features, and button.

## 08-feedback

Components in slot order:
1. safe-toast-shell: toast notification shell, left status dot and clean text zone.
2. safe-alert-band: alert banner shell, emphasized edge outside clean message area.
3. safe-empty-state-shell: empty state panel shell, top illustration zone and bottom clean text zone.
4. safe-progress-rail: progress rail accent, nodes and line but no labels.

## 09-text-decor

Components in slot order:
1. safe-brush-underline: dry-brush underline accent, very thin and text-safe.
2. safe-corner-brackets: four-corner bracket overlay frame with transparent center.
3. safe-margin-seal-slot: tiny margin seal slot, no characters, decorative only.
4. safe-ink-backdrop: very pale ink backdrop, low-noise center suitable behind large text.

## 10-mobile-text

Components in slot order:
1. safe-phone-frame: mobile phone frame overlay with clean screen area.
2. safe-mobile-card-shell: narrow mobile card shell with clean content area.
3. safe-bottom-bar-shell: mobile bottom bar shell, no icons or labels inside.
4. safe-chat-bubble-shell: chat bubble shell, blank interior for real message text.
