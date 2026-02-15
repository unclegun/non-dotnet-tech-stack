import Fastify from 'fastify';
import { config } from 'dotenv';
import { AppError } from './lib/errors.js';
import healthRoutes from './routes/health.js';
import itemsRoutes from './routes/items.js';

// Load environment variables
config();

const PORT = Number(process.env.API_PORT) || 3001;
const HOST = '0.0.0.0'; // Bind to all interfaces for Codespaces

const fastify = Fastify({
  logger: {
    level: process.env.LOG_LEVEL || 'info',
    transport:
      process.env.NODE_ENV === 'development'
        ? {
            target: 'pino-pretty',
            options: {
              translateTime: 'HH:MM:ss Z',
              ignore: 'pid,hostname',
            },
          }
        : undefined,
  },
});

// CORS - Allow Next.js frontend
fastify.register(import('@fastify/cors'), {
  origin: [
    'http://localhost:3000',
    /^https:\/\/.*\.github\.dev$/,  // Codespaces
    /^https:\/\/.*\.app\.github\.dev$/,  // Codespaces
  ],
  credentials: true,
});

// Global error handler
fastify.setErrorHandler((error, request, reply) => {
  fastify.log.error(error);

  if (error instanceof AppError) {
    return reply.status(error.statusCode).send({
      error: {
        code: error.code,
        message: error.message,
        ...(error instanceof Error && 'errors' in error && { details: (error as any).errors }),
      },
    });
  }

  // Generic error response
  return reply.status(500).send({
    error: {
      code: 'INTERNAL_ERROR',
      message: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    },
  });
});

// Register routes
fastify.register(healthRoutes);
fastify.register(itemsRoutes);

// Root route
fastify.get('/', async (request, reply) => {
  return {
    name: 'Test Stack API',
    version: '1.0.0',
    description: 'Educational full-stack demo API',
    endpoints: {
      health: '/health',
      items: '/items',
    },
  };
});

// Start server
const start = async () => {
  try {
    await fastify.listen({ port: PORT, host: HOST });
    console.log(`
╔═══════════════════════════════════════╗
║   🚀 Test Stack API is running!      ║
║                                       ║
║   URL: http://localhost:${PORT}        ║
║   Env: ${process.env.NODE_ENV || 'development'}                   ║
╚═══════════════════════════════════════╝
`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
