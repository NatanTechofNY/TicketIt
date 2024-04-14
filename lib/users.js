import { compare, hash } from 'bcrypt';
import { db } from './db';

export async function authenticateUser(email, password) {
    const user = await db.user.findUnique({
        where: { email },
    });
    if (user && await compare(password, user.passwordHash)) {
        return user;
    }
}

export async function createUser({ email, name, password, role }) {
    console.log('[createUser]', { email, name, password, role });
    const passwordHash = await hash(password, 10);
    return db.user.create({
        data: { email, name, passwordHash, role },
    });
}