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
  {
    question: "Explain the architecture of React: the complete flow and libraries used (Transpiler, Bundler, React Core, etc.)",
    answer: `React's architecture is not just a single library, but an ecosystem of tools working together to render a user interface efficiently. Here is the complete flow of how React works from code to the browser screen.

## 1. The Build Pipeline (Transpilation & Bundling)

Browsers do not understand JSX (React's HTML-in-JS syntax) or modern TypeScript/ES6+ features natively out of the box.

*   **The Transpiler (Babel or SWC):** When you write a React component using JSX, a transpiler like Babel converts that JSX into standard JavaScript function calls (e.g., \`React.createElement()\` or the newer \`jsx()\` runtime). It also transforms modern JavaScript into older syntax for broader browser compatibility.
*   **The Bundler (Webpack, Vite, Rollup):** An application consists of hundreds of files (JS, CSS, images). The bundler traverses the dependency graph (following your \`import\` statements), bundles them into a few optimized static assets, minifies the code, and provides a development server with Hot Module Replacement (HMR).

## 2. React Core (\`react\`)

This is the platform-agnostic heart of React.
*   **Component Definition:** It provides the APIs for defining components, Hooks (\`useState\`, \`useEffect\`), and Context.
*   **Reconciliation & Fiber:** It contains the logic for creating the Virtual DOM (a lightweight JavaScript representation of the actual DOM). When state changes, React Core computes the differences (the "diff") between the new Virtual DOM and the old Virtual DOM.
*   **React Fiber:** This is the underlying reconciliation algorithm (introduced in React 16). It allows React to pause, abort, or prioritize rendering work. For example, animations or user typing can take precedence over rendering a large list of data.

## 3. The Renderer (\`react-dom\` or \`react-native\`)

React Core figures out *what* changed, but the Renderer figures out *how* to apply those changes to the specific host environment.
*   **React DOM:** In a web browser environment, \`react-dom\` takes the instructions from React Core and efficiently applies the minimum necessary mutations to the actual Browser DOM (the \`document\` object).
*   **React Native:** If you were building a mobile app, the React Native renderer would translate those same instructions into native iOS (UIView) or Android (View) UI components.

## The Complete Flow (Start to Finish)

1.  **Authoring:** You write JSX and stateful components in your IDE.
2.  **Build Step:** Vite/Babel transpiles the JSX to \`jsx()\` calls and bundles your files into a \`main.js\` file.
3.  **Initialization:** The browser loads \`main.js\`. \`ReactDOM.createRoot().render()\` is called, mounting your app to a generic HTML \`<div id="root">\` element.
4.  **Initial Render:** React Core builds the initial Virtual DOM tree. React DOM translates it to actual HTML DOM nodes.
5.  **State Update:** The user clicks a button, triggering \`setState\`.
6.  **Reconciliation:** React Core (using Fiber) builds a *new* Virtual DOM tree, compares it against the old one, and calculates the exact minimal changes needed.
7.  **Commit Phase:** React DOM takes that "diff" and updates only the specific elements in the actual Browser DOM that changed, keeping the application fast and responsive.`,
    citations: [
      "https://react.dev/learn",
      "https://github.com/acdlite/react-fiber-architecture",
      "https://legacy.reactjs.org/docs/faq-internals.html"
    ],
  },
  {
    question: "Explain the architecture of React Native: the complete lifecycle, core technologies (Metro bundler, JS Engine), and tools required.",
    answer: `React Native allows you to build native mobile apps using React. Unlike React for the web (which renders to the DOM), React Native renders to actual native UI components (like \`UIView\` on iOS or \`ViewGroup\` on Android).

Here is the complete architecture and lifecycle of a React Native application.

## 1. The Core Architecture (The Three Threads)

A React Native app runs across three primary threads working in parallel:

*   **The UI Thread (Main Thread):** This is the native thread (Java/Kotlin for Android, Objective-C/Swift for iOS). It handles drawing the actual UI elements to the screen and capturing user inputs (touches, swipes).
*   **The JavaScript Thread:** This is where your React (JavaScript/TypeScript) code runs. It executes the React lifecycle, handles state/props, and processes API calls. It runs inside a JavaScript Engine (historically **JavaScriptCore**, but now **Hermes**).
*   **The Shadow Thread:** A background thread where React Native calculates the UI layout. It uses a C++ layout engine called **Yoga** to convert Flexbox layouts from your JS code into precise pixel coordinates that the native UI thread can understand.

## 2. The Bridge vs. JSI (The Communication Layer)

How does the JS thread tell the Native UI thread what to draw?

*   **The Old Architecture (The Bridge):** Historically, the JS thread and Native thread communicated by serializing messages into JSON, sending them across an asynchronous "Bridge," and deserializing them on the other side. This was a bottleneck for heavy animations or complex lists.
*   **The New Architecture (JSI - JavaScript Interface):** React Native recently introduced JSI, a C++ layer that allows the JS thread to hold direct references to native C++ objects and invoke native methods synchronously, completely eliminating the JSON serialization bottleneck. (This also enables the new **Fabric** renderer and **TurboModules**).

## 3. The Build Pipeline & Tooling

*   **Metro Bundler:** React Native's equivalent of Webpack/Vite. Metro takes your hundreds of JavaScript files and dependencies and bundles them into a single \`index.bundle.js\` file. It's heavily optimized for fast startup times and provides Fast Refresh (HMR) during development.
*   **The JS Engine (Hermes):** Hermes is an open-source JavaScript engine optimized by Meta specifically for React Native. Unlike traditional engines (V8) that parse and compile JS at runtime (JIT), Hermes heavily precompiles your JavaScript into bytecode during the build process (AOT). This results in a smaller app size, lower memory usage, and much faster app launch times.
*   **Expo vs. React Native CLI:**
    *   **React Native CLI:** Gives you full control over the native iOS (\`.xcworkspace\`) and Android (\`.gradle\`) projects. You can easily add custom native Java/Swift code.
    *   **Expo:** A powerful framework/toolchain around React Native. It provides pre-configured over-the-air (OTA) updates, file-based routing (Expo Router), and a suite of high-quality native modules, allowing you to build apps often without ever opening Xcode or Android Studio.

## The Complete Lifecycle (App Launch)

1.  **Launch:** The user taps the app icon. The Native OS launches the app and starts the Native UI Thread.
2.  **Engine Initialization:** The app initializes the JavaScript engine (Hermes).
3.  **Bundle Execution:** The JS engine loads and executes the Metro-bundled JavaScript code (\`index.bundle.js\`).
4.  **Virtual DOM & Yoga:** React calculates the component tree. The Shadow Thread uses Yoga to calculate the exact layout (height, width, X/Y coordinates).
5.  **Native Rendering:** Through JSI (or the Bridge), instructions are sent to the Native UI Thread to instantiate the actual iOS \`UIView\` or Android \`ViewGroup\` elements.
6.  **Interaction:** When a user taps a button, the Native UI Thread catches the touch event, sends it to the JS thread, the JS thread updates the state, React re-renders the Virtual DOM, Yoga recalculates layout if needed, and the Native UI thread updates the screen.`,
    citations: [
      "https://reactnative.dev/architecture/overview",
      "https://reactnative.dev/docs/hermes",
      "https://reactnative.dev/docs/new-architecture-intro"
    ]
  },
  {
    question: "Describe the complete process of initializing a React Native project (CLI vs. Expo), the required tools/libraries, and explain the generated folder structure and configuration files.",
    answer: `When starting a React Native project, you have two primary workflows: **Expo** (the recommended, managed approach) and **React Native CLI** (the bare, unmanaged approach).

## 1. Expo Workflow (Recommended)
Expo abstracts away the complex native tooling, allowing you to build iOS and Android apps writing primarily JavaScript/TypeScript.

*   **Tools Required:** Node.js, Watchman (for efficient file watching), and the Expo Go app on your physical device (or an iOS Simulator / Android Emulator).
*   **Initialization Command:** \`npx create-expo-app@latest my-app\`
*   **How it works:** Expo manages the native iOS and Android build environments under the hood. You write React code, and the Expo Bundler serves it directly to the Expo Go client app for rapid development. When building for production, Expo Application Services (EAS) can compile the native binaries in the cloud.

## 2. React Native CLI (Bare Workflow)
This approach gives you direct access to the underlying native projects (Java/Kotlin and Swift/Obj-C). You must manage the native build environments yourself.

*   **Tools Required (macOS example for iOS/Android):**
    *   Node.js & Watchman.
    *   **iOS:** Xcode, CocoaPods (Ruby dependency manager), iOS Simulator.
    *   **Android:** Java Development Kit (JDK), Android Studio, Android SDK, Android Emulator.
*   **Initialization Command:** \`npx @react-native-community/cli@latest init MyApp\`
*   **How it works:** You compile the native iOS (\`.xcworkspace\`) and Android (\`.gradle\`) projects locally on your machine, and Metro bundles your JS code.

---

## 3. Folder Structure & Config Files

Whether you use Expo or the Bare CLI, the resulting folder structure contains several critical configuration files:

### Universal Files (Both Expo & CLI)
*   **\`package.json\`**: Contains your project's JavaScript dependencies (e.g., \`react\`, \`react-native\`), scripts (e.g., \`start\`, \`test\`), and project metadata.
*   **\`metro.config.js\`**: The configuration file for the Metro Bundler. You can configure how Metro resolves modules, handles specific file extensions (like SVG imports), or transforms code before bundling.
*   **\`babel.config.js\`**: Instructs Babel on how to transpile your modern JavaScript/TypeScript and JSX into code the JS Engine (Hermes) can execute.
*   **\`tsconfig.json\`**: TypeScript compiler configuration, ensuring strict type safety across your React components.
*   **\`App.tsx\` (or \`index.js\`)**: The entry point of your application where the root React component is mounted to the native views.

### Expo-Specific Files
*   **\`app.json\`**: The central configuration file for Expo. It defines native app properties like the app's name, bundle identifier (e.g., \`com.company.app\`), icon, splash screen, and required native permissions (camera, location) without needing to touch native code.

### React Native CLI-Specific Files (The Native Directories)
When using the bare CLI (or if you "prebuild" an Expo app to eject it), you will see these native folders:
*   **\`/ios/\`**: The native iOS project.
    *   **\`Podfile\`**: Used by CocoaPods to manage native iOS dependencies (like native Swift/Objective-C libraries your JS relies on).
    *   **\`MyApp.xcworkspace\`**: The Xcode workspace file used to compile and build the iOS app.
    *   **\`Info.plist\`**: The iOS configuration file dictating app permissions, icons, and metadata.
*   **\`/android/\`**: The native Android project.
    *   **\`build.gradle\`**: Configuration for the Gradle build system (compiles Java/Kotlin and handles native Android dependencies).
    *   **\`AndroidManifest.xml\`**: Declares app permissions, background services, and core Android metadata.`,
    citations: [
      "https://reactnative.dev/docs/environment-setup",
      "https://docs.expo.dev/",
      "https://reactnative.dev/docs/understanding-cli"
    ]
  },
  {
    question: "What are the core differences between React and React Native? Explain the different components, styling, APIs, and setup dependencies.",
    answer: `While React and React Native share the same core React engine (Component lifecycle, State, Props, Hooks like \`useState\`, \`useEffect\`), their target environments are fundamentally different. React targets the Browser DOM, while React Native targets Native Operating Systems (iOS and Android).

## 1. Components (DOM Elements vs. Native Views)
In React, you use standard HTML tags. In React Native, HTML does not exist. You must import and use React Native's core components, which the framework translates into native mobile UI elements under the hood.

| Web (React) | Mobile (React Native) | Native Translation (iOS / Android) |
| --- | --- | --- |
| \`<div>\` | \`<View>\` | \`UIView\` / \`ViewGroup\` |
| \`<p>\`, \`<span>\`, \`<h1>\` | \`<Text>\` | \`UITextView\` / \`TextView\` |
| \`<button>\` | \`<Button>\`, \`<Pressable>\`, \`<TouchableOpacity>\` | \`UIButton\` / \`Button\` |
| \`<img>\` | \`<Image>\` | \`UIImageView\` / \`ImageView\` |
| \`<ul>\`, \`<ol>\` | \`<FlatList>\`, \`<SectionList>\`, \`<ScrollView>\` | \`UITableView\` / \`RecyclerView\` |
| \`<input type="text">\` | \`<TextInput>\` | \`UITextField\` / \`EditText\` |

## 2. Styling (CSS vs. StyleSheet API)
React uses standard CSS, SCSS, or utility classes like Tailwind. React Native uses JavaScript objects to emulate CSS, primarily via its built-in \`StyleSheet\` API.

*   **No Cascade:** Styles do not cascade deeply in React Native. You cannot write a global rule to style all text. You must apply styles directly to the \`<Text>\` components.
*   **Flexbox Everywhere:** Everything in React Native uses Flexbox for layout. However, the default \`flexDirection\` is \`column\` (unlike the web's \`row\`), because phone screens are vertical.
*   **Unitless Dimensions:** You cannot use \`px\`, \`em\`, \`rem\`, \`vh\`, or \`vw\`. Values are usually unitless numbers that represent density-independent pixels.

## 3. Mobile-Specific APIs and Capabilities
React Native interfaces with device hardware and mobile OS features, which the web either lacks or handles differently via Web APIs.

*   **Device APIs:** React Native requires native modules for things like Push Notifications, Camera, Bluetooth, File System, Haptics, and GPS. You usually access these via the Expo SDK (e.g., \`expo-location\`, \`expo-camera\`).
*   **Animations:** While the web relies heavily on CSS transitions and keyframes, React Native uses its \`Animated\` API or the highly popular \`react-native-reanimated\` library, which executes animations directly on the UI thread to prevent JavaScript thread lag.
*   **Navigation:** The web uses URL-based routing (like \`react-router\`). Mobile apps don't have a URL bar. React Native uses stack-based navigation (like pushing and popping screens off a deck of cards or tab bars), primarily handled by the \`React Navigation\` library or \`Expo Router\`.

## 4. Dependencies and Setup
The tooling and environment setup is vastly different:
*   **React Setup:** Very lightweight. Usually just Node.js and a bundler (Vite, Next.js). You test it simply by opening \`localhost:3000\` in Google Chrome.
*   **React Native Setup:** Requires heavy native environments. You need Node.js, Watchman, a Mac (if building for iOS), Xcode for the iOS Simulator, and Android Studio for the Android Emulator. Alternatively, the Expo workflow simplifies this by letting you scan a QR code to test on your physical phone via the Expo Go app.`,
    citations: [
      "https://reactnative.dev/docs/components-and-apis",
      "https://reactnative.dev/docs/style"
    ]
  },
  {
    question: "Explain how modern UI and animation libraries work in React Native's architecture. How has the ecosystem evolved with Expo, design systems, and tools like Reanimated?",
    answer: `Historically, building beautiful, performant UIs in React Native was incredibly difficult because animations running on the JavaScript thread would stutter if the app was processing data. Modern tools and architectural changes have completely solved this.

## 1. The Animation Revolution (Reanimated & The UI Thread)
React Native comes with a built-in \`Animated\` API, but the real game-changer for the ecosystem has been **React Native Reanimated**.

*   **The Problem with JS Animations:** If you run an animation entirely on the JavaScript thread (e.g., calculating a \`padding\` value 60 times a second), it historically had to cross the asynchronous "Bridge" to the Native UI thread for every single frame. If the JS thread was busy fetching an API or parsing JSON, the animation would stutter or drop frames.
*   **The Reanimated Solution (Worklets):** Reanimated introduces "worklets"—tiny chunks of JavaScript that are compiled and sent *ahead of time* to run directly on a secondary JS context residing on the **Native UI Thread**.
*   **The Result:** Animations and gesture handling (via \`react-native-gesture-handler\`) run at a buttery smooth 60fps or 120fps, entirely bypassing the React Native Bridge and remaining immune to JS thread blockages.

## 2. Design Systems & Modern Styling Solutions
React Native's native \`StyleSheet\` API is functional but lacks the rapid developer experience of web tools like Tailwind. The ecosystem has evolved to bridge this gap:

*   **NativeWind:** This library brings **Tailwind CSS** directly to React Native. It uses a Babel plugin to compile Tailwind classes at build time into native \`StyleSheet\` objects. This allows developers to share exact UI components and styling muscle memory between the Web (Next.js) and Mobile.
*   **Modern UI Compilers (Tamagui):** Tamagui is a revolutionary modern UI kit and styling engine. It writes styles in JS but uses an optimizing compiler to extract them into static CSS on the web and highly flattened, optimized native styles on mobile, achieving massive performance gains over traditional runtime-styled-components.
*   **Headless UI (Gluestack):** Libraries like Gluestack UI (the successor to NativeBase) provide unstyled, accessible, customizable components (headless UI) that you can easily theme without fighting default styles.

## 3. How Expo Changed the Native UI Game
Expo has radically transformed how developers interact with native UI modules and native capabilities.

*   **The Pre-Expo Era:** If you needed a complex UI component that required native Swift/Kotlin code (e.g., a native Bottom Sheet, Video Player, Map, or Camera), you had to "eject" from your managed workflow, open Xcode/Android Studio, manually link native libraries, and debug complex build errors.
*   **Expo Modules API:** Expo introduced a new way to write native modules using modern Swift and Kotlin (instead of legacy Objective-C/Java) with a much simpler, highly typed API.
*   **Continuous Native Generation (CNG) & Config Plugins:** This is Expo's biggest breakthrough. With Config Plugins, you no longer ever need to touch or commit the \`/ios\` or \`/android\` folders. You define what native permissions or UI capabilities you need in your \`app.json\`. Expo dynamically generates the native iOS/Android code on the fly when you build the app (via EAS). This means you can install complex native UI libraries while staying entirely within a clean, managed JavaScript-only workspace.`,
    citations: [
      "https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/glossary#worklet",
      "https://tamagui.dev/docs/intro/introduction",
      "https://docs.expo.dev/workflow/continuous-native-generation/"
    ]
  },
  {
    question: "Explain the difference between React Native's Old Architecture and New Architecture. Detail the improvements across the Bridge, JSI, Fabric, TurboModules, and Codegen.",
    answer: `React Native recently underwent a massive internal rewrite to eliminate long-standing performance bottlenecks. The "New Architecture" replaces the asynchronous JSON Bridge with synchronous C++ interfaces.

## 1. The Old Architecture (The Asynchronous Bridge)
In the legacy architecture, the JavaScript thread and the Native UI thread lived in complete isolation. They could not talk to each other directly.

*   **The Bridge Bottleneck:** Every time a React component rendered a UI element or a user scrolled the screen, the instructions were serialized into a giant JSON string, sent across an asynchronous message queue (the Bridge), and deserialized by the Native thread.
*   **The Problem:** Because it was asynchronous and batched, high-frequency events (like scrolling a list or tracking a pan gesture 60 times a second) would cause severe traffic jams on the Bridge. The UI thread would be waiting for the JS thread to parse the JSON, resulting in dropped frames, visual tearing, and unresponsiveness (e.g., seeing a "white blank screen" while scrolling fast).

## 2. The New Architecture (JSI - JavaScript Interface)
The foundation of the New Architecture is the **JSI (JavaScript Interface)**. It completely removes the JSON Bridge.

*   **Synchronous C++ References:** JSI is a lightweight C++ API that allows the JavaScript engine (Hermes) to hold direct references to C++ native objects.
*   **No More Serialization:** Instead of converting commands to JSON and waiting, JavaScript can now synchronously invoke native methods in real-time, exactly like calling a standard JavaScript function. This allows React to execute native UI updates instantly without any asynchronous delay.

## 3. Fabric (The New UI Renderer)
Fabric is the new concurrent UI rendering system built on top of JSI.

*   **Old Renderer:** UI updates were queued and sent over the Bridge. React couldn't measure the exact width/height of a native view synchronously, which led to layout jumps.
*   **Fabric (Synchronous & Concurrent):** Thanks to JSI, React can now synchronously read the exact dimensions of a native UI view and render it immediately. Furthermore, Fabric is designed to fully support **React 18 Concurrent Features** (like \`Suspense\` and \`useTransition\`). This allows React Native to interrupt and pause rendering a heavy list in the background to immediately respond to a high-priority user tap on the UI thread.

## 4. TurboModules (Lazy Loading Native Code)
Native modules are device APIs written in Swift/Kotlin (e.g., Bluetooth, Camera, File System).

*   **Old Architecture:** When the app launched, React Native had to initialize *every single* native module linked in the app before the JS bundle could even begin to execute. If your app had 50 native modules, the app launch time suffered massively.
*   **TurboModules:** Powered by JSI, TurboModules are loaded **lazily**. If a user never opens the Camera screen during their session, the Camera native module is never loaded into memory. This drastically reduces app startup time and lowers the overall memory footprint.

## 5. Codegen (Strict Type Safety)
Because JavaScript and Native C++ are now communicating directly and synchronously via JSI, they must agree on exact data types. If a JS string accidentally gets passed to a C++ function expecting an integer, the app will instantly crash.

*   **Codegen:** This is a build tool that reads your TypeScript (or Flow) definitions and automatically generates the strongly-typed C++ boilerplate required for TurboModules and Fabric components. It guarantees that the JavaScript and Native realms are always perfectly type-safe, eliminating runtime type errors.`,
    citations: [
      "https://reactnative.dev/architecture/overview",
      "https://github.com/reactwg/react-native-new-architecture"
    ]
  },
  {
    question: "Explain the component lifecycle in React and React Native. Compare the old Class Component lifecycle methods with the modern Functional Component (Hooks) approach, especially regarding React Native.",
    answer: `The component lifecycle dictates how a component is created, updated, and destroyed. This underlying logic applies equally to both React (Web) and React Native (Mobile). 

There are three main phases in a component's lifecycle: **Mounting** (insertion into the UI), **Updating** (re-rendering upon state/prop changes), and **Unmounting** (removal from the UI).

## 1. The Old Way: Class Components
Before React 16.8 (2019), local state and lifecycle methods could only be managed using JavaScript classes.

*   **Mounting:**
    *   \`constructor()\`: Used to initialize \`this.state\` and bind event handlers.
    *   \`render()\`: The only strictly required method. It returns the JSX UI.
    *   \`componentDidMount()\`: Fires immediately *after* the component is initially rendered to the screen. This was the standard place to make API calls, set up WebSockets, or initialize Native event listeners in React Native (like hardware Back button listeners or \`AppState\` monitors).
*   **Updating:**
    *   \`render()\`: Called again automatically whenever \`this.setState\` is triggered.
    *   \`componentDidUpdate(prevProps, prevState)\`: Fires after a re-render finishes. Commonly used to fetch new data if a specific prop (like an ID) changed.
*   **Unmounting:**
    *   \`componentWillUnmount()\`: Fires right before the component is destroyed. **CRUCIAL in React Native** for cleaning up memory, removing Native event listeners, or clearing timers to prevent severe memory leaks and app crashes.

## 2. The Modern Way: Functional Components & Hooks
With the introduction of Hooks, functional components became the industry standard. They are lighter, have less boilerplate, and avoid the confusing behavior of the JavaScript \`this\` keyword. The entire lifecycle is now primarily consolidated into a single hook: \`useEffect\`.

The \`useEffect\` hook takes a callback function and an optional dependency array.

*   **Mounting (\`componentDidMount\` equivalent):**
    Passing an empty dependency array \`[]\` ensures the effect only runs exactly once when the component first mounts.
    \`\`\`javascript
    useEffect(() => {
      // API calls, Native event listeners here
    }, []); 
    \`\`\`
*   **Updating (\`componentDidUpdate\` equivalent):**
    Passing specific variables in the dependency array means the effect will run on the initial mount AND subsequently whenever those specific variables change.
    \`\`\`javascript
    useEffect(() => {
      // Runs on mount, and whenever 'userId' changes
    }, [userId]); 
    \`\`\`
*   **Unmounting (\`componentWillUnmount\` equivalent):**
    Returning a cleanup function inside the \`useEffect\` handles unmounting. This is critical in React Native.
    \`\`\`javascript
    useEffect(() => {
      const subscription = AppState.addEventListener('change', handleAppStateChange);
      
      // Cleanup function runs right before unmount
      return () => {
        subscription.remove();
      };
    }, []);
    \`\`\`

## 3. React Native Specific Lifecycle (App State & Screen Focus)
While React Native uses the exact same React component lifecycle, mobile apps have additional OS-level and navigation lifecycles that web apps typically don't worry about.

*   **\`AppState\` API:** A mobile app can easily go into the background (e.g., the user receives a phone call, minimizes the app, or pulls down the notification shade). You use the \`AppState\` API to pause heavy tasks (like video playback, camera usage, or precise GPS tracking) when the app goes into the \`background\`, and resume them when it returns to \`active\`.
*   **Screen Focus (React Navigation):** On the web, moving to a new page destroys the old page. In React Native, when you push a new screen onto the stack navigation, the old screen is *not* unmounted; it simply sits underneath the new one in memory. Therefore, \`useEffect\` cleanup functions will **not** fire when you navigate away. To handle this, routing libraries like React Navigation provide specific hooks like \`useFocusEffect\` to trigger logic when a screen visually comes into focus or goes out of focus.`,
    citations: [
      "https://react.dev/reference/react/useEffect",
      "https://reactnative.dev/docs/appstate",
      "https://reactnavigation.org/docs/use-focus-effect/"
    ]
  },
  {
    question: "Explain React Fiber, React Native Fabric, and the complete Virtual DOM rendering lifecycle (Diffing, Reconciliation, Committing, Layout, Painting). How does it differ between Web and Native?",
    answer: `To thoroughly understand how React draws pixels to a screen, you must understand the strict separation between **React Core** (which calculates *what* changed) and the **Renderer** (which figures out *how* to draw it).

## 1. React Fiber (The Core Calculator)
**React Fiber** is the core reconciliation algorithm engine introduced in React 16. It is completely platform-agnostic (used by both React Web and React Native). 
*   **The Virtual DOM:** A lightweight, memory-efficient JavaScript object representing the UI structure. 
*   **Diffing & Reconciliation:** When state changes, Fiber creates a *new* Virtual DOM tree and compares it to the *old* Virtual DOM tree (the "Diffing" phase). It figures out the absolute minimum number of changes required to update the screen.
*   **Asynchronous & Interruptible:** Prior to Fiber, rendering blocked the main thread. Fiber breaks rendering work into small units ("fibers"). If a high-priority event occurs (like a user typing on a keyboard), Fiber can pause the background calculation of a heavy list, handle the typing instantly to prevent UI lag, and then resume the list calculation.

## 2. The Complete Rendering Lifecycle
Regardless of Web or Mobile, React follows these distinct, sequential phases to update the screen:

1.  **Render Phase (Pure & Interruptible):** React calls your component functions (e.g., executing the JSX). It builds the Virtual DOM and runs the Fiber diffing algorithm. **No actual UI changes happen here.** This phase can be paused or aborted by React.
2.  **Commit Phase (Synchronous & Uninterruptible):** React takes the calculated "diff" and hands it to the **Renderer** (\`react-dom\` for web, or \`react-native\`). The Renderer applies the mutations synchronously to the actual host environment (inserting, updating, or deleting DOM nodes or Native Views).
3.  **Layout Phase:** The host environment calculates exactly where things should go on the screen geometrically (X, Y coordinates, width, height). On the Web, the browser's internal rendering engine handles this. In React Native, a highly optimized C++ engine called **Yoga** calculates the Flexbox layouts for the native mobile views.
4.  **Paint Phase:** The host environment (the Browser rendering engine or the Mobile OS UI thread) physically draws the pixels to the screen based on the layout calculations.

## 3. Web Renderer vs. React Native Fabric
While React Core (Fiber) is identical across platforms, the **Commit Phase** differs drastically depending on the Renderer.

*   **Web (\`react-dom\`):** During the Commit phase, \`react-dom\` takes the Fiber diffs and uses standard Web Browser APIs (like \`document.createElement\`, \`node.appendChild\`, \`element.setAttribute\`) to mutate the actual Browser DOM.
*   **React Native (Old Architecture):** During the Commit phase, UI update instructions were serialized into JSON, sent across the asynchronous Bridge, and then the Native UI thread parsed them to instantiate iOS \`UIViews\` or Android \`ViewGroups\`. This asynchronous jump caused severe bottlenecks.
*   **React Native (Fabric):** **Fabric** is React Native's new concurrent rendering system. Because it is built on JSI (C++ synchronous references), Fabric allows the JavaScript thread to synchronously create, mutate, and measure native UI elements directly in C++ during the Commit phase. It entirely skips the JSON Bridge, making mobile rendering perform exactly like web rendering. 

## Summary
*   **Fiber** = The cross-platform brain (React Core) that computes Virtual DOM diffs and prioritizes work.
*   **React DOM** = The Web muscle that commits Fiber's diffs to the Browser DOM.
*   **Fabric** = The modern React Native muscle that synchronously commits Fiber's diffs directly to Native iOS/Android UI views via JSI.`,
    citations: [
      "https://github.com/acdlite/react-fiber-architecture",
      "https://reactnative.dev/architecture/fabric-renderer",
      "https://react.dev/learn/render-and-commit"
    ]
  }
];
