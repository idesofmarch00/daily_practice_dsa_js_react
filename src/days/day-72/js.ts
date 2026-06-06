export const meta = {
  id: "day-72-js",
  title: "Client-Side Custom Router",
  prompt: "Implement a client-side router using the History API (pushState) and popstate events.",
  explanation: [
    {
      line: "history.pushState({ route }, '', `/${route}`);",
      desc: "History API pushState: Dynamically pushes a new state object and URL to the browser's session history stack without triggering a full page reload."
    },
    {
      line: "window.addEventListener('popstate', (event) => { ... });",
      desc: "popstate Event Listener: Fires when the user navigates through history (e.g. clicks the browser Back or Forward button), allowing us to update the page content dynamically to match the restored state."
    },
    {
      line: "event.preventDefault();",
      desc: "Prevents the default browser link click behavior (which would trigger a full HTTP request page refresh), allowing us to handle routing entirely client-side."
    }
  ]
};

export class CustomRouter {
  private log: string[] = [];
  private historyStack: { state: any; url: string }[] = [];
  private currentPointer = -1;

  pushState(state: any, title: string, url: string) {
    this.historyStack = this.historyStack.slice(0, this.currentPointer + 1);
    this.historyStack.push({ state, url });
    this.currentPointer++;
    this.log.push(`[pushState] Navigated to: ${url} (State: ${JSON.stringify(state)})`);
    this.updateContent(state.route);
  }

  goBack() {
    if (this.currentPointer > 0) {
      this.currentPointer--;
      const { state, url } = this.historyStack[this.currentPointer];
      this.log.push(`[popstate (Back)] Restored URL: ${url}`);
      this.updateContent(state.route);
    } else {
      this.log.push("[popstate] No previous history to go back to.");
    }
  }

  goForward() {
    if (this.currentPointer < this.historyStack.length - 1) {
      this.currentPointer++;
      const { state, url } = this.historyStack[this.currentPointer];
      this.log.push(`[popstate (Forward)] Restored URL: ${url}`);
      this.updateContent(state.route);
    } else {
      this.log.push("[popstate] No forward history to go to.");
    }
  }

  private updateContent(route: string) {
    if (route === 'home') {
      this.log.push(`[DOM Render] Rendered: "Home Page Content"`);
    } else if (route === 'about') {
      this.log.push(`[DOM Render] Rendered: "About Page Content"`);
    } else {
      this.log.push(`[DOM Render] Rendered: "404 Not Found"`);
    }
  }

  getLog() {
    return this.log;
  }
}

export function run() {
  const router = new CustomRouter();
  
  router.pushState({ route: "home" }, "", "/home");
  router.pushState({ route: "about" }, "", "/about");
  router.goBack();
  router.goForward();

  return router.getLog().join("\n");
}
