import { GEOLocation } from "../lib/geoLocation.ts";

type query = {
	name: string,
	value: string
}
function parseQueryString(queryString: string): query[] {
	const queryParts = queryString.split('?')[1];
	if (!queryParts) return [];
	return queryParts.split('&').map((q: string): query => {
		const p = q.split('=');
		return {
			name: p[0],
			value: p[1]
		} as query
	})
}

export async function searchGeoHandler(data: any) {
	const query = parseQueryString(data.url.search);
	const search = query.find(q => q.name === 'query');
	if (search == undefined) return `ERROR: No query provided!
Expected /geo?query=<Search text>`;
	return await GEOLocation.Search(search.value);
}
