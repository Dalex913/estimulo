import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { FormularioComponent } from './pages/formulario/formulario.component';
import { ForoComponent } from './pages/foro/foro.component';
import { PoliticasComponent } from './pages/politicas/politicas.component';
import { ResultadosComponent } from './pages/resultados/resultados.component';
import { ActividadesComponent } from './pages/actividades/actividades.component';
import { formularioGuradGuard } from './guards/formulario-gurad.guard';
import { SensorialesComponent } from './pages/sensoriales/sensoriales.component';
import { MotricidadComponent } from './pages/motricidad/motricidad.component';
import { CognitivoComponent } from './pages/cognitivo/cognitivo.component';
import { RelajacionComponent } from './pages/relajacion/relajacion.component';
import { FormCognitivoComponent } from './pages/form-cognitivo/form-cognitivo.component';
import { FormSensorialComponent } from './pages/form-sensorial/form-sensorial.component';
import { FormMotricidadComponent } from './pages/form-motricidad/form-motricidad.component';
import { FormRelajacionComponent } from './pages/form-relajacion/form-relajacion.component';

const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'inicio', component: InicioComponent },
  //{ path: 'nosotros', component: NosotrosComponent },
  //{ path: 'contacto', component: ContactoComponent },
  { path: 'sensoriales', component: SensorialesComponent},
  { path: 'form-sensorial', component: FormSensorialComponent},
  { path: 'motricidad', component: MotricidadComponent},
  { path: 'form-motricidad', component: FormMotricidadComponent},
  { path: 'cognitivo', component: CognitivoComponent},
  { path: 'form-cognitivo', component: FormCognitivoComponent},
  { path: 'relajacion', component: RelajacionComponent},
  { path: 'form-relajacion', component: FormRelajacionComponent},
  { path: 'formulario', component: FormularioComponent },
  {
    path: 'resultados',component: ResultadosComponent,
    canActivate: [formularioGuradGuard]
  },
  { path: 'foro', component: ForoComponent },
  { path: 'politicas', component: PoliticasComponent },
  { path: 'resultados', component: ResultadosComponent },
  { path: 'actividades', component: ActividadesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
