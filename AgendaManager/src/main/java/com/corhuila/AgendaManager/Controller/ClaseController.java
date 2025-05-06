package com.corhuila.AgendaManager.Controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.corhuila.AgendaManager.Entity.Clase;
import com.corhuila.AgendaManager.IService.IClaseService;

@CrossOrigin(origins = "http://agendadb.s3-website-us-east-1.amazonaws.com")
@RestController
@RequestMapping("/api/clase")
public class ClaseController extends ABaseController<Clase, IClaseService> {
    public ClaseController(IClaseService service) {
        super(service, "Clase");
    }
}