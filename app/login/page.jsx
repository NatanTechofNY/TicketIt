/**
 * Import necessary components and libraries
 */
import Link from 'next/link';
import Heading from '@/components/Heading'
import LoginForm from '@/components/LoginForm'

/**
 * Metadata for the login page
 * @type {Object}
 */
export const metadata = {
    title: 'Login',
    description: 'Login to your account'
}

/**
 * LoginPage function is the main component of the login page.
 * It renders the Heading and LoginForm components, and provides a link to the registration page.
 *
 * @function
 * @returns {JSX.Element} The rendered LoginPage component
 */
export default function LoginPage() {
    return (
        <>
            {/* Render the Heading component with the text "Login" */}
            <Heading>Login</Heading>

            {/* Render the LoginForm component */}
            <LoginForm/>

            {/* Render a link to the registration page */}
            <div className="py-3">
                Not yet registered?{' '}
                <Link href="/register" className="text-blue-800 hover:underline">
                    Register
                </Link> instead
            </div>
        </>
    )
}