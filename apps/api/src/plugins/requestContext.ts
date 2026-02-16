import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import { randomUUID } from 'crypto';

/**
 * Request Context Plugin
 * 
 * Adds a unique request ID (traceId) to every incoming request.
 * This enables request tracing across logs and helps with debugging.
 * 
 * The traceId is:
 * - Generated once per request
 * - Available on request.traceId
 * - Included in error responses
 * - Can be logged in structured logs
 */
declare module 'fastify' {
  interface FastifyRequest {
    traceId: string;
  }
}

const requestContextPlugin: FastifyPluginAsync = async (fastify) => {
  fastify.decorateRequest('traceId', '');

  fastify.addHook('onRequest', async (request) => {
    // Use header if provided (for request chaining), otherwise generate
    request.traceId = (request.headers['x-trace-id'] as string) || randomUUID();
  });
};

export default fp(requestContextPlugin, {
  name: 'request-context',
  fastify: '4.x',
});
