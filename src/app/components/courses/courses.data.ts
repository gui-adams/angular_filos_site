import { Course } from "./courses.model";

export const COURSES: Course[] = [
  {
    id: 'adm',
    title: 'Administração',
    level: 'graduacao',
    type: 'Bacharelado',
    modality: 'EAD',
    imageSrc: 'assets/cursos/administracao.webp',
    applyHref: '/admissions?curso=administracao',
    learnHref: '/cursos/administracao',
  },
  {
    id: 'dir',
    title: 'Direito',
    level: 'graduacao',
    type: 'Bacharelado',
    modality: 'Presencial',
    imageSrc: 'assets/cursos/direito.webp',
    applyHref: '/admissions?curso=direito',
    learnHref: '/cursos/direito',
  },
  {
    id: 'ped',
    title: 'Pedagogia',
    level: 'graduacao',
    type: 'Licenciatura',
    modality: 'Presencial',
    imageSrc: 'assets/cursos/pedagogia.webp',
    applyHref: '/admissions?curso=pedagogia',
    learnHref: '/cursos/pedagogia',
  },
  {
    id: 'rad',
    title: 'Radiologia',
    level: 'graduacao',
    type: 'Tecnólogo',
    modality: 'Presencial',
    imageSrc: 'assets/cursos/radiologia.webp',
    applyHref: '/admissions?curso=radiologia',
    learnHref: '/cursos/radiologia',
  },
  
];
