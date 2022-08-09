import { Component, OnInit, ViewChild} from '@angular/core';
import {
  ChartComponent, ApexAxisChartSeries, ApexChart, ApexXAxis, ApexDataLabels,
  ApexStroke, ApexYAxis, ApexTitleSubtitle, ApexLegend
} from "ng-apexcharts";

// data from services
import { chartModal, FireGraficService } from '../../../services/fire-grafic.service';

// opciones de charts
export type ChartOptions = {
  series: ApexAxisChartSeries; 
  chart: ApexChart; xaxis: ApexXAxis; 
  stroke: ApexStroke; dataLabels: ApexDataLabels;
  yaxis: ApexYAxis; title: ApexTitleSubtitle; 
  labels: string[]; legend: ApexLegend; 
  subtitle: ApexTitleSubtitle;
};

// datos similares a los del componente "graficos.component.ts"

@Component({
  selector: 'app-temperatura',
  templateUrl: './temperatura.component.html',
  styleUrls: ['./temperatura.component.scss']
})
export class TemperaturaComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  // class para chart 1
  elementos$: chartModal[];
  fecha: any[] = [];
  temperatura: any[] = [];

  // para funcion await
  cargaDatos = 0;

  // costructor + template de apexcharts
  constructor(private FireDB: FireGraficService) {
    this.chartOptions = {
      series: [
        {
          name: "Temperatura",
          data: this.temperatura,
          color: '#44da22'
        },
      ],
      chart: {
        type: "area",
        height: 350,
        zoom: {
          enabled: true
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "straight"
      },

      title: {
        text: "Registros de temperatura",
        align: "left"
      },
      labels: this.fecha,
      xaxis: {
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

  async graficatemp() {
    // paso de datos 
    await this.FireDB.rates$.subscribe((assets) => {
      this.elementos$ = assets;
      if (this.elementos$) {
        this.elementos$.forEach((element) => {
          this.temperatura.push(element.Temperatura);
          this.fecha.push(element.Fecha);
          this.cargaDatos = 1;
        });
      };

    })
  }




  ngOnInit() {
    this.graficatemp();
  }


}
