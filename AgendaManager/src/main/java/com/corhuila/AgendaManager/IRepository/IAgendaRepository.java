package com.corhuila.AgendaManager.IRepository;

import com.corhuila.AgendaManager.Entity.Agenda;

import org.springframework.stereotype.Repository;

@Repository
public interface IAgendaRepository extends IBaseRepository<Agenda, Long> {
}