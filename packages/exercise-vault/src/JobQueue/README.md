# Job Queue with Retry Logic and Priority Management

## Overview

This exercise involves developing a job queue system that supports:

- **Retry Logic:** Jobs that fail can be retried a specified number of times.
- **Priority Management:** Jobs can be prioritized, ensuring that higher-priority jobs are executed first.

## Files

- **jobQueue.ts:** Contains the implementation of the job queue.
- **jobQueue.test.ts:** Contains comprehensive test cases for the job queue using Vitest.

## Functionality

- **addJob(job: Job): void** - Adds a job to the queue and manages its priority.
- **processNext(): Promise<void>** - Processes the job with the highest priority, including retry logic on failure.
- **retryJob(job: Job): Promise<void>** - Retries a failed job based on the defined retry logic.
- **clearQueue(): void** - Clears all jobs in the queue.

## Testing

This project uses **Vitest** for testing. The tests cover:

- Adding jobs to the queue.
- Processing jobs based on priority.
- Handling job retries and failures.
- Clearing the queue.

## Learn More

For more information on job queues and patterns, consider exploring the following resources:

- [Job Queue Patterns](https://queueingtheory.org/)
- [Retry Logic in Asynchronous Programming](https://www.sitepoint.com/implementing-retry-logic-in-node-js/)
- [Priority Queues in JavaScript](https://medium.com/@nashif_ahmed/how-to-implement-priority-queue-in-javascript-21db6e6ae527)

## Setup Instructions

1. Ensure you have Node.js installed.
2. Install Vitest:
   ```bash
   npm install vitest --save-dev
   ```
