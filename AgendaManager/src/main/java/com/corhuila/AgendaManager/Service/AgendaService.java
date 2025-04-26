package com.corhuila.AgendaManager.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.corhuila.AgendaManager.Entity.Agenda;
import com.corhuila.AgendaManager.IRepository.IBaseRepository;
import com.corhuila.AgendaManager.IRepository.IAgendaRepository;
import com.corhuila.AgendaManager.IService.IAgendaService;
@Service
public class AgendaService extends ABaseService<Agenda> implements IAgendaService {
    @Override
    protected IBaseRepository<Agenda, Long> getRepository() {
        return repository;
    }
    @Autowired
    private IAgendaRepository repository;
}