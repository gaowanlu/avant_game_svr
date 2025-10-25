class EventBus {
    constructor() {
        this.listeners = new Map();
    }

    Subscribe(eventType, entity) {
        if (!this.listeners.has(eventType)) {
            this.listeners.set(eventType, []);
        }
        if (this.listeners.get(eventType).find(v => v == entity)) {
            return;
        }

        this.listeners.get(eventType).push(entity);
    }

    Unsubscribe(eventType, entity) {
        if (this.listeners.has(eventType)) {
            const entities = this.listeners.get(eventType);
            this.listeners.set(eventType, entities.filter(v => v !== entity));
        }
    }

    Emit(eventType, data) {
        if (this.listeners.has(eventType)) {
            this.listeners.get(eventType).forEach(entity => entity.OnEvent(eventType, data));
        }
    }
}

export default EventBus;