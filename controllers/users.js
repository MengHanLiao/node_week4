const userModel = require('../models/users');
const handleSuccess = require('../service/successHandler');
const handleError = require('../service/errorHandler');

const userController = {
  async getUser(req, res, next) {
    /*
      #swagger.tags = ['Users']
      #swagger.description = '取得全部使用者 id、暱稱' 
      #swagger.responses[200] = {
        description: 'Users successfully obtained.',
        schema: { $ref: "#/definitions/getUsers" }
      }
    */
    const user = await userModel.find().select('_id nickname');
    handleSuccess(res, user);
  },
  async registerUser(req, res, next) {
    /* 
      #swagger.tags = ['Users']
      #swagger.description = '新增使用者'
      #swagger.parameters['body'] = {
        in: 'body',
        description: '資料格式',
        type: 'object',
        required: true,
        schema: {
          $email: "youremail@email.com",
          $password: "yourpassword",
          $photo: "photoUrl",
          nickname: "暱稱"
        }
      }
      #swagger.responses[200] = { 
        description: 'User successfully registered.',
        schema: { $ref: "#/definitions/addUser" }
      }
      #swagger.responses[400] = { 
        description: 'Somthing wrong...',
        schema: { $ref: "#/definitions/error" }
      } 
    */
    try {
      const { email, password, photo, nickname } = req.body;
      if(email && password && photo) {
        const user = {
          email, password, photo
        }
        user.nickname = nickname ? nickname : '新用戶沒有暱稱';
        const newUser = await userModel.create(user);
        handleSuccess(res, newUser);
      } else if (!email || !password || !photo) {
        handleError({ res, errorCode: '40004' })
      }
    } catch (error) {
      handleError({ res, error })
    }
  }
};

module.exports = userController;