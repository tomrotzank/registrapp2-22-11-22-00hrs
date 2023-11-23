import { Component,ViewChild,ElementRef, OnInit} from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { Router, NavigationExtras } from '@angular/router';
import { AutentificarService } from '../Servicio/autentificacion.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage implements OnInit{
  private contentElement: any;

  @ViewChild(IonModal) modal!: IonModal;

  constructor(
    private router: Router, 
    private auth: AutentificarService,
    private alertController: AlertController) 
    {}

    public estado: String = "";
    public mensaje="";

  user = {
    usuario: "",
    password: "",
    rol: ""
  }

  ngOnInit() {
    this.contentElement = document.querySelector('.ion-content');
  }

  iniciarSesion() {
      this.router.navigate(['/iniciar-sesion']);
  }

  recuperarContrasena() {
      this.router.navigate(['/recuperar-contrasena']);
}

cancel() {
  this.modal.dismiss(null, 'cancel');
}

/*enviainfor() {
  this.auth.login(this.user.usuario, this.user.password).then(() => {
    if (this.auth.funcional) {
      let navigationExtras: NavigationExtras = {
        state: { user: this.user }
      }
      this.router.navigate(['/login'], navigationExtras);
    } else {
      this.mensaje = "Debe ingresar sus credenciales";
    }
    });
} */


async enviainfor() {
  const usuario = this.user.usuario;
  const password = this.user.password;
  const rol = this.user.rol;

  if (await this.auth.login(usuario, password)) {
    const rol = this.auth.rol;

    if (rol === 'profesor') {
      this.router.navigate(['/iniciar-sesion']);
    } else if (rol === 'alumno') {
      this.router.navigate(['/iniciar-sesion']);
    }
  } else {
    // Credenciales incorrectas
    this.mostrarErrorAlert();
  }
}


async mostrarErrorAlert() {
  const alert = await this.alertController.create({
    header: 'Credenciales incorrectas',
    message: 'La combinación de usuario y contraseña es incorrecta.',
    buttons: [
      {
        text: 'OK',
        handler: () => {
          
          window.location.reload();
        },
      },
    ],
  });
  }

confirm() {
  this.auth.register(this.user.usuario, this.user.password, this.user.rol).then((res) => {
    if (res) {
      this.estado = "Usuario Existente";
    } else {
      this.mensaje = "Registro Exitoso";
      this.modal.dismiss(this.user.usuario, 'confirm');
    }
  })
} 



onWillDismiss(event: Event) {
  const ev = event as CustomEvent<OverlayEventDetail<string>>;
  if (ev.detail.role === 'confirm') {
    this.mensaje = `Hello, ${ev.detail.data}!`;
  }
}
}