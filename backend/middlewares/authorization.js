const isCustomer = (req, res, next) => {
  if (req.role !== "customer") {
    return res.status(403).send({ message: "Require Customer Role!" });
  }
  next();
};

const isAdmin = (req, res, next) => {
  if (req.role !== "admin") {
    return res.status(403).send({ message: "Require Admin Role!" });
  }
  next();
};

module.exports = {
  isCustomer,
  isAdmin,
};
