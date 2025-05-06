package com.corhuila.AgendaManager.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.corhuila.AgendaManager.Entity.Clase;
import com.corhuila.AgendaManager.IRepository.IBaseRepository;
import com.corhuila.AgendaManager.IRepository.IClaseRepository;
import com.corhuila.AgendaManager.IService.IClaseService;
@Service
public class ClaseService extends ABaseService<Clase> implements IClaseService {
    @Override
    protected IBaseRepository<Clase, Long> getRepository() {
        return repository;
    }
    @Autowired
    private IClaseRepository repository;
}