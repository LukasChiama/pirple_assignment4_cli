const environments = {};

environments.staging = {
  'templateGlobals': {
    'appName': 'OrderPizza',
    'companyName': 'PizzaUniverse, Inc.',
    'yearCreated': '2018',
    'baseUrl': 'http://localhost:2000/'
  }
}

const currentEnv = typeof (process.env.NODE_ENV) === 'string' ? process.env.NODE_ENV.toLowerCase() : '';

const exportEnv = typeof environments[currentEnv] === 'object' ? environments[currentEnv] : environments.staging;

module.exports = exportEnv;