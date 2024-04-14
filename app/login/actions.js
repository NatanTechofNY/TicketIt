'use server';

import { setSessionCookie } from '@/lib/auth';
import {redirect} from "next/navigation";
import { authenticateUser } from '@/lib/users';


export async function loginAction(formData) {
    const email = formData.get('email');
    const password = formData.get('password');
    const user = await authenticateUser(email, password);
    if (!user) {
        return { isError: true, message: 'Invalid credentials' };
    }
    await setSessionCookie(user);
    redirect('/');
}