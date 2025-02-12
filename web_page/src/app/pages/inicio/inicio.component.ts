import { Component, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';

interface Testimonial {
  name: string;
  title: string;
  quote: string;
  imageUrl: string;
}

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements AfterViewInit {
  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (typeof IntersectionObserver !== 'undefined') {
        const features: NodeListOf<HTMLElement> = this.el.nativeElement.querySelectorAll('.feature');

        const observer = new IntersectionObserver(entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              this.renderer.addClass(entry.target, 'in-view');
            } else {
              this.renderer.removeClass(entry.target, 'in-view');
            }
          });
        }, {
          threshold: 0.5
        });

        features.forEach((feature: HTMLElement) => {
          observer.observe(feature);
        });
      }
    }, 0);
  }

  testimonios = [
    {
      texto: 'Desde que descubrí esta página web, he podido encontrar una gran variedad de actividades educativas que no solo mantienen entretenido a mi hijo, sino que también enriquecen su conocimiento de manera significativa.',
      imagen: 'https://randomuser.me/api/portraits/men/1.jpg',
      nombre: 'Juan Pérez',
      ocupacion: 'Profesor'
    },
    {
      texto: 'Me encanta cómo esta plataforma facilita el aprendizaje de mis hijos, desde casa. ¡Es una herramienta indispensable para su educación!',
      imagen: 'https://randomuser.me/api/portraits/women/2.jpg',
      nombre: 'Ana Gómez',
      ocupacion: 'Madre de familia'
    },
    {
      texto: 'Las actividades que ofrece este sitio son increíbles. Mis estudiantes están mucho más motivados para aprender con recursos tan interactivos.',
      imagen: 'https://randomuser.me/api/portraits/men/3.jpg',
      nombre: 'Carlos Rodríguez',
      ocupacion: 'Docente de Matemáticas'
    },
    {
      texto: 'Es fascinante ver cómo mis hijos disfrutan mientras aprenden. Este sitio web ha hecho que el proceso educativo sea más divertido y efectivo.',
      imagen: 'https://randomuser.me/api/portraits/women/4.jpg',
      nombre: 'María Fernández',
      ocupacion: 'Psicóloga educativa'
    },
    {
      texto: 'Gracias a esta plataforma, pude encontrar actividades perfectas para reforzar lo aprendido en clases. ¡Muy recomendable!',
      imagen: 'https://randomuser.me/api/portraits/men/5.jpg',
      nombre: 'José López',
      ocupacion: 'Ingeniero'
    },
    {
      texto: 'Un recurso educativo de calidad que ayuda a mantener el interés de los niños en aprender más. Lo recomiendo sin dudar.',
      imagen: 'https://randomuser.me/api/portraits/women/6.jpg',
      nombre: 'Patricia García',
      ocupacion: 'Madre y emprendedora'
    },
    {
      texto: 'Como docente, aprecio mucho la variedad de contenidos que ofrece esta página. Ha sido de gran ayuda en mis clases.',
      imagen: 'https://randomuser.me/api/portraits/men/7.jpg',
      nombre: 'Luis Martínez',
      ocupacion: 'Profesor de Ciencias Sociales'
    },
    {
      texto: 'Esta plataforma ha sido una gran ayuda para el aprendizaje de mis hijos. Los recursos están muy bien organizados y son fáciles de usar.',
      imagen: 'https://randomuser.me/api/portraits/women/8.jpg',
      nombre: 'Sofía Ramírez',
      ocupacion: 'Arquitecta'
    },
    {
      texto: 'Cada vez que mis hijos acceden a esta página, aprenden algo nuevo y emocionante. ¡Estoy muy contenta con los resultados!',
      imagen: 'https://randomuser.me/api/portraits/men/9.jpg',
      nombre: 'Miguel Herrera',
      ocupacion: 'Abogado'
    },
    {
      texto: 'Este sitio ha sido un cambio significativo en cómo mis hijos aprenden en casa. Gracias a la variedad de actividades, siempre están motivados.',
      imagen: 'https://randomuser.me/api/portraits/women/10.jpg',
      nombre: 'Valeria Torres',
      ocupacion: 'Madre y diseñadora gráfica'
    },
    {
      texto: 'Las actividades educativas de esta página son geniales. Mis alumnos están mucho más interesados en aprender y participando activamente.',
      imagen: 'https://randomuser.me/api/portraits/men/11.jpg',
      nombre: 'Pedro Sánchez',
      ocupacion: 'Profesor de Lengua y Literatura'
    },
    {
      texto: 'Desde que descubrí esta página, he visto cómo mis hijos disfrutan aprender mientras se divierten. ¡Es una herramienta increíble!',
      imagen: 'https://randomuser.me/api/portraits/women/12.jpg',
      nombre: 'Isabela Díaz',
      ocupacion: 'Médica'
    },
    {
      texto: 'Es excelente ver cómo los niños están aprendiendo de manera divertida y práctica. ¡Este sitio es una joya para padres y educadores!',
      imagen: 'https://randomuser.me/api/portraits/men/13.jpg',
      nombre: 'Andrés Rivera',
      ocupacion: 'Gerente de empresa'
    },
    {
      texto: 'Me ha sorprendido la calidad educativa de los recursos en esta página. Mis hijos aprenden y se entretienen a la vez.',
      imagen: 'https://randomuser.me/api/portraits/women/14.jpg',
      nombre: 'Lucía Morales',
      ocupacion: 'Economista'
    },
    {
      texto: 'Una herramienta muy útil para el aprendizaje en casa. Mis hijos disfrutan cada actividad y están aprendiendo mucho más rápido.',
      imagen: 'https://randomuser.me/api/portraits/men/15.jpg',
      nombre: 'David Castillo',
      ocupacion: 'Contador'
    },
    {
      texto: 'Esta plataforma ha sido indispensable en la educación de mis hijos. Puedo ver claramente el progreso en su aprendizaje.',
      imagen: 'https://randomuser.me/api/portraits/women/16.jpg',
      nombre: 'Gabriela Vásquez',
      ocupacion: 'Profesional independiente'
    }
  ];

  indiceActual = 0;

  siguienteTestimonio() {
    this.indiceActual = (this.indiceActual + 1) % this.testimonios.length;
  }

  anteriorTestimonio() {
    this.indiceActual = (this.indiceActual - 1 + this.testimonios.length) % this.testimonios.length;
  }

  testimonials: Testimonial[] = [
    {
      name: 'Camila Herrera',
      title: 'Psicólogo Infantil y Psicorrehabilitación',
      quote: '“Mi enfoque es  proporcionar apoyo emocional integral a niños que enfrentan desafíos como ansiedad, estrés y dificultades conductuales. A través de la terapia lúdica, crea un entorno seguro y de confianza, facilitando el proceso terapéutico y el desarrollo emocional de sus pacientes.”',
      imageUrl: 'https://s3-eu-west-1.amazonaws.com/doctoralia.es/doctor/bef3d6/bef3d6ce10abef06e4ec834adf11c5c5_large.jpg'
    },
    {
      name: 'Jose Rodríguez',
      title: 'Psicólogo Infantil',
      quote: '“Mi enfoque es brindar apoyo emocional a los niños que enfrentan desafíos como la ansiedad, el estrés y las dificultades de comportamiento. Utilizo terapia lúdica para crear un ambiente seguro y de confianza.”',
      imageUrl: 'https://reach.com.pt/wp-content/uploads/2022/04/andre-louro.jpg'
    },
    {
      name: 'Patricia Diaz',
      title: 'Psicóloga Infantil y Educativa',
      quote: '“Como psicóloga educativa, ayudo a los niños a superar dificultades de aprendizaje, mejorar su autoestima y establecer habilidades sociales. Mi misión es fomentar un desarrollo emocional saludable en un entorno escolar.”',
      imageUrl: 'https://s3.sa-east-1.amazonaws.com/doctoralia.cl/doctor/82f09c/82f09cd17e5e8df0a4a7e967b8cfccb5_large.jpg'
    },
    {
      name: 'Carlos Escobar',
      title: 'Psicólogo Clínico Infantil',
      quote: '“Trabajo con niños que atraviesan dificultades emocionales y comportamentales, incluyendo trastornos de conducta y problemas familiares. Mi enfoque terapéutico está orientado a promover el bienestar psicológico en la infancia.”',
      imageUrl: 'https://cdn2.psychologytoday.com/assets/styles/manual_crop_1_1_1200x1200/public/field_blog_entry_images/2023-05/shutterstock_1994511608.jpg?itok=92J1HIzH'
    },
    {
      name: 'Erika Vásquez',
      title: 'Psicóloga en Desarrollo Infantil',
      quote: '“Mi objetivo es trabajar de cerca con los niños y sus familias, ayudando a identificar y tratar problemas del desarrollo emocional y conductual desde la infancia. Fomento un ambiente terapéutico cálido y comprensivo.”',
      imageUrl: 'https://cdn.prod.website-files.com/6340630bc206e31341770199/667585e2aa6940ccbbd47f35_3417d182-71d4-4bfa-8493-b5b5f471a410.jpeg'
    },
    {
      name: 'Ricardo Mendoza',
      title: 'Psicoterapeuta Infantil y Familiar',
      quote: '“Trabajo con niños y sus familias para superar conflictos emocionales y conductuales. Mi enfoque está en la terapia cognitivo-conductual para ayudar a los niños a comprender y gestionar sus emociones y comportamientos.”',
      imageUrl: 'https://photos.psychologytoday.com/8c841f68-5a0c-441d-b7e5-f4c5d666c370/2/320x400.jpeg'
    }
  ];

  currentTestimonialIndex: number = 0;

  prevTestimonial() {
    if (this.currentTestimonialIndex > 0) {
      this.currentTestimonialIndex--;
    }
  }

  nextTestimonial() {
    if (this.currentTestimonialIndex < this.testimonials.length - 1) {
      this.currentTestimonialIndex++;
    }
  }

  get currentTestimonial(): Testimonial {
    return this.testimonials[this.currentTestimonialIndex];
  }
  
}
