const EntityManagerInstance = require("./EntityManger");

class Entity {
    constructor() {
        this.entityId = EntityManagerInstance.createEntity(this);
        this.components = new Map;
    }

    getEntityId() {
        return this.entityId;
    }

    addComponent(component) {
        this.components.set(component.getComponentType(), component);
        return this;
    }

    getComponent(type) {
        return this.components.get(type);
    }

    removeComponent(type) {
        this.components.delete(type);
    }

    hasComponent(type) {
        return this.components.has(type);
    }

    OnEvent(eventType, data) {
    }

    destroy() {
        EntityManagerInstance.removeEntity(this.getEntityId())
    }
}

module.exports = Entity;
