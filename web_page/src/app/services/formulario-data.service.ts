import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormularioDataService {

  private recomendacionesSubject = new BehaviorSubject<any>(null);
  recomendaciones$ = this.recomendacionesSubject.asObservable();

  enviarRecomendaciones(datos: { edad: string; area: string; interes: string }) {
    const recomendaciones = this.generarRecomendaciones(datos);
    this.recomendacionesSubject.next(recomendaciones);
  }

  private generarRecomendaciones(datos: { edad: string; area: string; interes: string; padre?: string; nino?: string }) {
    const actividades = this.obtenerActividadesPorEdadYArea(datos.edad, datos.area);
    const juegos = this.obtenerJuegosPorInteres(datos.interes);
    const instrumentos = this.obtenerInstrumentosPorArea(datos.area);
    const horaRecomendada = this.obtenerHoraRecomendada(datos.edad, datos.area);
    const beneficios = this.obtenerBeneficios(datos.area);

    return {
      actividades,
      juegos,
      instrumentos,
      horaRecomendada,
      beneficios,
      padre: datos.padre,
      nino: datos.nino
    };
  }

  // Devuelve actividades basadas en la edad y el área
  private obtenerActividadesPorEdadYArea(edad: string, area: string): string[] {
    const actividadesPorEdad: Record<string, { [key: string]: string[] }> = {
      'Motricidad': {
        '3': [
          'Saltar la cuerda 🪢', 'Carrera de obstáculos 🏃‍♀️🏃‍♂️', 'Bailar con música 💃🕺',
          'Caminar sobre una línea recta ➖', 'Jugar al escondite 🤫', 'Lanzar y atrapar una pelota 🎾', 'Brincar con los pies juntos 🦵'
        ],
        '4': [
          'Subir y bajar escaleras 🪜', 'Jugar a la pelota 🏐', 'Jugar a los relevos 🏃‍♀️🏃‍♂️',
          'Montar en bicicleta 🚴‍♀️', 'Hacer carreras de sacos 🏃‍♂️🛍️', 'Saltar en el trampolín 🤸‍♀️', 'Jugar al tiro al blanco 🎯'
        ],
        '5': [
          'Patinar ⛸️', 'Montar bicicleta 🚴‍♀️🚴‍♂️', 'Hacer carreras de sacos 🏃‍♂️🛍️',
          'Jugar a la cuerda 🪢', 'Correr en diferentes estilos 🏃‍♂️', 'Jugar al fútbol ⚽', 'Practicar escalada 🧗‍♂️'
        ],
        '6': [
          'Patinar ⛸️', 'Montar bicicleta 🚴‍♀️🚴‍♂️', 'Hacer carreras de sacos 🏃‍♂️🛍️',
          'Jugar a la cuerda 🪢', 'Correr en diferentes estilos 🏃‍♂️', 'Jugar al fútbol ⚽', 'Practicar escalada 🧗‍♂️'
        ]
      },
      'Sensorial': {
        '3': [
          'Enhebrar cuentas 🧵', 'Recortar figuras ✂️', 'Pintar con pinceles finos 🎨',
          'Jugar con plastilina 🍡', 'Hacer pulseras de cuentas 💍', 'Dibujar formas simples ✏️', 'Construir con bloques pequeños 🧩'
        ],
        '4': [
          'Hacer pulseras 💍', 'Escribir con tiza 📝', 'Doblar papel (origami) 🦢',
          'Armar rompecabezas 🧩', 'Tejer con hilos 🧶', 'Coser con aguja sin punta 🪡', 'Tocar instrumentos pequeños 🎶'
        ],
        '5': [
          'Armar figuras de papel 📄', 'Tejer con hilos 🧶', 'Construir maquetas 🏗️',
          'Recortar detalles pequeños ✂️', 'Dibujar con lápices de colores ✏️', 'Escribir con pluma ✍️', 'Hacer trabajos manuales complejos 🎨'
        ],
        '6': [
          'Armar figuras de papel 📄', 'Tejer con hilos 🧶', 'Construir maquetas 🏗️',
          'Recortar detalles pequeños ✂️', 'Dibujar con lápices de colores ✏️', 'Escribir con pluma ✍️', 'Hacer trabajos manuales complejos 🎨'
        ]
      },
      'Cognitiva': {
        '3': [
          'Clasificar objetos por colores 🎨', 'Contar hasta 10 ✖️', 'Jugar a encontrar la diferencia 🔍',
          'Ordenar objetos de mayor a menor 📏', 'Contar historias de manera simple 📖', 'Recoger objetos de acuerdo a categorías 🗃️', 'Jugar con números y formas geométricas 🔢'
        ],
        '4': [
          'Resolver puzzles 🧩', 'Jugar a los laberintos 🏰', 'Contar historias complejas 📖',
          'Jugar con tarjetas de memoria 🧠', 'Dibujar mapas sencillos 🗺️', 'Resolver acertijos lógicos 🔑', 'Reconocer letras y palabras 🅰️'
        ],
        '5': [
          'Resolver puzzles 🧩', 'Jugar a los laberintos 🏰', 'Contar historias complejas 📖',
          'Jugar con tarjetas de memoria 🧠', 'Dibujar mapas sencillos 🗺️', 'Resolver acertijos lógicos 🔑', 'Reconocer letras y palabras 🅰️'
        ],
        '6': [
          'Resolver rompecabezas complejos 🧩', 'Jugar a los acertijos matemáticos 🧮', 'Desarrollar habilidades de lógica 🧠',
          'Crear historias con detalles 📝', 'Jugar con números y estadísticas 📊', 'Estudiar mapas y aprender geografía 🌍', 'Investigar temas de interés 🔍'
        ]
      }
    };

    return actividadesPorEdad[area][edad] || [];
  }

  private obtenerHoraRecomendada(edad: string, area: string): string {
    const horasPorEdadYArea: Record<string, { [key: string]: string }> = {
      'Motricidad': {
        '3': 'Por la mañana, después de un buen desayuno 🕒',
        '4': 'Por la mañana, después de un buen desayuno 🕒',
        '5': 'Por la tarde, antes de la merienda 🕓',
        '6': 'Al final de la tarde, para gastar energía 🕔'
      },
      'Sensorial': {
        '3': 'Por la mañana, después de un buen desayuno 🕒',
        '4': 'Por la mañana, después de un buen desayuno 🕒',
        '5': 'Por la tarde, antes de la merienda 🕓',
        '6': 'Al final de la tarde, para gastar energía 🕔'
      },
      'Cognitiva': {
        '3': 'Por la mañana, cuando están descansados 🕒',
        '4': 'Al mediodía, después del almuerzo 🕛',
        '5': 'Al mediodía, después del almuerzo 🕛',
        '6': 'Por la tarde, para reforzar aprendizajes 🕓'
      }
    };
    console.log(horasPorEdadYArea[area][edad])
    return horasPorEdadYArea[area][edad] || 'A cualquier hora del día';
  }

  private obtenerBeneficios(area: string): string[] {
    const beneficiosPorArea: Record<string, string[]> = {
      'Motricidad': [
        'Mejora la coordinación y el equilibrio 🤸‍♂️',
        'Fortalece los músculos y huesos 💪',
        'Fomenta el trabajo en equipo 🤝',
        'Aumenta la confianza en las habilidades físicas 💥',
        'Promueve la salud cardiovascular 🏃‍♀️🏃‍♂️'
      ],
      'Sensorial': [
        'Desarrolla la destreza manual ✋',
        'Fomenta la concentración y paciencia 🧠',
        'Estimula la creatividad 🎨',
        'Mejora la destreza visual y el control de los movimientos 👀',
        'Contribuye a la independencia en tareas cotidianas 🧩'
      ],
      'Cognitiva': [
        'Estimula el pensamiento lógico y crítico 🧠',
        'Fomenta la resolución de problemas 🔍',
        'Desarrolla habilidades de memoria y concentración 🧩',
        'Potencia la creatividad y la innovación 🎨',
        'Mejora la toma de decisiones y el análisis 🧠'
      ]
    };

    return beneficiosPorArea[area] || ['Beneficios generales de desarrollo'];
  }

  private obtenerJuegosPorInteres(interes: string): string[] {
    const juegos: Record<string, string[]> = {
      'Animales': [
        'https://www.juegosinfantiles.com/juegos-de-animales',
        'https://www.poki.com/es/juegos/animales',
        'https://www.minijuegos.com/juegos-de-animales',
        'https://www.juegoskids.com/juegos-de-animales',
        'https://www.coolmathgames.com/0-animals'
      ],
      'Música': [
        'https://www.pianu.com/',
        'https://www.classicsforkids.com/games.html',
        'https://www.musictechteacher.com/music_quizzes.htm',
        'https://www.sibelius.com/documents/education/musicalgames/',
        'https://www.virtualpiano.net/'
      ],
      'Arte': [
        'https://www.kidsart.com/',
        'https://www.artforkidshub.com/',
        'https://www.drawsofa.com/',
        'https://www.coolmathgames.com/0-art',
        'https://www.tate.org.uk/kids'
      ],
      'Deportes': [
        'https://www.juegosdeportes.com/',
        'https://www.minijuegos.com/juegos-de-deportes',
        'https://www.poki.com/es/juegos/deportes',
        'https://www.coolmathgames.com/0-sports',
        'https://www.fog.com/game/soccer'
      ]
    };

    return juegos[interes] || [];
  }


  // Devuelve instrumentos basados en el área
  private obtenerInstrumentosPorArea(area: string): { nombre: string, imagenUrl: string }[] {
    const instrumentosConImagen: Record<string, { nombre: string, imagenUrl: string }[]> = {
      'Motricidad': [
        { nombre: 'Pelota', imagenUrl: 'https://static.vecteezy.com/system/resources/thumbnails/011/421/474/small/soccer-ball-realistic-png.png' },
        { nombre: 'Soga', imagenUrl: 'https://cdn-icons-png.flaticon.com/512/8049/8049041.png' },
        { nombre: 'Aro', imagenUrl: 'https://png.pngtree.com/png-clipart/20230811/original/pngtree-a-simplistic-design-of-an-abstract-human-figure-with-hoop-vector-picture-image_10313934.png' },
        { nombre: 'Bicicleta', imagenUrl: 'https://cdn-icons-png.flaticon.com/512/2972/2972185.png' },
        { nombre: 'Escalera', imagenUrl: 'https://cdn-icons-png.freepik.com/512/9027/9027996.png' }
      ],
      'Sensorial': [
        { nombre: 'Tijeras', imagenUrl: 'https://images.emojiterra.com/google/noto-emoji/unicode-16.0/color/1024px/2702.png' },
        { nombre: 'Pinceles', imagenUrl: 'https://images.emojiterra.com/google/noto-emoji/unicode-16.0/color/1024px/1f58c.png' },
        { nombre: 'Piezas de rompecabezas', imagenUrl: 'https://cdn-icons-png.flaticon.com/512/2972/2972202.png' },
        { nombre: 'Hilos', imagenUrl: 'https://images.vexels.com/media/users/3/212381/isolated/lists/34bdef5b79859f2e4c5dea6c4a62a5c9-icono-plano-de-carretes-de-hilo-de-color.png' },
        { nombre: 'Lápiz', imagenUrl: 'https://cdn-icons-png.flaticon.com/512/1150/1150978.png' }
      ],
      'Cognitiva': [
        { nombre: 'Memoria', imagenUrl: 'https://cdn-icons-png.flaticon.com/512/5265/5265672.png' },
        { nombre: 'Juegos de lógica', imagenUrl: 'https://cdn-icons-png.flaticon.com/512/2241/2241398.png' },
        { nombre: 'Bloques de construcción', imagenUrl: 'https://images.vexels.com/media/users/3/189550/isolated/preview/5931dd33fd082c85db78e9ee017076a6-bloques-de-construcci-n-3d.png' },
        { nombre: 'Abaco', imagenUrl: 'https://cdn-icons-png.flaticon.com/512/1046/1046379.png' },
        { nombre: 'Rompecabezas', imagenUrl: 'https://cdn-icons-png.flaticon.com/512/786/786771.png' }
      ]
    };

    return instrumentosConImagen[area] || [];
  }
}
