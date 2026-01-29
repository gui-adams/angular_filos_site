export type CourseLevel = 'graduacao' | 'pos' | 'mba';

export type CourseType =
  | 'Bacharelado'
  | 'Tecnólogo'
  | 'Licenciatura'
  | 'Especialização'
  | 'MBA';

export type CourseModality = 'EAD' | 'Presencial';

export interface Course {
  id: string;
  title: string;
  level: CourseLevel;
  type: CourseType;
  modality: CourseModality;
  imageSrc: string;
  applyHref: string;
  learnHref: string;
}
