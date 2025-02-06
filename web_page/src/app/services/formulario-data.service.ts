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
    const juegos = this.obtenerJuegosPorInteres(datos.area);
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
          'Patinar ⛸️', 'Montar bicicleta 🚴‍♀️', 'Jugar a la cuerda 🪢',
          'Correr en diferentes estilos 🏃‍♂️', 'Jugar al fútbol ⚽', 'Practicar escalada 🧗‍♂️', 'Jugar a la soga 🪢'
        ],
        '6': [
          'Patinar ⛸️', 'Montar bicicleta 🚴‍♀️', 'Jugar a la cuerda 🪢',
          'Jugar al fútbol ⚽', 'Practicar escalada 🧗‍♂️', 'Jugar al baloncesto 🏀', 'Correr carreras de velocidad 🏃‍♂️'
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
          'Recortar detalles pequeños ✂️', 'Dibujar con lápices de colores ✏️', 'Escribir con pluma ✍️',
          'Armar figuras de papel 📄', 'Construir maquetas 🏗️', 'Tejer con hilos 🧶', 'Hacer trabajos manuales complejos 🎨'
        ],
        '6': [
          'Modelar figuras en arcilla 🎭', 'Crear diseños con hilos 🧵', 'Coser figuras en fieltro 🪡',
          'Recortar figuras con precisión ✂️', 'Pintar con técnicas avanzadas 🎨', 'Construir estructuras con madera 🏗️'
        ]
      },
      'Cognitiva': {
        '3': [
          'Clasificar objetos por colores 🎨', 'Contar hasta 10 🔢', 'Jugar a encontrar la diferencia 🔍',
          'Ordenar objetos de mayor a menor 📏', 'Contar historias simples 📖', 'Agrupar objetos según su categoría 🗃️', 'Identificar figuras geométricas 🔺🔵'
        ],
        '4': [
          'Resolver puzzles sencillos 🧩', 'Jugar a los laberintos 🏰', 'Contar historias con más detalles 📖',
          'Jugar con tarjetas de memoria 🧠', 'Dibujar mapas básicos 🗺️', 'Resolver acertijos simples 🔑', 'Identificar letras y palabras 🅰️'
        ],
        '5': [
          'Resolver rompecabezas complejos 🧩', 'Jugar a los acertijos matemáticos 🧮', 'Desarrollar habilidades de lógica 🧠',
          'Crear historias detalladas 📝', 'Jugar con números y estadísticas 📊', 'Estudiar mapas y aprender geografía 🌍', 'Investigar temas de interés 🔍'
        ],
        '6': [
          'Resolver problemas matemáticos avanzados 🧮', 'Diseñar experimentos científicos 🔬', 'Leer libros de ciencia 📚',
          'Crear historietas y cuentos gráficos 📝', 'Explorar conceptos de programación 💻', 'Resolver juegos de estrategia ♟️'
        ]
      }
    };

    return actividadesPorEdad[area]?.[edad] || [];
  }

  private obtenerHoraRecomendada(edad: string, area: string): string {
    const horasPorEdadYArea: Record<string, { [key: string]: string }> = {
      'Motricidad': {
        '3': 'Mañana, después del desayuno, cuando hay más energía 🕘',
        '4': 'Mañana, después del desayuno, ideal para movimiento 🕘',
        '5': 'Media tarde, para liberar energía antes de la cena 🕓',
        '6': 'Final de la tarde, ideal para actividades intensas 🕔'
      },
      'Sensorial': {
        '3': 'Mañana, cuando los sentidos están más activos 🕙',
        '4': 'Media mañana, en un ambiente tranquilo 🕚',
        '5': 'Tarde, con buena iluminación y sin distracciones 🕒',
        '6': 'Final de la tarde, para relajarse antes de dormir 🕕'
      },
      'Cognitiva': {
        '3': 'Mañana, cuando la mente está más receptiva 🕘',
        '4': 'Mediodía, después del almuerzo, en un ambiente tranquilo 🕛',
        '5': 'Tarde, para reforzar lo aprendido en el día 🕓',
        '6': 'Noche, como una rutina antes de dormir 🕘'
      }
    };

    return horasPorEdadYArea[area][edad] || 'A cualquier hora del día';
}


