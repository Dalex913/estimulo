import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { FormularioComponent } from './pages/formulario/formulario.component';
import { ForoComponent } from './pages/foro/foro.component';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { PoliticasComponent } from './pages/politicas/politicas.component';
import { LoadingComponent } from './components/loading/loading.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ResultadosComponent } from './pages/resultados/resultados.component';
import { ActividadesComponent } from './pages/actividades/actividades.component';
import { SensorialesComponent } from './pages/sensoriales/sensoriales.component';
import { MotricidadComponent } from './pages/motricidad/motricidad.component';
import { CognitivoComponent } from './pages/cognitivo/cognitivo.component';
import { RelajacionComponent } from './pages/relajacion/relajacion.component';
import { FormCognitivoComponent } from './pages/form-cognitivo/form-cognitivo.component';
import { FormSensorialComponent } from './pages/form-sensorial/form-sensorial.component';
import { FormMotricidadComponent } from './pages/form-motricidad/form-motricidad.component';
import { FormRelajacionComponent } from './pages/form-relajacion/form-relajacion.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    InicioComponent,
    NosotrosComponent,
    ContactoComponent,
    FormularioComponent,
    ForoComponent,
    PoliticasComponent,
    LoadingComponent,
    ResultadosComponent,
    ActividadesComponent,
    SensorialesComponent,
    MotricidadComponent,
    CognitivoComponent,
    RelajacionComponent,
    FormCognitivoComponent,
    FormSensorialComponent,
    FormMotricidadComponent,
    FormRelajacionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    provideClientHydration(), provideHttpClient(withFetch(), )
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
