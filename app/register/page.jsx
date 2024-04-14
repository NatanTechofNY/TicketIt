/**
 * Import necessary components and libraries
 */
import Link from 'next/link';
import Heading from '@/components/Heading';
import RegistrationForm from '@/components/RegistrationForm';

/**
 * Metadata for the registration page
 * @type {Object}
 */
export const metadata = {
    title: 'Register',
};

/**
 * SignUpPage function is the main component of the registration page.
 * It renders the Heading and RegistrationForm components, and provides a link to the login page.
 *
 * @function
 * @returns {JSX.Element} The rendered SignUpPage component
 */
export default function SignUpPage() {
    return (
        <>
            {/* Render the Heading component with the text "Register" */}
            <Heading>Register</Heading>

            {/* Render the RegistrationForm component */}
            <RegistrationForm />

            {/* Render a link to the login page */}
            <div className="py-3">
                Already registered?{' '}
                <Link href="/login" className="text-blue-800 hover:underline">
                    Login
                </Link> instead
            </div>
        </>
    );
}