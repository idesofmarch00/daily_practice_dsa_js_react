export const meta = {
  id: "day-77-interview",
  title: "Day 77 Interview Questions",
  prompt: "React Native Debugging, Flipper Deprecation, Production App Black-Box Testing, and Profiling",
};

export const questions = [
  {
    question: "Is Flipper for React Native dead? Why was it dropped, and what should we use instead?",
    answer: `Yes, Flipper for React Native is officially dead. The React Native Core Team deprecated the Flipper integration, and Meta officially dropped React Native support from the Flipper codebase starting with version 0.239.0.

**Why Flipper Was Dropped:**
- **Performance issues:** Flipper caused severe build-time slowdowns, bloated app sizes, and frequent connection drops.
- **New Architecture:** The transition to the React Native New Architecture broke legacy debugging hooks.
- **Better alignment:** The core team shifted focus toward lightweight, web-standard debugging protocols.

**What to Use Instead:**
Instead of Flipper, the React Native ecosystem has migrated to a decentralized suite of specialized tools.

| Debugging Need | Modern Tooling Alternative | How to Use / Access |
| --- | --- | --- |
| **JS & Core Debugging** | Chrome DevTools | Built directly into the React Native CLI; press \`j\` in the terminal. |
| **UI Component Trees** | React DevTools | Run \`npx react-devtools\` to open the standalone inspector. |
| **Network & State Tracking** | Reactotron | Install the Reactotron App to track API calls, Redux, or Zustand. |
| **Native Device Logs** | Logcat / Console | Use Android Studio Logcat or Apple Xcode Console directly. |`,
  },
  {
    question: "Do flame graphs and profilers only cover the JS thread? Explain the different debugging needs and tools used for each thread.",
    answer: `Yes, the traditional flame graphs and profiler in Chrome DevTools or React DevTools strictly profile the JavaScript (Hermes) thread. Because React Native runs on a dual-threaded architecture (the Native/UI thread and the JS thread), a JavaScript flame graph only shows half of the picture. If your app is stuttering during animations, scrolling, or heavy rendering, you need tools that profile both threads simultaneously.

**1. JavaScript Engine & Code Profiling (JS Thread)**
- **Tool:** Chrome DevTools (Performance Panel) or \`react-native-performance\`.
- **Tracks:** JS execution, long-running functions, and CPU cycles on the JS thread.
- **Limitation:** Cannot see native Android/iOS UI rendering overhead.

**2. Component Rendering & State Profiling (UI Composition)**
- **Tool:** Standalone React DevTools (\`npx react-devtools\`).
- **Tracks:** Component render duration, state changes, hook updates. It generates component-specific flame graphs.
- **Limitation:** Measures React's reconciliation process, not the actual pixels drawing on the screen.

**3. Native UI, Layout, & Thread Sync Profiling (Both Threads)**
- **Tool:** Perfetto (Android) and Instruments (iOS).
- **Tracks:** Bridge/JSI traffic, Native UI layout passes (Yoga), system events, UI frame render times. 
- **When to use:** When the JS thread is idle but the app is dropping frames or lagging during animations.

**4. Network Traffic & State Management Tracking**
- **Tool:** Reactotron or Bruno / Postman with Network Inspect.
- **Tracks:** HTTP requests, response times, global data store mutations (Redux/Zustand).

**5. Memory Leak & Heap Analysis**
- **Tool:** Memory Panel in Chrome DevTools (for JS heap) alongside Android Studio Profiler / Xcode Instruments (for Native memory).
- **Tracks:** JS object allocation, uncleaned event listeners, native bitmaps in cache. Take heap snapshots to compare object garbage collection.

**Quick Selection Matrix:**
| What is Lagging? | Target Thread | Tool to Open |
| --- | --- | --- |
| Data fetching / Logic | JS Thread | Chrome DevTools Performance |
| Components re-rendering | React Reconciliation | Standalone React DevTools |
| Animations, Lists, Gestures | Native / UI Thread | Perfetto (Android) / Instruments (iOS) |
| App crashes over time | Native & JS Memory | Android Studio / Xcode Profiler |`,
  },
  {
    question: "What is the difference between React Native DevTools, Flipper, and Reactotron in terms of thread access?",
    answer: `React Native DevTools, Flipper, and Reactotron have varying levels of interaction across the JavaScript (JS) thread and the native UI thread, depending entirely on how they communicate with your app.

**🛠️ React Native DevTools (JS Thread only)**
- Connects directly via the Hermes JS engine debugging protocol.
- Purpose-built to inspect JavaScript-level concerns like React component trees, hooks, states, and props.
- **Cannot** inspect native layouts, native platform memory, or the native Main/UI thread.

**🐬 Flipper (Both JS and UI/Native Threads)**
- Built using a native desktop-to-mobile bridge architecture (RSocket).
- **Native Thread:** Can hook into the native Main/UI thread to profile native performance, track layout hierarchies, inspect local SQLite databases, and intercept native network calls.
- **JS Thread:** Relies on JS-side plugins (like React DevTools plugin or Redux middleware) to log JavaScript state.

**🤖 Reactotron (Primarily JS Thread via Native transport)**
- Functions by listening to a WebSocket connection established from the JavaScript context of your app.
- Tracks purely JavaScript abstractions like Redux/Zustand state changes, Saga logs, and API network requests initiated by the JS runtime.
- **Cannot** directly profile native UI rendering, main thread bottlenecks, or native memory leaks.`,
  },
  {
    question: "What CAN and CANNOT be done with a production app downloaded from the App Store/Google Play (Black-Box Testing)?",
    answer: `When dealing with a production app (where \`__DEV__ = false\`), your interaction shifts to Reverse Engineering, Black-Box Testing, and Security Auditing.

### What You CAN Do 🛠️

1. **Intercept and Modify Network Traffic:** Route traffic through a proxy server (Proxyman, Charles). View all API calls, JSON payloads, and alter data mid-transit to see how the UI reacts (requires installing a trusted SSL cert).
2. **Unpack the App:** Extract the \`.apk\` or \`.ipa\` using APKTool or JADX. Scan \`AndroidManifest.xml\` or \`Info.plist\`, and search for statically exposed secrets like hardcoded API tokens or private URLs.
3. **Decompile the React Native Bundle (To an Extent):** Modern apps compile JS to Hermes bytecode, but tools like \`hermes-dec\` allow disassembling the bytecode back into readable JavaScript-like code blocks.
4. **Native Memory & Performance Profiling:** Attach Android Studio Profiler or Xcode Instruments to see overall native RAM and CPU usage, or check for battery drain.
5. **Dynamic Injection (Frida):** Inject custom JavaScript into the running app's memory process on a rooted/jailbroken device to hook native functions, bypass SSL pinning, or force-trigger events.

### What You CANNOT Do ❌

1. **Attach Chrome DevTools or React DevTools:** Hermes debugging ports are completely stripped in production.
2. **Set Breakpoints or Inspect Variable States:** No JS debugger can pause the app runtime.
3. **View the React Component Tree:** The React elements are compiled down into native rendering instructions.
4. **Trace the JS Flame Graphs:** The performance data from the JS thread is hidden; you can only see native CPU cycles.
5. **See Local \`console.log\` Outputs:** Muted or stripped during production compilation.
6. **Defeat Advanced Obstacles Easily:** If SSL Pinning or Root Detection is present, you need high-level reverse engineering tools (like Frida) to bypass them.`,
  },
  {
    question: "Explain in detail how production debugging tools (Proxyman, Native Profilers, Logcat, Frida, Decompilers) work externally.",
    answer: `Here is exactly how these production tools intercept, decompile, and profile an app from the outside without source code:

**1. Network Sniffing & Proxy Tools (Proxyman / Charles Proxy)**
- **How it works:** Acts as a Man-in-the-Middle (MITM). You install a Custom Root Certificate on your phone to trust the proxy. When the app makes an encrypted HTTPS call, the proxy intercepts it, decrypts it with its own key, logs it, re-encrypts it with the real server's certificate, and forwards it.

**2. Native System Profilers (Android Studio / Xcode Instruments)**
- **How it works:** These tools don't read JS; they talk to the OS Kernel (Linux/Darwin). By hooking into the app's Process ID (PID), the tool queries the OS for how much Native RAM is consumed and samples the CPU to register hardware thread loads (e.g., render thread vs. app core).

**3. Native Logging & Error Analytics (Logcat / Apple Console)**
- **How it works:** The OS runs background logging services. If a production app crashes due to a native issue (like OOM or null pointer), the OS kills the process and writes a Crash Log with a stack trace. Tools like Logcat stream this OS log via USB, allowing you to filter by the app's package name to see real-time native crashes.

**4. Dynamic Binary Injection (Frida)**
- **How it works:** On a rooted/jailbroken device, Frida runs a server with administrative privileges. It uses OS-level system calls (\`ptrace\`) to attach to the running app's memory space and injects a mini-JavaScript engine (QuickJS). You can then write scripts to overwrite native functions at runtime (e.g., forcing a \`checkIfRooted()\` function to return false).

**5. Reverse Engineering & Decompiling (JADX / APKTool / hermes-dec)**
- **How it works:** APKTool unpacks the ZIP-like \`.apk\` and decodes binary XML files. JADX reverse-engineers compiled \`.dex\` bytecode back into Java/Kotlin syntax. For React Native, \`hermes-dec\` scans the \`index.android.bundle\` binary, mapping raw bytecode instructions back to a structured JavaScript-like representation.`,
  },
  {
    question: "What is the difference between Perfetto and Android Profiler, and where do I find Perfetto?",
    answer: `Both are essential performance tools, but they serve different scopes:

**Android Profiler:**
- **Scope:** App-specific (Java/Kotlin, basic C++).
- **Location:** Integrated directly into the Android Studio IDE.
- **Overhead:** Can be high; might cause UI hangs in heavy projects.
- **Use Case:** Quick, real-time memory/CPU checks, network activity, or inspecting the View hierarchy during active development.

**Perfetto:**
- **Scope:** System-wide (OS, kernel, processes across the entire device).
- **Location:** Primarily an external web-based tool (\`ui.perfetto.dev\`). However, Android Studio's "System Trace" uses Perfetto under the hood. You can also trigger it via command-line or the "System Tracing" app in Developer Options on your phone.
- **Overhead:** Very low; stably captures long traces without crashing.
- **Use Case:** Deep, root-cause analysis of dropped frames (jank), animation glitches, slow startup times, and complex thread deadlocks or Binder transactions. It provides a comprehensive view of the hardware frame rate.

**The Verdict:** Use Android Profiler for day-to-day sanity checks. Use Perfetto when investigating complex UI thread bottlenecks or system-level performance issues where the app interacts with the OS.`,
  }
];
