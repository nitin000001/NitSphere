import jwt from 'jsonwebtoken'

export const generateTokens = (id, res) =>{
  const token = jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn : "1d"
    });

    res.cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict"
    });
}