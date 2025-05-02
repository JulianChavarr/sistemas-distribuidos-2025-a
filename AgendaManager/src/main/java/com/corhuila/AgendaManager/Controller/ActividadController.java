package com.corhuila.AgendaManager.Controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.corhuila.AgendaManager.Entity.Actividad;
import com.corhuila.AgendaManager.IService.IActividadService;

@CrossOrigin(origins = "http://agendadb.s3-website-us-east-1.amazonaws.com")
@RestController
@RequestMapping("api/actividad")
public class ActividadController extends ABaseController<Actividad, IActividadService> {
    public ActividadController(IActividadService service) {
        super(service, "Actividad");
    }
}