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
    const juegos = this.obtenerJuegosPorInteres(datos.edad, datos.area);
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
      },
      'Relajacion': {
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
      },
      'Relajacion': {
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
      'Mejora la coordinación, el equilibrio y la fuerza muscular.💪',
      'Favorece la salud cardiovascular y el desarrollo óseo.🏃‍♂️',
      'Mejora la velocidad de reacción y el control corporal.🤹',
      'Fomenta la socialización y la cooperación en actividades grupales.🤝',
      'Aumenta la autoestima al superar desafíos físicos.💥'
    ],
    'Sensorial': [
      'Mejora la percepción de diferentes texturas y materiales.✋',
      'Potencia la discriminación de sonidos, colores y olores.👂',
      'Estimula la atención plena en actividades detalladas.🧠',
      'Promueve la expresión artística y la exploración sensorial.🎨',
      'Contribuye a la independencia en tareas cotidianas.🧩'
    ],
    'Cognitiva': [
      'Estimula el análisis, la comparación y la resolución de problemas.🧠',
      'Refuerza la capacidad de retener y recordar información.🔍',
      'Potencia la comunicación verbal y la lectura.📖',
      'Favorece la planificación y la evaluación de opciones.🎯',
      'Impulsa la imaginación para desarrollar nuevas ideas.🤖'
    ],
    'Relajacion': [
      'Reduce el estrés y la ansiedad a través de actividades tranquilas.🧘‍♀️',
      'Mejora el bienestar emocional y la paz interior.🌸',
      'Fomenta la concentración y el enfoque mental.🧠',
      'Ayuda a equilibrar el cuerpo y la mente para un estado de calma.💆‍♂️',
      'Promueve un descanso profundo y reparador.🌙'
    ]
  };

  return beneficiosPorArea[area] || ['🌟 Beneficios generales de desarrollo personal y social.'];
}

