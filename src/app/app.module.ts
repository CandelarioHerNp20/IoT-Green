import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// Router navegacion entre rutas
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
// charts 
import { NgChartsModule } from 'ng2-charts';

// enviroments
import { environment } from '../environments/environment';

// Forms
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

// charts
import { HighchartsChartModule} from "highcharts-angular";
import { NgApexchartsModule } from 'ng-apexcharts';


import { ServiceWorkerModule } from '@angular/service-worker';
///////////////////// firebase angularFire
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule} from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

// declarar servicios necesarios services
import { FirestoreDatabaseService } from './services/Firestore.Database.service';
import { DataGetService } from './services/data-get.service';

///////////////////// comocar modulos y pipes
//import { PagesPipe } from './pipes/pages.pipe';
import { ListaPipe } from './pipes/lista.pipe';
import { PagesPipe } from './pipes/pages.pipe';

// components
import { NavbarComponent } from './components/navbar/navbar.component';
import { NotificacionesComponent } from './components/notificaciones/notificaciones.component';
import { ResumenComponent } from './components/resumen/resumen.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { FooterComponent } from './components/footer/footer.component';
import { GraficosComponent } from './components/graficos/graficos.component';
import { ListaComponent } from './components/lista/lista.component';
import { LogeoComponent } from './components/logeo/logeo.component';
import { RegistroComponent } from './components/registro/registro.component';
import { RecuperarComponent } from './components/recuperar/recuperar.component';
import { ElectroComponent } from './components/electro/electro.component';
import { MedidorHumedadComponent } from './components/graficos/medidor-humedad/medidor-humedad.component';
import { TemperaturaComponent } from './components/graficos/temperatura/temperatura.component';
import { HumedadComponent } from './components/graficos/humedad/humedad.component';
import { HumedadResumenComponent } from './components/resumen/humedad/humedad.component';
import { VerificarComponent } from './components/verificar/verificar.component';
import { TemperaturaResumenComponent} from './components/resumen/temperatura/temperatura.component';
import { EstadoElectroComponent } from './components/resumen/estado-electro/estado-electro.component';

// 
const router: Routes = [
  // colocar las rutas necesarias -> agregar antes el componente para poder utilizarlo
  { path: '', component: InicioComponent },
  { path: 'inicio', component: InicioComponent },
  { path: 'graficos', component: GraficosComponent },
  { path: 'resumen', component: ResumenComponent },
  { path: 'notify', component: NotificacionesComponent },
  { path: 'lista', component: ListaComponent },
  { path: 'logeo', component: LogeoComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'recuperar', component: RecuperarComponent },
  { path: 'verificar', component: VerificarComponent},
  { path: 'electro', component: ElectroComponent },
  { path: 'resumenHumedad', component: HumedadResumenComponent},
];

@NgModule({
  declarations: [
    // colocar los componentes a utilizar para poder invocarlos
    AppComponent,
    GraficosComponent,
    NavbarComponent,
    NotificacionesComponent,
    ResumenComponent,
    InicioComponent,
    FooterComponent,
    ListaComponent,
    LogeoComponent,
    RegistroComponent,
    RecuperarComponent,
    ElectroComponent,
    MedidorHumedadComponent,
    TemperaturaComponent,
    HumedadComponent,
    HumedadResumenComponent,
    VerificarComponent,
    TemperaturaResumenComponent,
    ListaPipe,
    PagesPipe,
    EstadoElectroComponent
  ],
  imports: [
    BrowserModule,
    NgChartsModule,
    RouterModule.forRoot(router),
    // firebase
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FormsModule,
    ReactiveFormsModule,
    HighchartsChartModule,
    NgApexchartsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    
  ],
  // colocar los servicios propios
  providers: [
    FirestoreDatabaseService,
    DataGetService,
  ],
  bootstrap: [AppComponent],
  schemas: [
    // colocar para componentes html de terceros para evitar los errores a compilar o llevar a produccion
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
})
export class AppModule { }
