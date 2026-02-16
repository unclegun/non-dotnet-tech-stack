import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';

/**
 * Timing Plugin
 * 
 * Measures request duration and logs it on response.
 * Useful for identifying slow endpoints and performance monitoring.
 * 
 * In production, this data could be sent to APM tools like:
 * - New Relic
 * - Datadog
 * - Application Insights
 * - Prometheus + Grafana
 */
const timingPlugin: FastifyPluginAsync = async (fastify) => {
  fastify.addHook('onRequest', async (request, reply) => {
    (request as any).startTime = Date.now();
  });

  fastify.addHook('onResponse', async (request, reply) => {
    const startTime = (request as any).startTime as number;
    const duration = Date.now() - startTime;

    fastify.log.info({
      traceId: request.traceId,
      method: request.method,
      url: request.url,
      statusCode: reply.statusCode,
      duration: `${duration}ms`,
    }, 'Request completed');
  });
};

export default fp(timingPlugin, {
  name: 'timing',
  fastify: '4.x',
  dependencies: ['request-context'],
});
