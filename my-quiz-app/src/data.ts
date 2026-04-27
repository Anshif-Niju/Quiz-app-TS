import type { Question } from './types/quiz';

export const quizQuestion: Question[] = [
  {
    id: 1,
    text: 'Which language is a superset of JavaScript?',
    options: ['Python', 'TypeScript', 'Java', 'C++'],
    correctAnswer: 1,
  },
  {
    id: 2,
    text: 'What does JSX stand for?',
    options: ['JavaScript XML', 'Java Syntax Extension', 'JSON Xylophone', 'Javascript'],
    correctAnswer: 0,
  },
  {
    id: 3,
    text: 'React is a library for building...?',
    options: ['Databases', 'Operating Systems', 'User Interfaces', 'Nginx'],
    correctAnswer: 2,
  },
];
