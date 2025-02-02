import { Component } from '@angular/core';
import { ForoService } from '../../services/foro.service';

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
  nuevaRespuesta = { autor: '', contenido: '', icono: '' };

  // Lista de iconos como URLs
  listaIconos: string[] = [
    'assets/icons/icon1.jpg', 'assets/icons/icon2.jpg', 'assets/icons/icon3.jpg',
    'assets/icons/icon4.jpg', 'assets/icons/icon5.jpg', 'assets/icons/icon6.jpg',
    'assets/icons/icon7.jpg', 'assets/icons/icon8.jpg', 'assets/icons/icon9.jpg', 'assets/icons/icon10.jpg'
  ];

  constructor(private foroService: ForoService) {}

  ngOnInit() {
    this.cargarPreguntas();
  }

  cargarPreguntas() {
    this.foroService.obtenerPreguntas().subscribe(
      (data) => {
        this.preguntas = data;
      },
      (error) => {
        console.error('Error al cargar preguntas:', error);
      }
    );
  }

  agregarPregunta() {
    if (!this.nuevaPregunta.titulo || !this.nuevaPregunta.descripcion) {
      alert('Por favor, complete el título y la descripción.');
      return;
    }

    this.foroService.agregarPregunta(this.nuevaPregunta).subscribe(
      () => {
        this.nuevaPregunta = { titulo: '', descripcion: '' };
        this.cargarPreguntas(); // Recargar las preguntas
      },
      (error) => {
        console.error('Error al agregar pregunta:', error);
      }
    );
  }

  abrirModal(pregunta: any) {
    this.preguntaSeleccionada = pregunta;
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.nuevaRespuesta = { autor: '', contenido: '', icono: '' }; // Limpiar icono
  }

  responder() {
    if (!this.preguntaSeleccionada || !this.nuevaRespuesta.autor || !this.nuevaRespuesta.contenido) {
      alert('Por favor, complete su respuesta.');
      return;
    }

    // Si no se ha seleccionado un icono, asignar uno por defecto
    if (!this.nuevaRespuesta.icono) {
      this.nuevaRespuesta.icono = 'assets/icons/default-avatar.jpg';
    }

    this.foroService.responderPregunta(this.preguntaSeleccionada.id, this.nuevaRespuesta).subscribe(
      () => {
        // Se agrega la respuesta a la pregunta seleccionada
        this.preguntaSeleccionada.respuestas.push(this.nuevaRespuesta);
        this.cerrarModal();
      },
      (error) => {
        console.error('Error al responder pregunta:', error);
      }
    );
  }

  seleccionarIcono(icono: string) {
    // Asignar el icono seleccionado
    this.nuevaRespuesta.icono = icono;
  }
}