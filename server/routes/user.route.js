const { authjwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // initialize user as creator
  app.put("/api/user/become-creator", [authjwt.verifyToken], controller.initializeCreator);

  // edit user profile
  app.put("/api/user/profile", [authjwt.verifyToken], controller.updateUserProfile);

  // search for user that is a creator
  app.get("/api/user/search", [authjwt.verifyToken], controller.searchCreators);

  // delete user
  app.delete("/api/user", [authjwt.verifyToken], controller.deleteUser);

  // get user 
  app.get("/api/user", controller.getUser);
  app.get("/api/user/data", [authjwt.verifyToken], controller.getUserDataWithRelations);

  app.get("/api/test/all",[authjwt.verifyToken], controller.allAccess);

  // app.get(
  //   "/api/test/user",
  //   [authjwt.verifyToken],
  //   controller.userBoard
  // );

  // app.get(
  //   "/api/test/mod",
  //   [authjwt.verifyToken, authjwt.isModerator],
  //   controller.moderatorBoard
  // );

  // app.get(
  //   "/api/test/admin",
  //   [authjwt.verifyToken, authjwt.isAdmin],
  //   controller.adminBoard
  // );
};