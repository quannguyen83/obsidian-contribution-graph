# Sketch Contribution Graph

Fork of [Contribution Graph](https://github.com/vran-dev/obsidian-contribution-graph) by [vran-dev](https://github.com/vran-dev).

This fork adds an optional **Excalidraw-style** appearance in **Style Settings**:

- **Fill:** Solid, Hachure, or Cross-hatch.
- **Sloppiness:** Architect, Artist, or Cartoonist.
- **Fill stroke width:** Thin, Medium, or Thick; outlines always use Thick (2px).
- Hand-drawn cells and color legends across all three graph layouts.

Uses Rough.js with drawing options adapted from Excalidraw. Standard remains the default; existing data queries and interactions are retained. No Excalidraw plugin is required.

See [third-party notices](THIRD_PARTY_NOTICES.md) for attribution and licenses.

**Install with BRAT:** `quannguyen83/obsidian-contribution-graph`.

Version 0.13.0 uses the separate plugin ID `sketch-contribution-graph`, command **Add Sketch Heatmap**, codeblock `sketchContributionGraph`, and API `renderSketchContributionGraph`. It can run alongside the upstream plugin.

**Upgrading from this fork's 0.12.0:** remove the old BRAT entry and add the repository again to install the new ID. In notes you want this fork to render, change the codeblock language from `contributionGraph` to `sketchContributionGraph`; for DataviewJS, change `renderContributionGraph` to `renderSketchContributionGraph`. Keep the configuration inside unchanged. Existing notes are not modified automatically.
