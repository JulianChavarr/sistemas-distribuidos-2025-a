package com.corhuila.AgendaManager.Controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.corhuila.AgendaManager.Entity.Actividad;
import com.corhuila.AgendaManager.IService.IActividadService;

@CrossOrigin(origins = "http://107.22.67.73:8080")
@RestController
@RequestMapping("api/actividad")
public class ActividadController extends ABaseController<Actividad, IActividadService> {
    public ActividadController(IActividadService service) {
        super(service, "Actividad");
    }
}