'use server';

import { redirect } from 'next/navigation';
import { setSessionCookie } from '@/lib/auth';
import { createUser } from '@/lib/users';

export async function registerAction(formData) {
    const data = {
        email: formData.get('email'),
        name: formData.get('name'),
        password: formData.get('password'),
    };

    // If there is an +admin in the email then let them be an admin to they can see tickets/reply
    if (data.email.includes('+admin')) {
        data.role = 'admin';
    } else {
        data.role = 'user';
    }

    const user = await createUser(data);
    console.log('[signUpAction] user:', user);
    await setSessionCookie(user);
    redirect('/');
}