export const API = {
	Get: async function (endpoint: string) {
		const response = await fetch(endpoint.startsWith('/') ? endpoint : `/${endpoint}`);
		if (response.status !== 200) return false;
		try {
			return await response.json();
		} catch (error) {
			return await response.text();
		}
	}
}