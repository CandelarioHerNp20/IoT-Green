import { Component, OnInit, ViewChild } from '@angular/core';
// charts

import {
  ChartComponent, ApexAxisChartSeries, ApexChart, ApexXAxis, ApexDataLabels,
  ApexStroke, ApexYAxis, ApexTitleSubtitle, ApexLegend
} from "ng-apexcharts";

// chart 1
export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart; xaxis: ApexXAxis;
  stroke: ApexStroke; dataLabels: ApexDataLabels;
  yaxis: ApexYAxis; title: ApexTitleSubtitle;
  labels: string[]; legend: ApexLegend;
  subtitle: ApexTitleSubtitle;
};

// data from services
import { chartModal, FireGraficService } from '../../services/fire-grafic.service';
//import { chartData, FireGraficAllService } from '../../services/fire-grafic-all.service';




@Component({
  selector: 'app-graficos',
  templateUrl: './graficos.component.html',
  styleUrls: ['./graficos.component.scss']
})
export class GraficosComponent implements OnInit {
  // chart 1
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  // class para chart 1
  elementos$: chartModal[];
  fecha: any[] = [];
  humedad: any[] = [];

  // para funcion await
  cargaDatos = 0;

  // costructor + template de apexcharts
  constructor(private FireDB: FireGraficService) {
    this.chartOptions = {
      series: [
        {
          // nombre de los datos
          name: "Humedad",
          // datos
          data: this.humedad,
          // color del grafico
          color: '#44da22'
        },
      ],
      chart: {
        // tipo
        type: "area",
        // tamaño
        height: 350,
        // habilitar opcion de zoom
        zoom: {
          enabled: true
        },
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "straight"
      },
      // titulo de grafico y alineacion
      title: {
        text: "Registros de humedad",
        align: "left"
      },
      // asignacion de fecha en el eje x
      labels: this.fecha,
      xaxis: {
        //estableciendo la fecha como categoria !! no soporta el formato fecha incompleto
        type: 'category'
      },
      yaxis: {
        opposite: true
      },
      legend: {
        horizontalAlign: "left"
      }
    };
  }

  async cargar() {
    // paso de datos del sercvicio
    await this.FireDB.rates$.subscribe((assets) => {
      // asignacion de assets a los elementos de la placa
      this.elementos$ = assets;
      if (this.elementos$) {
        // empuje de los elementos a las variables declaradas a inicio
        this.elementos$.forEach((element) => {
          this.humedad.push(((element.Humedad) * (100 / 4095)).toFixed(1));
          this.fecha.push(element.Fecha);
          this.cargaDatos = 1;
        });
      };

    })
  }


  // carga de los graficos
  ngOnInit() {
    this.cargar();
  }


}
