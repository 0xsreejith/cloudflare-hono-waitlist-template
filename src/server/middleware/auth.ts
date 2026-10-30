import { createMiddleware } from "hono/factory";
import { jwtVerify, createRemoteJWKSet } from "jose";

type Env = {
  Bindings: {
    ENVIRONMENT?: string;
    POLICY_AUD?: string;
    CF_ACCESS_DOMAIN?: string;
  };
};

export const accessAuth = createMiddleware<Env>(async (c, next) => {
  if (c.env.ENVIRONMENT === "development") {
    await next();
    return;
  }

  if (!c.env.POLICY_AUD) {
    return c.json("Missing required audience", 403);
  }

  if (!c.env.CF_ACCESS_DOMAIN) {
    return c.json("Missing required CF Access domain", 403);
  }

  // Get the JWT from the request headers
  const token = c.req.header("cf-access-jwt-assertion");

  // Check if token exists
  if (!token) {
    return c.json("Missing required CF Access JWT", 403);
  }

  try {
    // Normalize domain in case /cdn-cgi/access/certs or trailing slash was included
    const domain = c.env.CF_ACCESS_DOMAIN.replace(
      /\/cdn-cgi\/access\/certs\/?$/,
      "",
    ).replace(/\/$/, "");

    // Create JWKS from your team domain
    const JWKS = createRemoteJWKSet(new URL(`${domain}/cdn-cgi/access/certs`));

    await jwtVerify(token, JWKS, {
      issuer: domain,
      audience: c.env.POLICY_AUD,
    });

    await next();
  } catch (err) {
    const error = err as Error;
    return c.json(`Invalid token: ${error.message}`, 403);
  }
});
