'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.post('/postUsermsg',controller.home.postUsermsg);
  router.post('/getUsermsg',controller.home.getUsermsg);
  router.get('/getList',controller.home.getList);
  router.get('/getData',controller.home.getData)
};