private obtenerBeneficios(area: string): string[] {
  const beneficiosPorArea: Record<string, string[]> = {
    'Motricidad': [
      '💪 **Desarrollo físico:** Mejora la coordinación, el equilibrio y la fuerza muscular.',
      '🏃‍♂️ **Resistencia y salud:** Favorece la salud cardiovascular y el desarrollo óseo.',
      '🤹 **Agilidad y precisión:** Mejora la velocidad de reacción y el control corporal.',
      '🤝 **Trabajo en equipo:** Fomenta la socialización y la cooperación en actividades grupales.',
      '💥 **Seguridad y confianza:** Aumenta la autoestima al superar desafíos físicos.'
    ],
    'Sensorial': [
      '✋ **Desarrollo táctil:** Mejora la percepción de diferentes texturas y materiales.',
      '👂 **Agudeza sensorial:** Potencia la discriminación de sonidos, colores y olores.',
      '🧠 **Concentración y paciencia:** Estimula la atención plena en actividades detalladas.',
      '🎨 **Creatividad e imaginación:** Promueve la expresión artística y la exploración sensorial.',
      '🧩 **Autonomía personal:** Contribuye a la independencia en tareas cotidianas.'
    ],
    'Cognitiva': [
      '🧠 **Pensamiento lógico:** Estimula el análisis, la comparación y la resolución de problemas.',
      '🔍 **Habilidades de memoria:** Refuerza la capacidad de retener y recordar información.',
      '📖 **Comprensión y lenguaje:** Potencia la comunicación verbal y la lectura.',
      '🎯 **Toma de decisiones:** Favorece la planificación y la evaluación de opciones.',
      '🤖 **Innovación y creatividad:** Impulsa la imaginación para desarrollar nuevas ideas.'
    ]
  };

  return beneficiosPorArea[area] || ['🌟 Beneficios generales de desarrollo personal y social.'];
}


  private obtenerJuegosPorInteres(area: string): string[] {
    const juegos: Record<string, string[]> = {
      'Motricidad': [
        'https://www.youtube.com/watch?v=fo5cP3SXqM8&ab_channel=Soydocente%2Cmaestroyprofesor',
        'https://www.youtube.com/watch?v=nMGMjR784ag',
        'https://www.youtube.com/watch?v=LNzrq9pHI0w&ab_channel=PlayKidsEspa%C3%B1o',
        'https://www.youtube.com/watch?v=trvcgXYTUbU&ab_channel=ManualidadesPlay'

      ],
      'Sensorial': [
        'https://v4.brainhq.com/?signup=success&fr=y#subscribe/browse',
        'https://www.youtube.com/watch?v=xPxHz1gL76I&ab_channel=InfantilAlbanta',
        'https://v4.brainhq.com/?signup=success&fr=y#subscribe/browse',
        'https://www.cokitos.com/decipher-descifrar-un-mensaje-en-clave/play/'
      ],
      'Cognitiva': [
        'https://www.abcya.com/games/alphabet',
        'https://www.abcya.com/games/alphabet_puzzle',
        'https://www.youtube.com/watch?v=nXvuji6-mJc&ab_channel=CasitaPreescolar'

      ],
      'Relajación': [
        'https://www.youtube.com/watch?v=o9uaRmHiAwc&ab_channel=SmileandLearn-Espa%C3%B1ol',
        'https://www.youtube.com/watch?v=t8748OWc1nQ&ab_channel=SmileandLearn-Espa%C3%B1ol'
      ]
      
    };

    return juegos[area] || [];
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
