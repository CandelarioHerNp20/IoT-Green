import { Component, OnInit } from '@angular/core';
// servicio local de datos paara la grafica
import { FireGraficAllService, datos } from 'src/app/services/fire-grafic-all.service';
// alertas sweer alert 2
import * as Highcharts from "highcharts";

@Component({
  selector: 'app-temperatura-resumen',
  templateUrl: './temperatura.component.html',
  styleUrls: ['./temperatura.component.scss']
})
export class TemperaturaResumenComponent implements OnInit {
  // asignacion de interface a  datos
  items$: datos[];
  Highcharts: typeof Highcharts = Highcharts;
  chartTemperaturas: any[] = [];
  chartHumedades: any[] = [];
  chartFechas: any[] = [];

  // para uso de opciopnes en html del grafico
  chartOptions: any;

  constructor(private FireDB: FireGraficAllService) {

  }


  ngOnInit() {
    // obtencion de losdatos y empuje de a las variables ANY
    this.FireDB.rates$.subscribe((assets) => {
      this.items$ = assets;
      if (this.items$) {
        this.items$.forEach((element) => {
          this.chartTemperaturas.push(element.Temperatura);
          this.chartFechas.push(element.Fecha);
        });
        // obtencion del grafico
        this.getChart();
      }
    });
  }
  getChart() {
    // opcions del grafico
    this.chartOptions = {
      series: [
        {
          // nombre 
          name: 'Temperatura',
          // datos a cargarn en el grafico
          data: this.chartTemperaturas,
        }
      ],
      chart: {
        type: "line",
        zoomType: 'x'
      },
      title: {
        // titulo
        text: "Grafico de temperaturas ",
      },
     xAxis: {
      // categorizacio por fecha
        categories: this.chartFechas,
        type: 'datetime',

      },
      yAxis: {
        title: {
          text: 'Temperatura (°C)'
        }
      },
    };
  }

}

