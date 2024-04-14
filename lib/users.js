import { compare, hash } from 'bcrypt';
import { db } from './db';

/**
 * Authenticates a user with the given email and password.
 * It first retrieves the user with the given email from the database.
 * If a user is found and the given password matches the user's password hash, it returns the user.
 * Otherwise, it returns undefined.
 *
 * @async
 * @function
 * @param {string} email - The email of the user.
 * @param {string} password - The password of the user.
 * @returns {Promise<Object|undefined>} The authenticated user, or undefined if authentication failed.
 */
export async function authenticateUser(email, password) {
    const user = await db.user.findUnique({
        where: { email },
    });
    if (user && await compare(password, user.passwordHash)) {
        return user;
    }
}

/**
 * Creates a new user with the given data.
 * It first hashes the given password.
 * It then creates a new user in the database with the given email, name, and role, and the hashed password.
 *
 * @async
 * @function
 * @param {Object} userData - The data for the new user.
 * @param {string} userData.email - The email of the user.
 * @param {string} userData.name - The name of the user.
 * @param {string} userData.password - The password of the user.
 * @param {string} userData.role - The role of the user.
 * @returns {Promise<Object>} The created user.
 */
export async function createUser({ email, name, password, role }) {
    console.log('[createUser]', { email, name, password, role });
    const passwordHash = await hash(password, 10);
    return db.user.create({
        data: { email, name, passwordHash, role },
    });
}