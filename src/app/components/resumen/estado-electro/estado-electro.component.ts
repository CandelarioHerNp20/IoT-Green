import { Component, OnInit } from '@angular/core';
// Base de datos de firebase
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
// modelo para la electrovalbual
import { Electro } from 'src/app/models/models';
// servicio de alerta 
import Swal from 'sweetalert2';
// navegacion
import { Router } from '@angular/router';



@Component({
  selector: 'app-estado-electro',
  templateUrl: './estado-electro.component.html',
  styleUrls: ['./estado-electro.component.scss']
})
export class EstadoElectroComponent implements OnInit {
  // asignacion de la lsida de los datos al al moedlo
  estadosLs: AngularFireList<Electro>;
  //asignacion de lista a una var 
  electro: Electro[] = [];

  constructor(private FireDB: AngularFireDatabase, private router: Router) { 
    // lectura de los datos
    this.leer();
  }

  leer() {
    // ubicacion de los datos en la base de datos
    const path = '/';
    // apaso de los datos para subcripcion de la electrovalbua a la var  cada que se detece un cambio en los datos
    this.FireDB.list<Electro>(path).valueChanges().subscribe(res => {
      console.log('estados', res);
      this.electro = res;
    })
  }

  ngOnInit(): void {
  }

}
