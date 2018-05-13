module.exports = app => {
    const mongoose = app.mongoose;
    const TotalUserSchema = new mongoose.Schema({
      openId: { type: String },
    },{
      timestamps: true,
    });
  
    return mongoose.model('TotalUser', TotalUserSchema);
  }