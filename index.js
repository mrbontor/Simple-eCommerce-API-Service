const App = require('./app');
const Logging = require('./app/helpers/logging');
const port = process.env.PORT || 3000;

App.listen(port);
Logging.info('[APP] API-CART-ECOMMERCE STARTED on ' + port);
