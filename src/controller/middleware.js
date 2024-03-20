const jwt = require("jsonwebtoken");
async function authentication (req, res, next){
    let jwtToken;
    const authenticationHeaders = req.headers["authorization"];
    if (authenticationHeaders !== undefined) {
      jwtToken = authenticationHeaders.split(" ")[1];
    }
    if (jwtToken === undefined) {
      res.send("invalid user");
    } else {
      jwt.verify(jwtToken, "todouserlogin", async (err, user) => {
        if (err) {
          res.send("Invalid jwtToken");
        } else {
          req.user = user;
          next();
        }
      });
    }
  };

module.exports = authentication