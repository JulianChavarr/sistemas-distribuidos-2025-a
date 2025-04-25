package com.corhuila.AgendaManager.IRepository;

import com.corhuila.AgendaManager.Entity.ABaseEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IBaseRepository<T extends ABaseEntity, ID> extends JpaRepository<T,Long> {
}