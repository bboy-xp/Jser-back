'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body = 'hi, egg';
  }
  async postUsermsg() {
    const ctx = this.ctx;
    const Usermsg = ctx.model.Usermsg;
    // console.log(ctx.request.body);
    const data = ctx.request.body;
    const usermsg = new Usermsg({
      name: data.name,
      sex: data.sex,
      grade: data.grade,
      major: data.major,
      college: data.college,
      phoneNum: data.phoneNum,
      level: data.level,
      reason: data.reason,
      introduce: data.introduce,
      otherReason: data.otherReason,
    });
    usermsg.save();

    ctx.body = 'ok';
  }
}

module.exports = HomeController;
