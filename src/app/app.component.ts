import { Component } from '@angular/core';
// servicio de autenticacion
import { FireAuthService } from './services/fire-auth.service';
// navegacion
import { Router } from '@angular/router';
// alertas personalizables
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'IoT-Green';
  // para mostrar los enlaces en la barra de navegacion
  logeado = 'sin_acceso'

  constructor(public estadoAuth: FireAuthService,private ruta: Router ) {
    // revisar el estado de autenticacion
    this.estadoAuth.estadoAuth().subscribe( res =>{
      if(res){
        console.log("Logeado");
        this.logeado = 'con_acceso'

      }else{
        console.log("Sin autenticar");
        this.logeado = 'sin_acceso'
      }
    })

  }

 ngOnInit() {
    
  }

  cerrar(){
    // cerrar sesion y enviar una alerta para confirmar
    Swal.fire({
      title: 'Desea cerra su sesión?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Salir',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('Cerrando sesion', '', 'success')
        this.estadoAuth.cerrarSesion();
      } else if (result.isDenied) {
        Swal.fire('Sesion no cerrada', '', 'info')
      }
    })

    
   
  }
 

}
