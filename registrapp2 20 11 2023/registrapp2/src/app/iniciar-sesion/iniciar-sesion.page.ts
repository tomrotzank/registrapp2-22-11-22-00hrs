import { Component, OnInit, NgModule } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AutentificarService } from '../Servicio/autentificacion.service';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.page.html',
  styleUrls: ['./iniciar-sesion.page.scss'],
})
export class IniciarSesionPage implements OnInit {
  usuario: string = ''

  constructor(
    private router: Router, 
    private Auth: AutentificarService) { }

  ngOnInit() {
    const usuario= this.Auth.username;
  }

  volverAHome(){
    this.router.navigate(['/login']);
}

  abrirCamara() {
    this.router.navigate(['/abrir-camara']);
  }
}






