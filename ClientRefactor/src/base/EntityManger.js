class EntityManager {
    constructor() {
        this.entities = new Map();
        this.nextEntityId = 0;
    }

    createEntity(entity) {
        const entityId = ++this.nextEntityId;

        entity.entityId = entityId;

        this.entities.set(entityId, entity);
        return entityId;
    }

    getEntity(entityId) {
        return this.entities.get(entityId) || null;
    }

    removeEntity(entityId) {
        this.entities.delete(entityId);
    }

    getEntitiesWithComponent(componentType) {
        return Array.from(this.entities.values()).filter(entity => entity.hasComponent(componentType));
    }
}

const EntityManagerInstance = new EntityManager();

module.exports = EntityManagerInstance;
