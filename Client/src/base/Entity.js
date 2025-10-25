const EntityManagerInstance = require("./EntityManger");

class Entity {
    constructor() {
        this.entityId = EntityManagerInstance.CreateEntity(this);
        this.components = new Map;
    }

    GetEntityId() {
        return this.entityId;
    }

    AddComponent(component) {
        this.components.set(component.GetComponentType(), component);
        return this;
    }

    GetComponent(type) {
        return this.components.get(type);
    }

    RemoveComponent(type) {
        this.components.delete(type);
    }

    HasComponent(type) {
        return this.components.has(type);
    }

    OnEvent(eventType, data) {
    }

    Destroy() {
    }
}

module.exports = Entity;
