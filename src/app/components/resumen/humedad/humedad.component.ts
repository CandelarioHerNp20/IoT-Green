import { Component, OnInit, ViewChild } from '@angular/core';
import { estadoMicrotunel, FireGraficLastService } from '../../../services/fire-grafic-last.service';


@Component({
  selector: 'app-humedad-resumen',
  templateUrl: './humedad.component.html',
  styleUrls: ['./humedad.component.scss']
})
export class HumedadResumenComponent implements OnInit {
  placas = [];
  temp = [];
  //public temperatura: number = '';


  constructor(private FireEstado: FireGraficLastService) {

  }

  ngOnInit() {
    // obtencion de los datos de firestore
    this.FireEstado.getValores().subscribe(placas => {
      console.log("temperatura", placas)
      // asignacion de los datos a var placas
      this.placas = placas;
    })

  }
}
