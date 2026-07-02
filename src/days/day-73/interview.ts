import { ProblemMeta } from "../../types";

export const meta: ProblemMeta = {
  id: "day-73-interview",
  title: "JS and React Interview Questions",
  prompt: "Event listener vs handler vs trigger vs event",
};

export const questions = [
  {
    question: "Event listener vs handler vs trigger vs event",
    answer: `An Event is an action that occurs (like a click or keypress). An Event Listener waits for that event to happen on an element. An Event Handler is the function that runs once the event fires. A Trigger is the programmatic act of firing the event artificially without waiting for a user.

### Breaking Down the Concepts 

* **Event**: This is a signal from the system or browser indicating that something has happened (e.g., a user clicked a button, scrolled a page, or finished loading an image). 
* **Event Listener**: This is a programming structure (like \`addEventListener\` in JavaScript) that "subscribes" to a specific target element and waits for a specific event to occur. 
* **Event Handler**: This is the specific block of code or function that executes in response to the event. When a user says "I wrote an event handler," they are referring to the function that processes the event. 
* **Trigger**: This is the act of firing or dispatching an event programmatically. For example, instead of waiting for a user to click a submit button, your code can artificially trigger the "click" event using a method like \`click()\` or \`dispatchEvent()\`.

### How They Work Together 

1. The Event represents the occurrence (e.g., the user clicks a "Submit" button). 
2. The Event Listener is set up in your code to watch the button for a "click" event. 
3. The Event Handler is the block of code (function) that the listener executes (e.g., sending the form data to a server). 
4. The Trigger forces the event to happen even if the user never physically interacted with the button.`,
    citations: [
      "https://stackoverflow.com/questions/6929528/whats-the-difference-between-event-handlers-listener",
      "https://www.geeksforgeeks.org/javascript/javascript-events/",
      "https://www.linkedin.com/pulse/event-listener-vs-handler-resourcechangelistener-arunkumar-papena-wokje",
      "https://www.w3schools.com/js/js_events.asp",
      "https://www.youtube.com/watch?v=lkm_S2WHHVg",
      "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Events",
      "https://medium.com/@maitrikt1998/laravel-queue-jobs-vs-event-and-listener-vs-observer-d335ad5acb23",
      "https://blog.openreplay.com/all-about-javascript-events/",
      "https://data-flair.training/blogs/javascript-events/",
      "https://www.scribd.com/document/852487918/Differences-Between-Event-Listeners-and-Event-Ha",
      "https://javascript.plainenglish.io/whats-the-difference-between-event-handlers-addeventlistener-in-javascript-433876fd78dc",
      "https://metana.io/blog/event-handling-in-javascript-adding-interactivity-to-web-pages/"
    ]
  },
  {
    question: "What are elements in React Native called, and how are they different from React elements?",
    answer: `In React Native, the built-in UI building blocks that replace traditional web elements are officially called **Core Components** or **Host Components**. While both React (for web) and React Native use React Elements (the underlying JavaScript objects created by JSX), they target completely different platforms and render different types of components.

### Key Terminology
* **Core Components / Native Components**: Ready-to-use, platform-backed components provided by React Native (like \`<View>\`, \`<Text>\`, and \`<Image>\`) that compile directly into iOS and Android native user interface controls.
* **Host Components**: The specific technical term used in the React Native Architecture Glossary to describe components whose view implementations are provided directly by the host mobile platform.
* **React Elements**: The lightweight, immutable JavaScript objects returned by your JSX. In React Native, a React Element describes a mobile layout snapshot rather than a browser DOM node.

### Direct Structural Comparison
Instead of standard HTML tags, React Native maps specific mobile UI components to native equivalents on the device:

| React (Web / HTML Element) | React Native (Core Component) | Mobile Native Equivalent (iOS / Android) |
| --- | --- | --- |
| \`<div>\` | \`<View>\` | \`UIView\` / \`android.view.View\` |
| \`<p>\` or \`<span>\` | \`<Text>\` | \`UITextView\` / \`TextView\` |
| \`<img>\` | \`<Image>\` | \`UIImageView\` / \`ImageView\` |
| \`<button>\` | \`<Pressable>\` or \`<Button>\` | \`UIButton\` / \`android.widget.Button\` |
| \`<input>\` | \`<TextInput>\` | \`UITextField\` / \`EditText\` |

### Why They Are Different
* **No Browser DOM**: React for web produces elements that target the browser's DOM (\`div\`, \`p\`). React Native lacks a browser window and communicates with mobile operating system APIs to build real mobile UI trees instead.
* **Text Enforcement**: On the web, text can exist loose inside any tag. In React Native, all text must be wrapped inside a \`<Text>\` component, or the application will throw a layout crash error.
* **Styling and Layout**: Web elements rely on CSS sheets. React Native Core Components use a specialized style property powered by an embedded engine called Yoga, enforcing a layout syntax modeled after CSS Flexbox.`
  },
  {
    question: "What is onClick in React called compared to vanilla JS, and how does React/JSX differ from HTML/JS?",
    answer: `In React, the camelCase attribute you use (like \`onClick\`) is called a **Synthetic Event handler**. It is not just a renamed version of the HTML \`onclick\` attribute. It is an optimized wrapper around the browser's native event system.

### What is a Synthetic Event?
A Synthetic Event is a cross-browser wrapper around the browser’s native event.
* **Why it exists**: Different browsers (Chrome, Safari, Firefox) handle events slightly differently. React creates these synthetic wrappers so your code works exactly the same on every browser.
* **Performance benefit**: Instead of attaching event listeners to every single button you create, React uses a single event listener at the root of your application (called **event delegation**) to handle all events efficiently.

Here is the quick name comparison:
* **HTML / Vanilla JS**: \`onclick\` (Lowercase, attaches directly to the browser DOM element)
* **React**: \`onClick\` (CamelCase, creates a Synthetic Event managed by React)

### How React Differs from HTML and JS
Think of HTML and JavaScript as raw materials, while React is a factory system that automates how those materials are put together.
* **HTML vs. React**: HTML is declarative static text. You write it, and it stays that way until changed. React uses components (reusable blocks of UI) that automatically re-render and update the screen whenever data changes.
* **Vanilla JS vs. React**: In vanilla JavaScript, you must manually find an element and change it (e.g., \`document.getElementById('title').innerText = 'Hello'\`). This is called *imperative* programming. React handles the DOM updates for you automatically based on your application state. This is called *declarative* programming.

### How JSX Differs from HTML, JS, and React
JSX stands for JavaScript XML. It is a syntax extension for JavaScript that looks like HTML, but it acts very differently.
* **JSX vs. HTML**: JSX looks like HTML, but it is actually JavaScript. You cannot use HTML-specific keywords like \`class\` or \`for\` because they are reserved words in JavaScript. Instead, you must use \`className\` and \`htmlFor\`. JSX is much stricter than HTML. Every tag must be explicitly closed (e.g., \`<br />\` instead of just \`<br>\`).
* **JSX vs. JavaScript**: Browsers do not understand JSX. If you feed raw JSX to Chrome or Safari, it will throw a syntax error. Before it reaches the browser, a tool like Babel compiles JSX down into standard JavaScript functions (specifically, \`React.createElement()\` calls).
* **JSX vs. React**: JSX is not React itself. JSX is simply a visual shortcut. You can write a full React application using pure JavaScript without a single line of JSX, but it would require writing tedious, deeply nested \`React.createElement()\` functions for every single UI element.`
  },
  {
    question: "React optimizations, Host Components, DOM access, and React 19 Compiler Lifecycle",
    answer: `### 1. Does React still delegate if buttons have different onClick handlers?
Yes, React absolutely still uses a single event listener at the root even if you have 100 different buttons, each with its own completely unique \`onClick\` function.
* **How it works**: React attaches just one global listener for the "click" event onto your root DOM container (like \`<div id="root">\`).
* **The Interception**: When you click any button, the browser naturally bubbles that click event up the DOM tree. Once it hits the root, React's listener intercepts it.
* **The Lookup**: React looks at the \`event.target\` (the precise button you clicked). It checks its internal virtual structure (the Fiber tree) to see what function you mapped to that specific component. It then triggers your unique handler inside its SyntheticEvent wrapper.

### 2. Are Host Components wrappers or completely different?
Host Components are direct mirrors of real DOM elements, not complex abstractions wrapped around them.
When you write \`<button>\` or \`<div>\` in React, you are instructing React to create a Host Component.
* Inside the computer's memory, React creates a lightweight virtual node representing that element.
* During the mounting phase, the rendering engine (\`react-dom\`) calls native browser APIs like \`document.createElement('button')\` to generate an actual physical DOM element.
* **The Relationship**: The React Host Component acts as the "manager" or direct mapping config for that concrete DOM node. They are not wrapper components clogging up the HTML; they are the direct digital blueprint that materialises as the exact DOM element you see in your browser inspector.

### 3. Why shouldn't you directly access the DOM using getElementById?
Directly manipulating the DOM via \`document.getElementById\` or \`querySelector\` introduces a severe architectural flaw: you are bypassing React’s internal state management entirely.
* **Desynchronization**: React tracks a Virtual DOM in memory to figure out when and how to update the real browser layout smoothly. If you change a DOM node's text manually using Vanilla JS, React has no idea you did it.
* **State Overwrite Bugs**: The next time any state change triggers a re-render, React will check its Virtual DOM configuration, see that the text shouldn't have changed, and completely overwrite your manual JavaScript modification, reverting it unexpectedly.
* **The React Solution**: If you genuinely need direct access to a DOM node (e.g., to manually focus an input, calculate an element's width, or trigger an animation), you must use the \`useRef\` hook. A Ref provides a safe, managed gateway to the DOM node while keeping React fully informed.

### 4. Where does the React 19 Compiler fit?
The React 19 Compiler (\`react-compiler\`) is explicitly packaged as a Babel plugin (\`babel-plugin-react-compiler\`) or integrated into modern toolchains like SWC. It does not run "before Babel touches our code"—it runs inside the Babel pipeline as an early step before your JSX transforms into standard JavaScript.
Its sole job is automatic memoization. It injects structural caching mechanics directly into your components so you no longer have to manually write code using \`useMemo\` or \`useCallback\`.

### 5. Complete Lifecycle: Code to Execution

**Scenario A: Client-Side (Browser Environment)**
\`[Write Code] ──> [Build / Bundling] ──> [Babel / Compiler] ──> [Dev / Debug] ──> [Production Ship] ──> [Browser Render]\`
1. **Writing Code**: You write functional code containing modern components, hooks, styles, and JSX layouts.
2. **Build Tooling (Vite / Webpack)**: When you hit save or build, a tool asset manager reads the files.
3. **The Compilation Pipeline (Babel)**:
   * **Step 3a**: The React 19 Compiler plugin processes your source file first. It analyzes your syntax tree and automatically inserts performance cache structures.
   * **Step 3b**: Traditional Babel plugins execute right after, translating your JSX brackets down into standard \`React.createElement\` or \`_jsx\` functions that any engine can read.
4. **Development & Debugging**: During local work, the bundler spins up a local server. Source Maps are linked to the code, translating the compiled JavaScript lines back to your original source formatting inside your browser's Developer Tools console.
5. **Production Build**: When deploying, your bundler minifies the output—removing comments, shortening variable names, stripping development warnings, and creating optimized static \`.js\` splits.
6. **Browser Execution**: The client browser downloads your static file. The \`react-dom\` library boots up, reads the virtual instructions, processes your event delegation handlers, and paints the real DOM elements onto the screen.

**Scenario B: Server-Side (Node.js Environment via SSR / Next.js)**
\`[Write Code] ──> [Build / Bundling] ──> [Babel / Compiler] ──> [Node.js Execution] ──> [HTML Stream] ──> [Browser Hydration]\`
1. **Writing Code**: You author components designed to execute directly on a backend server (like React Server Components).
2. **Build / Compilation**: The code runs through the exact same React 19 Compiler and JSX Babel processes described above.
3. **Node.js Server Execution**: Instead of shipping pure layout scripts to a browser, Node.js executes your compiled component functions directly on the server.
4. **HTML Generation**: Node runs through your layout tree and flattens your components into a plain text HTML string (e.g., \`<div><button>Click</button></div>\`).
5. **The Server Handshake**: The server instantly transmits this static HTML string down to the user's browser. The user sees a fully visual, beautifully painted website almost immediately, but it is completely frozen because no JavaScript handles interactions yet.
6. **Hydration**: The browser concurrently downloads a smaller client-side JavaScript bundle. React runs on top of the downloaded text structure, matches the virtual tree nodes with the pre-rendered HTML on screen, and seamlessly attaches its global root event listeners to make your buttons functional.`
  },
  {
    question: "Host Components in React Native and the advantages of JSX",
    answer: `### 1. Host Components in React Native
In React Native, Host Components do not wrap or map to browser DOM elements because there is no browser DOM. Instead, they map directly to native platform UI views provided by the mobile operating system (iOS and Android).

* **Are they wrappers or completely different?** They are declarative mirrors of actual native mobile views. They do not wrap an HTML layer. Instead, they act as the configuration interface for mobile engine systems.
* **Under the Hood**: When you write \`<View>\` or \`<Text>\` in React Native, the rendering system (called Fabric in the modern architecture) bypasses the web entirely.
* **The Native Bridge**: React Native takes the props and layout calculated by your JavaScript code and tells the native OS platform to create genuine mobile primitives:
  * A \`<View>\` commands iOS to create a \`UIView\` and Android to create an \`android.view.View\`.
  * A \`<Text>\` commands iOS to create a \`UITextView\` and Android to create a \`TextView\`.
* **The Relationship**: Just like Host Components on the web manage real DOM elements, React Native Host Components directly manage real, platform-native UI widgets. Your app runs at native performance speeds because it uses the exact same UI components as an app built purely with Swift or Kotlin.

### 2. Advantages and Optimizations Offered by JSX
JSX is often mistaken for a simple visual template layer, but it provides significant performance, security, and developer optimizations.

**1. Compile-Time Optimization (The Modern JSX Transform)**
JSX is optimized before your application ever reaches a browser or device. Modern compilation tools convert your JSX syntax into highly optimized JavaScript structures. Instead of creating slow, dynamic objects at runtime, the compiler transforms JSX into a flat, predictable structure (\`_jsx(Type, Props)\`). This allows JavaScript engines (like V8 in Chrome or Hermes in React Native) to allocate memory quickly and optimize execution paths ahead of time.

**2. Built-In XSS Security (Cross-Site Scripting Protection)**
By default, React and JSX automatically escape any values embedded inside your layouts.
\`\`\`jsx
// If a hacker tries to inject this malicious string from a database:
const userInput = "<script>stealPasswords()</script>";

// JSX converts it completely into plain text safely
return <div>{userInput}</div>; 
\`\`\`
JSX interprets the input strictly as a string literal, rendering the literal characters \`<script>...\` on screen rather than executing the code. This blocks common security vulnerabilities automatically.

**3. Strict Compile-Time Validation and Error Catching**
HTML is notoriously forgiving; if you forget to close a \`<div>\` tag or misspell an attribute, the browser ignores it and guesses the layout, often breaking your UI unpredictably. JSX enforces rigid XML rules. If you fail to close a component tag, your code will not compile. Errors are caught instantly in your code editor or build terminal before a broken build is ever deployed to users.

**4. Type Safety and Tree-Shaking Benefits**
Because JSX is valid JavaScript under the hood, development tools like TypeScript can deeply analyze your UI layout structure. Your editor can warn you immediately if you pass a string to a component property that strictly expects a number. Modern bundlers can analyze your JSX tree to determine exactly which components are used, allowing them to strip out unused code (tree-shaking) to minimize final file sizes.

**5. Fluid Structural Expressiveness**
JSX merges your UI design logic directly with your data logic. You do not need to learn custom templating languages (like Angular's directives or Handlebars syntax) to manage basic logic. You use standard, highly optimized JavaScript patterns like \`.map()\` for loops and ternary operators (\`condition ? True : False\`) for conditional rendering.`
  },
  {
    question: "How do browsers handle events differently, and what are Hooks, Pure vs Impure functions, and HOCs?",
    answer: `### 1. How Browsers Handle Events Differently
Historically, web browsers implement event properties, naming conventions, and event propagation behaviors inconsistently. Without React’s SyntheticEvent system, developers must write defensive boilerplate code to handle cross-browser variances. Here are three concrete examples of how browsers diverge under the hood:

* **A. Event Naming and Feature Detection**: Browsers do not always agree on event names or triggers. For example, when trackpad scrolling or using a mouse wheel, older Internet Explorer and Firefox engines used the non-standard \`DOMMouseScroll\` event, while Chrome and Safari implemented \`mousewheel\`. React normalizes these into a uniform \`onWheel\` event API that works globally across all browsers.
* **B. Property Naming Variations (e.g., target vs. srcElement)**: When an event fires, you often need to know which exact element triggered it. Internet Explorer historically exposed this via \`event.srcElement\`. Firefox and Chrome exposed this via \`event.target\`. React's SyntheticEvent object instantly maps this property to \`.target\` on all platforms, freeing you from writing \`const element = event.target || event.srcElement;\`.
* **C. Keypress and Input Tracking Changes**: In Vanilla JS, identifying keyboard inputs is notoriously fragmented. Chrome might return a specific string value for \`event.key\`, while older Safari versions might return an abstract numerical \`event.keyCode\` or \`event.which\`. React wraps the keyboard native loop, standardizing string mappings for \`event.key\` across every modern environment.

### 2. React Hooks and Their Common Uses
Hooks are built-in functions introduced in React 16.8 that allow you to use state and other React features (like lifecycle methods) inside functional components without writing a JavaScript class. The most heavily utilized hooks include:
* **useState**: Adds local state variables to your functional component to track changing data. (Use case: Toggling a dropdown open/closed, or saving form text).
* **useEffect**: Lets you perform side effects (data fetching, manual DOM updates, subscriptions) in your components. (Use case: Fetching user profile data from an API when a component loads).
* **useRef**: Creates a persistent reference object that doesn't trigger a re-render when its value changes, or holds a direct reference to a real DOM node. (Use case: Manually focusing an input field, or tracking a timer ID).
* **useContext**: Consumes values from a global React Context provider without passing props down manually through every nesting layer. (Use case: Accessing the current UI theme inside a deeply nested button).

### 3. Pure vs. Impure Functions in React
React components are strictly designed around the concept of Purity derived from functional programming rules.

**Pure Functions**
A function is considered pure if it always returns the same output given the exact same input (props), and produces absolutely no side effects outside its own scope.
\`\`\`javascript
// PURE: Safe and predictable for React
function Receipt({ price }) {
  const tax = price * 0.1;
  return <h1>Total: {price + tax}</h1>;
}
\`\`\`

**Impure Functions**
A function is impure if its output changes unpredictably depending on external data, or if it modifies states or files outside its immediate boundary during execution.
\`\`\`javascript
// IMPURE: Will cause bugs during React re-renders
let grandTotal = 0; // External variable mutation

function BadReceipt({ price }) {
  grandTotal += price; // Side Effect! Mutating external state during render
  return <h1>Running Balance: {grandTotal}</h1>;
}
\`\`\`
*Why this matters*: React assumes your component rendering code is entirely pure. If a component alters external variables or mutates outside memory during its render phase, React's internal optimizations (like concurrent rendering or the React 19 Compiler) will break, causing duplicate UI updates or layout crashes.

### 4. Higher-Order Component (HOC) Example
A Higher-Order Component (HOC) is an advanced structural pattern in React used for reusing component logic. Professionally, an HOC is a plain JavaScript function that takes a component as an argument and returns a new, enhanced component.

**The Problem Scenario**: Imagine you have multiple screens that should only be visible if a user is logged in. Instead of writing authentication logic inside every single view component, you can wrap them with an authentication HOC.
\`\`\`jsx
import React from 'react';

// This is the HOC function
function withAuthentication(WrappedComponent) {
  // It returns a new functional component wrapper
  return function AuthenticatedComponent(props) {
    const isAuthenticated = localStorage.getItem('userToken') !== null;

    if (!isAuthenticated) {
      return <h1>Access Denied. Please log in.</h1>;
    }

    // If logged in, render the original component with its props
    return <WrappedComponent {...props} />;
  };
}

// --- Usage Example ---
function DashboardProfile(props) {
  return <div>Welcome to your private settings, {props.username}!</div>;
}

// Wrap the component to upgrade it with auth logic
export const ProtectedDashboard = withAuthentication(DashboardProfile);
\`\`\`
  },
  {
    question: "What is a bundler in React?",
    answer: `A bundler in React is a development tool that combines your entire application's files (JavaScript, JSX, CSS, images, and external dependencies) into a single or small set of optimized static files that a web browser can easily read and execute.
Because browsers cannot natively read modern React syntax (like JSX, TypeScript, or ES modules), a bundler serves as the necessary bridge to translate and compress your code into plain HTML, CSS, and JavaScript.

### What a Bundler Does (Step-by-Step)
* **Creates a Dependency Graph**: The bundler starts at your entry file (usually \`index.js\` or \`main.jsx\`) and follows every import and export statement. It maps out a complete "family tree" of how your files interact.
* **Transpiles the Code**: It works alongside tools like Babel to convert JSX and TypeScript into old-fashioned, widely compatible JavaScript that runs on any browser.
* **Optimizes the Assets**:
  * **Minification**: Removes all unnecessary spaces, comments, and shortens variable names to shrink file sizes.
  * **Tree Shaking**: Acts like dead-code elimination. It strips away any imported functions or components that you never actually used in your application.
  * **Code Splitting**: Instead of forcing the user to download one massive file on the initial page load, bundlers can split code into smaller pieces. Heavy parts of the app are only loaded when a user clicks on that specific page or feature.

### Popular Bundlers Used with React
React itself does not come with a built-in bundler, but popular frameworks and initializers configure them for you:
* **Vite**: The modern industry go-to choice. It uses ultra-fast Native ES Modules during development and bundles with Rollup for production deployments.
* **Webpack**: The traditional powerhouse. It was the default engine behind the deprecated \`create-react-app\`. It is highly customizable but has a steeper learning curve.
* **Parcel**: A "zero-configuration" bundler that works automatically out of the box without complex configuration files.
* **Turbopack / Bun / Esbuild**: Next-generation, lightning-fast bundlers written in lower-level languages like Rust and Go to speed up build pipelines.

*(Note: If you are building mobile apps using React Native, it automatically utilizes a specific native bundler called Metro to package code for iOS and Android platforms).*`
  },
  {
    question: "Is Terser available in Vite or does it have to be enabled?",
    answer: `Terser is available in Vite, but it is not enabled by default and must be explicitly configured and installed.
By default, Vite uses an ultra-fast alternative (like Esbuild or Oxc, depending on your Vite version) because it compresses files 20× to 40× faster than Terser.

To switch your project over to Terser, follow these two quick steps:

### 1. Install Terser
Since Vite v3, Terser is an optional peer dependency to keep Vite's install size small. You must add it manually to your development dependencies:
\`\`\`bash
npm add -D terser
\`\`\`

### 2. Enable it in vite.config.js
Open your \`vite.config.js\` (or \`vite.config.ts\`) file and update the \`build.minify\` option to \`'terser'\`. You can also pass custom configuration parameters using \`terserOptions\`:
\`\`\`javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    // 1. Tell Vite to use Terser instead of the default minifier
    minify: 'terser', 
    
    // 2. (Optional) Pass your custom Terser rules here
    terserOptions: {
      compress: {
        drop_console: true,  // Removes all console.log statements
        drop_debugger: true, // Removes debugger statements
      },
    },
  },
});
\`\`\`

### Should you switch to Terser?
* **Pros**: Terser offers highly granular control over the minification process (like keeping specific class names or forcing complex code compression rules) and sometimes yields slightly smaller bundle sizes.
* **Cons**: It will noticeably slow down your production build times compared to Vite's default native engine.`
  },
  {
    question: "Explain about obfuscation and why it is not really encouraged",
    answer: `Obfuscation is the process of modifying code to make it deliberately complicated, confusing, and unreadable to humans, while keeping it fully functional for the machine.
In JavaScript, this goes far beyond standard minification. While minification just removes spaces and shortens variables to save file size, obfuscation uses advanced techniques like:
* **String Encryption**: Hiding plaintext strings (like API endpoints or text) into encrypted arrays or hexadecimal strings.
* **Control Flow Flattening**: Scrambling the logical order of loops, \`if\` statements, and functions into a labyrinth that is hard for reverse-engineering tools to follow.
* **Dead Code Injection**: Inserting completely useless code blocks to distract hackers.

### Why Obfuscation is Not Encouraged in Web Development
While it sounds like a great security measure on paper, security experts and web developers generally discourage heavy obfuscation for several critical reasons:

**1. It Offers a False Sense of Security**
JavaScript runs entirely on the user's browser. This means the browser must be able to decrypt and execute the code. If the browser can read it, a determined human can eventually reverse-engineer it using automated "deobfuscators" and debugging tools. It only creates a speed bump, not a brick wall.

**2. Severe Performance Penalties**
Obfuscation techniques (especially control flow flattening and string decryption) add a massive amount of extra computation. Your code becomes larger, takes longer for the browser to download, and requires extra CPU cycles to unzip and run. This slows down your app and ruins the user experience.

**3. It Ruins Debugging and Error Tracking**
When an application crashes in production, tools like Sentry or LogRocket capture the error stack trace. If your code is heavily obfuscated, your error reports will look like absolute gibberish. Finding and fixing a production bug becomes nearly impossible because you cannot map the error back to your original source code.

**4. Flagged by Antivirus and Browser Extensions**
Malware creators love obfuscation because they use it to hide viruses from security scanners. Because of this, modern antivirus software, ad-blockers, and browser security extensions treat heavily obfuscated JavaScript with deep suspicion. Using it runs the risk of your legitimate website being falsely flagged as malicious or blocked entirely.

**5. Violation of Extension Store Policies**
If you are bundling your code for a browser extension (like Chrome or Firefox), heavy obfuscation is explicitly banned. Google and Mozilla require extension source code to be easily readable during the review process to ensure user privacy and safety.

### The Golden Rule of Web Security
In web applications, security must happen on the backend (Server-side), never on the frontend (Client-side).
If you have sensitive secrets—like private API keys, payment processing logic, or proprietary algorithms—you should never ship them to the browser in the first place, obfuscated or not. Instead, move that logic to a secure server or a serverless cloud function, and let the React app communicate with it via standard API calls.`
  },
  {
    question: "How does TypeScript fit into the React build flow, and does it convert TSX to JSDX?",
    answer: `TypeScript enters the React lifecycle at compile-time, specifically acting as a strict verification layer before Babel or the React 19 Compiler transforms your JSX into raw JavaScript.

### Where TypeScript Fits in the Lifecycle
TypeScript does not run in the browser or inside Node.js. It acts as a static gatekeeper during your development workflow.

\`[Write TSX Code] ──> [Type Checker (tsc)] ──> [React 19 / Babel Compiler] ──> [Bundled JS] ──> [Browser/Node]\`

* **Code Execution Guard**: As you type code in a \`.tsx\` file, the TypeScript compiler (\`tsc\`) continuously parses your file. It ensures your data structures align perfectly with your UI properties.
* **The Build Step**: When you trigger a project build, your tooling runs the type checker. If a type mismatch occurs, the build process halts immediately, preventing broken code from progressing to the compiler pipeline.
* **The Strip Down**: Once type checking passes, the compiler (or tools like Vite/esbuild) strips away all TypeScript annotations entirely. Because types do not exist in standard JavaScript, they are removed before the runtime engine executes the application.

### How TypeScript Protects React Features
TypeScript acts as an architectural layer that enforces safety across the exact mechanisms we just explored:
1. **Typing Synthetic Events (Browser Normalisation)**: Instead of guessing what properties exist on a browser event, TypeScript provides explicit, built-in types for React’s SyntheticEvents. This prevents errors when handling cross-browser differences.
2. **Locking Down Host Components vs. Custom Components**: When using Host Components (\`<input>\`, \`<button>\`), TypeScript reads React's global web declarations. It instantly throws a red underline if you pass an invalid attribute that HTML or mobile platforms do not support.
3. **Enforcing Pure Functional Props**: TypeScript explicitly defines the contracts (Props) that functional components must accept. This enforces structural purity because the component is structurally blocked from consuming unexpected data variations.
4. **Type-Safely Wrapping Higher-Order Components (HOCs)**: HOCs can easily become bug-prone because passing components through functions can erase their original prop requirements. TypeScript uses Generics to dynamically intercept and preserve those prop types.

### Does TypeScript Convert TSX to JSDX?
No, TypeScript does not convert \`.tsx\` into a separate "jsdx" format—because there is no such format as jsdx. Instead, the process of handling \`.tsx\` files involves two distinct jobs: **Type Checking** and **Transpilation** (or Emit).

A \`.tsx\` file is stripped down and compiled directly into standard JavaScript (\`.js\`) code, completely bypassing any intermediary formatting. Depending on how your project is configured, the transformation follows one of two common paths:

* **Path A: The Traditional Two-Step Process (TypeScript + Babel)**
If your project uses tools like Vite, Next.js, or Webpack, TypeScript is often configured only to check for code bugs, leaving the file creation to a compiler.
  * **Type Checking (by TypeScript)**: The TypeScript compiler reads your \`.tsx\` code, checks your types, and reports any errors. It does not output any code files in this step.
  * **Transpilation (by Babel, SWC, or esbuild)**: A separate tool takes the raw \`.tsx\` file, completely deletes all the TypeScript type annotations, and converts the JSX tags directly into pure JavaScript syntax (\`React.createElement\` or \`_jsx\`). The output is a standard \`.js\` file.
* **Path B: The All-in-One Process (TypeScript Alone)**
If you run the TypeScript compiler directly on its own (using the \`tsc\` command), TypeScript handles both steps itself. It strips your types and converts the JSX directly into plain JavaScript in one go.

### What is This Process Called?
* **Transpilation**: The overarching process of taking source code written in one high-level language (TypeScript/JSX) and translating it into another high-level language (Standard JavaScript).
* **Type Stripping**: The specific action where the compiler looks at type configurations (like \`interface\`, \`type\`, or \`: string\`) and wipes them out of the code, since the browser cannot read them.
* **JSX Transform / Compilation**: The specific action where syntax like \`<h1>{text}</h1>\` is rewritten into pure JavaScript executable code like \`_jsx('h1', { children: text })\`.`
  },
  {
    question: "Does Vite have a TS compiler built-in, or does Babel transpile TS into JS?",
    answer: `No, Vite does not have the official TypeScript compiler (\`tsc\`) built into it, and it does not use Babel by default either. Instead, Vite uses an incredibly fast, modern engine tool called **esbuild** (or the hyper-optimized Oxc in modern versions) to instantly transform TypeScript into JavaScript.

Because of this specific architecture, a critical concept must be emphasized: **Vite completely ignores your types.** It only performs Transpilation (wiping away types to make standard JavaScript) and performs zero Type Checking out of the box.

### How Vite Handles TypeScript (The Secrets of its Speed)
If you feed a \`.ts\` file into Vite, it does not check if your code is logically correct. It reads your file as plain text and immediately triggers an optimized operation:
* **Type Stripping**: It looks for TypeScript symbols (like \`: string\`, \`interface\`, or \`type\`) and deletes them instantly.
* **Instant Translation**: It converts the remaining code structure into basic JavaScript that a browser can read.

Because it doesn't spend precious seconds checking your types or analyzing code errors, Vite processes changes and reloads your browser in under 50 milliseconds, even on massive projects.

### If Vite ignores types, how are bugs caught?
If Vite ignores types entirely, why doesn't broken TypeScript ruin production apps? This separation of concerns relies on a two-part setup:
1. **In Development (Your Editor)**: Your code editor (like VS Code) runs the actual official TypeScript language engine in the background. The editor displays red underlines if a type error occurs, completely independent of Vite.
2. **In Production (The Build Script)**: If you look at a standard Vite project's \`package.json\` file, the build script looks like this: \`"build": "tsc --noEmit && vite build"\`.
When you deploy your application, \`tsc --noEmit\` runs first. This invokes the true, official TypeScript compiler strictly to scan your app for syntax errors and structural bugs without outputting any files (\`--noEmit\`). If it finds an error, the build halts. If it passes, Vite takes over and generates the final, lightweight, type-stripped code package.

### What about Babel? Can it transpile TS without a TS Compiler?
Yes, Babel is fully capable of converting TypeScript to JavaScript without the official TypeScript compiler.
* **How Babel handles it**: Babel features an official extension called \`@babel/preset-typescript\`. Much like Vite's inner engine, this plugin doesn't perform type checking or logical validation. It simply identifies TypeScript annotations and strips them from the raw script.
* **When Vite uses Babel/SWC**: When initializing a React project with Vite, you are often asked whether you want to use standard React plugins or SWC (a fast compiler option). In those instances, Vite leverages those tools specifically to process the React 19 / JSX elements, while still allowing its underlying engine to handle the core TypeScript stripping tasks.`
  },
  {
    question: "How are Minification, Compression, and Obfuscation handled in Metro and Expo?",
    answer: `### 1. Minification & Compression (Mangling code, stripping spaces)
* **Who handles it**: Metro delegates this task to a minifier plugin—historically \`uglify-es\` and more commonly Terser (\`metro-minify-terser\`). It removes white spaces, removes debugging code, strips comments, and shortens variable/function names (mangling).
* **Is it on by default?** No, not in development. Minification is disabled during development to keep bundling speeds sub-second and to ensure your logs show accurate, readable code. It is turned on by default only during production builds (e.g., running \`npx react-native build-android\` or creating a release APK).

### 2. Obfuscation (Hiding logic to prevent reverse engineering)
* **Who handles it**: Metro does not do advanced obfuscation by default. While production minification does mangle internal variables, a reverse engineer can still easily reconstruct the structure of your application logic.
* **Is it on by default?** No. To truly protect your intellectual property, you must manually introduce third-party security layers. This is typically done by adding custom middleware into your pipeline, such as the \`obfuscator-io-metro-plugin\` or premium software tools like Jscrambler.

### 🚀 Does Expo use Metro?
Yes, Expo relies entirely on Metro. Historically, Expo used Webpack for web platforms and Metro for native code, but today Expo uses Metro as its universal single-source-of-truth bundler across iOS, Android, and Web platforms.

Expo builds its ecosystem—including Expo Router, React Server Components, and asset optimizations—by extending and wrapping Metro’s core framework. When you run commands like \`npx expo start\` or build your app using Expo Application Services (EAS), Metro is running under the hood to compile your code and feed bytecode into the mobile Hermes runtime engine.`
  },
  {
    question: "Does Expo or Metro have plugins, and where are plugins or middleware configured before a build?",
    answer: `Yes, both Metro and Expo support plugins and custom middleware, but they are configured differently depending on whether you want to touch the raw compilation process or the local development server.

### 🔧 1. Babel Plugins (Code Transformation)
If you want to modify, obfuscate, or transform your actual JavaScript code (such as removing \`console.log\` statements or renaming variables) before building, this is handled by Babel, which Metro uses under the hood.
* **Where it is configured**: In the \`babel.config.js\` file located at the root of your project.
* **Example Setup**:
\`\`\`javascript
module.exports = {
  presets: ['module:@react-native/babel-preset'], // or 'babel-preset-expo'
  plugins: [
    'transform-remove-console', // Drops all console.logs in production
    ['module-resolver', { alias: { '@components': './src/components' } }]
  ],
};
\`\`\`

### 🔀 2. Metro Plugins & Transformers (Asset/Bundle Pipeline)
If you want to change how files are resolved (like using SVGs as components) or customize how the code is minified/obfuscated right before serialization, you use Metro Plugins.
* **Where it is configured**: In the \`metro.config.js\` file at the root of your project.
* **Example Setup**:
\`\`\`javascript
const { getDefaultConfig } = require('@expo/metro-config'); // If using Expo
const config = getDefaultConfig(__dirname);

// Example: Directing Metro to use a custom transformer plugin for SVGs
config.transformer.babelTransformerPath = require.resolve('react-native-svg-transformer');

module.exports = config;
\`\`\`

### 🌐 3. Metro Middleware (Development Server Behavior)
If you want to inject custom code into the local HTTP development server (e.g., intercepting network requests or serving custom mock API data while developing), Metro allows you to add custom Connect middleware.
* **Where it is configured**: Also inside \`metro.config.js\`, using the \`server.enhanceMiddleware\` property.
* **Example Setup**:
\`\`\`javascript
module.exports = {
  server: {
    enhanceMiddleware: (middleware, server) => {
      return (req, res, next) => {
        // Custom middleware logic here
        if (req.url === '/my-custom-endpoint') {
          return res.end('Hello from custom Metro middleware!');
        }
        return middleware(req, res, next); // Pass control back to Metro
      };
    },
  },
};
\`\`\`

### 📱 4. Expo Config Plugins (Native App Configuration)
If you are using Expo, you rarely need to touch native iOS or Android project files directly. Instead, Expo uses Config Plugins to modify native project code (like adding permissions to \`AndroidManifest.xml\` or altering \`Info.plist\`) automatically before building.
* **Where it is configured**: In your \`app.json\` or \`app.config.js\` file under the \`plugins\` array.
* **Example Setup**:
\`\`\`json
{
  "expo": {
    "name": "My App",
    "slug": "my-app",
    "plugins": [
      [
        "expo-camera",
        {
          "cameraPermission": "Allow this app to access your camera."
        }
      ]
    ]
  }
}
\`\`\``
  },
  {
    question: "Babel vs. Metro and Managing Native Versions (JDK, SDK, Pods)",
    answer: `To make it easy to understand, think of the build process as an assembly line inside a factory.
Metro is the factory manager overseeing the entire assembly line. Babel is a specialized worker on that assembly line who only handles rewriting text.

### 🎨 Babel (babel.config.js) vs. 🛠️ Metro (metro.config.js)

**🎨 Babel is the "Code Editor"**
Babel only cares about the contents inside a single JavaScript or TypeScript file. It reads your modern, human-readable code and translates it so the phone can understand it.
* **What transformations it does**: It takes new JavaScript features (like \`async/await\`, optional chaining \`?.\`) or React JSX (\`<View>\`) and rewrites them into old, universal JavaScript that mobile engines can execute without crashing.
* **Obfuscation / Modification**: Babel modifies the code logic itself. If you want to delete all \`console.log\` lines, add custom code injections, or use tools to scramble/obfuscate your variable names so humans cannot read your logic, Babel does this.

**🛠️ Metro is the "Logistics Manager"**
Metro does not care about individual lines of code; it cares about the bunch of files as a whole. It moves things along the assembly line, hands files to Babel, and packages everything up.
* **What "Resolving Files" means**: When you write \`import Button from './Button'\`, Metro is the search engine that hunts through your folders to find \`Button.js\`. If you are building for an iPhone, Metro is smart enough to choose \`Button.ios.js\` over \`Button.android.js\`. It also handles non-code assets, like converting an image (\`logo.png\`) or a custom 3D model into an asset path the phone can load.
* **Minification / Serialization**: Once Babel finishes editing all the individual files, Metro takes those thousands of files, glues them into one massive file (the bundle), and applies Terser to squeeze out all spaces and minify it for production.

### 📋 Summary: Who handles what?

| Task | Who handles it? | Which config file? |
|---|---|---|
| Stripping out console.logs | Babel | babel.config.js |
| Converting TypeScript / JSX to JS | Babel | babel.config.js |
| Finding where files live (Resolving) | Metro | metro.config.js |
| Handling SVGs or Fonts | Metro | metro.config.js |
| Gluing all files together (Bundling) | Metro | metro.config.js |
| Squishing spaces out of the final bundle | Metro (via Terser) | metro.config.js |

### 📱 Where do you upgrade/downgrade JDK and Native Versions?
Neither Metro nor Babel touches native systems like the JDK, Android SDK, or iOS versions. If you need to change these versions, you must look inside the native folders (\`/android\` and \`/ios\`).
*(Note: If you use Expo Go / Expo Prebuild, you change these inside \`app.json\` using Expo plugins. If you use standard React Native, you edit the files below directly).*

**🤖 For Android (JDK, Gradle, SDK Versions)**
Go to the \`android/\` folder at the root of your project:
1. **To change the JDK version**: This is tied to your development machine and your Gradle version. You update this inside \`android/gradle/wrapper/gradle-wrapper.properties\` or your local development IDE settings (like Android Studio).
2. **To change Android SDK, Target, or Compile Versions**: Open \`android/build.gradle\` (or \`android/app/build.gradle\`). Look for:
   * \`compileSdkVersion\` (tells the compiler which Android version to use).
   * \`targetSdkVersion\` (tells the App Store which Android system your app is optimized for).
   * \`minSdkVersion\` (the oldest Android phone your app is allowed to run on).

**🍏 For iOS (Swift, Objective-C, CocoaPods)**
Go to the \`ios/\` folder at the root of your project:
1. **To change iOS minimum deployment versions or dependencies**: Open the \`ios/Podfile\`. Near the top, you will see a line like \`platform :ios, '15.1'\`. Changing this number upgrades or downgrades the lowest iPhone iOS software your app supports.`
  },
  {
    question: "What are Source Maps, and how do we securely hide API keys and business logic on the frontend?",
    answer: `### Part 1: What are Source Maps?
A source map is a special file (ending in \`.map\`) that maps your minified, bundled production code back to your original, readable source code.
When you bundle a React app for production, your code turns into a single line of compressed text. If a crash happens, the browser console will point to an error at \`main.js:1:34800\`, which is useless for debugging.

**How They Work**
If you upload source maps to your server, the browser’s Developer Tools automatically fetch them behind the scenes.
* **For Users**: They see the fast, optimized, minified version of your site.
* **For You (in DevTools)**: You see your original, beautifully formatted components, folders, and original line numbers (\`UserProfile.jsx:42\`).

**Production Warning**
Do not deploy source maps publicly. If you host your \`.map\` files on your public production server, anyone can open DevTools, go to the "Sources" tab, and read your exact, original source code. Instead, configure your bundler (like Vite) to generate source maps, but configure your error tracker (like Sentry) to upload them privately and delete them from the public build folder.

### Part 2: Security & Hiding Secrets from Hackers
Yes, a hacker can easily see everything on the client side. If code runs in a browser, the user owns that browser and has absolute visibility.

**1. Can a hacker see LocalStorage, Network requests, and API keys sent as headers?**
* **LocalStorage**: Yes. Anyone can open the browser console, type \`localStorage\`, and read every single key and value in plain text. It is completely public.
* **Network Tab**: Yes. If your React app makes an API call, it shows up in the browser's "Network" tab. Anyone can click on the request to see the exact URL, the parameters, and every single Request Header (including your bearer tokens or API keys).

**2. How do we hide business logic and API keys if obfuscation is discouraged?**
Because you cannot truly hide anything inside a browser, you must change *where* the secrets live. You do this using an industry-standard pattern called a **Backend Proxy** or an **API Gateway**.
Instead of your React app talking directly to a sensitive third-party service, you route the request through your own server.

\`[ React App (Browser) ]\`
       \`│\`
       \`│ (1) Sends safe request (No secret keys needed)\`
       \`▼\`
\`[ Your Server / Serverless Function ] ── (2) Safely injects the hidden API key from server environment\`
       \`│\`
       \`│ (3) Makes the actual request to the protected service\`
       \`▼\`
\`[ Third-Party Service (e.g., Stripe, OpenAI) ]\`

**How this solves your problems:**
* **Hiding API Keys**: Your React app only talks to your server. Your private third-party API keys are stored securely in your server's environment variables (\`.env\`). They never leave the server and are never sent to the browser network tab.
* **Hiding Business Logic**: If you have a proprietary algorithm, calculation, or pricing logic that competitors shouldn't copy, do not write it in React. Write that specific logic as a backend route (Node.js, Python, Go, or AWS Lambda). React sends the raw data to the server, the server calculates it secretly, and sends back just the final result.

**3. How to handle sensitive user data safely**
Since LocalStorage is insecure, how do you keep a user logged in safely? Do not store passwords or API keys in LocalStorage.
* **Use HttpOnly Cookies**: For user authentication, have your backend issue a JWT (JSON Web Token) inside an \`HttpOnly\` cookie. The browser automatically appends this cookie to your backend API headers, but JavaScript cannot read it. This completely protects the token from being stolen by malicious browser extensions or XSS (Cross-Site Scripting) attacks.`
  }
];
