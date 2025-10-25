class EntityManager {
    constructor() {
        this.nextEntityId = 0;
    }

    CreateEntity(entity) {
        const entityId = ++this.nextEntityId;

        entity.entityId = entityId;

        return entityId;
    }
}

const EntityManagerInstance = new EntityManager();

module.exports = EntityManagerInstance;
