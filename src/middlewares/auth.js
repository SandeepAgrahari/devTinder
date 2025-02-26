const adminAuth = (req, res, next) => {
  const token = "xyz";
  const isAuthenticated = token === "xyz";
  console.log("Checking User is Authenticated!");
  if (!isAuthenticated) {
    res.status(401).send("Unathorized User!");
  } else {
    next();
  }
};

const userAuth = (req, res, next) => {
  const token = "xyz1";
  const isAuthenticated = token === "xyz";
  console.log("Checking User is Authenticated!");
  if (!isAuthenticated) {
    res.status(401).send("Unathorized User!");
  } else {
    next();
  }
};

module.exports = {
  adminAuth,
  userAuth,
};
