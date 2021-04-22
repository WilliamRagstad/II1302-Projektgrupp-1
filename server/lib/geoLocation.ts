const API_KEY = 'c19fcf9dea971f19fddf8f8faa8a9fc2';

const GEOLocation = {
	Search: async (query: string) => {
		const response = await fetch(`http://api.positionstack.com/v1/forward?access_key=${API_KEY}&query=${query}`);
		const json = await response.json();
		return json;
	}
}

export { GEOLocation }