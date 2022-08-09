import { Component, OnInit } from '@angular/core';
// servicio local de autenticacion
import { FireAuthService } from '../../services/fire-auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.component.html',
  styleUrls: ['./recuperar.component.scss']
})
export class RecuperarComponent implements OnInit {
  // var para correo del formulario
  Correo: string = '';
  //Upassword: string = '';

  constructor(private SesionFire:  FireAuthService ) { }

  ngOnInit(): void {
  }

  recuperarPass(){
    // recuperacion de correo
    this.SesionFire.recuperar(this.Correo);
    // vacio de correo
    this.Correo = '';
  }

}

