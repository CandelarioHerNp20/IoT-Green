import { Pipe, PipeTransform, NgModule} from '@angular/core';
import { Placa } from '../models/models';

@Pipe({
  name: 'pages'
})
export class PagesPipe implements PipeTransform {

  // filtro de pipe para setear loas datos de la placa por pagina 
  transform(dataPlaca: Placa, page: number = 0, fechas: string = ''): Placa[] {
    if(fechas.length === 0)
    // limitar tamaño de las placas a 40 por cada pagina aun sin establecer la fecha
      return dataPlaca.slice(page, page + 40);
      /* 
       filtro apartir de la fecha establecida en la lista y limtacion 
       a la paginacion a los elemento de esta fecha
       */
    const filtrarFecha = dataPlaca.filter(placa => placa.Fecha.includes(fechas));
    // limitacion a 40 elementos por cada pagina
    return filtrarFecha.slice(page, page + 40);
  }

}
