import { Component, OnInit } from '@angular/core';
// base de datos
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
// modelo para electrovalbula
import { Electro } from 'src/app/models/models';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-electro',
  templateUrl: './electro.component.html',
  styleUrls: ['./electro.component.scss']
})
export class ElectroComponent implements OnInit {

  // lista firebase a modelo
  estadosLs: AngularFireList<Electro>;
  electro: Electro[] = [];
  // variables ////////////////////////////////
  estado: string;
  tiempo: any;
  dia: string;
  noche: string;
  manual: string;


  constructor(private FireDB: AngularFireDatabase, private router: Router) {
    this.leer();
  }

  // lectura de los datos de la raiz de la base de datos 
  leer() {
    const path = '/';
    // suscripcion a los cambios de la base de datos
    this.FireDB.list<Electro>(path).valueChanges().subscribe(res => {
      console.log('estados', res);
      //asignacion del resultado a electro
      this.electro = res;
    })
  }

// prueba de envio
/*
  enviarDatos(estado) {
    const pathEstado = "Estados/Estado";
    return this.estadosLs.push(estado);
  }
  */


// guardado de los datos del formulario a la base de datos
  guardar(estado: string, tiempo: any, dia: string, noche: string) {
    estado = this.estado;
    tiempo = this.tiempo;
    dia = this.dia;
    noche = this.noche;
    // path de la base de datos de firebase
    const pathEstado = "Estados/Estado";
    const pathTiempo = "Estados/Tiempo";
    const pathDia = "Estados/HoraDia";
    const pathNoche = "Estados/HoraNoche";

    // alertas para campos vacios del formulario
    if (this.estado == '') {
      Swal.fire('Seleccione el estado');
      return;
    }
    if (this.tiempo == null) {
      Swal.fire('Asigne los minutos de riego');
      return;
    }
    if (this.dia == '' && this.noche == '') {
      Swal.fire('Coloque la hora de riego');
      return;
    };

    // alerta para confirnacion de envio
    Swal.fire({
      title: 'Continuar?',
      text: "Se establecera el riego con tus datos  ",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      // confirmacion
      if (result.isConfirmed) {
        Swal.fire(
          'Guardado',
          'Datos guardados',
          'success'
        );
        // envio de los datos a RealtimeDB FIrebase
        this.FireDB.object(pathEstado).set(estado);
        this.FireDB.object(pathTiempo).set(tiempo);
        this.FireDB.object(pathDia).set(dia);
        this.FireDB.object(pathNoche).set(noche);
        // navegacion al path electro
        this.router.navigate(['/electro']);
      }
    })
  }

  ngOnInit() {

  }


}
