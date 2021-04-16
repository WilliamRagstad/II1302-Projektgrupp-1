const bundlesFolder = "client/scripts/bundles";
for await (const file of Deno.readDir(bundlesFolder)) {
	try {
		console.log("Found: " + file.name);
		const path = `${bundlesFolder}/${file.name}`;
		let code = new TextDecoder("utf-8").decode(await Deno.readFile(path));
		// Find exports
		let exportsIndex;
		while ((exportsIndex = code.indexOf("export")) != -1) {
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
			code = code.replace(exportsExpr, ''); // Remove export
			for (const alias of aliases) code = code.replaceAll(alias.original, alias.alias); // Rename
		}
		await Deno.writeTextFile(path, code.trim());
	}
	catch (e) {
		console.error(e);
	}
}
console.log("Done!\n");