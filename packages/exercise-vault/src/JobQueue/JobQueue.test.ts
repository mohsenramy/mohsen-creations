import { describe, it, expect, beforeEach, vi } from 'vitest';
import { type Job, JobQueue } from './JobQueue';

describe('JobQueue', () => {
  let jobQueue: JobQueue;

  beforeEach(() => {
    jobQueue = new JobQueue();
  });

  it('should add and process a job in the queue', async () => {
    const executeMock = vi.fn();
    const job: Job = {
      id: '1',
      priority: 1,
      retries: 0,
      maxRetries: 3,
      execute: executeMock,
    };
    jobQueue.addJob(job);
    await jobQueue.processNext();
    expect(executeMock).toHaveBeenCalledTimes(1); // Processed once
  });

  it('should retry a job until maxRetries is reached', async () => {
    const executeMock = vi.fn().mockRejectedValue(new Error('Job failed'));
    const job: Job = {
      id: '2',
      priority: 1,
      retries: 0,
      maxRetries: 2,
      execute: executeMock,
    };
    jobQueue.addJob(job);
    await jobQueue.processNext();

    expect(executeMock).toHaveBeenCalledTimes(3); // Initial + 2 retries
    expect(job.retries).toBe(2); // Retries count matches maxRetries
  });

  it('should not retry a job if retries equals maxRetries', async () => {
    const executeMock = vi.fn().mockRejectedValue(new Error('Job failed'));
    const job: Job = {
      id: '3',
      priority: 1,
      retries: 1,
      maxRetries: 1,
      execute: executeMock,
    };
    jobQueue.addJob(job);
    await jobQueue.processNext();

    expect(executeMock).toHaveBeenCalledTimes(1); // No retries, already maxed
    expect(job.retries).toBe(1); // Retries stay at max
  });

  it('should increment retries on failure up to maxRetries', async () => {
    let count = 0;
    const executeMock = vi
      .fn()
      .mockRejectedValue(new Error(`Job failed => [${++count}]`));
    const job: Job = {
      id: '4',
      priority: 1,
      retries: 0,
      maxRetries: 3,
      execute: executeMock,
    };
    jobQueue.addJob(job);
    await jobQueue.processNext();

    expect(executeMock).toHaveBeenCalledTimes(4); // Initial + 3 retries
    expect(job.retries).toBe(3); // Retries should reach maxRetries
  });

  it('should process higher priority jobs first', async () => {
    const lowPriorityJob: Job = {
      id: '5',
      priority: 1,
      retries: 0,
      maxRetries: 1,
      execute: vi.fn(),
    };
    const highPriorityJob: Job = {
      id: '6',
      priority: 5,
      retries: 0,
      maxRetries: 1,
      execute: vi.fn(),
    };
    jobQueue.addJob(lowPriorityJob);
    jobQueue.addJob(highPriorityJob);

    await jobQueue.processNext();
    expect(highPriorityJob.execute).toHaveBeenCalledTimes(1); // Higher priority processed first
    expect(lowPriorityJob.execute).not.toHaveBeenCalled(); // Lower priority not yet processed
  });

  it('should handle multiple job failures and process all retries', async () => {
    const job1: Job = {
      id: '7',
      priority: 1,
      retries: 0,
      maxRetries: 2,
      execute: vi.fn().mockRejectedValue(new Error('Job 7 failed')),
    };
    const job2: Job = {
      id: '8',
      priority: 2,
      retries: 0,
      maxRetries: 1,
      execute: vi.fn().mockRejectedValue(new Error('Job 8 failed')),
    };
    jobQueue.addJob(job1);
    jobQueue.addJob(job2);

    await jobQueue.processNext(); // Should process job2 first due to priority

    expect(job2.execute).toHaveBeenCalledTimes(2); // Initial + 1 retry
    expect(job1.execute).not.toHaveBeenCalled(); // Not yet processed
    await jobQueue.processNext(); // Now process job1

    expect(job1.execute).toHaveBeenCalledTimes(3); // Initial + 2 retries
    expect(job1.retries).toBe(2); // Retries reach max for job1
  });
});
