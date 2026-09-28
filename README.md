# Contribution Graph — Excalidraw-style fork

This fork of [vran-dev/obsidian-contribution-graph](https://github.com/vran-dev/obsidian-contribution-graph) adds optional hand-drawn cells using Rough.js and drawing options adapted from Excalidraw. Existing queries, date layouts, color rules, tooltips and click actions are retained.

## Enable the new style

1. Create a heatmap with **Add Heatmap**, or edit an existing heatmap.
2. Open **Style Settings** and choose **Drawing style → Excalidraw-style**.
3. Choose **Fill style**: Solid, Hachure, or Cross-hatch.
4. Choose **Sloppiness**: Architect, Artist, or Cartoonist, and a stroke width.
5. Click **Preview**, then **Save**.

All new controls are in English. Standard remains the default for existing notes. No Excalidraw plugin, API key, or network connection is required for drawing. Dataview is still required by the original plugin's note-query workflow.

### Configuration

Add this to an existing `contributionGraph` block, or pass it to the existing DataviewJS graph API:

```yaml
sketchStyle:
  enabled: true
  fillStyle: hachure
  roughness: 1
  strokeWidth: 1
```

| Option | Values | Default |
| --- | --- | --- |
| `enabled` | `true`, `false` | `false` |
| `fillStyle` | `solid`, `hachure`, `cross-hatch` | `hachure` |
| `roughness` | 0 (Architect), 1 (Artist), 2 (Cartoonist) | 1 |
| `strokeWidth` | 0.5 (Thin), 1 (Medium), 2 (Thick) | 1 |

Works with Git-style, Month Track and Calendar layouts, including the color legend. Colors and text come from existing cell rules. Days without a fill rule have an outline only. Date seeds keep each day's drawing stable across renders. SVGs scale with their cells without background timers or observers; very stretched cells also stretch the drawn strokes. Existing round/circle presets are represented with rounded paths/ellipses.

The style adapts Excalidraw's small-shape roughness, fill-weight and hatch-spacing settings. It is not the full Excalidraw editor and does not create editable `.excalidraw` files. Fonts remain those of your Obsidian theme. See [third-party notices](THIRD_PARTY_NOTICES.md).

## Build and install this fork

```sh
npm ci
npm run build
# DOM regression checks:
node tests/sketch-smoke.cjs
```

Copy `main.js`, `manifest.json`, and `styles.css` into your vault's `.obsidian/plugins/contribution-graph/` folder, then reload the plugin. This fork keeps the original plugin ID: use it **instead of** the upstream plugin. Upstream updates can replace this fork. BRAT installation requires a GitHub release containing those three files; a source commit alone is not a BRAT release.

## Original documentation

The upstream documentation and screenshots below describe the existing features.

---


![](attachment/d20ba90e31c16a3c4d79cba9298577de.png)


**English**  |  [中文文档](https://mp.weixin.qq.com/s/wI8M_C87oZAtCBjFWC8CmA)

## What

Contribution Graph is a plugin for [obsidian.md](https://obsidian.md/) which can generate interactive heatmap graphs like GitHub to track your notes, habits, activity, history, and so on.


<a href="https://www.buymeacoffee.com/vran">
  <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="buy me a coffee" width="200px"/>
</a>


## Use Cases

- Habit Tracker: Count the number of tasks you complete every day. Different numbers will be marked in different colors.
- Note Tracker: Count the number of notes you create every day. Different numbers will be marked in different colors.
- Review Report: Count your notes or tasks for a certain period of time and generate a heat map for a more intuitive review
- and more...

## Quick Start

- Create empty note, then right-click
- Select **Add Heatmap** options
- Click the `save` button, and then a heatmap will be created in note.

![Alt text](attachment/contribution-graph-create.gif)

## Themes

- Git Style

![alt text](attachment/image-1.png)

- Month Track

![alt text](attachment/image-2.png)

- Calendar

![alt text](attachment/image.png)

## Features

- **Multiple graph types**, support week-track(default), month-track, and calendar view.
- **Personalized style**, you can configure cell colors and fill cells with emojis.
- **Customizable dates**,use fixed date range or latest date to generate graph
- **Interactive charts**, you can customize cell click event, hover to show statistic data
- **Integrate with DataviewJS**, use contribution graph's api to dynamically render charts 

![](attachment/74103317de5336b5283338c56171f268.png)


### How to Modify Graph?

Just click the edit button at top right corner

![Alt text](attachment/contribution-graph-edit.gif)

### Configurations

| name                   | description                                                           | type                    | default    | sample     | required                                 |
| ---------------------- | --------------------------------------------------------------------- | ----------------------- | ---------- | ---------- | ---------------------------------------- |
| title                  | the title of the graph                                                | string                  | Contributions         |            | false                                    |
| titleStyle             | the style of the title                                                | object                  |          |            |   false                                       |
| days                   | Maximum number of days for the chart to display (starting from today) | number                  |            | 365        | true if miss **fromDate** and **toDate** |
| fromDate               | The start date of the chart                                           | date, format yyyy-MM-dd |            | 2023-01-01 | true if miss **days**                    |
| toDate                 | The end date of the chart                                             | date, format yyyy-MM-dd |            | 2023-12-31 | true if miss **days**                    |
| query                  | dataview query syntax, contribution graph will use it to count files  | string                  |            |            | true                                     |
| dateField              | Date attributes of files used for data distribution                   | string                  | file.ctime | createTime | false                                    |
| startOfWeek            | start of week                                                         | number                  | 0          |            | false                                    |
| showCellRuleIndicators | Control the display and hiding of cell rule indicator elements        | boolean                 | true       |            | false                                    |
| cellStyleRules         | cell style rule                                                       | array                   |            |            | false                                    |

## More Usage Guides

- [API Usage, Integrate with DataviewJS ](README_ADVANCED.md)
- [Basic Codeblock Usage](README_BASIC.md)
