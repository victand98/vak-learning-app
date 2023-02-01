import {
  Answer,
  AnswerModel,
  LearningTypes,
  Question,
  QuestionModel,
} from "../models";

const questionData: Question[] = [
  { _id: 1, title: "¿Cuál de las siguientes actividades disfrutas más?" },
  { _id: 2, title: "¿Qué programa de televisión prefieres?" },
  { _id: 3, title: "Cuando conversas con otra persona, tú..." },
  {
    _id: 4,
    title:
      "Si pudieras adquirir uno de los siguientes artículos, ¿cuál elegirías?",
  },
  { _id: 5, title: "¿Qué prefieres hacer un sábado por la tarde?" },
  { _id: 6, title: "¿Qué tipo de exámenes se dan mejor?" },
  {
    _id: 7,
    title: "¿Cómo te orientas más fácilmente?",
  },
  {
    _id: 8,
    title: "¿En qué prefieres ocupar tu tiempo en un lugar de descanso?",
  },
  { _id: 9, title: "¿De qué manera aprendes mejor algo?" },
  { _id: 10, title: "¿Cómo te consideras?" },
];

export const insertInitialQuestions = async () => {
  console.log("Inserting initial questions...");
  const questionsToInsert = questionData.map((question) =>
    QuestionModel.findByIdAndUpdate(question._id, question, { upsert: true })
  );
  await Promise.all(questionsToInsert);
  console.log("Initial questions inserted");
};

const answerData: Answer[] = [
  {
    title: "Escuchar música",
    learningType: LearningTypes.auditory,
    question: 1,
  },
  { title: "Ver películas", learningType: LearningTypes.visual, question: 1 },
  {
    title: "Bailar con buena música",
    learningType: LearningTypes.kinesthetic,
    question: 1,
  },

  {
    title: "Reportajes de descubrimientos y lugares",
    learningType: LearningTypes.auditory,
    question: 2,
  },
  {
    title: "Cómico y de entretenimiento",
    learningType: LearningTypes.visual,
    question: 2,
  },
  {
    title: "Noticias del mundo",
    learningType: LearningTypes.kinesthetic,
    question: 2,
  },

  {
    title: "La escuchas atentamente",
    learningType: LearningTypes.auditory,
    question: 3,
  },
  { title: "La observas", learningType: LearningTypes.visual, question: 3 },
  {
    title: "Tiendes a tocarla",
    learningType: LearningTypes.kinesthetic,
    question: 3,
  },

  { title: "Un estéreo", learningType: LearningTypes.auditory, question: 4 },
  { title: "Un televisor", learningType: LearningTypes.visual, question: 4 },
  { title: "Un jacuzzi", learningType: LearningTypes.kinesthetic, question: 4 },

  {
    title: "Ir a un concierto",
    learningType: LearningTypes.auditory,
    question: 5,
  },
  { title: "Ir al cine", learningType: LearningTypes.visual, question: 5 },
  {
    title: "Quedarte en casa",
    learningType: LearningTypes.kinesthetic,
    question: 5,
  },

  { title: "Examen oral", learningType: LearningTypes.auditory, question: 6 },
  { title: "Examen escrito", learningType: LearningTypes.visual, question: 6 },
  {
    title: "Examen de opción múltiple",
    learningType: LearningTypes.kinesthetic,
    question: 6,
  },

  {
    title: "Pidiendo indicaciones",
    learningType: LearningTypes.auditory,
    question: 7,
  },
  {
    title: "Mediante el uso de un mapa",
    learningType: LearningTypes.visual,
    question: 7,
  },
  {
    title: "A través de la intuición",
    learningType: LearningTypes.kinesthetic,
    question: 7,
  },

  { title: "Pensar", learningType: LearningTypes.auditory, question: 8 },
  { title: "Descansar", learningType: LearningTypes.visual, question: 8 },
  {
    title: "Caminar por los alrededores",
    learningType: LearningTypes.kinesthetic,
    question: 8,
  },

  {
    title: "Repitiendo en voz alta",
    learningType: LearningTypes.auditory,
    question: 9,
  },
  {
    title: "Escribiéndolo varias veces",
    learningType: LearningTypes.visual,
    question: 9,
  },
  {
    title: "Relacionándolo con algo divertido",
    learningType: LearningTypes.kinesthetic,
    question: 9,
  },

  { title: "Sociable", learningType: LearningTypes.auditory, question: 10 },
  { title: "Intelectual", learningType: LearningTypes.visual, question: 10 },
  { title: "Atlético", learningType: LearningTypes.kinesthetic, question: 10 },
];

export const insertInitialAnswers = async () => {
  console.log("Inserting initial answers...");
  const answersToInsert = answerData.map((answer) =>
    AnswerModel.findOneAndUpdate(
      { title: answer.title, question: answer.question },
      answer,
      { upsert: true }
    )
  );
  await Promise.all(answersToInsert);
  console.log("Initial answers inserted");
};
