"use strict";

const userController = require("../controllers/userController");
const postController = require("../controllers/postController");

module.exports = function(app) {
  app.route("/auth/register").post(userController.register);
  app.route("/auth/login").post(userController.login);
  app.route("/auth/ping").post(userController.loginRequired, (req, res) => {
    res.json({ message: "Ok" });
  });
  app
    .route("/auth/detail")
    .post(userController.loginRequired, userController.userDetail);

  app
    .route("/posts")
    .get(postController.list)
    .post(userController.loginRequired, postController.create);

  app
    .route("/posts/:postId")
    .get(postController.read)
    .put(postController.update)
    .delete(postController.delete);
};
