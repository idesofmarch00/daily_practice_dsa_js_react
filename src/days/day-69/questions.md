# Day 69 Questions & Answers

### 1. What happens if a microtask creates another microtask infinitely?
It causes **microtask queue starvation**.
- The event loop cannot proceed to macrotasks (timers, I/O) or trigger rendering/paints until the microtask queue is completely empty.
- If a microtask schedules another microtask recursively, the queue never drains.
- Consequently, the main thread freezes completely. The browser window/tab becomes entirely unresponsive to click, scroll, or input events, and eventually crashes with an "Out of Memory" or "Page Unresponsive" error.

---

### 2. How would you debug an event loop blocking issue in production?
- **Node.js (Backend):**
  - **monitorEventLoopDelay**: Use Node's built-in `perf_hooks` API to measure lag under real-world loads.
  - **clinic.js**: Run tools like `clinic doctor` or `clinic bubbleprof` to analyze blocking asynchronous execution patterns.
  - **blocked-at**: Use the `blocked-at` package to detect slow synchronously blocking code and get automated stack traces of the block origin.
  - **CPU Profiling**: Attach an inspector (`--inspect`) and take CPU profiles to find functions consuming the main thread.
- **Browser (Frontend):**
  - **PerformanceObserver**: Set up a listener for `"longtask"` entry types programmatically to catch any frame execution that exceeds 50ms.
  - **Performance Panel**: Record a session in Chrome DevTools to locate synchronous tasks marked with a red warning flag in the flame charts.

---

### 3. What is the difference between `process.nextTick` and `setImmediate` in Node.js?
- **`process.nextTick`**:
  - Executes **immediately after the current operation finishes**, before the event loop advances to the next phase (even before standard Promise microtasks).
  - It acts outside of the standard event loop phases, meaning recursive loops will block I/O completely.
- **`setImmediate`**:
  - Schedules callbacks to run in the **Check phase** of the event loop.
  - It yields control back to the event loop, running in the next cycle, making it non-blocking for I/O tasks.

---

### 4. Can you explain the phases of the Node.js event loop?
The event loop in Node.js executes in 6 sequential phases:
1. **Timers**: Runs callbacks scheduled by `setTimeout` and `setInterval`.
2. **Pending Callbacks**: Executes deferred I/O callbacks (e.g., TCP connection errors).
3. **Idle, Prepare**: Used internally by Node.js for scheduling operations.
4. **Poll**: Retrieves new I/O events. Node blocks here if no timers or check-phase items are pending.
5. **Check**: Runs callbacks registered with `setImmediate`.
6. **Close Callbacks**: Executes cleanup operations like `socket.on('close', ...)`.

---

### 5. How do Web Workers relate to the event loop?
- Web Workers run on **separate operating system threads**.
- Each worker has its **own independent event loop**, call stack, and execution thread.
- Heavy computational loops inside a Web Worker do not block the main window's event loop.
- They communicate with the main thread's event loop via asynchronous message passing (`postMessage`), which registers as a macrotask in the receiving thread's event loop queue.
