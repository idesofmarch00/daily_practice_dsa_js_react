export const meta = {
  id: "day-79-interview",
  title: "Day 79 Interview Questions",
  prompt: "Q&A Answers System Design and React Native",
};

export const questions = [
  {
    question: "What is Hasura GraphQL Engine and its key uses?",
    answer: `Hasura GraphQL Engine is an open-source tool that automatically generates production-grade, real-time GraphQL and REST APIs directly from your existing databases. By bypassing the manual creation of backend schemas, models, and custom resolvers, it allows front-end developers to securely interact with databases without writing backend code.

**Key Uses and Core Capabilities**
- **Instant CRUD Operations**: Automatically generates comprehensive GraphQL type definitions, deep queries, mutations, and pagination directly from your tracked database tables.
- **Real-time Applications**: Converts standard queries into real-time live queries using GraphQL Subscriptions over WebSockets to instantly stream data changes.
- **Data Federation (Supergraph)**: Merges disparate data layers into a unified API using Remote Schemas and Remote Joins.
- **Fine-Grained Authorization**: Features a powerful, row-level and column-level access control engine that effortlessly integrates with external authentication systems.
- **Event-Driven Architectures**: Configures native webhooks and serverless functions triggered automatically by specific database operations.
- **Blazing-Fast Compiler Design**: Translates deep GraphQL queries into a single, highly optimized SQL statement instead of executing separate data fetches.`
  },
  {
    question: "How do we get RBAC and custom business logic with Hasura, and does it convert GraphQL into SQL?",
    answer: `**1. Database Access Control (RBAC) & Custom Logic**
Hasura operates as a proxy layer over your existing PostgreSQL database. You do not modify your core database schema to implement access control or custom business logic.

- **Role-Based Access Control (RBAC)**: You define row-level and column-level permissions inside the Hasura Console. Hasura integrates with your authentication provider (e.g., Firebase). When a frontend client sends a GraphQL request, it includes a JWT containing session variables like \`X-Hasura-Role\`. Hasura dynamically appends authorization rules as \`WHERE\` clauses to the SQL query.
- **Custom Business Logic**: You extend Hasura using Actions (forwarding payloads to external REST endpoints) and Event Triggers (monitoring DB triggers and calling external webhooks). Hasura does not host custom code natively; it orchestrates HTTP calls to your serverless functions (like AWS Lambda).

**2. The GraphQL-to-SQL Compilation Engine**
Yes, Hasura compiles your incoming GraphQL queries directly into SQL. It parses the query into an AST, merges RBAC variables, generates a single SQL statement using JSON aggregation functions (\`json_agg\`), and executes it against PostgreSQL. This eliminates the GraphQL N+1 problem.`
  },
  {
    question: "Explain type definitions, deep queries, and pagination in Hasura.",
    answer: `**Type Definitions**
When you track a table in Hasura, it instantly introspects the table metadata and autogenerates GraphQL object types. For a \`users\` table, it creates \`users\`, \`users_bool_exp\` (for filtering), \`users_order_by\`, etc.

**Deep (Nested) Queries**
Hasura leverages foreign key relationships to build nested object mappings. You can query deeply nested relationships in a single request. Hasura compiles this entire deep structure into a single PostgreSQL query utilizing internal SQL joins.

**Pagination**
Hasura provides built-in argument modifiers natively:
- \`limit\`: Restricts the number of rows returned.
- \`offset\`: Skips a specified number of rows.
- \`order_by\`: Establishes a predictable sorting order.`
  },
  {
    question: "Are GraphQL subscriptions a plugin in Hasura, and how are WebSockets handled?",
    answer: `GraphQL subscriptions in Hasura are completely native and built directly into the engine, not a separate plug-in.

- **The WebSocket Server**: Hasura itself acts as the high-performance WebSocket server. Your frontend clients point their WebSocket connection directly to your Hasura instance endpoint.
- **Database Polling Engine**: Instead of opening a database connection for every single client, Hasura uses query multiplexing. It groups identical subscription queries from different users into a single parameterized SQL query, executes this batch query against PostgreSQL at a configurable interval (default 1 second), computes the difference, and pushes updates over WebSockets.`
  },
  {
    question: "What are Remote Schemas and Remote Joins?",
    answer: `**Remote Schemas** allow you to connect external, independent GraphQL servers to Hasura. Hasura stitches their graphs together into one unified API gateway.

**Remote Joins** let you join data across completely different data sources. For example, you can join a \`users\` table in PostgreSQL with a \`payments\` object hosted on a remote Stripe GraphQL API. Hasura handles querying both sources and merging the results.`
  },
  {
    question: "How does fine-grained authorization integrate with Firebase or Better Auth?",
    answer: `Hasura relies on JWTs. When a user logs in via Firebase Auth:
1. The frontend logs into the provider and receives a JWT token.
2. The provider adds custom claims into the JWT (e.g., \`X-Hasura-Allowed-Roles\`, \`X-Hasura-User-Id\`).
3. The frontend sends this token in the \`Authorization: Bearer <token>\` header to Hasura.
4. Hasura verifies the token's cryptographic signature using the provider’s public keys (JWKS URL).
5. Hasura uses these custom session variables to apply row-level permissions (e.g., \`WHERE user_id = X-Hasura-User-Id\`), filtering the database data dynamically.

You do not need to add the roles to your database beforehand; Hasura reads the role dynamically from the JWT on every API request.`
  },
  {
    question: "How does Firebase know about Hasura, and how is the user synced to PostgreSQL?",
    answer: `**How Firebase Knows About Hasura**
You must explicitly configure a Firebase Cloud Function to run during user registration. This function injects Hasura-specific variables (Custom Claims) into the user's Firebase identity token.

**Syncing Users to PostgreSQL**
Firebase does not automatically sync users to PostgreSQL. You handle this via:
- **Option A (Firebase Trigger)**: A Cloud Function triggers on sign-up and executes a mutation to Hasura to insert the user's UID and email into the PostgreSQL \`users\` table.
- **Option B (Lazy Initialization)**: The frontend app dispatches an initial GraphQL mutation to Hasura right after successful authentication to insert the user record.`
  },
  {
    question: "How does Hasura differ from a traditional bare GraphQL project (Apollo Server)?",
    answer: `**Bare GraphQL Project Flow:**
You manually write schema definitions and resolver functions. The server parses the query, executes resolvers, makes separate SQL calls (often causing N+1 loops), and formats the response.

**Hasura GraphQL Flow:**
You write zero GraphQL schema or resolver code. Hasura connects directly to your database, introspects tables, and auto-generates the API. 
1. Frontend sends Query + JWT.
2. Hasura verifies JWT and compiles Query + Auth Rules into a SINGLE optimized SQL query.
3. PostgreSQL runs the query natively using JSON aggregation and returns a pre-formatted JSON blob.
4. Hasura pipes the response straight to the client.`
  },
  {
    question: "Where do ORMs like Prisma or Drizzle fit if we use or don't use Hasura?",
    answer: `**If You DO NOT Use Hasura:**
An ORM completely replaces Hasura's data-fetching role. Your backend uses the ORM (Prisma/Drizzle) to write type-safe TypeScript code that translates into SQL. You use Zod to validate incoming payloads before passing them to the ORM.

**If You DO Use Hasura:**
Your frontend hits Hasura directly for CRUD operations, bypassing any ORM. However, you still use an ORM (Prisma/Drizzle) and Zod inside your Custom Actions or Event Trigger webhooks (e.g., AWS Lambdas) to handle complex backend processing safely.`
  },
  {
    question: "Explain a High-Level Design (HLD) for an e-commerce system with Hasura, React Native, microservices, Kafka, BullMQ, Redis, etc.",
    answer: `**Architecture Overview:**
- **Edge/CDN**: Cloudflare (WAF, Reverse Proxy) routes traffic to Hasura or custom auth services.
- **API Gateway**: Hasura Engine running on AWS EKS handles GraphQL queries and RBAC.
- **Database**: PostgreSQL (AWS RDS Multi-AZ) as the core data store.
- **Custom Auth Service**: Node.js microservice issuing JWTs and managing sessions in Redis.
- **Microservices**: Deployed on EKS, handling domain logic (Orders, Inventory).
- **Event Bus**: Kafka handles high-volume immutable events (e.g., Order_Placed).
- **Task Orchestrator**: BullMQ (backed by Redis) handles background/delayed jobs (invoices, SMS).
- **Integrations**: Cashfree (payments), Twilio (SMS), n8n (automation workflow).

**Execution Flow (Checkout):**
Frontend -> Cloudflare -> Hasura (Action) -> Orders Microservice (EKS) -> validates via Zod & Drizzle -> Emits event to Kafka -> BullMQ Worker processes payment with Cashfree.`
  },
  {
    question: "Where are these infrastructure components hosted and what is a Docker image?",
    answer: `**Hosting Layout:**
- **Frontend/Web**: Hosted on Vercel (Edge network, auto SSL). Mobile apps compiled via Expo (EAS) for app stores.
- **Edge/CDN**: Cloudflare sits in front of Vercel and AWS, managing SSL and DDoS protection.
- **Backend/Microservices**: Hasura and Node.js microservices run in Docker containers managed by AWS EKS (Kubernetes).
- **Database**: AWS RDS for PostgreSQL.
- **State/Queues**: Managed services like Confluent Cloud (Kafka) and Upstash/ElastiCache (Redis).
- **Storage**: AWS S3 for static assets and uploads.

**Docker Image:**
A complete, frozen snapshot of your software stack containing your code, runtime (Node.js), libraries (\`node_modules\`), and system tools. When run in EKS, it ensures identical behavior to local development.`
  },
  {
    question: "Why use Redis for stateless JWTs, and how do we invalidate sessions?",
    answer: `While JWTs are stateless, they cannot be easily invalidated before they expire if stolen or compromised. 

**Invalidating Sessions:**
- **Token Blacklist**: Store the unique ID of compromised or logged-out tokens in Redis. On every request, Hasura/Auth Service checks Redis and blocks blacklisted tokens.
- **Short-Lived Access + Refresh Tokens**: Access tokens expire in 15 minutes. Refresh tokens are stored in Redis (for Web, in HttpOnly cookies). If compromised, delete the refresh token from Redis; the access token dies naturally soon after.`
  },
  {
    question: "How are Refresh Tokens stored securely in Web vs. React Native, and how to handle Payment Security?",
    answer: `**Web (React):**
Stored in an \`HttpOnly\`, \`Secure\`, \`SameSite=Strict\` HTTP cookie. JavaScript cannot access it (prevents XSS), it transmits only over HTTPS, and it blocks cross-site requests (prevents CSRF).

**React Native (Mobile):**
Stored in native hardware-encrypted storage using libraries like \`expo-secure-store\` (iOS Keychain / Android Keystore). Mobile apps are immune to browser CSRF but need SSL pinning for network security.

**Payment Security (Cashfree/Stripe):**
Never trust frontend pricing. The frontend sends an item ID. The backend computes the true price, communicates with the payment gateway to get an SDK token, and the frontend processes it. When successful, the gateway sends a server-to-server webhook. The backend cryptographically verifies the webhook signature before marking the order as paid.`
  },
  {
    question: "Explain XSS, CSRF, CSP, CORS, SOP, and Clickjacking.",
    answer: `**XSS (Cross-Site Scripting):** Attacker injects malicious JS into your site. When a victim loads the page, the script executes and steals data. *Prevention:* Sanitize inputs, use \`HttpOnly\` cookies for tokens.

**CSRF (Cross-Site Request Forgery):** A malicious site tricks the browser into auto-attaching your valid session cookie to a hidden request against your bank/app. *Prevention:* \`SameSite=Strict\` cookie flags and Anti-CSRF tokens.

**CSP (Content Security Policy):** An HTTP header restricting where the browser can load scripts/styles from, stopping XSS payloads from calling external rogue servers.

**CORS (Cross-Origin Resource Sharing):** An HTTP header mechanism. The browser sends the request to the backend, but if the backend's CORS headers don't match the frontend's origin, the browser blocks the frontend JS from reading the response.

**SOP (Same-Origin Policy):** Browser rule that prevents Tab A from reading data inside Tab B unless they share the exact domain, port, and protocol.

**Clickjacking (Iframe Exploits):** Attacker places your app invisibly over their fake button inside an iframe. The user clicks the fake button, but hits your app's "Delete" button. *Prevention:* \`Content-Security-Policy: frame-ancestors 'none'\` or \`X-Frame-Options: DENY\`.`
  }
];
