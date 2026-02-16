import { prisma } from '../lib/db.js';
import { config } from '../lib/config.js';

/**
 * Heartbeat Job
 * 
 * A minimal background job that runs periodically.
 * Demonstrates:
 * - Background processing pattern
 * - Scheduled tasks
 * - Job-specific logging with traceId
 * 
 * Real-world use cases:
 * - Data cleanup/archival
 * - Cache warming
 * - Report generation
 * - Sending scheduled notifications
 * - Health checks for external services
 * 
 * For production:
 * - Use a proper job queue (BullMQ, Agenda, etc.)
 * - Add job retry logic
 * - Monitor job failures
 * - Use cron for complex schedules
 */

const INTERVAL_MS = 30_000; // 30 seconds
let intervalId: NodeJS.Timeout | null = null;

async function runHeartbeat() {
  const jobTraceId = `job-heartbeat-${Date.now()}`;

  try {
    console.log(`[${jobTraceId}] Running heartbeat job...`);

    await prisma.heartbeat.create({
      data: {
        message: 'Heartbeat from background job',
      },
    });

    console.log(`[${jobTraceId}] Heartbeat created successfully`);
  } catch (error) {
    console.error(`[${jobTraceId}] Heartbeat job failed:`, error);
  }
}

export function startHeartbeatJob() {
  if (!config.jobsEnabled) {
    console.log('Jobs disabled, skipping heartbeat job');
    return;
  }

  console.log(`Starting heartbeat job (interval: ${INTERVAL_MS}ms)`);

  // Run immediately on startup
  runHeartbeat();

  // Then run periodically
  intervalId = setInterval(runHeartbeat, INTERVAL_MS);
}

export function stopHeartbeatJob() {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
    console.log('Heartbeat job stopped');
  }
}
