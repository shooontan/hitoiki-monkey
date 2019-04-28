class Handler {
  constructor() {
    this.listeners = new Map();
  }

  addListener(element, event, handler, capture) {
    element.addEventListener(event, handler, capture);
    this.listeners.set(handler, {
      element,
      event,
      handler,
      capture
    });
    return handler;
  }

  removeListener(handler) {
    if (this.listeners.has(handler)) {
      const h = this.listeners.get(handler);
      h.element.removeEventListener(h.event, h.handler, h.capture);
      const a = this.listeners.delete(handler);
    }
  }
}

const handler = new Handler();

export default handler;
