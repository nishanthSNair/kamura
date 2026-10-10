# Kamura image standard

Every image on Kamura is generated to this specification. The point is that any
two images, made months apart, look like they belong to the same publication.

## Art direction

**Palette — strictly limited.** Sage mint (`#E8F0E9`), bone white (`#FAFCF7`),
warm cream, deep teal shadow (`#193F38`), and muted clay (`#C9A396`) as the only
warm accent. Nothing saturated. Nothing blue-tech.

**Light.** Soft diffused north-facing daylight from the left. Long, gentle
shadows. Never hard flash, never a coloured gel, never a glow effect.

**Subject.** Editorial still life or abstract macro. Real materials: ceramic,
glass, paper, stone, linen, clay. Medium format, fine natural grain, shallow
depth of field.

**Composition.** Subject off-centre, generous negative space on one side so a
headline can sit over it without a scrim.

## Never

- People, faces, hands, bodies (the 3D anatomy model is the only human form)
- Text, labels, numbers, logos, branding of any kind
- Medical clichés: stethoscopes, pill piles, lab coats, test tubes in racks
- Tech clichés: glowing DNA helixes, blue grids, circuit boards, HUD overlays
- Saturated colour, neon, lens flare, bokeh balls
- Anything that reads as stock photography

## Formats

| Use | Ratio | Width | Format | Budget |
|---|---|---|---|---|
| Page hero | 16:9 | 1600px | JPG q6 | < 110 KB |
| Section band | 16:9 (crop to 21:9 in CSS) | 1600px | JPG q6 | < 110 KB |
| Category / card | 16:9 | 1200px | JPG q6 | < 70 KB |
| Transition loop | 16:9 | 1280×720 | MP4 h264 crf31, silent, palindrome | < 500 KB |

## Naming and location

```
public/images/hero/<page>.jpg        page heroes      e.g. hero/tools.jpg
public/images/texture/<name>.jpg     section bands    e.g. texture/porcelain.jpg
public/images/category/<slug>.jpg    treatment cats   e.g. category/peptides.jpg
public/video/transition-<name>.mp4   motion loops
```

## Generating a new one

Use Higgsfield `gpt_image_2_5`, 16:9, and append this exact block to the subject
description so the art direction stays constant:

> Editorial still-life photograph in a strictly muted palette of sage green, bone
> white and warm cream. Soft diffused north-facing daylight from the left, long
> gentle shadows, shallow depth of field, medium format, fine natural grain.
> Generous negative space. No text, no people, no hands, no logos, no branding.

Then optimise:

```
ffmpeg -i in.png -vf "scale=1600:-1" -q:v 6 out.jpg
```

## Motion

Video is used only where stillness would be worse — a section transition, an
ambient band. It is always silent, always a seamless palindrome loop, never
autoplaying something with a face or a voice, and never above the fold on
mobile. If a still would do the same job, use the still.
