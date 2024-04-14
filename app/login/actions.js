'use server';

/**
 * Import necessary libraries and modules
 */
import { setSessionCookie } from '@/lib/auth';
import {redirect} from "next/navigation";
import { authenticateUser } from '@/lib/users';

/**
 * The `loginAction` function is used to authenticate a user.
 * It takes form data as input, extracts the email and password, and attempts to authenticate the user.
 * If the user is authenticated successfully, a session cookie is set and the user is redirected to the home page.
 * If the authentication fails, an error message is returned.
 *
 * @async
 * @function
 * @param {FormData} formData - The form data from the login form.
 * @returns {Object} An object containing a boolean indicating whether an error occurred and a message string.
 */
export async function loginAction(formData) {
    /**
     * Extract the email and password from the form data
     * @type {string}
     */
    const email = formData.get('email');
    const password = formData.get('password');

    /**
     * Attempt to authenticate the user
     * @type {Object}
     */
    const user = await authenticateUser(email, password);

    /**
     * If the user is not authenticated, return an error message
     */
    if (!user) {
        return { isError: true, message: 'Invalid credentials' };
    }

    /**
     * If the user is authenticated, set a session cookie and redirect to the home page
     */
    await setSessionCookie(user);
    redirect('/');
}