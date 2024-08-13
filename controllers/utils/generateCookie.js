import jwt from "jsonwebtoken";

export const generateCookie = (email) => {
  // Generate JWT token
  const token = jwt.sign({ email }, "hello", {
    expiresIn: "24h",
  });
  // console.log(token, "token");

  return token;
};
