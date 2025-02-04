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
        { nombre: 'Pelota', imagenUrl: 'https://static.vecteezy.com/system/resources/thumbnails/011/421/474/small/soccer-ball-realistic-png.png' },
        { nombre: 'Soga', imagenUrl: 'https://cdn-icons-png.flaticon.com/512/8049/8049041.png' },
        { nombre: 'Aro', imagenUrl: 'https://png.pngtree.com/png-clipart/20230811/original/pngtree-a-simplistic-design-of-an-abstract-human-figure-with-hoop-vector-picture-image_10313934.png' },
        { nombre: 'Bicicleta', imagenUrl: 'https://cdn-icons-png.flaticon.com/512/2972/2972185.png' },
        { nombre: 'Escalera', imagenUrl: 'https://cdn-icons-png.freepik.com/512/9027/9027996.png' }
      ],
      'Motricidad fina': [
        { nombre: 'Tijeras', imagenUrl: 'https://images.emojiterra.com/google/noto-emoji/unicode-16.0/color/1024px/2702.png' },
        { nombre: 'Pinceles', imagenUrl: 'https://images.emojiterra.com/google/noto-emoji/unicode-16.0/color/1024px/1f58c.png' },
        { nombre: 'Piezas de rompecabezas', imagenUrl: 'https://cdn-icons-png.flaticon.com/512/2972/2972202.png' },
        { nombre: 'Hilos', imagenUrl: 'https://images.vexels.com/media/users/3/212381/isolated/lists/34bdef5b79859f2e4c5dea6c4a62a5c9-icono-plano-de-carretes-de-hilo-de-color.png' },
        { nombre: 'Lápiz', imagenUrl: 'https://cdn-icons-png.flaticon.com/512/1150/1150978.png' }
      ],
      'Lenguaje': [
        { nombre: 'Libro', imagenUrl: 'https://static.vecteezy.com/system/resources/previews/023/221/041/non_2x/open-book-school-supply-icon-free-png.png' },
        { nombre: 'Tarjetas didácticas', imagenUrl: 'https://static.vecteezy.com/system/resources/previews/012/377/863/non_2x/credit-card-3d-icon-3d-render-concept-free-png.png' },
        { nombre: 'Adivinanzas', imagenUrl: 'https://cloud.educaplay.com/recursos/616/19719827/image669329ccc2509.png' },
        { nombre: 'Pizarra', imagenUrl: 'https://cdn-icons-png.flaticon.com/512/2135/2135039.png' },
        { nombre: 'Diccionario', imagenUrl: 'https://cdn-icons-png.flaticon.com/512/8750/8750741.png' }
      ],
      'Cognitivo': [
        { nombre: 'Memoria', imagenUrl: 'https://cdn-icons-png.flaticon.com/512/5265/5265672.png' },
        { nombre: 'Juegos de lógica', imagenUrl: 'https://cdn-icons-png.flaticon.com/512/2241/2241398.png' },
        { nombre: 'Bloques de construcción', imagenUrl: 'path_to_image/building_blocks.jpg' },
        { nombre: 'Abaco', imagenUrl: 'https://images.vexels.com/media/users/3/189550/isolated/preview/5931dd33fd082c85db78e9ee017076a6-bloques-de-construcci-n-3d.png' },
        { nombre: 'Rompecabezas', imagenUrl: 'https://cdn-icons-png.flaticon.com/512/786/786771.png' }
      ],
      'Socioemocional': [
        { nombre: 'Muñecos', imagenUrl: 'https://cdn.iconscout.com/icon/free/png-256/free-muneco-de-nieve-sin-nieve-navidad-fria-33948.png' },
        { nombre: 'Peluches', imagenUrl: 'https://cdn-icons-png.flaticon.com/512/4841/4841216.png' },
        { nombre: 'Cuentos', imagenUrl: 'https://cdn-icons-png.flaticon.com/512/3281/3281000.png' },
        { nombre: 'Juegos de mesa', imagenUrl: 'https://cdn-icons-png.flaticon.com/512/3401/3401312.png' },
        { nombre: 'Música relajante', imagenUrl: 'https://cdn-icons-png.flaticon.com/512/5776/5776041.png' }
      ]
    };
  
    return instrumentosConImagen[area] || [];
  }  
}
