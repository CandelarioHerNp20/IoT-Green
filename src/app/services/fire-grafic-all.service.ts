import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection} from '@angular/fire/compat/firestore';

import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class FireGraficAllService {

  private rateCollection: AngularFirestoreCollection < datos > ;
  rates$: Observable < datos[] > ;


  constructor(private readonly firestoreAll: AngularFirestore) {
    // obtiene todos los datos
    this.rateCollection = firestoreAll.collection < datos > ('Placas', ref => ref.orderBy('Fecha').orderBy('Hora'));
    this.rates$ = this.rateCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as datos;
        const id = a.payload.doc.id;
        return {
          id,
          ...data
        };
      }))
    );
  }

}
export interface datos {
  Temperatura: string,
  Humedad: number,
  Fecha: string

}
