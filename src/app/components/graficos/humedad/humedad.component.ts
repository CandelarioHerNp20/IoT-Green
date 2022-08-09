import { Component, OnInit, ViewChild} from '@angular/core';

// charts
import { 
  ChartComponent, ApexAxisChartSeries, ApexChart, ApexXAxis, ApexDataLabels, 
  ApexStroke, ApexYAxis,ApexTitleSubtitle, ApexLegend 
} from "ng-apexcharts";

// cahrt 1
export type ChartOptions = {
  series: ApexAxisChartSeries; chart: ApexChart; xaxis: ApexXAxis; stroke: ApexStroke; dataLabels: ApexDataLabels;
  yaxis: ApexYAxis; title: ApexTitleSubtitle; labels: string[]; legend: ApexLegend; subtitle: ApexTitleSubtitle;
};

// data from services
//import { chartModal, FireGraficService } from '../../../services/fire-grafic.service';
import { datos, FireGraficAllService } from '../../../services/fire-grafic-all.service';


@Component({
  selector: 'app-humedad',
  templateUrl: './humedad.component.html',
  styleUrls: ['./humedad.component.scss']
})
export class HumedadComponent implements OnInit {

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  // class para chart 1
  elementos$: datos[];
  fecha: any[] = [];
  temperatura: any[] = [];
  humedad: any[] = [];

   // para funcion await
  cargaDatos = 0;

  // costructor + template de apexcharts
  constructor( private FireDB: FireGraficAllService) {
    this.chartOptions = {
      series: [
        {
          name: "Humedad",
          data: this.humedad,
          color: '#44da22'
        },
        {
          name: "Temperatura",
          data: this.temperatura,
          color: '#59cbff'
        }
      ],
      chart: {
        type: 'bar',
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
        text: "Lecturas de temperatura y humedad",
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

 async cargar(){
       // paso de datos 
       await this.FireDB.rates$.subscribe((assets)=>{
        this.elementos$ = assets;
        if(this.elementos$){
          // empuje de datos del modelo a las variables
          this.elementos$.forEach((element)=>{
            this.temperatura.push((element.Temperatura));
            this.humedad.push(((element.Humedad) * (100 / 4095)).toFixed(1));
            this.fecha.push(element.Fecha);
            this.cargaDatos = 1;
          });
        };
        
      })
  }


  ngOnInit() {
    this.cargar();
  }
  
}
