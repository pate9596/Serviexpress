import { Component,ElementRef ,ViewChild} from '@angular/core';
import { NavigationExtras,Router } from '@angular/router';
import { AutentificarService } from '../Servicios/autentificar.service';
import { IonModal, IonCard } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild(IonModal)modal!: IonModal;
  @ViewChild(IonCard, { read: ElementRef }) card!: ElementRef<HTMLIonCardElement>;
  passwordVisible: boolean = false;
  password: string = '';
  isRotated = false;
  constructor(private router: Router, private auth: AutentificarService) { }
  public mensaje = ""
  public alertaButtons = ['OK'];
  redirectToInicio(){
    this.router.navigate(['inicio'])
  }
  user = {
    usuario: "",
    password: ""
  }
  informacionUsuario(){
    this.auth.login(this.user.usuario, this.user.password).then(()=> {
      if (this.auth.autentificado){
        let navigationExtras: NavigationExtras ={
          state: { user: this.user}
        }
        this.router.navigate(['/historial'], navigationExtras);
      } 
    });
  }

  Consola(){
    console.log(this.user);
    if (this.user.usuario != "" && this.user.password != ""){
      this.mensaje = "";
    } else{
      this.mensaje = ""
    }
  }

  Salir(){
    this.modal.dismiss(null,'Salir');
  }
  confirmarUsuario(){
    this.auth.register(this.user.usuario, this.user.password);
    this.modal.dismiss(this.user.usuario, 'confirmarUsuario');
  }
}