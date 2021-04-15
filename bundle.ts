const scriptsFolder = "scripts";
const bundlesFolder = "scripts/bundles";

try {
	console.log("Removing old bundles...")
	await Deno.remove(bundlesFolder, { recursive: true });
} catch (e) {
	// Ignored
}
try {
	console.log("Creating folder for bundles...")
	await Deno.mkdir(bundlesFolder);
} catch (e) {
	// Ignored
}

console.log("Bundling scrips...");
for await (const file of Deno.readDir(scriptsFolder)) {
	if (file.isFile && file.name.toLowerCase().endsWith('.ts') && !file.name.startsWith('_')) {
		try {
			console.log("Found: " + file.name);
			const source = `${scriptsFolder}/${file.name}`;
			// const destination = `${bundlesFolder}/${file.name.replace('.ts', '')}.bundle.js`;
			const { files } = await Deno.emit(source, {
				compilerOptions: {
					checkJs: true,
				},
			});

			for (const [fileName, text] of Object.entries(files)) {
				// const dest = destination + (fileName.endsWith('.map') ? '.map' : '')
				const filePath = fileName.split('/');
				const name = filePath[filePath.length - 1].replace('.ts', '.bundle');
				await Deno.writeTextFile(`${bundlesFolder}/${name}`, text);
				console.log("Created: " + `${bundlesFolder}/${name}`);
			}
		}
		catch (e) {
			console.error(e);
		}
	}
}
console.log("Done!\n");
