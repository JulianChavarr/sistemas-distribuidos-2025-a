package com.corhuila.AgendaManager.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.corhuila.AgendaManager.Entity.Actividad;
import com.corhuila.AgendaManager.IRepository.IBaseRepository;
import com.corhuila.AgendaManager.IRepository.IActividadRepository;
import com.corhuila.AgendaManager.IService.IActividadService;
@Service
public class ActividadService extends ABaseService<Actividad> implements IActividadService {
    @Override
    protected IBaseRepository<Actividad, Long> getRepository() {
        return repository;
    }
    @Autowired
    private IActividadRepository repository;
}