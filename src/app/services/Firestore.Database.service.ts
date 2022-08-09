import { Injectable } from '@angular/core';
// firebase
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFirestoreDocument } from '@angular/fire/compat/firestore';
// modelo
import { Placa } from '../models/models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class FirestoreDatabaseService {

  // asignacion de la coleccion al modelo de la coleccion placa
 placasCollection: AngularFirestoreCollection<Placa>;
 // obseravable de la coleccion
 placas: Observable<Placa[]>;
 placaDoc: AngularFirestoreDocument<Placa>;
  
  constructor(public AngFirestore: AngularFirestore){
    /* 
    this.placas = this.AngFirestore
    .collection('Placas')
    .valueChanges();
    */
    // Obtencion de la colaccion asignando el path en donde se encuantran los datos
    this.placasCollection = this.AngFirestore.collection('Placas');
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
    Nombre: placa.Nombre,
    Fecha: placa.Fecha,
    Temperatura: placa.Temperatura,
    Humedad: placa.Humedad,
    Estado:placa.Estado,
    })
  };

  // eliminacion de placas
  deletePlacas(placa: Placa){
  this.placaDoc = this.AngFirestore.doc(`Placas/${placa.id}`);
  this.placaDoc.delete();
  };

  

}
