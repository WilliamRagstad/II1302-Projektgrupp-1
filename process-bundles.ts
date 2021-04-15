

const bundlesFolder = "scripts/bundles";
for await (const file of Deno.readDir(bundlesFolder)) {
	try {
		console.log("Found: " + file.name);
		const path = `${bundlesFolder}/${file.name}`;
		let code = new TextDecoder("utf-8").decode(await Deno.readFile(path));

		// Find exports
		let exportsIndex;
		while ((exportsIndex = code.indexOf("export")) != -1) {
			// Found
			let exportsExpr = "";
			for (let i = exportsIndex; i < code.length; i++) {
				const c = code[i];
				exportsExpr += c;
				if (c == ';') break;
			}

			console.log(`Found exports expression: '${exportsExpr}'`);

			// Parse and rename everything
			const aliases = exportsExpr.split('{')[1].split('}')[0].split(',').map(a => {
				const p = a.trim().split(' as ');
				return {
					original: p[0],
					alias: p[1]
				}
			});

			// Remove export
			code = code.replace(exportsExpr, '');
			// Rename
			for (const alias of aliases) code = code.replaceAll(alias.original, alias.alias);
		}

		// console.log(code);
		await Deno.writeTextFile(path, code.trim());
	}
	catch (e) {
		console.error(e);
	}
}
console.log("Done!\n");




/*
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
*/