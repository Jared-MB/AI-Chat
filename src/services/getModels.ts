"use server";

import type { Model } from "@/interfaces/ai";
import ollama from "ollama";

interface Models {
	models: Model[];
}

export async function getModels() {
	const models = await ollama.list();
	return models;
}

export async function getLastUsedModel() {
	const lastUsedModel = await ollama.ps();
	return lastUsedModel;
}
