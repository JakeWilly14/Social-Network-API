const { connect, connection } = require('mongoose');

// After you create your Heroku application, visit https://dashboard.heroku.com/apps/ select the application name and add your Atlas connection string as a Config Var
// Node will look for this environment variable and if it exists, it will use it. Otherwise, it will assume that you are running this application locally

//

//

//* * * Set endpoint database when we know what it is * * * //

//

//

const connectionString =
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/------';

connect(connectionString);

module.exports = connection;