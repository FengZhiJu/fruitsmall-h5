let sqlobj = require('../../mysql/index')
let mysql = require('../../mysql/index')
let baseURL = 'http://127.0.0.1:3000/imgs/'

module.exports = {
  baseURL,
  setImgs(fruitsArr) {
    fruitsArr.forEach(item => {
      item.img = `${baseURL}fullFruits/${item.category}/${item.belong}/${item.name}.jpg`
    })
  },

  setHeader(router) {
    router.all('*', (req, res, next) => {

      res.setHeader('Access-Control-Allow-Origin', 'http://localhost')
        // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080')
      res.header('Access-Control-Allow-Credentials', 'true');
      res.header('Access-Control-Allow-Headers', 'Content-Type');

      next();
    })
  },
  getUserCart(user) {
    return new Promise(async(res, rej) => {
      let sql = 'select * from cart inner join fruits on cart.fruits = fruits.id where cart.user = ?'
      let result = await mysql.sql(sql, [user]);
      let regular = /(.*?)T(.*?)\./;
      result.forEach(item => {
        item.tick = item.tick == 'true' ? true : false;
        item.isFinish = item.isFinish == 'false' ? false : true
      })
      this.setImgs(result);
      res(result);
    })
  }
}