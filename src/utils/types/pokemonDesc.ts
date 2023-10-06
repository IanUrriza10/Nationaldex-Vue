export interface FlavorText {
	name: string;
	flavorText: string;
}

export interface GenerationFlavorText {
	generation_id: number | null | undefined;
	generation_name: string | undefined;
	flavorTexts: FlavorText[];
}

export interface Ability {
	name: string;
	effect: string;
	isHidden: string;
}
