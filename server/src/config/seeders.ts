import { insertInitialAnswers, insertInitialQuestions } from "./data";

const seeders = async () => {
  try {
    await insertInitialQuestions();
    await insertInitialAnswers();
  } catch (error) {
    console.error(`An error occurred while saving the data: ${error}`);
  }
};

export { seeders };
