import { SketchStyle } from "src/types";

export function SketchStyleForm({ value = {}, onChange }: {
	value?: SketchStyle;
	onChange: (value: SketchStyle) => void;
}) {
	return <>
		<div className="form-item">
			<span className="label">Drawing style</span>
			<div className="form-content">
				<select aria-label="Drawing style" value={value.enabled ? "sketch" : "standard"}
					onChange={e => onChange({ ...value, enabled: e.target.value === "sketch" })}>
					<option value="standard">Standard</option>
					<option value="sketch">Excalidraw-style</option>
				</select>
			</div>
		</div>
		{value.enabled && <>
			<div className="form-item">
				<span className="label">Fill style</span>
				<div className="form-content">
					<select aria-label="Fill style" value={value.fillStyle || "hachure"}
						onChange={e => onChange({ ...value, fillStyle: e.target.value as SketchStyle["fillStyle"] })}>
						<option value="solid">Solid</option>
						<option value="hachure">Hachure</option>
						<option value="cross-hatch">Cross-hatch</option>
					</select>
				</div>
			</div>
			<div className="form-item">
				<span className="label">Sloppiness</span>
				<div className="form-content">
					<select aria-label="Sloppiness" value={value.roughness ?? 1}
						onChange={e => onChange({ ...value, roughness: Number(e.target.value) })}>
						<option value={0}>Architect</option><option value={1}>Artist</option><option value={2}>Cartoonist</option>
					</select>
				</div>
			</div>
			<div className="form-item">
				<span className="label">Stroke width</span>
				<div className="form-content">
					<select aria-label="Stroke width" value={value.strokeWidth ?? 1}
						onChange={e => onChange({ ...value, strokeWidth: Number(e.target.value) })}>
						<option value={0.5}>Thin</option><option value={1}>Medium</option><option value={2}>Thick</option>
					</select>
				</div>
			</div>
		</>}
	</>;
}
