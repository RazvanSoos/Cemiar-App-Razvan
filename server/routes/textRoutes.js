const TextModel = require('../models/TextModel');

const addTextHandler = async (request, h) => {
  const { text, userName } = request.payload;
  try {
    const currentTime = new Date().toISOString();

    const newText = await TextModel.create({ text, timestamp: currentTime, userName });
    return h.response({ message: 'Text added: ' + text, timestamp: currentTime, userName }).code(201);
  } catch (error) {
    return h.response({ error: 'Failed to add text.' }).code(500);
  }
};

const getTextsHandler = async (request, h) => {
  try {
    const texts = await TextModel.find();
    return h.response(texts).code(200);
  } catch (error) {
    return h.response({ error: 'Failed to fetch texts.' }).code(500);
  }
};

module.exports = {
  addTextHandler,
  getTextsHandler,
};
