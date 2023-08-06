const Hapi = require('@hapi/hapi');
const HapiCors = require('hapi-cors');
const mongoose = require('mongoose');
const { addTextHandler, getTextsHandler } = require('./routes/textRoutes');

const init = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/vue_project_db', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  }

  const server = Hapi.server({
    port: 3000,
    host: 'localhost',
  });

  await server.register({
    plugin: HapiCors,
    options: {
      origins: ['http://localhost:5173', 'http://localhost:3000'],
    },
  });

  server.route([
    {
      method: 'POST',
      path: '/api/addText',
      handler: addTextHandler,
    },
    {
      method: 'GET',
      path: '/api/getTexts',
      handler: getTextsHandler,
    },
  ]);

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.error('Unhandled rejection:', err);
  process.exit(1);
});

init();
