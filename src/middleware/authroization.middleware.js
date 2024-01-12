const Users = require("../schemas/user.schema");

const authorize = async (req, res, next) => {
  const { token } = req.body;

  if (!token) {
    res.status(401).json({ message: "Не сте въвели вашият токен" });
    return;
  }

  const user = await Users.find({ token: token });
  if (!user) {
    res.status(401).json({ message: "Не съществува такъв токен" });
    return;
  }

  req.token = token;
  next();
};

module.exports = authorize;
