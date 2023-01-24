import { Application, Middleware } from '../deps/deps.ts';

import router from './router.ts';
import { withAuthorizedListener } from './middleware.ts';

const app = new Application();

const logger: Middleware = (ctx, next) => {
	console.log(`Received ${ctx.request.url} at ${new Date()}`);
	return next();
};

app.use(logger);
app.use(withAuthorizedListener);
app.use(router.routes());
app.use(router.allowedMethods());

console.log('Starting server at http://localhost:8000');
await app.listen({ port: 8000 });
