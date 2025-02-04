import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormularioDataService } from '../../services/formulario-data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent {
  loading: boolean = false;
  edadOpciones = ['3-5 años', '6-8 años', '9-12 años'];
  areasDesarrolloOpciones = ['Motricidad gruesa', 'Motricidad fina', 'Lenguaje', 'Cognitivo', 'Socioemocional'];
  sensibilidadesOpciones = ['Sonidos fuertes', 'Luz intensa', 'Ambientes concurridos', 'Texturas específicas'];
  interesesOpciones = ['Animales', 'Música', 'Arte', 'Deportes', 'Tecnología'];

  seleccion = {
    edad: '',
    area: '',
    sensibilidad: '',
    interes: ''
  };

  constructor(
    private recomendacionesService: FormularioDataService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  // Función para mapear el valor de edad
  mapearEdad(edad: string): string {
    switch (edad) {
      case '3-5 años':
        return '3-5';
      case '6-8 años':
        return '6-8';
      case '9-12 años':
        return '9-12';
      default:
        return '';
    }
  }

  // Función para mapear el área de desarrollo
  mapearArea(area: string): string {
    switch (area) {
      case 'Motricidad gruesa':
        return 'Motricidad gruesa';
      case 'Motricidad fina':
        return 'Motricidad fina';
      case 'Lenguaje':
        return 'Lenguaje';
      case 'Cognitivo':
        return 'Cognitivo';
      case 'Socioemocional':
        return 'Socioemocional';
      default:
        return '';
    }
  }

  // Función para mapear el interés
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
      case 'Tecnología':
        return 'Tecnología';
      default:
        return '';
    }
  }

  validarFormulario(): boolean {
    if (!this.seleccion.edad || !this.seleccion.area || !this.seleccion.sensibilidad || !this.seleccion.interes) {
      localStorage.setItem('formularioCompleto', 'true');
      this.toastr.warning('Por favor complete todas las opciones antes de enviar', 'Campos incompletos');
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
      sensibilidad: this.seleccion.sensibilidad, // Si deseas procesar las sensibilidades, agrega mapeo aquí.
      interes: this.mapearInteres(this.seleccion.interes)
    };
    this.toastr.info("Generando recomendaciones", "Cargando");
    setTimeout(() => {
      this.recomendacionesService.enviarRecomendaciones(datosSeleccionados);
      this.router.navigate(['/resultados']);
      this.toastr.success("Recomendaciones generadoas", "Exito");
      this.loading = false;
    }, 3500);
  }

  onSensibilidadChange() {
    if (this.seleccion.sensibilidad) {
      // Si se selecciona una sensibilidad, deseleccionamos el interés
      this.seleccion.interes = '';
    }
  }

  // Método que se llama cuando cambia el interés
  onInteresChange() {
    if (this.seleccion.interes) {
      // Si se selecciona un interés, deseleccionamos la sensibilidad
      this.seleccion.sensibilidad = '';
    }
  }
}
