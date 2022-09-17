import * as jwt from 'jsonwebtoken';

export function jwtSign(payload: any): Promise<string> {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1d' },
      (err, token) => {
        if (err) {
          reject(err);
        }

        return resolve(token);
      },
    );
  });
}

export function jwtVerify(token: string): Promise<jwt.Jwt> {
  return new Promise((resolve, reject) => {
    jwt.verify(
      token,
      process.env.JWT_SECRET,
      { complete: true },
      (error, decoded) => {
        if (error) {
          reject(error);
        }

        return resolve(decoded);
      },
    );
  });
}
