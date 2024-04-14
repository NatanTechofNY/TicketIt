import {SignJWT, jwtVerify} from 'jose';
import {cookies} from 'next/headers';
import { cache } from 'react';

/**
 * The name of the cookie that stores the session token
 * @type {string}
 */
const JWT_COOKIE = 'sessionToken';

/**
 * The duration of the JWT in milliseconds (2 weeks)
 * @type {number}
 */
const JWT_DURATION = 14 * 24 * 60 * 60 * 1000;

/**
 * The secret key used to sign and verify the JWT
 * @type {Uint8Array}
 */
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

/**
 * Decodes a session token and returns the payload.
 * If the token is invalid, logs a warning and returns undefined.
 *
 * @async
 * @function
 * @param {string} sessionToken - The session token to decode.
 * @returns {Promise<Object|undefined>} The payload of the session token, or undefined if the token is invalid.
 */
const decodeSessionToken = cache(async (sessionToken) => {
    try {
        const { payload } = await jwtVerify(sessionToken, JWT_SECRET);
        return payload;
    } catch (error) {
        console.warn('Invalid JWT', error);
    }
});

/**
 * Retrieves the session token from the cookies and decodes it.
 * If no session token is found, returns undefined.
 *
 * @async
 * @function
 * @returns {Promise<Object|undefined>} The payload of the session token, or undefined if no session token is found.
 */
export async function getUserFromSession() {
    const sessionToken = cookies().get(JWT_COOKIE)?.value;
    if (sessionToken) {
        return decodeSessionToken(sessionToken);
    }
}

/**
 * Deletes the session cookie.
 *
 * @function
 */
export function deleteSessionCookie() {
    cookies().delete(JWT_COOKIE);
}

/**
 * Creates a session token for the given user and sets it as a cookie.
 * The session token is a JWT that contains the user's id, email, name, and role.
 * The JWT is signed with the secret key and expires after the specified duration.
 *
 * @async
 * @function
 * @param {Object} user - The user for whom to create the session token.
 * @param {string} user.id - The id of the user.
 * @param {string} user.email - The email of the user.
 * @param {string} user.name - The name of the user.
 * @param {string} user.role - The role of the user.
 */
export async function setSessionCookie({id, email, name, role}) {
    const expirationTime = new Date(Date.now() + JWT_DURATION);
    const sessionToken = await new SignJWT({id, email, name, role})
        .setProtectedHeader({alg: 'HS256'})
        .setExpirationTime(expirationTime)
        .sign(JWT_SECRET);
    cookies().set(JWT_COOKIE, sessionToken, {
        expires: expirationTime,
        httpOnly: true,
        sameSite: 'lax',
    });
}