import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class FireGraficService {
  private rateCollection: AngularFirestoreCollection<chartModal>;
  // temperatura

  rates$: Observable<chartModal[]>;


  constructor(private readonly firestoreservice: AngularFirestore) {
       // asignacion de coleccion y ordenamiento por fecha y filtrado por hora limtando a los ultimos 77 registros
    // se debe crear indice para poder aplicar doble filtro 
    // https://console.firebase.google.com/project/pdsmthmutgz/firestore/indexes 
    this.rateCollection = firestoreservice.collection<chartModal>('Placas', ref => ref.orderBy('Fecha').orderBy('Hora').limitToLast(77));
    this.rates$ = this.rateCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as chartModal;
        const id = a.payload.doc.id;
        return {
          id,
          ...data
        };
      }))
    );
  }

}
// interface para uso en las graficas // permitira mapear los datos y empujarlos a la grafica
export interface chartModal {
  Temperatura: string,
  Humedad: number,
  Fecha: string

}
