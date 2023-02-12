const register = require("./register");
const login = require("./login");
const getCurrent = require('./getCurrent');
const logout = require('./logout');
const updateSubscriptions = require('./updateSubscription');
const updateAvatar = require('./updateAvatar');

module.exports = { register, login, getCurrent, logout, updateSubscriptions, updateAvatar };
