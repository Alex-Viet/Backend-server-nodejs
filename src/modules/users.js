const fs = require("fs");
const path = require("path");

const getUsers = () => {
  const filePath = path.join(__dirname, "../data/users.json");
  try {
    const data = fs.readFileSync(filePath, "utf8");
    return JSON.parse(data);
  } catch (err) {
    throw err;
  }
};

module.exports = getUsers;
