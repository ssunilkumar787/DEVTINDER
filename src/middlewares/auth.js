const userAuth = (req, res, next) => {
  const token = "xyz";

  const isUserAuthorized = (token === "xyz");

  if (!isUserAuthorized) {
    res.status(401).send("Unauthorized request");
  } else {
    next();
  }
};

module.exports = {
  userAuth,
};
