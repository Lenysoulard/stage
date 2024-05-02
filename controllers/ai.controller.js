

export async function query(data) {
    const data = req.body.inputs;
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
