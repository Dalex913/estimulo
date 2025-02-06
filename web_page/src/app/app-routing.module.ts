import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
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

const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'inicio', component: InicioComponent },
  //{ path: 'nosotros', component: NosotrosComponent },
  //{ path: 'contacto', component: ContactoComponent },
  { path: 'sensoriales', component: SensorialesComponent},
  { path: 'motricidad', component: MotricidadComponent},
  { path: 'cognitivo', component: CognitivoComponent},
  { path: 'relajacion', component: RelajacionComponent},
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
