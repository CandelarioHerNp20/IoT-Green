import { Component, OnInit } from '@angular/core';
import { FireGraficAllService, datos } from 'src/app/services/fire-grafic-all.service';
import * as Highcharts from "highcharts";

@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.scss']
})
export class ResumenComponent implements OnInit {

  constructor(private FireDB: FireGraficAllService) {

  }

  // para paso de la interface
  items$: datos[];
  // charts
  Highcharts: typeof Highcharts = Highcharts;
  // para empuje de datos desde el servicio a la grafica
  chartTemperaturas: any[] = [];
  chartHumedades: any[] = [];
  chartFechas: any[] = [];

  chartOptions: any;

  ngOnInit() {
    // subscripcion a los cambio de los valores en la base de datos
    this.FireDB.rates$.subscribe((assets) => {
      this.items$ = assets;
      if (this.items$) {
        // empuje de los elementos a las variables any 
        this.items$.forEach((element) => {
          this.chartTemperaturas.push(element.Temperatura);
          this.chartFechas.push(element.Fecha);
          this.chartHumedades.push((element.Humedad * 100 / 4095));
        });
        // obtencion del chart
        this.getChart();
      }
    });
  }
  getChart() {
    // grafico
    this.chartOptions = {
      series: [
        {
          // nombre
          name: 'Humedades',
          // datos de la humedad
          data: this.chartHumedades,
        }
      ],
      chart: {
        type: "line",
        zoomType: 'x'
      },
      title: {
        // titulo del grafico
        text: "Grafico de humedades",
      },
      tooltip: {
        // decimales aceptados
        valueDecimals: 2
      }, xAxis: {
        // gategorizacion por fecha
        categories: this.chartFechas,
        type: 'datetime',

      },
      yAxis: {
        title: {
          text: 'Humedad (%)'
        }
      },
    };
  }

}
