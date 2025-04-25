package com.corhuila.AgendaManager.IRepository;

import com.corhuila.AgendaManager.Entity.Usuario;

import org.springframework.stereotype.Repository;

@Repository
public interface IUsuarioRepository extends IBaseRepository<Usuario, Long> {
}