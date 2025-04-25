package com.corhuila.AgendaManager.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.corhuila.AgendaManager.Entity.Usuario;
import com.corhuila.AgendaManager.IRepository.IBaseRepository;
import com.corhuila.AgendaManager.IRepository.IUsuarioRepository;
import com.corhuila.AgendaManager.IService.IUsuarioService;

@Service
public class UsuarioService extends ABaseService<Usuario> implements IUsuarioService {
    @Override
    protected IBaseRepository<Usuario, Long> getRepository() {
        return repository;
    }
    
    @Autowired
    private IUsuarioRepository repository;
}