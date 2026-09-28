import { ContributionGraphConfig } from "src/types";

export function FontStyleForm({ font, customFont, onFontChange, onCustomFontChange }: {
	font?: ContributionGraphConfig["font"];
	customFont?: string;
	onFontChange: (font: ContributionGraphConfig["font"]) => void;
	onCustomFontChange: (font: string) => void;
}) {
	return <>
		<div className="form-item">
			<span className="label">Font</span>
			<div className="form-content">
				<select aria-label="Graph font" value={font || "default"}
					onChange={e => onFontChange(e.target.value as ContributionGraphConfig["font"])}>
					<option value="default">Default (Obsidian theme)</option>
					<option value="handwritten">Handwritten (Virgil)</option>
					<option value="custom">Custom</option>
				</select>
			</div>
		</div>
		{font === "custom" && <div className="form-item">
			<span className="label">Custom font name</span>
			<div className="form-content">
				<input aria-label="Custom font name" type="text" placeholder="e.g. Segoe Print"
					value={customFont || ""} onChange={e => onCustomFontChange(e.target.value)} />
			</div>
		</div>}
		<div className="form-item">
			<span className="label"></span>
			<div className="form-content">Applies to all graph text. Virgil works offline; custom fonts must be installed on your device.</div>
		</div>
	</>;
}
