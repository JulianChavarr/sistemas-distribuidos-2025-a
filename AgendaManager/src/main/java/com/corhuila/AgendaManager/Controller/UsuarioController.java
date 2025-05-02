package com.corhuila.AgendaManager.Controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.corhuila.AgendaManager.Entity.Usuario;
import com.corhuila.AgendaManager.IService.IUsuarioService;

@CrossOrigin(origins = "http://agendadb.s3-website-us-east-1.amazonaws.com")
@RestController
@RequestMapping("/api/usuario")
public class UsuarioController extends ABaseController<Usuario, IUsuarioService> {
    public UsuarioController(IUsuarioService service) {
        super(service, "Usuario");
    }
}