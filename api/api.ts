import { Application, Middleware } from '../deps/deps.ts';

import router from './router.ts';
import auth from './auth.ts';

// Connect to database
// Check which adapters are configured
// Load those adapters

// Request:
//  - check RLS policy for user

// for each adapter, get the required metadata

// request from ingress adapters
// - verify if the *adapter* sending the request is authenticated and authorized.
// - authenticate the *request* (who sent it using the adapter)
//  -
//  -

// add secret to authenticate webhook
// - each adapter gets it's own token
// - in

const app = new Application();

const logger: Middleware = (ctx, next) => {
	console.log(`Received ${ctx.request.url} at ${new Date()}`);
	return next();
};

app.use(logger);
app.use(auth);
app.use(router.routes());
app.use(router.allowedMethods());

console.log('Starting server at http://localhost:8000');
await app.listen({ port: 8000 });
