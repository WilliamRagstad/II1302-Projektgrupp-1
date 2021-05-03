const API_KEY = 'AIzaSyD4tTdqCoVG1GscHT-UsvSn0HBIddssrV0';

const GEOLocation = {
	Search: async (query: string) => {
		const response = await fetch(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?key=${API_KEY}&input=${query}&inputtype=textquery&fields=geometry/location`);
		if (response.status !== 200) return false;
		try {
			return await response.json();
		} catch (error) {
			return await response.text();
		}
	}
}

export { GEOLocation }