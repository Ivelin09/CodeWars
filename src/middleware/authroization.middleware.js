const authorize = (req, res, next) => {
    const {token} = req.body;

    if(!token) {
        res.status(401).json({ message: "Не сте въвели вашият токен"});
        return;
    }
    req.token = token;

    next();
}

module.exports = authorize;