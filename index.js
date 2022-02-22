import vite from 'vite';

const server = await vite.createServer();

const modules = ['./missing.js', './bad.js'];
const mechanisms = [
	{
		name: 'node',
		fn: (mod) => import(mod)
	},
	{
		name: 'vite',
		fn: (mod) => server.ssrLoadModule(mod)
	}
];

for (const mechanism of mechanisms) {
	console.group(mechanism.name);
	for (const module of modules) {
		try {
			const result = await mechanism.fn(module);
			console.log(
				`\u001B[1m\u001B[91m✗ import of ${module} unexpectedly succeeded on first attempt\u001B[39m\u001B[22m`
			);

			console.log(result);
		} catch (e) {
			console.log(`✔ import of ${module} failed as expected`);
		}

		try {
			const result = await mechanism.fn(module);
			console.log(
				`\u001B[1m\u001B[91m✗ import of ${module} unexpectedly succeeded on second attempt\u001B[39m\u001B[22m`
			);

			console.log(result);
		} catch (e) {
			console.log(`✔ import of ${module} failed as expected`);
		}
	}
	console.groupEnd();
}

await server.close();
