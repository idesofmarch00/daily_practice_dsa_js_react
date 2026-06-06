export const meta = {
  id: "day-74-js",
  title: "Lazy Loading with Intersection Observer",
  prompt: "Implement lazy image loading using the Intersection Observer API to load images only when they enter the viewport.",
  explanation: [
    {
      line: "const observer = new IntersectionObserver(entries => { ... });",
      desc: "Creates a new Intersection Observer instance. It fires the callback function whenever monitored target elements cross defined visibility thresholds (by default, entering/leaving the viewport)."
    },
    {
      line: "if (entry.isIntersecting) { ... }",
      desc: "Checks if the observed element has entered the viewport. This boolean check prevents loading the image source prematurely while it's still hidden scroll-wise."
    },
    {
      line: "img.src = img.dataset.src;",
      desc: "Swaps the placeholder source or empty source with the actual high-resolution image path stored in the 'data-src' (dataset.src) attribute, triggering the browser to download the image."
    },
    {
      line: "observer.unobserve(img);",
      desc: "Stops observing the image element once it has loaded. This cleans up event tracking resources and prevents redundant intersection triggers."
    },
    {
      line: "observer.observe(image);",
      desc: "Attaches the observer instance to a specific target image element, adding it to the list of elements being monitored for visibility changes."
    }
  ]
};

// Simulation of standard DOM and IntersectionObserver interface
class MockIntersectionObserver {
  private callback: (entries: any[]) => void;
  private observedElements: any[] = [];

  constructor(callback: (entries: any[]) => void) {
    this.callback = callback;
  }

  observe(element: any) {
    this.observedElements.push(element);
  }

  unobserve(element: any) {
    this.observedElements = this.observedElements.filter(el => el !== element);
  }

  triggerIntersection(element: any, isIntersecting: boolean) {
    if (this.observedElements.includes(element)) {
      this.callback([{
        target: element,
        isIntersecting
      }]);
    }
  }

  getObservedCount() {
    return this.observedElements.length;
  }
}

export function run() {
  const log: string[] = [];

  const img1 = { src: "", dataset: { src: "hero.jpg" }, alt: "Hero Banner" };
  const img2 = { src: "", dataset: { src: "profile.png" }, alt: "User Profile" };

  log.push("Initializing IntersectionObserver...");
  const observer = new MockIntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        log.push(`[Observer] Element is intersecting! Swapping source for: "${img.alt}"`);
        img.src = img.dataset.src;
        log.push(`[Observer] Loaded src: "${img.src}"`);
        observer.unobserve(img);
        log.push(`[Observer] Unobserved: "${img.alt}" (Remaining: ${observer.getObservedCount()})`);
      }
    });
  });

  log.push(`Observing: "${img1.alt}" and "${img2.alt}"`);
  observer.observe(img1);
  observer.observe(img2);

  log.push("\n--- Scrolling: img1 enters viewport ---");
  observer.triggerIntersection(img1, true);

  log.push("\n--- Scrolling: img2 enters viewport ---");
  observer.triggerIntersection(img2, true);

  return log.join("\n");
}
