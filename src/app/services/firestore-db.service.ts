import { Injectable } from '@angular/core';
// firebase
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFirestoreDocument } from '@angular/fire/compat/firestore';

// modelo
import { Placa } from '../models/models';
//
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class FirestoreDBService {
  // coleccion y modelo
  placasCollection: AngularFirestoreCollection<Placa>;
  placas: Observable<Placa[]>;
  placaDoc: AngularFirestoreDocument<Placa>;
  
  constructor(public AngFirestore: AngularFirestore){
    // asignacion de coleccion y ordenamiento por fecha y filtrado por hora
    // se debe crear indice para poder aplicar doble filtro 
    // https://console.firebase.google.com/project/pdsmthmutgz/firestore/indexes
    this.placasCollection = this.AngFirestore.collection('Placas',ref => ref.orderBy('Fecha', 'desc').orderBy('Hora'));
    this.placas = this.placasCollection
    .snapshotChanges().pipe(map(actions =>
      {
        return actions.map(a =>{
        const data = a.payload.doc.data() as Placa;
        data.id = a.payload.doc.id;
        return data;
      })
    }))


  }

  // obtner placas
  getPlacas(){
    return this.placas;
  }

  // obtener placas
  getPlacaById(id){
    // this.AngFirestore.collection("placa")
    return this.AngFirestore
    .collection("placa")
    .doc(id)
    .valueChanges();
  }

  // agregar placas
  addPlaca(placa: Placa){
    this.placasCollection.add(placa);
  }
  
  // actualizacion de placas
  updatePlacas(placa: Placa, id){
    return this.AngFirestore
    .collection("placa")
    .doc(id)
    .update({
    //Nombre: placa.Nombre,
    Fecha: placa.Fecha,
    Temperatura: placa.Temperatura,
    Humedad: placa.Humedad,
    //Estado:placa.Estado,
    })
  };

  // eliminacion de placas
  deletePlacas(placa: Placa){
  this.placaDoc = this.AngFirestore.doc(`Placas/${placa.id}`);
  this.placaDoc.delete();
  };


}
