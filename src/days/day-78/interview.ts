export const meta = {
  id: "day-78-interview",
  title: "Day 78 Interview Questions",
  prompt: "React Native Animations Architecture Threads",
};

export const questions = [
  {
    question: "Is backgroundColor part of useNativeDriver and can it run natively or not?",
    answer: `No, background color (\`backgroundColor\`) cannot be animated using \`useNativeDriver: true\` in legacy React Native.

Because background color requires interpolating colors (e.g., RGBA values), this process could not be handled on the native UI thread by the legacy animation bridge. Native Driver only supports non-layout properties like transforms and opacity.

**How to Run Background Animations:**
If you must use \`backgroundColor\`, you must set \`useNativeDriver: false\`:
\`\`\`javascript
Animated.timing(animatedValue, {
  toValue: 1,
  duration: 500,
  useNativeDriver: false, // Must be false for backgroundColor
}).start();
\`\`\`

**Better Workarounds (for Performance):**
If you need silky-smooth 60 FPS animations and want to keep \`useNativeDriver: true\`, you can use these common tricks:
- **Animate Opacity:** Place two absolutely positioned views with different background colors on top of each other. Animate the top view’s opacity from 0 to 1.
- **Third-Party Libraries:** Use React Native Reanimated, which has features to bypass the native driver limitations for colors and run smoothly on the UI thread using JSI.`
  },
  {
    question: "Can useNativeDriver handle translate, scale, and skew?",
    answer: `Yes, \`translate\`, \`scale\`, and \`skew\` can all run perfectly with \`useNativeDriver: true\`.

These are all part of the \`transform\` style property. Because they do not affect the layout of other elements on the screen, React Native can safely offload these animations entirely to the native UI thread for 60 FPS performance.

**Supported Transform Properties:**
The native driver fully supports:
- **Translation:** \`translateX\`, \`translateY\`
- **Scaling:** \`scale\`, \`scaleX\`, \`scaleY\`
- **Rotation:** \`rotate\`, \`rotateX\`, \`rotateY\`, \`rotateZ\`
- **Skewing:** \`skewX\`, \`skewY\`

**Quick Code Example:**
\`\`\`javascript
Animated.timing(animatedValue, {
  toValue: 1,
  duration: 500,
  useNativeDriver: true, // Works perfectly here!
}).start();

// In your style object:
const animatedStyle = {
  transform: [
    { translateX: animatedValue.interpolate({ inputRange: [0, 1], outputRange: [0, 100] }) },
    { scale: animatedValue },
    { skewX: animatedValue.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '15deg'] }) }
  ]
};
\`\`\``
  },
  {
    question: "Does translate or scale trigger layout recalculation (shift surrounding elements)?",
    answer: `No, \`translate\` and \`scale\` do not trigger layout calculations.

They modify the visual output during the compositing phase after the layout is already calculated.

**Why Transforms Are Fast:**
- **Layout Is Static:** The layout engine (Yoga) calculates the element's original position and size once.
- **GPU Bound:** When you use \`translateX\` or \`scale\`, the element still occupies its original physical space in the layout tree.
- **No Chain Reaction:** Moving or scaling an element with \`transform\` will never push or pull neighboring elements.

**Contrast with Layout Properties:**
- **Width/Height/Margin:** If you change width, the engine must recalculate the size of that element, its parent, and its neighbors (Reflow). This requires \`useNativeDriver: false\`.
- **Transforms:** If you use \`scale: 2\`, the element visually grows, but its neighboring elements stay exactly where they are. They do not get pushed away.`
  },
  {
    question: "What is the difference between Reflow and Repaint properties, and how do they relate to the native driver?",
    answer: `Native driver (\`useNativeDriver: true\`) is strictly for "Compositing" and "Repaint" properties. It completely avoids the "Reflow" pipeline.

In React Native, layout properties are divided into two main categories that determine whether they can run on the native thread.

**1. Reflow Properties (Layout) — Requires \`useNativeDriver: false\`**
Reflow happens when a property changes the physical geometry, size, or position of an element, causing the Yoga layout engine to recalculate the positions of that element, its parents, and its neighbors.
- **Sizing:** \`width\`, \`height\`, \`minWidth\`, \`maxWidth\`, \`minHeight\`, \`maxHeight\`
- **Spacing:** \`margin\`, \`padding\` (and all directional variations like top, bottom, left, right)
- **Flexbox:** \`flex\`, \`flexDirection\`, \`alignItems\`, \`justifyContent\`, \`gap\`
- **Borders:** \`borderWidth\`

**2. Repaint & Compositing Properties (Visual Only) — Supports \`useNativeDriver: true\`**
These properties do not alter the structural layout of the screen. They only change how the pixels look inside the element's pre-calculated boundaries, or how the GPU renders the element visually on top of the layout.
- **Transforms:** \`translateX\`, \`translateY\`, \`scale\`, \`scaleX\`, \`scaleY\`, \`rotate\`, \`rotateX\`, \`rotateY\`, \`skewX\`, \`skewY\`
- **Opacity:** \`opacity\`

*(Note: While \`backgroundColor\` is a repaint property, it traditionally required \`useNativeDriver: false\` because animating color strings required complex frame-by-frame interpolation that the legacy bridge driver wasn't optimized for).*`
  },
  {
    question: "What is interpolation? Explain the Critical Rendering Path (CRP), phases (Layout, Paint, Commit, Composite), and trees.",
    answer: `**Understanding Interpolation:**
Interpolation is the mathematical process of estimating and filling in the unknown values between two known data points over a set duration.
- **Linear Interpolation (Lerp):** Moves at a constant speed from 0 to 100.
- **Non-Linear Interpolation (Easing):** Moves at varying speeds (e.g., easing in/out) for an organic acceleration.
In React Native, it maps an input range to an output range (e.g., mapping an animated value from 0 to 1 into an output of 0deg to 30deg).

**The Critical Rendering Path (CRP):**
The CRP is the sequence of steps a browser goes through to convert HTML, CSS, and JS into visible pixels.

**The Architecture: Objects & Trees:**
1. **DOM (Document Object Model):** Tree structure of the HTML.
2. **CSSOM (CSS Object Model):** Tree mapping styles to elements.
3. **BOM (Browser Object Model):** Browser host environment (window, history).
4. **Render Tree:** The DOM and CSSOM combined. Elements taking up zero visual space (\`display: none\`) are omitted.

**The Execution: Phases of the CRP:**
1. **Layout (Reflow):** Calculates exact geometry, dimensions, and absolute coordinates. Triggers on \`width\`, \`margin\`, \`flex\`, etc.
2. **Paint (Repaint):** Fills in visual pixels for elements calculated during Layout (colors, shadows). Reflow always forces a Repaint.
3. **Commit:** The main CPU thread finishes execution and hands painted instructions to a separate Compositor Thread.
4. **Composition (Compositing):** The GPU takes separate bitmap layers and overlaps them, applying \`transform\` and \`opacity\` instantly without asking CPU to run Layout or Paint again (hitting perfect 60 FPS).
5. **Render:** The GPU draws the composited frame buffer onto the physical monitor screen.

**React Native Equivalence:**
- **DOM / CSSOM:** Component Tree + StyleSheet objects.
- **Layout / Reflow:** Yoga Layout Engine calculates Flexbox (breaks native driver).
- **Paint / Repaint:** Native OS Canvas Draw instructions (color transitions require JS calculation in legacy bridge).
- **Composition:** Native UI Thread View Transformations (Directly manipulates hardware layers with \`useNativeDriver: true\`).`
  },
  {
    question: "What are the chronological steps for Web, React Web, and React Native? And why doesn't backgroundColor work with useNativeDriver if it's just a repaint?",
    answer: `**Standard Web (Browser) Timeline:**
Parsing (DOM/CSSOM) -> Attachment (Render Tree) -> Layout (Reflow) -> Paint (Layerization) -> Commit (Handoff to Compositor) -> Composition (GPU) -> Render.

**Web + React Timeline:**
JSX Execution (VDOM) -> Reconciliation (Diffing) -> Commit Phase (React updates browser DOM) -> Browser CRP Triggered (Layout -> Paint -> Commit -> Composition -> Render).

**React Native (Legacy Architecture) Timeline:**
JS Execution (Shadow Tree blueprint) -> Yoga Layout Engine (Calculates coordinates in C++) -> UI Manager (Fabric/Legacy hands coords to OS) -> Native Mount & Layout (OS places native structural views) -> Native Paint/Render (OS draws text/colors inside boundaries).

**Why backgroundColor Fails \`useNativeDriver: true\`:**
With \`useNativeDriver: true\`, the animation config is sent across the JS-to-Native bridge once. The native thread calculates interpolation on every frame. 
To animate red to blue, the engine cannot just add numbers. It must parse strings ("#FF0000"), convert to RGBA, interpolate channels, and re-serialize. The legacy native driver animation nodes were built only to pipe float numbers into transform matrices. Color parsing/blending was left on the JS thread, forcing \`useNativeDriver: false\`.

**Why Transforms Don't Change the Layout:**
- **Layout (Yoga/Browser):** The structural space reserved.
- **Transform (Composition):** A matrix applied to pixels before drawing to screen.
When applying \`translateX\`, the layout engine still thinks the element is at its original spot. The GPU simply applies a mathematical matrix multiplication, causing it to visually overlap without altering layout dimensions or triggering reflows.`
  },
  {
    question: "How does GPU acceleration work? What is the React Native New Architecture (Fabric) pipeline?",
    answer: `**GPU Acceleration:**
On the Web, the browser's CPU calculates text and layout, then elements with \`transform\` or \`opacity\` are isolated to texture layers and uploaded to the GPU. The GPU shifts these textures without CPU work. 
In React Native, native OS widgets (UIView/android.view.View) are GPU-accelerated by default. \`useNativeDriver: true\` bypasses JS and directly updates the native transform matrix of that OS view, handled by the mobile OS via CoreAnimation (iOS) or RenderNode (Android).

**Composition Explained Simply (with Timeline Order):**
\`[Layout/Reflow]\` -> \`[Paint/Repaint]\` -> \`[Commit Phase]\` -> \`[Composition]\` -> \`[Render]\`
Commit is the bridge: the thread that calculated layout/paint hands off the assets to the GPU/Compositor thread. Composition is taking pre-painted transparent sheets and sliding or fading them without repainting.

**React Native New Architecture (Fabric) Pipeline:**
Fabric uses JSI (JavaScript Interface) allowing JS to call native C++ functions directly.
**The 3 Trees:**
1. **React Element Tree (VDOM):** Created in JS.
2. **React Shadow Tree:** Created in C++ by Fabric. Mirrors the component tree to compute layouts with Yoga.
3. **Host View Tree:** Actual OS-native UI views on screen.

**Fabric Execution Lifecycle:**
1. **JS Render:** React executes components, diffs VDOM, generates mutation commands.
2. **C++ Commit:** Fabric takes mutations via JSI and synchronously updates the React Shadow Tree.
3. **Yoga Layout:** Yoga calculates structural geometries on the C++ Shadow Tree (no JSON over bridge).
4. **Native Mount & Paint:** Fabric transforms Shadow Tree into Host View Tree. OS allocates memory for views and paints pixels inside bounds.
5. **GPU Render:** OS Compositor takes view layers and performs matrix manipulations for GPU-bound properties, outputting to screen.`
  },
  {
    question: "Isn't opacity and transform part of Paint? And how is Commit in React different from Commit in normal web?",
    answer: `**1. Opacity and Transform are NOT Paint:**
- **Paint (Pixel Creation):** The CPU takes a blank canvas and draws the box, text, or border. This saves as a static image (bitmap).
- **Composition (Layer Manipulation):** Once drawn, it's handed to the GPU. Changing \`opacity\` or \`transform\` does not ask CPU to redraw. The GPU simply changes the transparency slider or shifts the existing static image.

**2. Layout vs. Paint Properties:**
- **Layout (Geometry):** Dictates physical space. Changes force chain reaction. (e.g., width, height, margin, flex, borderWidth).
- **Paint (Visual):** Styles internal look without affecting size or neighbors. (e.g., backgroundColor, color, borderRadius, boxShadow).

**3. The Two Commit Phases (React Web):**
\`[React JS Engine] --(React Commit)--> [Browser DOM Engine] --(Browser Commit)--> [GPU Engine]\`
- **React's Commit:** React finishes VDOM diffing and pushes updates to the real browser DOM.
- **Browser's Commit:** Browser takes DOM changes, runs Layout/Paint on Main Thread, flattens to layers, and hands off (commits) to Compositor Thread.

**4. Why can't Paint talk to the GPU directly?**
- **Main Thread Bottleneck:** Main thread runs JS, handles taps, Layout, and Paint. Waiting for GPU would freeze the UI.
- **Timeline Separation:** Layout is locked in before Compositor phase. The Compositor only looks at static visual tile layers to smash them onto the screen fast.

**5. Fabric Architecture 3 steps (Are they just UI Paint?):**
No, they are distinct memory/system operations:
1. **UI Manager (Fabric):** Purely C++ communication layer. Prepares cross-platform instructions from Yoga coordinates.
2. **Native Mount & Layout:** OS allocates real physical objects in memory (e.g., \`UIView alloc\`). Box is structurally placed but invisible.
3. **Native Paint/Render:** OS invokes drawing system (\`drawRect\`/\`onDraw\`). GPU canvas draws text, borders, background colors inside the allocated boundaries.`
  }
];
