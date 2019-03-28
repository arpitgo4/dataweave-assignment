
import chalk from 'chalk';
import Sequelize from 'sequelize';

const { MYSQL_DATABASE, MYSQL_ROOT_PASSWORD, MYSQL_HOST,  } = process.env;

if (!MYSQL_HOST) {
  console.log(chalk.red.bold(`[mysql] $MYSQL_HOST value: ${MYSQL_HOST}`));
  process.exit(1);
}

const [ MYSQL_HOST_IP, MYSQL_HOST_PORT ] = MYSQL_HOST.split(':');

const sequelize = new Sequelize(MYSQL_DATABASE, 'root', MYSQL_ROOT_PASSWORD, {
  host: MYSQL_HOST_IP,
  dialect: 'mysql',
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
});


sequelize.authenticate()
.then(() => {
    console.log(chalk.green.bold('[sequelize] Connection has been established successfully.'));
})
.catch(err => {
    console.error(chalk.red.bold('[sequelize] Unable to connect to the database:', err));
});

export default sequelize;