private obtenerJuegosPorInteres(edad: string, area: string): { descripcion?: string; nivel: string; actividad2: string; actividad1: string; materiales?: string }[] {
  const juegos: Record<string, Record<string, { descripcion?: string; nivel: string; actividad1: string; actividad2: string; materiales?: string }[]>> = {
    '3': {
      'Sensorial': [
        {
          nivel: 'Nivel 1',
          descripcion:'🐬 En este nivel, tu objetivo es trabajar en la estimulación sensorial mediante actividades visuales y auditivas.\nMariposas (Vista) \nPiano (oír)',
          actividad1: 'https://v4.brainhq.com/?signup=success&fr=y#subscribe/browse',
          actividad2: 'https://musiclab.chromeexperiments.com/Song-Maker/',
          materiales:''
        },
        {
          nivel: 'Nivel 2',
          descripcion:'🐬 En este nivel, tu objetivo es trabajar en la estimulación sensorial mediante actividades visuales y auditivas.\nAves (Vista) \nVideo (tacto)',
          actividad1: 'https://v4.brainhq.com/?signup=success&fr=y#subscribe/browse',
          actividad2: 'https://www.youtube.com/watch?v=xPxHz1gL76I&ab_channel=InfantilAlbanta',
          materiales:'En una bolsa de tela o una funda negra colocar 5 juegutes que más use o le guste al niño y otros 5 de objetos que use a diario el niño (cuchara, borrador, etc). El niño debe sacar un objeto de la bolsa y adivinar qué es con lo ojos vendados '
        },
        {
          nivel: 'Nivel 3',
          descripcion:'Ambas actividades requieren que el niño o niña esté tapado por ojos\n🐬Estimulación del gusto: con una cuchara hacerle probar al niño distintos sabores de alimetos que tenga en la casa (azúcar, café, sal, jugo, mermelada, chocolate) que sean de consistencia líquida.\n🐬Estimulación del olfato: hacerle oler olores agradables como las plantas medicinales, clavo de olor, canela, vainilla, cítricos, etc. \n🐥Adivinar 5-10 sabores',
          actividad1: 'https://www.youtube.com/watch?v=Ycuvrz9huR8&ab_channel=Mam%C3%A1Montessori',
          actividad2: 'https://www.youtube.com/watch?v=AytUupIwPc8&ab_channel=KidsIntegralEstimulaci%C3%B3nTemprana',
          materiales:''
        }
      ],
      'Motricidad': [
        {
          nivel: 'Nivel 1',
          descripcion:'🐬 En este nivel, tu objetivo es trabajar en la estimulación motriz mediante actividades que fomenten el desarrollo de la coordinación y el control corporal, mediante 3 ejercicios\n Plastilina (Motricidad fina)\nCintas(Motricidad gruesa)',
          actividad1: 'https://www.youtube.com/watch?v=fo5cP3SXqM8',
          actividad2: 'https://www.youtube.com/watch?v=gORn1E8ez9w',
          materiales:'Materiales: Con una cinta, lana o algo similar que tenga de largo 2 metros y amarrar cada extremos a una silla, luego amarrar 4 cintas o medias de diferentes colores. El padre le va a decir qué colores debe tocar el niño o niña con el pie, (ejemplos: amarillo, azul, amarillo, rosado)'
        },
        {
          nivel: 'Nivel 2',
          descripcion:'🐬 En este nivel, tu objetivo es trabajar en la estimulación sensorial mediante actividades visuales y auditivas.\n (Actividad 1) Hacer 6 bolitas de papel de diferentes 4 colores diferentes, luego el niño con uns pinza de ropa las va a clasificar por colores, puede usar una tapa o recipiente para colocarlas - (Motricidad fina) \n (Actividad 2) Ejercicio 1: encestar la pelota en una tina, canasta o lo más similar que tenga a una canasta. Encestar 3 veces cuando la canasta está a un metro, luego encestar 3 veces a metro y medio - (Motricidad gruesa)',
          actividad1: 'https://www.youtube.com/watch?v=nMGMjR784ag&ab_channel=SOSTerapeutas',
          actividad2: 'https://www.youtube.com/watch?v=go8LzrjZa1s&ab_channel=UNICEFBolivia',
          materiales:''
        },
        {
          nivel: 'Nivel 3',
          descripcion:'🐬 En este nivel, tu objetivo es trabajar en la estimulación motriz mediante actividades que fomenten el desarrollo de la coordinación y el control corporal\n Saltos (Motricidad gruesa)\n Enrollando frutas',
          actividad1: 'https://www.youtube.com/watch?v=LNzrq9pHI0w&ab_channel=PlayKidsEspa%C3%B1ol',
          actividad2: 'https://www.youtube.com/watch?v=h3X1BP-z8Nw&ab_channel=ConMami',
          materiales:'Elegir 2 frutas y en un cartón el padre dibujará la forma de la fruta para luego darle al niño  que con lana las enrollo hasta tapar el cartón y luego con cartulina pegar la hoja de la fruta, en caso de que tenga. '
        }
      ],
      'Cognitiva': [
        {
          nivel: 'Nivel 1',
          descripcion:'🐬 En este nivel, tu objetivo es estimular la mente a través de actividades que desafíen tu memoria, concentración y razonamiento. \n (Alfabeto) \n (Objeto que encaja)',
          actividad1: 'https://www.abcya.com/games/alphabet ',
          actividad2: 'https://www.cokitos.com/que-objeto-encaja/play/',
          materiales:''
        },
        {
          nivel: 'Nivel 2',
          descripcion:'🐬 En este nivel, tu objetivo es estimular la mente a través de actividades que desafíen tu memoria, concentración y razonamiento. \n (Rompecabezas) \n (Contar animales)',
          actividad1: 'https://www.abcya.com/games/alphabet_puzzle',
          actividad2: 'https://www.cokitos.com/contar-animales-hasta-10/play/',
          materiales:''
        },
        {
          nivel: 'Nivel 3',
          descripcion:'🐬 En este nivel, tu objetivo es estimular la mente a través de actividades que desafíen tu memoria, concentración y razonamiento. \n (Patrón) \n (Clasificar por figuras geométricas)',
          actividad1: 'https://www.youtube.com/watch?v=nXvuji6-mJc&ab_channel=CasitaPreescolar',
          actividad2: 'https://wordwall.net/es/resource/14264627/figuras-geometricas',
          materiales:''
        }
      ],
      'Relajacion': [
        {
          nivel: 'Nivel 1',
          descripcion:'🐬 En este nivel, el objetivo es ayudarte a relajarte y reducir el estrés a través de actividades calmantes. \nObservar el video desde el min 0:35',
          actividad1: 'https://www.youtube.com/watch?v=o9uaRmHiAwc&ab_channel=SmileandLearn-Espa%C3%B1ol',
          actividad2: '',
          materiales:''
        },
        {
          nivel: 'Nivel 2',
          descripcion:'🐬 En este nivel, el objetivo es ayudarte a relajarte y reducir el estrés a través de actividades calmantes.',
          actividad1: 'https://www.youtube.com/watch?v=t8748OWc1nQ&ab_channel=SmileandLearn-Espa%C3%B1ol',
          actividad2: '',
          materiales:''
        },
        {
          nivel: 'Nivel 3',
          descripcion:'🐬 En este nivel, el objetivo es ayudarte a relajarte y reducir el estrés a través de actividades calmantes.',
          actividad1: 'https://www.youtube.com/watch?v=kdNV86dFSvA&ab_channel=LuloSaurio%7CMeditacionyaudiocuentosparani%C3%B1o',
          actividad2: '',
          materiales:''
        }
      ]
    },
    '4': {
      'Sensorial': [
        {
          nivel: 'Nivel 1',
          descripcion:'🐬 En este nivel, tu objetivo es trabajar en la estimulación sensorial mediante actividades visuales y auditivas.\nMariposas (Vista) \nPiano (oír)',
          actividad1: 'https://v4.brainhq.com/?signup=success&fr=y#subscribe/browse',
          actividad2: 'https://musiclab.chromeexperiments.com/Song-Maker/',
          materiales:''
        },
        {
          nivel: 'Nivel 2',
          descripcion:'🐬 En este nivel, tu objetivo es trabajar en la estimulación sensorial mediante actividades visuales y auditivas.\nAves (Vista) \nVideo (tacto)',
          actividad1: 'https://v4.brainhq.com/?signup=success&fr=y#subscribe/browse',
          actividad2: 'https://www.youtube.com/watch?v=xPxHz1gL76I&ab_channel=InfantilAlbanta',
          materiales:'En una bolsa de tela o una funda negra colocar 5 juegutes que más use o le guste al niño y otros 5 de objetos que use a diario el niño (cuchara, borrador, etc). El niño debe sacar un objeto de la bolsa y adivinar qué es con lo ojos vendados '
        },
        {
          nivel: 'Nivel 3',
          descripcion:'Ambas actividades requieren que el niño o niña esté tapado por ojos\n🐬Estimulación del gusto: con una cuchara hacerle probar al niño distintos sabores de alimetos que tenga en la casa (azúcar, café, sal, jugo, mermelada, chocolate) que sean de consistencia líquida.\n🐬Estimulación del olfato: hacerle oler olores agradables como las plantas medicinales, clavo de olor, canela, vainilla, cítricos, etc. \n🐥Adivinar 5-10 sabores',
          actividad1: 'https://www.youtube.com/watch?v=Ycuvrz9huR8&ab_channel=Mam%C3%A1Montessori',
          actividad2: 'https://www.youtube.com/watch?v=AytUupIwPc8&ab_channel=KidsIntegralEstimulaci%C3%B3nTemprana',
          materiales:''
        }
      ],
      'Motricidad': [
        {
          nivel: 'Nivel 1',
          descripcion:'🐬 En este nivel, tu objetivo es trabajar en la estimulación motriz mediante actividades que fomenten el desarrollo de la coordinación y el control corporal, mediante 3 ejercicios\n Plastilina (Motricidad fina)\nCintas(Motricidad gruesa)',
          actividad1: 'https://www.youtube.com/watch?v=fo5cP3SXqM8',
          actividad2: 'https://www.youtube.com/watch?v=gORn1E8ez9w',
          materiales:'Materiales: Con una cinta, lana o algo similar que tenga de largo 2 metros y amarrar cada extremos a una silla, luego amarrar 4 cintas o medias de diferentes colores. El padre le va a decir qué colores debe tocar el niño o niña con el pie, (ejemplos: amarillo, azul, amarillo, rosado)'
        },
        {
          nivel: 'Nivel 2',
          descripcion:'🐬 En este nivel, tu objetivo es trabajar en la estimulación sensorial mediante actividades visuales y auditivas.\n (Actividad 1) Hacer 6 bolitas de papel de diferentes 4 colores diferentes, luego el niño con uns pinza de ropa las va a clasificar por colores, puede usar una tapa o recipiente para colocarlas - (Motricidad fina) \n (Actividad 2) Ejercicio 1: encestar la pelota en una tina, canasta o lo más similar que tenga a una canasta. Encestar 3 veces cuando la canasta está a un metro, luego encestar 3 veces a metro y medio - (Motricidad gruesa)',
          actividad1: 'https://www.youtube.com/watch?v=nMGMjR784ag&ab_channel=SOSTerapeutas',
          actividad2: 'https://www.youtube.com/watch?v=go8LzrjZa1s&ab_channel=UNICEFBolivia',
          materiales:''
        },
        {
          nivel: 'Nivel 3',
          descripcion:'🐬 En este nivel, tu objetivo es trabajar en la estimulación motriz mediante actividades que fomenten el desarrollo de la coordinación y el control corporal\n Saltos (Motricidad gruesa)\n Enrollando frutas',
          actividad1: 'https://www.youtube.com/watch?v=LNzrq9pHI0w&ab_channel=PlayKidsEspa%C3%B1ol',
          actividad2: 'https://www.youtube.com/watch?v=h3X1BP-z8Nw&ab_channel=ConMami',
          materiales:'Elegir 2 frutas y en un cartón el padre dibujará la forma de la fruta para luego darle al niño  que con lana las enrollo hasta tapar el cartón y luego con cartulina pegar la hoja de la fruta, en caso de que tenga. '
        }
      ],
      'Cognitiva': [
        {
          nivel: 'Nivel 1',
          descripcion:'🐬 En este nivel, tu objetivo es estimular la mente a través de actividades que desafíen tu memoria, concentración y razonamiento. \n (Alfabeto) \n (Objeto que encaja)',
          actividad1: 'https://www.abcya.com/games/alphabet ',
          actividad2: 'https://www.cokitos.com/que-objeto-encaja/play/',
          materiales:''
        },
        {
          nivel: 'Nivel 2',
          descripcion:'🐬 En este nivel, tu objetivo es estimular la mente a través de actividades que desafíen tu memoria, concentración y razonamiento. \n (Rompecabezas) \n (Contar animales)',
          actividad1: 'https://www.abcya.com/games/alphabet_puzzle',
          actividad2: 'https://www.cokitos.com/contar-animales-hasta-10/play/',
          materiales:''
        },
        {
          nivel: 'Nivel 3',
          descripcion:'🐬 En este nivel, tu objetivo es estimular la mente a través de actividades que desafíen tu memoria, concentración y razonamiento. \n (Patrón) \n (Clasificar por figuras geométricas)',
          actividad1: 'https://www.youtube.com/watch?v=nXvuji6-mJc&ab_channel=CasitaPreescolar',
          actividad2: 'https://wordwall.net/es/resource/14264627/figuras-geometricas',
          materiales:''
        }
      ],
      'Relajacion': [
        {
          nivel: 'Nivel 1',
          descripcion:'🐬 En este nivel, el objetivo es ayudarte a relajarte y reducir el estrés a través de actividades calmantes. \nObservar el video desde el min 0:35',
          actividad1: 'https://www.youtube.com/watch?v=o9uaRmHiAwc&ab_channel=SmileandLearn-Espa%C3%B1ol',
          actividad2: '',
          materiales:''
        },
        {
          nivel: 'Nivel 2',
          descripcion:'🐬 En este nivel, el objetivo es ayudarte a relajarte y reducir el estrés a través de actividades calmantes.',
          actividad1: 'https://www.youtube.com/watch?v=t8748OWc1nQ&ab_channel=SmileandLearn-Espa%C3%B1ol',
          actividad2: '',
          materiales:''
        },
        {
          nivel: 'Nivel 3',
          descripcion:'🐬 En este nivel, el objetivo es ayudarte a relajarte y reducir el estrés a través de actividades calmantes.',
          actividad1: 'https://www.youtube.com/watch?v=kdNV86dFSvA&ab_channel=LuloSaurio%7CMeditacionyaudiocuentosparani%C3%B1o',
          actividad2: '',
          materiales:''
        }
      ]
    },
    '5': {
      'Sensorial': [
        {
          nivel: 'Nivel 1',
          descripcion:'🐬 En este nivel, tu objetivo es trabajar en la estimulación sensorial mediante actividades visuales y auditivas.\n(Oír) \nPiano (tacto)',
          actividad1: 'https://www.youtube.com/watch?v=OI9_wYCifkk&ab_channel=LaProfeAnaHenao',
          actividad2: 'https://www.youtube.com/watch?v=zap-SMqs7GE',
          materiales:'en recipientes colocar materiales, objetos o alimentos que tenga en casa de preferencia (lentejas, espuma de afeitar, algodón, botones, arroz, esponja, plumas, fideos). El niño con los ojos vendados debe decir si su textura es aspera o lisa, su forma y tamaño. Si deseas continuar con la actividad, puede crear fundas sensoriales: https://www.youtube.com/watch?v=N996jvCYNks&ab_channel=EugeniaRomero'
        },
        {
          nivel: 'Nivel 2',
          descripcion:'🐬 En este nivel, tu objetivo es trabajar en la estimulación sensorial mediante actividades visuales y auditivas.\nOndas(Vista) \nExperimentos',
          actividad1: 'https://v4.brainhq.com/?signup=success&fr=y#subscribe/browse ',
          actividad2: 'https://www.youtube.com/watch?v=w_o0hUiZdVA&ab_channel=Haival',
          materiales:''
        },
        {
          nivel: 'Nivel 3',
          descripcion:'En este nivel, tu objetivo es trabajar en la estimulación sensorial mediante actividades visuales y auditivas.\nPelotitas(Vista) \nAdivina una fruta o vertura(gusto)',
          actividad1: 'https://v4.brainhq.com/?signup=success&fr=y#subscribe/browse',
          actividad2: 'https://www.youtube.com/watch?v=xPVkafLsNUk&ab_channel=ReysusideasCreativas',
          materiales:'Cubrir los ojos del niño para que identifique que identifique entre verduras y frutas, el padre o la madre va a colocar en recipientes pedazos pequeños de fruta y verduras, el niño debe identificar cuál es y cómo se llama (si no desean usar esos alimentos puede usar los de su preferencia).'
        }
      ],
      'Motricidad': [
        {
          nivel: 'Nivel 1',
          descripcion:'🐬 En este nivel, tu objetivo es trabajar en la estimulación motriz mediante actividades que fomenten el desarrollo de la coordinación y el control corporal\n Baile (Motricidad gruesa)',
          actividad1: 'https://www.youtube.com/watch?v=r-i5BqoV8FM&ab_channel=DannyGo%21Espa%C3%B1ol',
          actividad2: 'https://www.youtube.com/shorts/-AUZbznQxgg',
          materiales:'Pescar gomas (un sorbete o palo de pincho sin punta, y una tina con agua llenas de varias ligar), Ejercicio 1: 10 gomas en 1 min Ejericicio 2: 15 gomas en 1 min, Ejercicios 3: 20 gomas en 1 min 30 seg'
        },
        {
          nivel: 'Nivel 2',
          descripcion:'🐬 En este nivel, tu objetivo es trabajar en la estimulación motriz mediante actividades que fomenten el desarrollo de la coordinación y el control corporal\n Origami (Motricidad fina)\n Baila (Motricidad gruesa)',
          actividad1: 'https://www.youtube.com/watch?v=tJ887j_q4j8&ab_channel=ManualidadesPlay',
          actividad2: 'https://www.youtube.com/watch?v=IcoZre9gL4k&ab_channel=LingokidsenEspa%C3%B1ol-CancionesyDibujos',
          materiales:''
        },
        {
          nivel: 'Nivel 3',
          descripcion:'🐬 En este nivel, tu objetivo es trabajar en la estimulación motriz mediante actividades que fomenten el desarrollo de la coordinación y el control corporal\n Origami (Motricidad fina)\n Tejer con las manos',
          actividad1: 'https://www.youtube.com/watch?v=trvcgXYTUbU&ab_channel=ManualidadesPlay',
          actividad2: 'https://www.youtube.com/shorts/539pGBtqiYY',
          materiales:''
        }
      ],
      'Cognitiva': [
        {
          nivel: 'Nivel 1',
          descripcion:'🐬 En este nivel, tu objetivo es estimular la mente a través de actividades que desafíen tu memoria, concentración y razonamiento. \n (Encontrar pares) \n (Clasificar)',
          actividad1: 'https://www.cokitos.com/juego-concentrese-de-formas/play/',
          actividad2: 'https://www.cokitos.com/recycling-time-2/play/ ',
          materiales:''
        },
        {
          nivel: 'Nivel 2',
          descripcion:'🐬 En este nivel, tu objetivo es estimular la mente a través de actividades que desafíen tu memoria, concentración y razonamiento. \n (Secuencia) \n (Ahorcado animales)',
          actividad1: 'https://www.abcya.com/games/alphabet_puzzle',
          actividad2: 'https://www.cokitos.com/decipher-descifrar-un-mensaje-en-clave/play/',
          materiales:''
        },
        {
          nivel: 'Nivel 3',
          descripcion:'🐬 En este nivel, tu objetivo es estimular la mente a través de actividades que desafíen tu memoria, concentración y razonamiento. \n (Unir puntos) \n (Sopa de letras)',
          actividad1: 'https://www.cokitos.com/unir-puntos-de-numeros/play/',
          actividad2: 'https://www.cokitos.com/sopa-de-letras-de-animales-en-espanol/play/',
          materiales:''
        }
      ],
      'Relajacion': [
        {
          nivel: 'Nivel 1',
          descripcion:'🐬 En este nivel, el objetivo es ayudarte a relajarte y reducir el estrés a través de actividades calmantes. \nObservar el video desde el min 0:35',
          actividad1: ' https://www.youtube.com/watch?v=o9uaRmHiAwc',
          actividad2: '',
          materiales:''
        },
        {
          nivel: 'Nivel 2',
          descripcion:'🐬 En este nivel, el objetivo es ayudarte a relajarte y reducir el estrés a través de actividades calmantes.',
          actividad1: 'https://www.youtube.com/watch?v=t8748OWc1nQ',
          actividad2: '',
          materiales:''
        },
        {
          nivel: 'Nivel 3',
          descripcion:'🐬 En este nivel, el objetivo es ayudarte a relajarte y reducir el estrés a través de actividades calmantes.',
          actividad1: 'https://www.youtube.com/watch?v=vxoJ1T-mB1E',
          actividad2: '',
          materiales:''
        }
      ]
    },
    '6': {
      'Sensorial': [
        {
          nivel: 'Nivel 1',
          descripcion:'🐬 En este nivel, tu objetivo es trabajar en la estimulación sensorial mediante actividades visuales y auditivas.\n(Oír) \nPiano (tacto)',
          actividad1: 'https://www.youtube.com/watch?v=OI9_wYCifkk&ab_channel=LaProfeAnaHenao',
          actividad2: 'https://www.youtube.com/watch?v=zap-SMqs7GE',
          materiales:'en recipientes colocar materiales, objetos o alimentos que tenga en casa de preferencia (lentejas, espuma de afeitar, algodón, botones, arroz, esponja, plumas, fideos). El niño con los ojos vendados debe decir si su textura es aspera o lisa, su forma y tamaño. Si deseas continuar con la actividad, puede crear fundas sensoriales: https://www.youtube.com/watch?v=N996jvCYNks&ab_channel=EugeniaRomero'
        },
        {
          nivel: 'Nivel 2',
          descripcion:'🐬 En este nivel, tu objetivo es trabajar en la estimulación sensorial mediante actividades visuales y auditivas.\nOndas(Vista) \nExperimentos',
          actividad1: 'https://v4.brainhq.com/?signup=success&fr=y#subscribe/browse ',
          actividad2: 'https://www.youtube.com/watch?v=w_o0hUiZdVA&ab_channel=Haival',
          materiales:''
        },
        {
          nivel: 'Nivel 3',
          descripcion:'En este nivel, tu objetivo es trabajar en la estimulación sensorial mediante actividades visuales y auditivas.\nPelotitas(Vista) \nAdivina una fruta o vertura(gusto)',
          actividad1: 'https://v4.brainhq.com/?signup=success&fr=y#subscribe/browse',
          actividad2: 'https://www.youtube.com/watch?v=xPVkafLsNUk&ab_channel=ReysusideasCreativas',
          materiales:'Cubrir los ojos del niño para que identifique que identifique entre verduras y frutas, el padre o la madre va a colocar en recipientes pedazos pequeños de fruta y verduras, el niño debe identificar cuál es y cómo se llama (si no desean usar esos alimentos puede usar los de su preferencia).'
        }
      ],
      'Motricidad': [
        {
          nivel: 'Nivel 1',
          descripcion:'🐬 En este nivel, tu objetivo es trabajar en la estimulación motriz mediante actividades que fomenten el desarrollo de la coordinación y el control corporal\n Baile (Motricidad gruesa)',
          actividad1: 'https://www.youtube.com/watch?v=r-i5BqoV8FM&ab_channel=DannyGo%21Espa%C3%B1ol',
          actividad2: 'https://www.youtube.com/shorts/-AUZbznQxgg',
          materiales:'Pescar gomas (un sorbete o palo de pincho sin punta, y una tina con agua llenas de varias ligar), Ejercicio 1: 10 gomas en 1 min Ejericicio 2: 15 gomas en 1 min, Ejercicios 3: 20 gomas en 1 min 30 seg'
        },
        {
          nivel: 'Nivel 2',
          descripcion:'🐬 En este nivel, tu objetivo es trabajar en la estimulación motriz mediante actividades que fomenten el desarrollo de la coordinación y el control corporal\n Origami (Motricidad fina)\n Baila (Motricidad gruesa)',
          actividad1: 'https://www.youtube.com/watch?v=tJ887j_q4j8&ab_channel=ManualidadesPlay',
          actividad2: 'https://www.youtube.com/watch?v=IcoZre9gL4k&ab_channel=LingokidsenEspa%C3%B1ol-CancionesyDibujos',
          materiales:''
        },
        {
          nivel: 'Nivel 3',
          descripcion:'🐬 En este nivel, tu objetivo es trabajar en la estimulación motriz mediante actividades que fomenten el desarrollo de la coordinación y el control corporal\n Origami (Motricidad fina)\n Tejer con las manos',
          actividad1: 'https://www.youtube.com/watch?v=trvcgXYTUbU&ab_channel=ManualidadesPlay',
          actividad2: 'https://www.youtube.com/shorts/539pGBtqiYY',
          materiales:''
        }
      ],
      'Cognitiva': [
        {
          nivel: 'Nivel 1',
          descripcion:'🐬 En este nivel, tu objetivo es estimular la mente a través de actividades que desafíen tu memoria, concentración y razonamiento. \n (Encontrar pares) \n (Clasificar)',
          actividad1: 'https://www.cokitos.com/juego-concentrese-de-formas/play/',
          actividad2: 'https://www.cokitos.com/recycling-time-2/play/ ',
          materiales:''
        },
        {
          nivel: 'Nivel 2',
          descripcion:'🐬 En este nivel, tu objetivo es estimular la mente a través de actividades que desafíen tu memoria, concentración y razonamiento. \n (Secuencia) \n (Ahorcado animales)',
          actividad1: 'https://www.abcya.com/games/alphabet_puzzle',
          actividad2: 'https://www.cokitos.com/decipher-descifrar-un-mensaje-en-clave/play/',
          materiales:''
        },
        {
          nivel: 'Nivel 3',
          descripcion:'🐬 En este nivel, tu objetivo es estimular la mente a través de actividades que desafíen tu memoria, concentración y razonamiento. \n (Unir puntos) \n (Sopa de letras)',
          actividad1: 'https://www.cokitos.com/unir-puntos-de-numeros/play/',
          actividad2: 'https://www.cokitos.com/sopa-de-letras-de-animales-en-espanol/play/',
          materiales:''
        }
      ],
      'Relajacion': [
        {
          nivel: 'Nivel 1',
          descripcion:'🐬 En este nivel, el objetivo es ayudarte a relajarte y reducir el estrés a través de actividades calmantes. \nObservar el video desde el min 0:35',
          actividad1: ' https://www.youtube.com/watch?v=o9uaRmHiAwc',
          actividad2: '',
          materiales:''
        },
        {
          nivel: 'Nivel 2',
          descripcion:'🐬 En este nivel, el objetivo es ayudarte a relajarte y reducir el estrés a través de actividades calmantes.',
          actividad1: 'https://www.youtube.com/watch?v=t8748OWc1nQ',
          actividad2: '',
          materiales:''
        },
        {
          nivel: 'Nivel 3',
          descripcion:'🐬 En este nivel, el objetivo es ayudarte a relajarte y reducir el estrés a través de actividades calmantes.',
          actividad1: 'https://www.youtube.com/watch?v=vxoJ1T-mB1E',
          actividad2: '',
          materiales:''
        }
      ]
    }
  };
  
  return juegos[edad]?.[area] || [];
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
      ],
      'Relajacion': [
      { nombre: 'Almohada', imagenUrl: 'https://cdn-icons-png.flaticon.com/512/2769/2769744.png' },
      { nombre: 'Aceite esencial', imagenUrl: 'https://cdn-icons-png.flaticon.com/512/2093/2093859.png' },
      { nombre: 'Colchoneta de yoga', imagenUrl: 'https://cdn-icons-png.flaticon.com/512/992/992528.png' },
      { nombre: 'Meditación guiada', imagenUrl: 'https://cdn-icons-png.flaticon.com/512/3264/3264880.png' },
      { nombre: 'Velas aromáticas', imagenUrl: 'https://cdn-icons-png.flaticon.com/512/474/474359.png' }
    ]
    };
    return instrumentosConImagen[area] || [];
  }
}
