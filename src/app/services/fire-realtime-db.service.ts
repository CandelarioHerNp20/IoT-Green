import { Injectable } from '@angular/core';

// firebase
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
// models
import { Electro } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class FireRealtimeDBService {
  // db

  selectorPlaca: Electro = new Electro();
  electroList: AngularFireList<any>;

  constructor(private FireRTDB: AngularFireDatabase) {
  }

  // obtener electrovalbula
  getEstado(){
    return this.electroList = this.FireRTDB.list('Electro');
  }

  // agregar estado apartir del modelo
  crearEstado(electro: Electro){
    this.electroList.push({
      Estado: electro.Estado,
      Tiempo: electro.Tiempo,
      HoraDia: electro.HoraDia,
      HoraNoche: electro.HoraNoche,
    })
  }
  
  // actualizacion del estado de la electrovalbula
  updateEstado(electro: Electro){
    this.electroList.update(electro.$key,{
      Estado: electro.Estado,
      Tiempo: electro.Tiempo,
      HoraDia: electro.HoraDia,
      HoraNoche: electro.HoraNoche,
    });
  }

  // eliminacion
  deleteEstado($key: string){
    this.electroList.remove($key);
  }

  


}







