const intercept = () => {
  window.addEventListener("popstate", () => {
    renderRoute(window.location.toString());
  });

  document.addEventListener("click", (event) => {
    const target = event.target.closest("a");

    if (target && target.tagName === "A") {
      if (target.origin !== window.location.origin || target.hash) {
        return;
      }
      event.preventDefault();
      history.pushState({}, "", target.href);
    }
  });

  const historyPushState = history.pushState;
  const historyReplaceState = history.replaceState;

  history.pushState = (...args) => {
    historyPushState.apply(history, args);
    renderRoute(args[2]);
  };

  history.replaceState = (...args) => {
    historyReplaceState.apply(history, args);
    renderRoute(args[2]);
  };
};

let routes = {};
const handlers = [];

const matchRoute = (handler) => {
  handlers.push((url) => {
    const path = new URL(url).pathname;
    const page = routes[path] || (() => {});
    handler(path, page);
  });
};

const registerRoutes = (newRoutes) => {
  routes = { ...routes, ...newRoutes };
  renderRoute(window.location.toString());
};

const renderRoute = (url, handler) => {
  console.log(`* Navigating to: ${new URL(url).pathname}`);
  [handler || handlers].flat().forEach((handler) => handler(url));
};

intercept();

export { matchRoute, registerRoutes };
