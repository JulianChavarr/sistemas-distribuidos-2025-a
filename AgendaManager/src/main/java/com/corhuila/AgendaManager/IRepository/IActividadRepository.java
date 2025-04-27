package com.corhuila.AgendaManager.IRepository;

import com.corhuila.AgendaManager.Entity.Actividad;

import org.springframework.stereotype.Repository;

@Repository
public interface IActividadRepository extends IBaseRepository<Actividad, Long> {
}