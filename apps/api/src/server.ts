import Fastify from 'fastify';
import { config } from 'dotenv';
import { config as appConfig } from './lib/config.js';

// Plugins
import requestContextPlugin from './plugins/requestContext.js';
import timingPlugin from './plugins/timing.js';
import errorHandlerPlugin from './plugins/errorHandler.js';

// Routes
import healthRoutes from './routes/health.js';
import itemsRoutes from './modules/items/routes.js';
import notesRoutes from './modules/notes/routes.js';

// Jobs
import { startHeartbeatJob, stopHeartbeatJob } from './jobs/heartbeat.js';

// Load environment variables
config();

const PORT = appConfig.apiPort;
const HOST = '0.0.0.0'; // Bind to all interfaces for Codespaces

const fastify = Fastify({
  logger: {
    level: appConfig.logLevel,
    transport:
      appConfig.nodeEnv === 'development'
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

// Register plugins (order matters!)
fastify.register(requestContextPlugin);
fastify.register(timingPlugin);
fastify.register(errorHandlerPlugin);

// Register routes
fastify.register(healthRoutes);
fastify.register(itemsRoutes);
fastify.register(notesRoutes);

// Root route
fastify.get('/', async (request, reply) => {
  return {
    name: 'Test Stack API',
    version: '1.0.0',
    description: 'Educational full-stack demo API',
    endpoints: {
      health: '/health',
      items: '/items',
      notes: '/notes',
    },
  };
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\nReceived SIGINT, shutting down gracefully...');
  stopHeartbeatJob();
  await fastify.close();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\nReceived SIGTERM, shutting down gracefully...');
  stopHeartbeatJob();
  await fastify.close();
  process.exit(0);
});

// Start server
const start = async () => {
  try {
    await fastify.listen({ port: PORT, host: HOST });
    
    // Start background jobs
    startHeartbeatJob();
    
    console.log(`
╔═══════════════════════════════════════╗
║   🚀 Test Stack API is running!      ║
║                                       ║
║   URL: http://localhost:${PORT}        ║
║   Env: ${appConfig.nodeEnv}                   ║
║   Jobs: ${appConfig.jobsEnabled ? 'enabled' : 'disabled'}                  ║
╚═══════════════════════════════════════╝
`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
