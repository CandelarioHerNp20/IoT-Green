import { Component, OnInit } from '@angular/core';
// servicio local de autenticacion
import { FireAuthService } from '../../services/fire-auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  // variables para el formulario
  Correo: string ='';
  Nombre: string = '';
  Upassword: string='';

  constructor(private SesionFire: FireAuthService ) { }

  ngOnInit(): void {
  }

  // funcion syncrona para espera de datos del fornmulario
  async registrar() {

    // valicacion de campos
    if (this.Correo == '') {
      alert("Introdusca un correo electronico");
      return;
    }
    if (this.Upassword == '') { 
      alert("Introdusca una contraseña");
      return;
    }
    // registro de usuarios coon correo y password
    this.SesionFire.registro(this.Correo, this.Upassword);
    // obtecion de uid de usuario apartir de la sesion
    const uid = await this.SesionFire.getUid();
    
  }

}

