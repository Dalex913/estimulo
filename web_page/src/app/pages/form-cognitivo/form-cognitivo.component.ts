import { Component } from '@angular/core';
import { FormularioDataService } from '../../services/formulario-data.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-cognitivo',
  templateUrl: './form-cognitivo.component.html',
  styleUrl: './form-cognitivo.component.css'
})
export class FormCognitivoComponent {
  loading: boolean = false;
  edadOpciones = ['3 años', '4 años', '5 años', '6 años'];
  areasDesarrolloOpciones = ['Cognitiva'];
  interesesOpciones = ['Animales', 'Música', 'Arte', 'Deportes'];

  seleccion = {
    edad: '',
    area: 'Cognitiva', // Se establece como predeterminado
    padre: '',
    nino: '',
    interes: ''
  };

  constructor(
    private recomendacionesService: FormularioDataService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  mapearEdad(edad: string): string {
    switch (edad) {
      case '3 años':
        return '3';
      case '4 años':
        return '4';
      case '5 años':
        return '5';
      case '6 años':
        return '6';
      default:
        return '';
    }
  }

  mapearArea(area: string): string {
    switch (area) {
      case 'Cognitiva':
        return 'Cognitiva';
      case 'Motricidad':
        return 'Motricidad';
      case 'Sensorial':
        return 'Sensorial';
      default:
        return '';
    }
  }

  mapearInteres(interes: string): string {
    switch (interes) {
      case 'Animales':
        return 'Animales';
      case 'Música':
        return 'Música';
      case 'Arte':
        return 'Arte';
      case 'Deportes':
        return 'Deportes';
      default:
        return '';
    }
  }

  validarFormulario(): boolean {
    if (!this.seleccion.edad || !this.seleccion.padre || !this.seleccion.nino || !this.seleccion.interes) {
      localStorage.setItem('formularioCompleto', 'true');
      this.toastr.warning('Por favor complete todos los campos antes de enviar', 'Campos incompletos');
      return false;
    }
    localStorage.setItem('formularioCompleto', 'false');
    return true;
  }

  enviar() {
    if (!this.validarFormulario()) {
      return;
    }
    this.loading = true;
    const datosSeleccionados = {
      edad: this.mapearEdad(this.seleccion.edad),
      area: this.mapearArea(this.seleccion.area),
      padre: this.seleccion.padre,
      nino: this.seleccion.nino,
      interes: this.mapearInteres(this.seleccion.interes)
    };

    this.toastr.info("Generando recomendaciones", "Cargando");
    setTimeout(() => {
      this.recomendacionesService.enviarRecomendaciones(datosSeleccionados);
      this.router.navigate(['/resultados']);
      this.toastr.success("Recomendaciones generadas", "Éxito");
      this.loading = false;
    }, 3500);
  }
}