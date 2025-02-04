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

  private generarRecomendaciones(datos: { edad: string; area: string; interes: string }) {
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
      beneficios
    };
  }

  // Devuelve actividades basadas en la edad y el área
  private obtenerActividadesPorEdadYArea(edad: string, area: string): string[] {
    const actividadesPorEdad: Record<string, { [key: string]: string[] }> = {
      'Motricidad gruesa': {
        '3-5': [
          'Saltar la cuerda 🪢', 'Carrera de obstáculos 🏃‍♀️🏃‍♂️', 'Bailar con música 💃🕺',
          'Caminar sobre una línea recta ➖', 'Jugar al escondite 🤫', 'Lanzar y atrapar una pelota 🎾', 'Brincar con los pies juntos 🦵'
        ],
        '6-8': [
          'Subir y bajar escaleras 🪜', 'Jugar a la pelota 🏐', 'Jugar a los relevos 🏃‍♀️🏃‍♂️', 
          'Montar en bicicleta 🚴‍♀️', 'Hacer carreras de sacos 🏃‍♂️🛍️', 'Saltar en el trampolín 🤸‍♀️', 'Jugar al tiro al blanco 🎯'
        ],
        '9-12': [
          'Patinar ⛸️', 'Montar bicicleta 🚴‍♀️🚴‍♂️', 'Hacer carreras de sacos 🏃‍♂️🛍️',
          'Jugar a la cuerda 🪢', 'Correr en diferentes estilos 🏃‍♂️', 'Jugar al fútbol ⚽', 'Practicar escalada 🧗‍♂️'
        ]
      },
      'Motricidad fina': {
        '3-5': [
          'Enhebrar cuentas 🧵', 'Recortar figuras ✂️', 'Pintar con pinceles finos 🎨',
          'Jugar con plastilina 🍡', 'Hacer pulseras de cuentas 💍', 'Dibujar formas simples ✏️', 'Construir con bloques pequeños 🧩'
        ],
        '6-8': [
          'Hacer pulseras 💍', 'Escribir con tiza 📝', 'Doblar papel (origami) 🦢', 
          'Armar rompecabezas 🧩', 'Tejer con hilos 🧶', 'Coser con aguja sin punta 🪡', 'Tocar instrumentos pequeños 🎶'
        ],
        '9-12': [
          'Armar figuras de papel 📄', 'Tejer con hilos 🧶', 'Construir maquetas 🏗️',
          'Recortar detalles pequeños ✂️', 'Dibujar con lápices de colores ✏️', 'Escribir con pluma ✍️', 'Hacer trabajos manuales complejos 🎨'
        ]
      },
      'Lenguaje': {
        '3-5': [
          'Leer cuentos en voz alta 📚', 'Juego de rimas 🎤', 'Adivinanzas ❓',
          'Cantar canciones infantiles 🎶', 'Hacer preguntas simples 🗣️', 'Repetir palabras nuevas 🧠', 'Jugar a las palabras encadenadas 🔗'
        ],
        '6-8': [
          'Conversaciones guiadas 🗣️', 'Recitar poemas 📝', 'Jugar a formar frases 🧠',
          'Leer historias cortas 📖', 'Contar chistes 🧸', 'Adivinar palabras a partir de definiciones 🎙️', 'Jugar a las adivinanzas 🎯'
        ],
        '9-12': [
          'Jugar a las charadas 🤷‍♀️🤷‍♂️', 'Leer en voz alta con énfasis 🗣️', 'Describir imágenes 🖼️', 
          'Narrar historias largas 📚', 'Realizar debates 🗣️', 'Explicar situaciones con detalles ✍️', 'Formar palabras con letras desordenadas 🔠'
        ]
      },
      'Cognitivo': {
        '3-5': [
          'Clasificar objetos por colores 🎨', 'Contar hasta 10 ✖️', 'Jugar a encontrar la diferencia 🔍', 
          'Ordenar objetos de mayor a menor 📏', 'Contar historias de manera simple 📖', 'Recoger objetos de acuerdo a categorías 🗃️', 'Jugar con números y formas geométricas 🔢'
        ],
        '6-8': [
          'Resolver puzzles 🧩', 'Jugar a los laberintos 🏰', 'Contar historias complejas 📖', 
          'Jugar con tarjetas de memoria 🧠', 'Dibujar mapas sencillos 🗺️', 'Resolver acertijos lógicos 🔑', 'Reconocer letras y palabras 🅰️'
        ],
        '9-12': [
          'Resolver rompecabezas complejos 🧩', 'Jugar a los acertijos matemáticos 🧮', 'Desarrollar habilidades de lógica 🧠', 
          'Crear historias con detalles 📝', 'Jugar con números y estadísticas 📊', 'Estudiar mapas y aprender geografía 🌍', 'Investigar temas de interés 🔍'
        ]
      },
      'Socioemocional': {
        '3-5': [
          'Identificar emociones básicas 🥰', 'Jugar en grupo 👥', 'Practicar compartir juguetes 🧸',
          'Practicar turnos 🕰️', 'Mostrar afecto a otros 💕', 'Jugar a roles sociales 👨‍👩‍👧‍👦', 'Hablar sobre cómo se sienten 😌'
        ],
        '6-8': [
          'Reconocer emociones más complejas 😤😭', 'Conversaciones sobre la amistad 👬', 'Jugar a roles de adultos 👔', 
          'Practicar la empatía 🙏', 'Contar historias que expresen emociones 😢', 'Ayudar a otros a resolver problemas 👫', 'Reaccionar ante situaciones sociales 🎭'
        ],
        '9-12': [
          'Desarrollar habilidades de resolución de conflictos ✋', 'Practicar liderazgo y trabajo en equipo 🏅', 'Discutir temas sociales importantes 💬',
          'Establecer metas personales 🎯', 'Fomentar el respeto por las diferencias culturales 🌏', 'Practicar habilidades de comunicación efectiva 🗣️', 'Hacer proyectos grupales 📐'
        ]
      }
    };
  
    return actividadesPorEdad[area][edad] || [];
  }

  private obtenerHoraRecomendada(edad: string, area: string): string {
    const horasPorEdadYArea: Record<string, { [key: string]: string }> = {
      'Motricidad gruesa': {
        '3-5': 'Por la mañana, después de un buen desayuno 🕒',
        '6-8': 'Por la tarde, antes de la merienda 🕓',
        '9-12': 'Al final de la tarde, para gastar energía 🕔'
      },
      'Motricidad fina': {
        '3-5': 'Por la mañana, después de un descanso 🕒',
        '6-8': 'Por la tarde, después de tareas 🕓',
        '9-12': 'Durante la mañana, cuando están frescos 🕗'
      },
      'Lenguaje': {
        '3-5': 'Durante el día, en cualquier momento 🕑',
        '6-8': 'Por la mañana, ideal para la concentración 🕙',
        '9-12': 'Al final de la tarde, cuando el niño está más relajado 🕒'
      },
      'Cognitivo': {
        '3-5': 'Por la mañana, cuando están descansados 🕒',
        '6-8': 'Al mediodía, después del almuerzo 🕛',
        '9-12': 'Por la tarde, para reforzar aprendizajes 🕓'
      },
      'Socioemocional': {
        '3-5': 'Durante la tarde, para interactuar con otros 🕒',
        '6-8': 'Por la mañana, al comenzar el día 🕙',
        '9-12': 'Por la tarde, cuando se siente más cómodo 🕓'
      }
    };
   console.log(horasPorEdadYArea[area][edad])
    return horasPorEdadYArea[area][edad] || 'A cualquier hora del día';
  }
  
  private obtenerBeneficios(area: string): string[] {
    const beneficiosPorArea: Record<string, string[]> = {
      'Motricidad gruesa': [
        'Mejora la coordinación y el equilibrio 🤸‍♂️',
        'Fortalece los músculos y huesos 💪',
        'Fomenta el trabajo en equipo 🤝',
        'Aumenta la confianza en las habilidades físicas 💥',
        'Promueve la salud cardiovascular 🏃‍♀️🏃‍♂️'
      ],
      'Motricidad fina': [
        'Desarrolla la destreza manual ✋',
        'Fomenta la concentración y paciencia 🧠',
        'Estimula la creatividad 🎨',
        'Mejora la destreza visual y el control de los movimientos 👀',
        'Contribuye a la independencia en tareas cotidianas 🧩'
      ],
      'Lenguaje': [
        'Desarrolla habilidades comunicativas 🗣️',
        'Mejora la comprensión y expresión verbal 📝',
        'Fortalece la relación social 📚',
        'Incrementa la capacidad de atención y escucha 👂',
        'Fomenta el desarrollo de vocabulario y gramática 🗨️'
      ],
      'Cognitivo': [
        'Estimula el pensamiento lógico y crítico 🧠',
        'Fomenta la resolución de problemas 🔍',
        'Desarrolla habilidades de memoria y concentración 🧩',
        'Potencia la creatividad y la innovación 🎨',
        'Mejora la toma de decisiones y el análisis 🧠'
      ],
      'Socioemocional': [
        'Fomenta la empatía y la comprensión de los demás 👫',
        'Desarrolla la capacidad para manejar emociones 🧘‍♂️',
        'Fortalece las relaciones interpersonales 🤝',
        'Ayuda a mejorar la autoestima y autoconfianza 💪',
        'Fomenta la resolución pacífica de conflictos 🕊️'
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
      ],
      'Tecnología': [
        'https://www.code.org/',
        'https://www.scratch.mit.edu',
        'https://www.kodable.com/',
        'https://www.tynker.com/',
        'https://www.edutopia.org/technology-integration'
      ]
    };
  
    return juegos[interes] || [];
  }
  

  // Devuelve instrumentos basados en el área
  private obtenerInstrumentosPorArea(area: string): { nombre: string, imagenUrl: string }[] {
    const instrumentosConImagen: Record<string, { nombre: string, imagenUrl: string }[]> = {
      'Motricidad gruesa': [
        { nombre: 'Pelota', imagenUrl: 'path_to_image/ball.jpg' },
        { nombre: 'Soga', imagenUrl: 'path_to_image/rope.jpg' },
        { nombre: 'Aro', imagenUrl: 'path_to_image/hula_hoop.jpg' },
        { nombre: 'Bicicleta', imagenUrl: 'path_to_image/bike.jpg' },
        { nombre: 'Escalera', imagenUrl: 'path_to_image/stairs.jpg' }
      ],
      'Motricidad fina': [
        { nombre: 'Tijeras', imagenUrl: 'path_to_image/scissors.jpg' },
        { nombre: 'Pinceles', imagenUrl: 'path_to_image/paintbrush.jpg' },
        { nombre: 'Piezas de rompecabezas', imagenUrl: 'path_to_image/puzzle.jpg' },
        { nombre: 'Hilos', imagenUrl: 'path_to_image/threads.jpg' },
        { nombre: 'Lápiz', imagenUrl: 'path_to_image/pencil.jpg' }
      ],
      'Lenguaje': [
        { nombre: 'Libro', imagenUrl: 'path_to_image/book.jpg' },
        { nombre: 'Tarjetas didácticas', imagenUrl: 'path_to_image/flashcards.jpg' },
        { nombre: 'Adivinanzas', imagenUrl: 'path_to_image/riddle_cards.jpg' },
        { nombre: 'Pizarra', imagenUrl: 'path_to_image/whiteboard.jpg' },
        { nombre: 'Diccionario', imagenUrl: 'path_to_image/dictionary.jpg' }
      ],
      'Cognitivo': [
        { nombre: 'Memoria', imagenUrl: 'path_to_image/memory.jpg' },
        { nombre: 'Juegos de lógica', imagenUrl: 'path_to_image/logic_game.jpg' },
        { nombre: 'Bloques de construcción', imagenUrl: 'path_to_image/building_blocks.jpg' },
        { nombre: 'Abaco', imagenUrl: 'path_to_image/abacus.jpg' },
        { nombre: 'Rompecabezas', imagenUrl: 'path_to_image/puzzle_game.jpg' }
      ],
      'Socioemocional': [
        { nombre: 'Muñecos', imagenUrl: 'path_to_image/dolls.jpg' },
        { nombre: 'Peluches', imagenUrl: 'path_to_image/stuffed_animals.jpg' },
        { nombre: 'Cuentos', imagenUrl: 'path_to_image/story_books.jpg' },
        { nombre: 'Juegos de mesa', imagenUrl: 'path_to_image/board_games.jpg' },
        { nombre: 'Música relajante', imagenUrl: 'path_to_image/relax_music.jpg' }
      ]
    };
  
    return instrumentosConImagen[area] || [];
  }  
}
