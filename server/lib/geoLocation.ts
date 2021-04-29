const API_KEY = 'c19fcf9dea971f19fddf8f8faa8a9fc2';

const GEOLocation = {
	Search: async (query: string) => {
		const response = await fetch(`http://api.positionstack.com/v1/forward?access_key=${API_KEY}&query=${query}`);
		if (response.status !== 200) return false;
		try {
			return await response.json();
		} catch (error) {
			return await response.text();
		}
	}
}

export { GEOLocation }