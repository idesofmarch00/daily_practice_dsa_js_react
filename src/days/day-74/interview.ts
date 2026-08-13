export const meta = {
  id: "day-74-interview",
  title: "Day 74 Interview Questions",
  prompt: "Distribute workload with Pub/Sub and handle slow services using proper timeouts and backoff strategies.",
};

export const questions = [
  {
    question: "Timeouts vs. Exponential Backoff",
    answer: `Timeouts and exponential backoff are complementary network strategies, not competing ones: a timeout dictates how long a client waits for a single request before giving up, while exponential backoff dictates how long the client pauses before retrying that failed request. Together, they form the foundation of resilient distributed systems. [1, 2, 3, 4]

## Core Differences

| Feature [1, 3, 5, 6, 7, 8, 9, 10, 11] | Timeout | Exponential Backoff |
| --- | --- | --- |
| **Primary Purpose** | Prevents a client from hanging indefinitely. | Prevents a client from overwhelming a recovering server. |
| **Trigger Point** | Fires during an active network request. | Fires after a request has already failed or timed out. |
| **Action Taken** | Terminates the current connection attempt. | Delays the next connection attempt. |
| **Duration Logic** | Usually a static, fixed window (e.g., 5 seconds). | Multiplies the delay progressively (e.g., 1s, 2s, 4s, 8s). |

## How They Work Together

When designing microservices or integrating third-party APIs, these two mechanisms operate sequentially in a failure cycle:

1. **The Request:** Your application sends an HTTP request to an upstream service.
2. **The Timeout:** The service is overloaded and fails to respond. Your timeout configuration slices the connection after exactly 3 seconds, saving your application resources from hanging.
3. **The Backoff:** Instead of immediately spamming the server with another request, your system initiates an exponential backoff strategy. It sleeps for 1 second before attempt #2, 2 seconds before attempt #3, and 4 seconds before attempt #4. [6, 9, 15]

## Key Optimization Patterns

Using basic implementations of either concept can inadvertently degrade system health under heavy load. Implement these engineering best practices to keep your system stable:

* **Add Jitter to Backoff:** If a downstream service crashes, thousands of clients might time out simultaneously. If they all use exact exponential math, they will all retry at the exact same synchronized intervals (known as a "thundering herd" or retry storm). Introducing jitter adds a random variation to the sleep duration, spreading out the traffic spikes smoothly over time.
* **Cap the Backoff Delay:** Exponential math grows incredibly fast ($2^n$). Without a hard threshold maximum limit (e.g., capping the delay at 30 seconds), your application might eventually wait hours between retries for a simple transient hiccup.
* **Filter by Error Type:** Never retry every failure. Only apply backoff retries to transient errors like network timeouts (HTTP 504) or rate limits (HTTP 429). Permanent failures like authentication errors (HTTP 401) or bad requests (HTTP 400) will never fix themselves on a retry and should fail fast. [7, 19, 24, 25]

## Useful Advanced Reading

* The AWS Architecture Blog provides a classic, industry-standard breakdown on maximizing system resilience with their deep dive into Exponential Backoff And Jitter.
* Learn about implementing automated resilience engines at scale by reviewing the AWS SDK Features and Tools Guide which showcases native token-bucket fallback modes.
* Discover how to cleanly configure backoff policies via cloud orchestration layers without writing manual boilerplate code in the AWS Prescriptive Guidance Framework. [28]`,
    citations: [
      "https://algomaster.io/learn/microservices/timeouts-retries-backoff",
      "https://muatik.medium.com/notes-on-timeouts-retries-and-backoff-with-jitter-d89790f385d3",
      "https://www.linkedin.com/pulse/handling-timeouts-retries-backoff-right-way-mustafa-%C3%B6zyurt-ufsje",
      "https://cloudonaut.io/protect-aws-sdk-calls-with-bulkheads-and-circuit-breakers/",
      "https://stackoverflow.com/questions/38980577/adjusting-http-timeout-versus-backoff-during-retries",
      "https://www.youtube.com/watch?v=m28VAy2yZsE",
      "https://www.youtube.com/watch?v=EW2Cc0r2mbc",
      "https://docs.athenahealth.com/api/guides/timeouts-retries-and-backoff",
      "https://medium.com/@kittikawin_ball/resilient-architecture-with-retry-and-timeout-strategies-64f7a792462f",
      "https://developer.ibm.com/articles/microservices_retry/",
      "https://ayushgupta2959.medium.com/understanding-the-five-different-types-of-timeouts-in-software-systems-c62c9d9ab3b3",
      "https://fmo.medium.com/handling-timeouts-retries-and-backoff-the-right-way-8ccc3d4bfd34",
      "https://www.linkedin.com/posts/sitaram-pulivarthi-bb36543a_resilience-patterns-circuit-breaker-vs-activity-7379465009766064128-o7x3",
      "https://aardwark.com/en/tcp-troubleshooting-deep-dive-part-2-connect-timeout-error/",
      "https://builder.aws.com/content/3EumjoZascWd1oZiEgL8ORlv3qE/timeouts-retries-and-backoff-with-jitter",
      "https://d1.awsstatic.com/builderslibrary/pdfs/timeouts-retries-and-backoff-with-jitter.pdf",
      "https://ithy.com/article/timeout-implementation-guide-hmak61uv",
      "https://www.hackerone.com/blog/retrying-and-exponential-backoff-smart-strategies-robust-software",
      "https://www.youtube.com/watch?v=ilczKJdTMMU",
      "https://dev.to/biomousavi/understanding-jitter-backoff-a-beginners-guide-2gc",
      "https://www.youtube.com/watch?v=26-Lc18ORD8",
      "https://medium.com/heap-wire/resilience4j-in-production-or-how-one-slow-service-took-down-everything-74a68379280e",
      "https://www.twingate.com/blog/glossary/exponential-backoff-algorithm",
      "https://tigerabrodi.blog/what-is-exponential-backoff",
      "https://www.youtube.com/shorts/r1KZfqeFe6I",
      "https://aws.amazon.com/blogs/architecture/exponential-backoff-and-jitter/",
      "https://docs.aws.amazon.com/sdkref/latest/guide/feature-retry-behavior.html",
      "https://docs.aws.amazon.com/prescriptive-guidance/latest/cloud-design-patterns/retry-backoff.html",
    ],
  },
  {
    question: "Explain Pub/Sub in terms of full stack system design",
    answer: `In a full-stack MERN (MongoDB, Express, React, Node.js) system design, Pub/Sub acts as the asynchronous communication bridge between your frontend, backend services, and database. [1]

Instead of your Node.js server handling every heavy task directly (which slows down the user experience), Pub/Sub delegates work to background workers, ensuring your application remains fast and responsive.

---

## The System Architecture Workflow

\`\`\`
[ React Client ] 
       │ (HTTP POST / WebSocket)
       ▼
[ Express / Node.js API ] ──(Publish)──► [ Pub/Sub Broker ] ──┬──► [ Worker 1: Send Email ]
                                              (e.g., Redis)   └──► [ Worker 2: Process Image ]
\`\`\`

1. **The Publisher (Express/Node.js API):** Receives a request from the React frontend, pushes a message containing the task details into a "Topic" (a specific channel), and immediately responds to the user with a \`202 Accepted\` status. [2, 3]
2. **The Message Broker (The Hub):** Tools like Redis, RabbitMQ, or AWS SNS/SQS hold these messages securely in a queue. [4]
3. **The Subscribers (Background Workers):** Separate Node.js microservices or background processes constantly listen to these channels. When a message drops, they pick it up and execute the heavy task (e.g., sending emails, resizing photos, updating analytics). [5, 6, 7, 8]

---

## Practical Example: Creating a New User Profile

Here is how a traditional synchronous design compares to an asynchronous Pub/Sub system design when a new user registers:

### The Old Way (Synchronous / No Pub/Sub)
* User clicks "Register" in React.
* Express server creates the user in MongoDB (takes 50ms).
* Express calls an external API to send a welcome email (takes 1.5 seconds).
* Express calls another API to generate a referral code (takes 500ms).
* **Total Wait Time for User:** ~2 full seconds of staring at a loading spinner. If the email API crashes, the whole registration fails. [9]

### The Better Way (System Design with Pub/Sub)
* User clicks "Register" in React.
* Express creates the user in MongoDB (50ms). [10]
* Express publishes a message to a topic called \`user.registered\` with the payload \`{ userId: 123, email: "user@email.com" }\`.
* Express immediately returns a success message to React. [11, 12]
* **Total Wait Time for User:** 50 milliseconds.
* **In the Background:**
  * **Subscriber A (Email Service)** hears the \`user.registered\` event and sends the welcome email.
  * **Subscriber B (Referral Service)** hears the same event and generates the referral code.

---

## Why MERN Apps Need This

* **Decoupled Scaling:** If your app goes viral, your Express API server won't crash from heavy processing. You can scale your Express app to handle web traffic, and separately scale your background Node.js workers to handle the data processing. [13, 14]
* **Fault Tolerance:** If your email server goes down for 10 minutes, the Pub/Sub broker holds the messages. Once the email worker comes back online, it processes the backlog without the user ever seeing an error screen.
* **Real-time UI Updates:** You can connect Pub/Sub to WebSockets (Socket.io). When a backend background worker finishes processing a heavy file, it can publish an event that triggers Socket.io to push a "File Ready" notification straight to the user's React dashboard.`,
    citations: [
      "https://www.tatvasoft.com/blog/mean-stack-vs-mern-stack/",
      "https://www.infiflex.com/google-cloud-pub-sub-for-long-running-tasks",
      "https://medium.com/@21je0710/task-queues-and-background-jobs-a-backend-developers-guide-470d22d52666",
      "https://m-chetandwarkani.medium.com/scaling-your-backend-service-system-design-158ba107d0d8",
      "https://designgurus.substack.com/p/when-should-you-start-learning-system",
      "https://dev.to/devcorner/building-a-pubsub-system-in-java-from-scratch-with-offset-management-2068",
      "https://medium.com/@sabita2025/system-design-from-scratch-the-components-that-actually-run-production-systems-21d71aa34266",
      "https://medium.com/@shivanimutke2501/day-1-system-design-scalability-ccbb22185578",
      "https://bachasoftware.com/blog/insights-2/mern-stack-development-guideline-680",
      "https://bachasoftware.com/blog/insights-2/mern-stack-development-guideline-680",
      "https://medium.com/@veeragonipallavi/frontend-vs-backend-in-the-mern-stack-c944fff13cc2",
      "https://medium.com/@ashraf_52702/mern-stack-architecture-building-full-stack-applications-with-javascript-3604c9b6d354",
      "https://www.addwebsolution.com/blog/what-is-the-mern-stack",
      "https://testbook.com/interview/mern-stack-interview-questions",
    ],
  },
];
