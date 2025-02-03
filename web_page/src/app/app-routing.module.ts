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

const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'inicio', component: InicioComponent },
  { path: 'nosotros', component: NosotrosComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'formulario', component: FormularioComponent },
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
