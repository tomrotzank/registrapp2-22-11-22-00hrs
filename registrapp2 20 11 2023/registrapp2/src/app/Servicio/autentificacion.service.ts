import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {Storage} from '@ionic/storage-angular';


interface User {
  username:String;
  password:String;
  rol: String;
}

@Injectable({
  providedIn: 'root'
})

export class AutentificarService {
  public funcional: Boolean = false;
  public rol: String = '';
  public username: String = '';
  public password: String = '';

  private local!: Storage;

  constructor(
    private router:Router, 
    private storage: Storage) {

    this.iniciar();
   }

  async iniciar(){
    const Storage = await this.storage.create();
    this.local = Storage;

    const users: User[] = [
      {
        username: 'tom.figueroa',
        password: 'tomas123',
        rol: 'alumno',
      },

      {
        username: 'seb.luarte',
        password: 'seba123',
        rol: 'alumno',
      },

      {
        username: 'jo.riquelme',
        password: 'jose123',
        rol: 'profesor',
      },
    ];
    
    await this.local.set('users', users);
    }


  async register(username: string, password: string, rol: string): Promise<Boolean> {
    const users = await this.local?.get('users') || [];
    const existe = users.find((us: User) => us.username === username && us.password === password );
    
    if (existe) {
      console.log("Usuario Existente")
      return true;
    } 
    
    else {
      const nuevo: User = { username, password, rol };
      users.push(nuevo);
      await this.local.set('users', users);
      console.log("Registro Exitoso")
      return false;
    }
  }

  // LOGIN
  async login(
    username: string, 
    password: string): Promise<boolean> {
      if (!this.local){
        return false; //Manejo de error: almacenamiento no inicializado
      }


    const users: User[] = (await this.local.get('users')) || [];
    const user = users.find((us) => us.username === username
                                 && us.password === password);
    if (user) {
    this.funcional = true;
    this.rol = user.rol;
    this.username = user.username; // asigna el valor del nombre de usuario

    return true;

  }

  this.funcional = false;
  return false;
  }

    //LOGOUT
    logout(){
      this.funcional =false;
      this.rol = '';
      this.router.navigate(['/home']);
    }


}