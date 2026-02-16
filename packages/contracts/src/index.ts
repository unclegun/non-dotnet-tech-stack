/**
 * @test-stack/contracts
 * 
 * Shared API contracts using Zod schemas.
 * This package defines the "contract" between API and consumers.
 * 
 * Why centralize contracts?
 * - Single source of truth for API shape
 * - Type safety across frontend and backend
 * - Validation logic defined once
 * - Easier to version and evolve APIs
 */

export * from './items.js';
export * from './notes.js';
export * from './errors.js';
