import { Injectable } from '@angular/core';
// auth firebase 
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
//import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NotificacionesService } from './notificaciones.service';

@Injectable({
  providedIn: 'root'
})
export class FireAuthService {
  constructor(private AuthFR: AngularFireAuth, private Redireccion: Router, public NotiSvc: NotificacionesService) {
    this.getUid();

  }
  // alerta simple con sweet alert 2
  errorAlertBox() {
    Swal.fire('Oops', 'A ocurrido un error con los datos que ingreso\n revise que sean correctos', 'error');
  }

  // logeo
async login(Correo: string, Upassword: string) {
  // autenticacion con correo y contraseña 
   await this.AuthFR.signInWithEmailAndPassword(Correo, Upassword).then(res => {
    // obtencion de token para sesion
      localStorage.setItem('token', 'true');
      // redireccion a la lista de registros
      this.Redireccion.navigate(['/lista']);
      /*
      if(res.user?.emailVerified == true){
        this.Redireccion.navigate(['/Inicio']);
      } else {
        this.Redireccion.navigate(['/Verificar'])
      }
       */
      

    }, err => {
      // alerta para error de datos 
      Swal.fire('Error verifique su contraseña y correo');
      this.errorAlertBox();
      // redireccion a logeo
      this.Redireccion.navigate(['logeo']);
    })
  }

  //registros
  registro(Correo: string, Upassword: string) {
    //registro de cuentes utilizando un correo y una contraseña 
    this.AuthFR.createUserWithEmailAndPassword(Correo, Upassword).then(res => {
      // alerta de registrado
      Swal.fire('Registrado')
      // redirecciona logoe
      this.Redireccion.navigate(['/logeo']);
      // envio de correo para verificacion -> no requerido
      this.sendEmailForVerify(res.user);
    }, err => {
      Swal.fire('Error en el registro');
      /* 
      En caso de que el correo no se pueda registrar se muestra una alerta y 
      se redirecciona a logeo para borra los datos que coloco
      en el formulario
      */
      this.Redireccion.navigate(['/registro'])
    })
  }

  // cerrar sesion
  cerrarSesion() {
    this.AuthFR.signOut().then(() => {
      localStorage.setItem('token', 'false');
      // navegacion a pagina raiz 'inicio'
      this.Redireccion.navigate(['/'])
    }, err => {
      // disparo de alerta en caso de haver algun problema si no es posible cerrar la sesion
      Swal.fire('Ocurrion un error al salir (_ _)');
      console.log(err);
    })
  }

  //recuperar contraseña
  recuperar(Correo: string) {
    // envio de correo para reseteo de contraseña
    this.AuthFR.sendPasswordResetEmail(Correo).then(() => {
      // disparo de alerta al enviar el correo
      Swal.fire({
        icon: 'info',
        title: 'Correo enviado (°~°)',
        text: ' Si el correo proporcionado existe se te enviara un correo',
        footer: '<a href="https://mail.google.com/mail/u/0/" target="blank">ir a Gmail</a>'
      });
      // redireccion a la pagina de verificacion
      this.Redireccion.navigate(['/verificar'])
    }, err => {
      // disparo de alerta en caso de error
      Swal.fire({
        icon: 'error',
        title: 'Error de recuperación (°~°)',
        text: ' No se puede recuperar este correo',
        footer: '<p>Revisa que el correo sea correcto y que exista para poder recuperarlo</p>'
      });
    });
  }

  // verificacion por emal para recuperar una cuenta
  sendEmailForVerify(user: any) {
    // se enviara el correo si existe
    user.sendEmailForVerify().then((res: any) => {
      // redireccio  a la pantalla de recuperacion
      this.Redireccion.navigate(['/recuperar']);
    }, (err: any) => {
      // disparo de alerta en caso de que el correo no se pueda recuperar o se encuantre allgun error
      Swal.fire({
        icon: 'error',
        title: 'Error de verificacion',
        text: ' No se puede enviar un correo para verificación',
        footer: '<p>Revisa que el correo sea correcto y que exista para poder recuperarlo</p>'
      });
    })

  }

  // obtener UID para las sesiones
  async getUid() {
    const user = await this.AuthFR.currentUser;
    // obtencion de uid para generar la sesion,
    if (user === null) {
      return null;
    } else {
      return user.uid;
      //console.log("Uid -->"+user.uid)
    }

  }

  // estado auth
  estadoAuth() {
    // obtener el 
    return this.AuthFR.authState;
  }
}
