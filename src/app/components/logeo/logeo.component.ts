import { Component, OnInit } from '@angular/core';
// servicio local de autenticacion
import { FireAuthService } from '../../services/fire-auth.service';
// servicio de alertas sweet alert 2
import Swal from 'sweetalert2';



@Component({
  selector: 'app-logeo',
  templateUrl: './logeo.component.html',
  styleUrls: ['./logeo.component.scss']
})
export class LogeoComponent implements OnInit {
// variable para los datos de formulario
Correo: string = '';
Upassword: string = '';
handlerMessage = '';
roleMessage = '';

constructor(private SesionFire: FireAuthService) {}

ngOnInit(): void {
  
}

// funcio para acceso 
acceder() {
  // validaciones de campo de correo
  if (this.Correo == '') {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Coloque un correo valido',
    })

    return;
  }
  // validacion de campo password
  if (this.Upassword == '') {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Coloque una contraseña',
    })
    return;
  }
  // alerte
  Swal.fire(
    'Logeado',
    'Sesion correcta',
    'success'
  )
  // logeo con correo y password
  this.SesionFire.login(this.Correo, this.Upassword);
  // vacio de correo y password
  this.Correo = '';
  this.Upassword = '';
}

}

