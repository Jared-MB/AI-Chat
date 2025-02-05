export interface Model {
	name: string;
	model: string;
	modified_at: Date;
	size: number;
	digest: string;
	details: Details;
}

export interface Details {
	parent_model: string;
	format: string;
	family: string;
	families: string[];
	parameter_size: string;
	quantization_level: string;
}
