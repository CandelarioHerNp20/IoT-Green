import { Component, OnInit } from '@angular/core';
import { FirestoreDBService } from 'src/app/services/firestore-db.service';
//Modelo y pipe requerido para la filtracion de los datos
import { Placa } from 'src/app/models/models';
import { PagesPipe } from 'src/app/pipes/pages.pipe';


@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent implements OnInit {

 
  // placas
  placas = [];
  public fechas: string = '';
  public page: number = 0;


  constructor(public FirestoreDB:  FirestoreDBService){

  }

  ngOnInit(): void {
    // carga de los datos en la var placa 
    this.FirestoreDB.getPlacas().subscribe(placas =>{
      console.log(placas);
      this.placas = placas;
    })
  }


  deletePlaca(event, placa){
    this.FirestoreDB.deletePlacas(placa);
    //alert("Se eliminara la placa con id: \n"+placa);
  }

  // avace de pagina
  sigPage(){
    this.page += 20;
  }

  // retroceder pagina
  antePage(){
    if (this.page >0 )
    this.page -= 20;
  }

  // filtrar fecha establecida
  filtrarFecha(fechas: string){
    this.page = 0;
    this.fechas = fechas
    console.log(fechas);

  }


}
