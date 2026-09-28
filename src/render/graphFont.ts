import { ContributionGraphConfig } from "src/types";

export function applyGraphFont(graph: HTMLElement, config: Pick<ContributionGraphConfig, "font" | "customFont">): void {
	graph.style.removeProperty("font-family");
	if (config.font === "handwritten") {
		graph.style.fontFamily = '"Sketch Heatmap Virgil", cursive';
	} else if (config.font === "custom" && typeof config.customFont === "string") {
		const name = config.customFont.trim();
		if (name) {
			// Treat input as one font name, never as CSS declarations or a URL.
			const quoted = name.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/[\r\n\f]/g, " ");
			graph.style.fontFamily = `"${quoted}", sans-serif`;
		}
	}
}
