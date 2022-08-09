import { Component, OnInit } from '@angular/core';

// firebase 
import { estadoMicrotunel,FireGraficLastService} from '../../../services/fire-grafic-last.service';

@Component({
  selector: 'app-medidor-humedad',
  templateUrl: './medidor-humedad.component.html',
  styleUrls: ['./medidor-humedad.component.scss']
})
export class MedidorHumedadComponent implements OnInit {
;

// var  para listado de los datos
  placas = [];
  temp = [];
  //public temperatura: number = '';


  constructor( private FireEstado: FireGraficLastService) {
  }

  // obtencion de los datos de firebase para seteo de los valores a placas
  ngOnInit() {
    this.FireEstado.getValores().subscribe(placas =>{
      console.log("temperatura",placas)
      this.placas = placas;
    })
    
  }
}