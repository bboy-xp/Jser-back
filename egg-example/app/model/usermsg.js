module.exports = app => {
    const mongoose = app.mongoose;
    const UsermsgSchema = new mongoose.Schema({
      openId: { type: String },
      name: { type: String },
      sex: { type: String },
      grade: { type: String },
      major: { type: String },
      college: { type: String },
      phoneNum: { type: String },
      level: { type: String },
      reason: { type: Array },
      introduce: { type: String },
      otherReason: { type: String },
    },{
      timestamps: true,
    });
  
    return mongoose.model('Usermsg', UsermsgSchema);
  }