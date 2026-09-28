import rough from "roughjs/bin/rough";
import { SketchStyle } from "src/types";

const NS = "http://www.w3.org/2000/svg";
const bounded = (n: unknown, fallback: number, min: number, max: number) =>
	typeof n === "number" && Number.isFinite(n) ? Math.max(min, Math.min(max, n)) : fallback;

export function dateSeed(value: string): number {
	let hash = 2166136261;
	for (let i = 0; i < value.length; i++) hash = Math.imul(hash ^ value.charCodeAt(i), 16777619);
	return (hash >>> 0) % 2147483646 + 1;
}

// Adapted from Excalidraw's generateRoughOptions/adjustRoughness.
// See THIRD_PARTY_NOTICES.md. The normalized 24px cell uses its small-shape adjustment.
export function sketchOptions(style: SketchStyle, seed: number, fill?: string, continuousPath = false) {
	const strokeWidth = bounded(style.strokeWidth, 1, 0.5, 2);
	const roughness = bounded(style.roughness, 1, 0, 2);
	return {
		seed, strokeWidth, fillWeight: strokeWidth / 2,
		hachureGap: strokeWidth * 4, roughness: roughness / 2,
		preserveVertices: continuousPath || roughness < 2,
		stroke: "var(--text-muted)", fill,
		fillStyle: ["solid", "hachure", "cross-hatch"].includes(style.fillStyle || "")
			? style.fillStyle! : "hachure",
	};
}

export function decorateSketchGraph(graph: HTMLElement, style?: SketchStyle): void {
	if (style?.enabled !== true) return;
	graph.classList.add("has-sketch-style");
	const cells = graph.querySelectorAll<HTMLElement>(
		".cell[data-date], .cell-rule-indicator-container > .cell:not(.text)"
	);
	cells.forEach((cell, index) => {
		if (cell.classList.contains("sketch-cell")) return;
		const svg = document.createElementNS(NS, "svg");
		svg.setAttribute("viewBox", "0 0 24 24");
		svg.setAttribute("preserveAspectRatio", "none");
		svg.setAttribute("aria-hidden", "true");
		svg.classList.add("sketch-cell-art");
		const fill = cell.style.backgroundColor || undefined;
		const radius = cell.style.borderRadius;
		const rounded = radius !== "50%" && radius !== "0" && radius !== "0px" && radius !== "0%";
		// Excalidraw passes continuousPath=true for rounded rectangles, even
		// in Cartoonist mode: adjoining line/curve endpoints must stay joined.
		const options = sketchOptions(style, dateSeed(cell.dataset.date || `legend-${index}`), fill, rounded);
		const rc = rough.svg(svg);
		const shape = radius === "50%"
			? rc.ellipse(12, 12, 19, 19, options)
			: rounded
				? rc.path("M 5 2.5 H 19 Q 21.5 2.5 21.5 5 V 19 Q 21.5 21.5 19 21.5 H 5 Q 2.5 21.5 2.5 19 V 5 Q 2.5 2.5 5 2.5 Z", options)
				: rc.rectangle(2.5, 2.5, 19, 19, options);
		svg.appendChild(shape);
		const label = document.createElement("span");
		label.className = "sketch-cell-label";
		while (cell.firstChild) label.appendChild(cell.firstChild);
		cell.append(svg, label);
		cell.classList.add("sketch-cell");
	});
}
