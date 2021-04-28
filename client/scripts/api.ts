export const API = {
	Get: async function (endpoint: string) {
		const response = await fetch(endpoint.startsWith('/') ? endpoint : `/${endpoint}`);
		try {
			return await response.json();
		} catch (error) {
			return await response.text();
		}
	}
}