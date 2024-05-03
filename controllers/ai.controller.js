import { LLModel, createCompletion, DEFAULT_DIRECTORY, DEFAULT_LIBRARIES_DIRECTORY, loadModel } from '../node_modules/gpt4all/src/gpt4all.js';


export async function query(data) {
	const response = await fetch(
		"https://api-inference.huggingface.co/models/mistralai/Mixtral-8x22B-Instruct-v0.1",
		{
			headers: { Authorization: "Bearer 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" },
			method: "POST",
			body: JSON.stringify(data),
		}
	);
	const result = await response.json();
	return result;
}
export async function gpt4allTest() {
	const model = await loadModel( 'mistral-7b-openorca.gguf2.Q4_0.gguf', { verbose: true, device: 'gpu' });

	const completion1 = await createCompletion(model, "répond a ce dilemme a l'aide des choix que je vais te donner :Vous apprenez que votre entreprise ne respecte pas les lois concernant la protection de l'environnement. Choix n°1 : Vous dénoncez votre entreprise et risquez de perdre votre travail et choix n°2:Vous ne dites rien pour conserver votre emploi. J'ajoute le contexte que pour choisir tu dois prendre en compte que tu as plus 55 ans et que retouver un travail peut etre dur. Tu expliqueras ton choix.", { verbose: true, })
	console.log(completion1.message)


	model.dispose();
}
