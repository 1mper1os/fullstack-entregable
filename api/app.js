'use strict';

const express = require('express');
const morgan = require('morgan');
const routes = require('./routes');
const { sequelize } = require('./models');
const cors = require('cors');

const enableGlobalErrorLogging = process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';

const app = express();

app.use(cors());

app.use(express.json());

app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.json({
    message: '',
  });
});

app.use('/api', routes);

app.use((req, res) => {
  res.status(404).json({
    message: 'Route Not Found',
  });
});

app.use((err, req, res, next) => {
  if (enableGlobalErrorLogging) {
    console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
  }

  res.status(err.status || 500).json({
    message: err.message,
    error: {},
  });
});

app.set('port', process.env.PORT || 5000);

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

sequelize.sync()
  .then(() => {
    const server = app.listen(app.get('port'), () => {
      console.log(`Express server is listening on port ${server.address().port}`);
    });
  });
