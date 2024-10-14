// jobQueue.ts

// Define an interface for Job which includes necessary properties
export interface Job {
  id: string; // Unique identifier for the job
  priority: number; // Priority of the job (higher number means higher priority)
  retries: number; // Number of retries attempted
  maxRetries: number; // Maximum number of retries allowed
  execute: () => Promise<void>; // Function to execute the job
}

// Class for managing the job queue
export class JobQueue {
  private queue: Job[]; // Array to hold jobs

  constructor() {
    this.queue = [];
  }

  // Method to add a job to the queue
  public addJob(job: Job): void {
    // Add the job to the queue with proper priority management
    // Ensure the queue is sorted by priority
    if (this.queue.length === 0) {
      this.queue.push(job);
      return;
    }
    let sortedQueue: Job[] = [];
    let jobAdded = false;
    for (const qJob of this.queue) {
      if (qJob.priority > job.priority) {
        sortedQueue.push(qJob);
      } else if (qJob.priority <= job.priority) {
        if (!jobAdded) {
          sortedQueue.push(job);
          jobAdded = true;
        }
        sortedQueue.push(qJob);
      }
    }
    if (!jobAdded) {
      sortedQueue.push(job);
    }

    this.queue = sortedQueue;
  }

  // Method to process the next job in the queue
  public async processNext(): Promise<void> {
    // Check if the queue is empty
    // Retrieve the next job based on priority
    // Execute the job and handle retries if it fails
    if (this.queue.length === 0) {
      return;
    }
    const currentJob = this.queue[0];
    if (!currentJob) {
      return;
    }
    try {
      await currentJob.execute();
      this.queue.shift();
    } catch (error: any) {
      console.error(error);
      await this.retryJob(currentJob);
    }
  }

  private async retryJob(job: Job): Promise<void> {
    if (job.retries < job.maxRetries) {
      job.retries++;
      try {
        await job.execute();
        this.queue.shift();
      } catch (error: any) {
        await this.retryJob(job); // Recursively retry if there are retries left
      }
    } else {
      console.log(
        `Max retries reached for Job ID: ${job.id}. Removing from queue.`
      );
      this.queue.shift(); // Remove job from queue after max retries
    }
  }

  // Method to clear the queue (for any cleanup or reset purposes)
  public clearQueue(): void {
    // Clear the current job queue
    this.queue = [];
  }
}
