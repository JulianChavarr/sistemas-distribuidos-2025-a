package com.corhuila.AgendaManager.IService;

import java.util.List;

import com.corhuila.AgendaManager.Entity.ABaseEntity;

/**
 * IBaseService defines a generic interface for basic CRUD operations on entities.
 *
 * @param <T> The type of the entity extending from ABaseEntity.
 */
public interface IBaseService<T extends ABaseEntity> {

    /**
     * Retrieves all entities of type T.
     *
     * @return a list of all entities.
     */
    List<T> all();

    /**
     * Retrieves all entities of type T where the state is true.
     *
     * @return a list of entities with a true state.
     */
    List<T> findByStateTrue();

    /**
     * Finds an entity by its ID.
     *
     * @param id the ID of the entity to find.
     * @return the entity with the specified ID.
     * @throws Exception if the entity is not found or if an error occurs during the operation.
     */
    T findById(Long id) throws Exception;

    /**
     * Saves a given entity.
     *
     * @param entity the entity to save.
     * @return the saved entity.
     * @throws Exception if an error occurs during the save operation.
     */
    T save(T entity) throws Exception;

    /**
     * Updates an existing entity.
     *
     * @param id the ID of the entity to update.
     * @param entity the entity with updated information.
     * @throws Exception if the entity is not found or if an error occurs during the update operation.
     */
    void update(Long id, T entity) throws Exception;

    /**
     * Deletes an entity by its ID.
     *
     * @param id the ID of the entity to delete.
     * @throws Exception if the entity is not found or if an error occurs during the delete operation.
     */
    void delete(Long id) throws Exception;
}