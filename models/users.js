const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      require: [true, 'Email 欄位必填'],
    },
    password: {
      type: String,
      require: [true, 'Password 欄位必填'],
      select: false,
    },
    photo: {
      type: String,
      require: [true, '使用者圖片未選擇']
    },
    nickname: {
      type: String,
      default: 'MetaWall 新住戶'
    },
    gender: {
      type: String,
      enum: ["男性", "女性"],
      default: '男性'
    }
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const userModel = mongoose.model('User', userSchema);
module.exports = userModel;