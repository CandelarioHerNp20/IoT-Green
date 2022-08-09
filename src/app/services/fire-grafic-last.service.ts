import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection} from '@angular/fire/compat/firestore';

import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class FireGraficLastService {
  private placasCollection: AngularFirestoreCollection < estadoMicrotunel > ;
  estado$: Observable < estadoMicrotunel[] > ;


  constructor(private readonly firestoreAll: AngularFirestore) {
    // obtiene todos los datos
    // colocar path de la base y los filtros "indices" que se obtiene desde indices
    // https://console.firebase.google.com/project/pdsmthmutgz/firestore/indexes 
    this.placasCollection = firestoreAll.collection < estadoMicrotunel > ('Placas', ref => ref.orderBy('Fecha').orderBy('Hora').limitToLast(1));
    this.estado$ = this.placasCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as estadoMicrotunel;
        const id = a.payload.doc.id;
        return {
          id,
          ...data
        };
      }))
    );
  }

  // obtencion de los datos
  getValores(){
    return this.estado$;
  }


}
export interface estadoMicrotunel {
  Temperatura: string,
  Humedad: number,
  Fecha: string
}
