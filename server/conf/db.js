let MYSQL_CONF = {
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'root',
  port: process.env.MYSQL_PORT || '3306',
  database: process.env.MYSQL_DATABASE || 'myblog',
}

let REDIS_CONF = {
  port: process.env.REDIS_PORT || 6379,
  host: process.env.REDIS_HOST || '127.0.0.1',
}

module.exports = {
  MYSQL_CONF,
  REDIS_CONF,
}
