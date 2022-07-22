const isAuth = (req, res, next) => {
    if (req?.cookies?.cookieName) {
        console.log('authed', req.cookies)
      return next();
    } else {
      return res.send({code: 'NOT_AUTHENTICATED'});
    }
  }

  module.exports = { isAuth }
