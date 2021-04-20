export const API = {
	Get: async function(endpoint: string) {
		const response = await fetch(endpoint.startsWith('/') ? endpoint : `/${endpoint}`);
		const data = await response.json();
		return data;
	}
}