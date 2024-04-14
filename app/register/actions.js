'use server';

/**
 * Import necessary libraries and modules
 */
import { redirect } from 'next/navigation';
import { setSessionCookie } from '@/lib/auth';
import { createUser } from '@/lib/users';

/**
 * The `registerAction` function is used to register a new user.
 * It takes form data as input, extracts the email, name, and password, and creates a new user.
 * If the email includes '+admin', the user is assigned the 'admin' role, otherwise, they are assigned the 'user' role.
 * After the user is created, a session cookie is set and the user is redirected to the home page.
 *
 * @async
 * @function
 * @param {FormData} formData - The form data from the registration form.
 * @returns {void}
 */
export async function registerAction(formData) {
    /**
     * Extract the email, name, and password from the form data
     * @type {Object}
     */
    const data = {
        email: formData.get('email'),
        name: formData.get('name'),
        password: formData.get('password'),
    };

    /**
     * If the email includes '+admin', assign the 'admin' role, otherwise assign the 'user' role
     */
    if (data.email.includes('+admin')) {
        data.role = 'admin';
    } else {
        data.role = 'user';
    }

    /**
     * Create the user
     * @type {Object}
     */
    const user = await createUser(data);

    /**
     * Log the created user
     */
    console.log('[signUpAction] user:', user);

    /**
     * Set a session cookie and redirect to the home page
     */
    await setSessionCookie(user);
    redirect('/');
}