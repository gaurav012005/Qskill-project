import url from 'url';

// Custom router for handling HTTP requests
export class Router {
    constructor() {
        this.routes = [];
    }

    // Add route
    addRoute(method, path, ...handlers) {
        this.routes.push({ method, path, handlers });
    }

    // Helper methods for different HTTP methods
    get(path, ...handlers) {
        this.addRoute('GET', path, ...handlers);
    }

    post(path, ...handlers) {
        this.addRoute('POST', path, ...handlers);
    }

    put(path, ...handlers) {
        this.addRoute('PUT', path, ...handlers);
    }

    delete(path, ...handlers) {
        this.addRoute('DELETE', path, ...handlers);
    }

    // Match route and extract params
    matchRoute(method, pathname) {
        for (const route of this.routes) {
            if (route.method !== method) continue;

            const routeParts = route.path.split('/').filter(Boolean);
            const pathParts = pathname.split('/').filter(Boolean);

            if (routeParts.length !== pathParts.length) continue;

            const params = {};
            let isMatch = true;

            for (let i = 0; i < routeParts.length; i++) {
                if (routeParts[i].startsWith(':')) {
                    // Dynamic parameter
                    const paramName = routeParts[i].substring(1);
                    params[paramName] = pathParts[i];
                } else if (routeParts[i] !== pathParts[i]) {
                    isMatch = false;
                    break;
                }
            }

            if (isMatch) {
                return { handlers: route.handlers, params };
            }
        }

        return null;
    }

    // Handle request
    async handle(req, res) {
        const parsedUrl = url.parse(req.url, true);
        const pathname = parsedUrl.pathname;
        const match = this.matchRoute(req.method, pathname);

        if (!match) {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Route not found' }));
            return;
        }

        // Attach params and query to request
        req.params = match.params;
        req.query = parsedUrl.query;

        // Execute middleware chain
        let index = 0;
        const next = async () => {
            if (index < match.handlers.length) {
                const handler = match.handlers[index++];
                await handler(req, res, next);
            }
        };

        try {
            await next();
        } catch (error) {
            console.error('Route handler error:', error);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Internal server error' }));
        }
    }
}
