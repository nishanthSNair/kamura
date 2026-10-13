# Kamura image standard

Every image on Kamura is generated to this specification. The point is that any
two images, made months apart, look like they belong to the same publication.

## Art direction

**Palette — strictly limited.** Deep indigo-black (`#0C1324`) as the ground,
bone white (`#F1EEE6`) for the subject, and warm amber (`#F5A524`) as the only
light source and the only accent. Nothing green, nothing blue-tech, nothing
pastel. The indigo matters: the anatomy renders in warm clay, and indigo sits
almost opposite it, so tissue reads as lit rather than tinted.

**Light.** A single warm amber source raking in from the left, catching edges
and falling away into near-darkness. Long shadows. One light, never two. Never
hard flash, never a coloured gel, never a glow effect.

**Subject.** Editorial still life or sculptural object — alabaster, plaster,
bone, ceramic, glass, stone. Museum-object lighting, medium format, fine
natural grain, shallow depth of field. The register is a gallery vitrine, not
a laboratory bench.

**Composition.** Subject in the right third. The left two-thirds is empty
negative space so a headline sits over it without a scrim doing all the work.

## Never

- Living people, faces, hands, skin (the 3D anatomy model is the only human form)
- Text, labels, numbers, logos, branding of any kind — baked-in words cannot be
  translated, cannot be read aloud, and break at the first breakpoint
- Medical clichés: stethoscopes, pill piles, lab coats, test tubes in racks
- Tech clichés: glowing DNA helixes, blue grids, circuit boards, HUD overlays
- Anything gory, surgical or clinical
- Neon, lens flare, bokeh balls, more than one light source
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

> Editorial still-life photograph, medium format, 16:9. Subject in the RIGHT
> third of the frame on a dark matte surface, lit by a single warm amber light
> raking in from the left, catching the edges and falling away into deep
> indigo-blue shadow. Background is a deep indigo-black void, hex #0C1324, with
> a faint warm amber glow behind the subject. Bone-white specular highlights,
> warm amber rim light hex #F5A524, no other colour in the frame. The LEFT
> two-thirds is empty negative space so a headline can sit over it. Shallow
> depth of field, fine natural film grain, museum-object lighting, restrained
> and expensive. Absolutely no text, letters, numbers, labels, logos or
> watermarks. No living people, no faces, no hands, no skin, not gory, not
> surgical, not a stock medical photograph.

Then optimise:

```
ffmpeg -i in.png -vf "scale=1600:-1" -q:v 6 out.jpg
```

## Motion

Video is used only where stillness would be worse — a section transition, an
ambient band. It is always silent, always a seamless palindrome loop, never
autoplaying something with a face or a voice, and never above the fold on
mobile. If a still would do the same job, use the still.
