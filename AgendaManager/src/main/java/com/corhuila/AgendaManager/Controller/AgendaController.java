package com.corhuila.AgendaManager.Controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.corhuila.AgendaManager.Entity.Agenda;
import com.corhuila.AgendaManager.IService.IAgendaService;

@CrossOrigin(origins = "http://107.22.67.73:8080")
@RestController
@RequestMapping("api/agenda")
public class AgendaController extends ABaseController<Agenda, IAgendaService> {
    public AgendaController(IAgendaService service) {
        super(service, "Agenda");
    }
}