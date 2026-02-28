import { Course } from "./courses.model";

export const COURSES: Course[] = [
  {
    id: 'adm',
    title: 'Administração',
    level: 'graduacao',
    type: 'Bacharelado',
    modality: 'Presencial',
    imageFront: 'assets/cursos/modal/administracao.webp',
    imageSrc: 'assets/cursos/rota/adm.webp',
    applyHref: '/admissions?curso=administracao',
    learnHref: '/cursos/administracao',
  },
  {
    id: 'dir',
    title: 'Direito',
    level: 'graduacao',
    type: 'Bacharelado',
    modality: 'Presencial',
    imageFront: 'assets/cursos/modal/direito.webp',
    imageSrc: 'assets/cursos/rota/dire.webp',
    applyHref: '/admissions?curso=direito',
    learnHref: '/cursos/direito',
  },
  {
    id: 'ped',
    title: 'Pedagogia',
    level: 'graduacao',
    type: 'Licenciatura',
    modality: 'Presencial',
    imageFront: 'assets/cursos/modal/pedagogia.webp',
    imageSrc: 'assets/cursos/rota/ped.webp',
    applyHref: '/admissions?curso=pedagogia',
    learnHref: '/cursos/pedagogia',
  },
  {
    id: 'rad',
    title: 'Radiologia',
    level: 'graduacao',
    type: 'Tecnólogo',
    modality: 'Presencial',
    imageFront: 'assets/cursos/modal/radiologia.webp',
    imageSrc: 'assets/cursos/rota/radio.webp',
    applyHref: '/admissions?curso=radiologia',
    learnHref: '/cursos/radiologia',
  },
  
];
