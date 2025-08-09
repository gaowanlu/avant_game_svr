class EntityManager {
    constructor() {
        this.nextEntityId = 0;
    }

    createEntity(entity) {
        const entityId = ++this.nextEntityId;

        entity.entityId = entityId;

        return entityId;
    }
}

const EntityManagerInstance = new EntityManager();

module.exports = EntityManagerInstance;
