import jwt from "jsonwebtoken";

export const sendCookie = (user, res, message, statusCode = 200) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
  res
    .status(statusCode)
    .cookie("token", token, {
      // httpOnly: true,
      maxAge: 10 * 60 * 60 * 1000,  // for 10 days
    })
    .json({
      success: true,
      message,
    });
};