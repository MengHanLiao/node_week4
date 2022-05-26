const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    "title": "week4",
    "description": "node 直播班第四週 api"
  },
  host: 'pacific-brook-09609.herokuapp.com',
  schemes: ['http', 'https'],
  definitions: {
    getUsers: {
      "status": "success",
      "data": [{
        "_id": "userId",
        "nickname": "暱稱"
      }]
    },
    addUser: {
      "status": "success",
      "data": {
        "email": "youremail@email.com",
        "password": "yourPassword",
        "photo": "url",
        "nickname": "暱稱",
        "gender": "男性",
        "_id": "userId",
        "createdAt": "2022-05-26T05:54:49.659Z",
        "updatedAt": "2022-05-26T05:54:49.659Z"
      }
    },
    getPosts: {
      "status": "success",
      "data": [{
        "_id": "postId",
        "content": "This is content",
        "image": "photoUrl",
        "user": {
            "_id": "userId",
            "photo": "userPhoto",
            "nickname": "userNicname"
        },
        "createAt": "2022-05-25T14:17:11.890Z"
      }]
    },
    updatePost: {
      "status": "success",
      "data": {
          "content": "This is post content.",
          "image": "imageUrl",
          "user": "userId",
          "_id": "postId",
          "createAt": "2022-05-26T12:53:01.478Z"
      }
    },
    error: {
      status: "error",
      message: "errorMessage"
    }
  }
}

const outputFile = './swagger-output.json';
const endpointsFiles = ['./app.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);