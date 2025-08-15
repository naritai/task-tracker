export class Router {
  constructor(routes) {
    this.routes = routes;
    this.handle = this.handle.bind(this);
    window.onpopstate = history.onpushstate = this.handle;
    this.handle();
  }

  handle(event) {
    const path = event?.state?.route ?? "/";
    const route = this.routes[path];

    if (typeof route === "function") {
      route();
    } else {
      // make 404 page
      console.log("page not found");
    }
  }
}
