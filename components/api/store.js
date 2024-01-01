// EventBus.js
const eventBus = {
  listeners: {},
  subscribe: (event, callback) => {
    if (!eventBus.listeners[event]) {
      eventBus.listeners[event] = [];
    }
    eventBus.listeners[event].push(callback);
  },
  emit: (event, data) => {
    if (eventBus.listeners[event]) {
      eventBus.listeners[event].forEach((callback) => callback(data));
    }
  },
};

export default eventBus;
