import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import { ZodError } from 'zod';
import { ProblemDetails } from '@test-stack/contracts';
import { AppError } from '../lib/appError.js';

/**
 * Error Handler Plugin
 * 
 * Centralizes error handling and maps errors to Problem Details format (RFC 7807 inspired).
 * 
 * Why Problem Details?
 * - Consistent error shape across all endpoints
 * - Machine-readable error types
 * - Human-readable titles and details
 * - Request tracing via traceId
 * - Similar to ASP.NET Core's ProblemDetails
 * 
 * Error Mapping:
 * - ZodError => 400 Bad Request with validation details
 * - AppError => Custom status code with error details
 * - Unknown => 500 Internal Server Error
 */
const errorHandlerPlugin: FastifyPluginAsync = async (fastify) => {
  fastify.setErrorHandler((error, request, reply) => {
    const traceId = request.traceId;

    // Zod validation error
    if (error instanceof ZodError) {
      const problemDetails: ProblemDetails = {
        type: 'https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.1',
        title: 'Validation Failed',
        status: 400,
        detail: 'One or more validation errors occurred.',
        instance: request.url,
        traceId,
      };

      fastify.log.warn({
        traceId,
        error: error.errors,
      }, 'Validation error');

      return reply.status(400).send({
        ...problemDetails,
        errors: error.errors,
      });
    }

    // Application-specific error
    if (error instanceof AppError) {
      const problemDetails: ProblemDetails = {
        type: error.type,
        title: error.title,
        status: error.statusCode,
        detail: error.message,
        instance: request.url,
        traceId,
      };

      fastify.log.warn({
        traceId,
        error: error.message,
        code: error.code,
      }, 'Application error');

      return reply.status(error.statusCode).send(problemDetails);
    }

    // Unknown error - hide details in production
    fastify.log.error({
      traceId,
      error: error.message,
      stack: error.stack,
    }, 'Internal server error');

    const problemDetails: ProblemDetails = {
      type: 'https://datatracker.ietf.org/doc/html/rfc7231#section-6.6.1',
      title: 'Internal Server Error',
      status: 500,
      detail: process.env.NODE_ENV === 'development' 
        ? error.message 
        : 'An unexpected error occurred.',
      instance: request.url,
      traceId,
    };

    return reply.status(500).send(problemDetails);
  });
};

export default fp(errorHandlerPlugin, {
  name: 'error-handler',
  fastify: '4.x',
  dependencies: ['request-context'],
});
