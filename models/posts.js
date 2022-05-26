const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      require: [true, '請填寫貼文內容'],
    },
    image: {
      type: String,
      default: '',
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      require: [true, '貼文 id 未填寫'],
    },
    createAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  }
); 

const PostModel = mongoose.model('Post', postSchema);
module.exports = PostModel;