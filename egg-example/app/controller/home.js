'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body = 'hi, egg';
  }
  async postUsermsg() {
    // console.log('走到这里了');
    const ctx = this.ctx;
    const Usermsg = ctx.model.Usermsg;
    const TotalUser = ctx.model.TotalUser;
    // console.log(ctx.request.body);
    const data = ctx.request.body;
    
    const haveUser1 = await new Promise((resolve,reject) => {
      Usermsg.findOne({openId: data.openId},(err,doc) => {
        if(doc){
          resolve(true);
        }else{
          resolve(false);
        }
      })
    });
    
    // console.log(haveUser1);
    if (haveUser1) {
      var userUpdateMessage = await new Promise((resolve, reject) => {
        Usermsg.update({openId: data.openId},{
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
        },(err) => {
          if (!err) {
            resolve('ok');
          } else {
            resolve(err);
          }
        })
      });
      
    }else{
      const usermsg = new Usermsg({
        openId: data.openId,
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
        deleted: false,
      });
      usermsg.save();
    };
    
    ctx.body = 'ok';
  }
  async getUsermsg() {
    const ctx = this.ctx;
    const Usermsg = ctx.model.Usermsg;
    const TotalUser = ctx.model.TotalUser;
    const openId = ctx.request.body.openId;
    // console.log(data);
    // console.log(openId);
    
    const haveUser2 = await new Promise((resolve,reject) => {
      TotalUser.findOne({openId: openId},(err,doc) => {
        if(doc){
          resolve(true);
        }else{
          resolve(false);
        }
      })
    });
    if (haveUser2 == false) {
      const totalUser = new TotalUser({
        openId: openId,
      });
      totalUser.save();
    }

    const user = await new Promise((resolve,reject) => {
      Usermsg.findOne({openId: openId},(err,doc) => {
        resolve(doc);
      })
    });
    if(user){
      ctx.body = user;
    }else{
      ctx.body = "ok"
    }
  }
  async getList() {
    const ctx = this.ctx;
    const Usermsg = ctx.model.Usermsg;
    const userList = await new Promise((resolve,reject) => {
      Usermsg.find({deleted: false},(err,doc) => {
        resolve(doc);
      })
    })
    ctx.body = userList;
  }
  async getData() {
    const ctx = this.ctx;
    const Usermsg = ctx.model.Usermsg;
    const TotalUser = ctx.model.TotalUser;
    const allUser = await new Promise((resolve,reject) => {
      resolve(TotalUser.count());
    }); 
    const totalNum = await new Promise((resolve,reject) => {
      resolve(Usermsg.count());
    });
    const boyNum = await new Promise((resolve,reject) => {
      resolve(Usermsg.count({sex:"boy"}));
    });
    const girlNum = await new Promise((resolve,reject) => {
      resolve(Usermsg.count({sex:"girl"}));
    });
    let data = {
      allUser: allUser,
      totalNum: totalNum,
      boyNum: boyNum,
      girlNum: girlNum
    }
    // console.log(girlNum);
    ctx.body = data;
  }
  async editData() {
    const ctx = this.ctx;
    const Usermsg = ctx.model.Usermsg;
    // console.log(ctx.request.body);
    const data = ctx.request.body;

    var userUpdateMessage = await new Promise((resolve, reject) => {
      Usermsg.update({openId: data.openId},{
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
      },(err) => {
        if (!err) {
          resolve('ok');
        } else {
          resolve(err);
        }
      })
    });
    if(userUpdateMessage == 'ok') {
      const userList = await new Promise((resolve,reject) => {
        Usermsg.find({deleted: false},(err,doc) => {
          resolve(doc);
        })
      })
      ctx.body = userList;
    }else{
      ctx.body = userUpdateMessage;
    }
  }
  async deleteData() {
    const ctx = this.ctx;
    const Usermsg = ctx.model.Usermsg;
    // console.log(ctx.request.body);
    const data = ctx.request.body;

    var userUpdateMessage = await new Promise((resolve, reject) => {
      Usermsg.update({openId: data.openId},{
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
        deleted: data.deleted
      },(err) => {
        if (!err) {
          resolve('ok');
        } else {
          resolve(err);
        }
      })
    });
    if(userUpdateMessage == 'ok') {
      const userList = await new Promise((resolve,reject) => {
        Usermsg.find({deleted: false},(err,doc) => {
          resolve(doc);
        })
      })
      ctx.body = userList;
    }else{
      ctx.body = userUpdateMessage;
    }
  }
}

module.exports = HomeController;
