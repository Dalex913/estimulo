import { Component } from '@angular/core';
import { ForoService } from '../../services/foro.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-foro',
  templateUrl: './foro.component.html',
  styleUrl: './foro.component.css'
})
export class ForoComponent {
  preguntas: any[] = [];
  nuevaPregunta = { titulo: '', descripcion: '' };
  mostrarModal = false;
  preguntaSeleccionada: any = null;
  nuevaRespuesta = { autor: '', contenido: '' };
  isLoading: boolean = false;

  constructor(
    private foroService: ForoService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.cargarPreguntas();
  }

  onClick() {
    this.isLoading = true;
    this.cargarPreguntas();
  }
  cargarPreguntas() {
    this.foroService.obtenerPreguntas().subscribe(
      (data) => {
        this.preguntas = data;
      }
    );
  }

  agregarPregunta() {
    this.isLoading = true;
    setTimeout(() => {
      if (!this.nuevaPregunta.titulo || !this.nuevaPregunta.descripcion) {
        this.isLoading = false;
        this.toastr.warning("Por favor, completa los campos requeridos", "Atención")
        return;
      }
      this.foroService.agregarPregunta(this.nuevaPregunta).subscribe(
        () => {
          this.nuevaPregunta = { titulo: '', descripcion: '' };
          this.cargarPreguntas();
          this.toastr.success("Tema agregado", "Exito")
          this.isLoading = false;
        },
        (error) => {
          this.toastr.error("Ocurrio algo inesperado", "Error")
          this.isLoading = false;
        }
      );
    }, 2000);
  }

  abrirModal(pregunta: any) {
    this.preguntaSeleccionada = pregunta;
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.nuevaRespuesta = { autor: '', contenido: '' };
  }

  responder() {
    this.isLoading = true;
    setTimeout(() => {
      if (!this.preguntaSeleccionada || !this.nuevaRespuesta.autor || !this.nuevaRespuesta.contenido) {
        this.isLoading = false;
        this.toastr.warning("Por favor, completa los campos requeridos", "Atención")
        return;
      }
      this.foroService.responderPregunta(this.preguntaSeleccionada._id, this.nuevaRespuesta).subscribe(
        () => {
          this.preguntaSeleccionada.respuestas.push(this.nuevaRespuesta);
          this.cerrarModal();
          this.toastr.success("Respuesta agregada", "Exito")
          this.isLoading = false;
        },
        (error) => {
          this.toastr.error("Ocurrio algo inesperado", "Error")
          this.isLoading = false;
        }
      );
    }, 2000);
  }
}