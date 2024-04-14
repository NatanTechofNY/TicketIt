import Link from 'next/link';
import Heading from '@/components/Heading'
import LoginForm from '@/components/LoginForm'

export const metadata = {
    title: 'Login',
    description: 'Login to your account'
}

export default function LoginPage() {
    return (
        <>
            <Heading>Login</Heading>
            <LoginForm/>
            <div className="py-3">
                Not yet registered?{' '}
                <Link href="/register" className="text-blue-800 hover:underline">
                    Register
                </Link> instead
            </div>
        </>
    )
}