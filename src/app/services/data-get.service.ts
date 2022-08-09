import { Injectable } from '@angular/core';
import { Placa } from 'src/app/models/models';
import { map } from 'rxjs/operators';

// firebase
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class DataGetService {

  //Variables tipo any para seteo -- este es un apartadi para prueba de obtencin de los datos
  fecha: any[] = [];
  temp: any[] = [];
  humedad: any[] = [];

  constructor(private FireDB: AngularFirestore) { 


  }
  ngOnInit() {
    this.getTemperatura();
    this.getHumedad();
    this.getFecha();
    
  }

  getTemperatura(){
    // colocar la coleccion para obtener los datos cada que se presente un cambio
    this.FireDB.collection("Placas").valueChanges()
    .pipe(map((data:Placa[])=>{
      // mapeo de temperatura
      return data.map(({Temperatura}) =>({
        Temperatura: Temperatura
      }))
    }))
    .subscribe(data =>{
      this.temp = data;
      console.log(this.temp);
      console.log("Temperaturas ... OK")
    })
  }

  getHumedad(){
    this.FireDB.collection("Placas").valueChanges()
    .pipe(map((data:Placa[])=>{
      // mepeo de humedad
      return data.map(({Humedad}) =>({
        Humedad: Humedad
      }))
    }))
    .subscribe(data =>{
      this.humedad = data;
      console.log(this.humedad);
      console.log("Humedad ... OK")
    })
  }
  

  getFecha(){
    this.FireDB.collection("Placas").valueChanges()
    .pipe(map((data:Placa[])=>{
      // mapeo de fecha
      return data.map(({Fecha}) =>({
        Fecha: Fecha
      }))
    }))
    .subscribe(data =>{
      this.fecha = data;
      console.log(this.fecha);
      console.log("Fechas ... OK")
    })
  }
  

 




}
