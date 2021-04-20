export const Codec = {
	Stringify: (o: any) => '{' + Object.keys(o).map(k =>
		'"' + k + "\": " + (typeof o[k] == "object" ? JSON.stringify(o[k]) : o[k])
	).toString() + '}',
	Parse: (o: string): any => {

	}
}