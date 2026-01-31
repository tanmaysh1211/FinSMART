// import jwt from "jsonwebtoken";

// export const signToken = (user) =>
//   jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

import jwt from "jsonwebtoken";

export const signToken = (user) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET not defined");
  }

  return jwt.sign(
    { id: user._id.toString() },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};
