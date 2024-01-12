const Users = require("../schemas/user.schema");

const authorize = async (req, res, next) => {
  const { auth_token } = req.body;

  if (!auth_token) {
    res.status(401).json({ message: "Не сте въвели вашият токен" });
    return;
  }

  const user = await Users.find({ auth_token: auth_token });
  if (!user) {
    res.status(401).json({ message: "Не съществува такъв токен" });
    return;
  }

  req.auth_token = auth_token;
  next();
};

module.exports = authorize;
