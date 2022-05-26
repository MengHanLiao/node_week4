const handleError = require('../service/errorHandler');
const postModel = require('../models/posts');
const userModel = require('../models/users');
const handleSuccess = require('../service/successHandler');

const postController = {
  async getAllPosts(req, res, next) {
    /*
      #swagger.tags = ['Posts'] 
      #swagger.description = '取得所有貼文' 
      #swagger.responses[200] = {
        description: 'Posts successfully obtained.',
        schema: { $ref: "#/definitions/getPosts" }
      }
    */
    const timeSort = req.query.sort === "asc" ? "createAt" : "-createAt";
    const q = req.query.q !== undefined ? {"content": new RegExp(req.query.q)} : {};
    const posts = await postModel.find(q).populate({
      path: 'user',
      select: 'nickname photo',
    }).sort(timeSort);
    handleSuccess(res, posts);
  },
  async createPost(req, res, next) {
    /*
      #swagger.tags = ['Posts']
      #swagger.description = '新增單篇貼文' 
      #swagger.parameters['body'] = {
        in: 'body',
        description: '資料格式',
        type: 'object',
        required: true,
        schema: {
          $content: "youremail@email.com",
          image: "photoUrl",
          $user: "userId"
        }
      }
      #swagger.responses[200] = {
        description: "Post successfully created.",
        schema: { $ref: '#/definitions/updatePost' }
      }
      #swagger.responses[400] = {
        description: "Something wrong...",
        schema: { $ref: '#/definitions/error'}
      }
    */
    try {
      const { user, content, image } = req.body;
      const isUserExist = await userModel.findById(user);
      let userId = '628e1b950ee90e6531e32a2d'
      if (isUserExist) {
        userId = user;
      } else {
        handleError({ res, errCode: "40001" });
      }
      if (content) {
        const newPost = await postModel.create({
          content,
          image,
          user: userId,
        })
        handleSuccess(res, newPost);
      } else {
        handleError({ res, errCode: "40002" });
      }
    } catch (error) {
      handleError({ res, error });
    }
  },
  async deletePost(req, res, next) {
    /*
      #swagger.tags = ['Posts']
      #swagger.description = '刪除單篇貼文' 
      #swagger.responses[200] = {
        description: 'Successfully delete.',
        schema: { $ref: "#/definitions/getPosts" }
      }
      #swagger.responses[400] = {
        description: "Something wrong...",
        schema: { $ref: '#/definitions/error'}
      }
    */
    try {
      const result = await postModel.findByIdAndDelete(req.params.postId);
      if (result) {
        const allPost = await postModel.find().populate({
          path: 'user',
        });
        handleSuccess(res, allPost);
      } else {
        handleError({ res, errCode: "40001" });
      }
    } catch (error) {
      handleError({ res, error });
    }
  },
  async editPost(req, res, next) {
    /* 
      #swagger.tags = ['Posts']
      #swagger.description = '編輯單篇貼文'
      #swagger.responses[200] = {
        description: 'Successfully edit the post.',
        schema: { $ref: "#/definitions/updatePost" }
      }
      #swagger.responses[400] = {
        description: "Something wrong...",
        schema: { $ref: '#/definitions/error'}
      }
    */
    try{
      const editedPost = {};
      if(req.body.content) {
        editedPost.content = req.body.content;
      }
      if(req.body.hasOwnProperty("image")) {
        editedPost.image = req.body.image;
      }
      if(!req.body.content && !req.body.image) {
        handleError({ res, errCode: "40003" });
      }
      const result = await postModel.findByIdAndUpdate(req.params.postId, editedPost,{
        runValidators: true,
        new: true,
      });
      if(result) {
        handleSuccess(res, result);
      } else {
        handleError({ res, errCode: "40001" });
      }
    }catch (error) {
      handleError({ res, error });
    }
  }
};

module.exports = postController;