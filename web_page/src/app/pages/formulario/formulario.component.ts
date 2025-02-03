// formulario.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent {

  formData = {
    edad: 1,
    intereses: '',
    areasDesarrollo: [] as string[],
    sensibilidades: ''
  };
  esFormularioValido(): boolean {
    return (
      this.formData.edad > 0 &&
      this.formData.intereses.trim() !== '' &&
      this.formData.areasDesarrollo.length > 0 &&
      this.formData.sensibilidades.trim() !== ''
    );
  }

  
  areasDesarrolloOpciones = ['Motricidad gruesa', 'Motricidad fina', 'Lenguaje', 'Cognitivo', 'Socioemocional'];
  sensibilidadesOpciones = ['Sonidos fuertes', 'Luz intensa', 'Ambientes concurridos', 'Texturas específicas'];
  interesesOpciones = ['Animales', 'Música', 'Arte', 'Deportes', 'Tecnología'];

  constructor(private router: Router) { }

  enviarFormulario() {
    const recomendaciones = this.generarRecomendaciones(this.formData);
    const juegosRecomendados = this.generarJuegos(this.formData);

    console.log('Recomendaciones:', recomendaciones);
    console.log('Juegos Recomendados:', juegosRecomendados);
    const state = { recomendaciones, juegosRecomendados };
    this.router.navigate(['/resultados'], { state });
  }


  generarRecomendaciones(formData: any): string[] {
    const recomendaciones: string[] = [];
    const edad = Number(formData.edad);

    if (edad <= 3) {
      recomendaciones.push('🌈 Enfoque en actividades de motricidad gruesa, como gatear o caminar.');
    } else if (edad > 3 && edad <= 6) {
      recomendaciones.push('📚 Fomentar el desarrollo del lenguaje con juegos interactivos.');
    }

    if (formData.areasDesarrollo.includes('Motricidad gruesa')) {
      recomendaciones.push('🏃‍♂️ Incluir actividades de movimiento, como bailar o correr.');
    }
    if (formData.areasDesarrollo.includes('Lenguaje')) {
      recomendaciones.push('📖 Leer cuentos e incentivar el uso de frases completas.');
    }
    if (formData.sensibilidades.includes('Sonidos fuertes')) {
      recomendaciones.push('🔇 Evitar ambientes ruidosos y crear un entorno tranquilo.');
    }
    if (formData.sensibilidades.includes('Luz intensa')) {
      recomendaciones.push('💡 Asegurar espacios con iluminación tenue y regulable.');
    }

    if (formData.intereses.includes('Animales')) {
      recomendaciones.push('🐶 Incluir actividades con animales de peluche o videos educativos.');
    }
    if (formData.intereses.includes('Música')) {
      recomendaciones.push('🎵 Fomentar el uso de instrumentos musicales sencillos.');
    }

    return recomendaciones;
  }

  generarJuegos(formData: any): any[] {
    const juegos = [];

    if (formData.areasDesarrollo.includes('Motricidad gruesa')) {
      juegos.push({ nombre: '🐒 Juego de saltos', url: 'https://example.com/saltos' });
    }
    if (formData.intereses.includes('Animales')) {
      juegos.push({ nombre: '🦁 Explorador de la jungla', url: 'https://example.com/jungla' });
    }
    if (formData.intereses.includes('Música')) {
      juegos.push({ nombre: '🎸 Ritmo y melodía', url: 'https://example.com/musica' });
    }

    return juegos;
  }

  aumentarEdad() {
    if (this.formData.edad < 18) {
      this.formData.edad++;
    }
  }

  disminuirEdad() {
    if (this.formData.edad > 1) {
      this.formData.edad--;
    }
  }

  volver() {
    this.router.navigate(['/']);
  }
}
