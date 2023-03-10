import { Application, Middleware, oakCors } from '../deps/deps.ts';

import router from './router.ts';

const app = new Application();

const logger: Middleware = (ctx, next) => {
	console.log(`Received ${ctx.request.url} at ${new Date()}`);
	return next();
};

app.use(logger);
app.use(oakCors({ origin: '*' }));
app.use(router.routes());
app.use(router.allowedMethods());

console.log('Starting server at http://localhost:8000');
await app.listen({ port: 8000 });
