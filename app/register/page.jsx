import Link from 'next/link';
import Heading from '@/components/Heading';
import RegistrationForm from '@/components/RegistrationForm';

export const metadata = {
    title: 'Register',
};

export default function SignUpPage() {
    return (
        <>
            <Heading>Register</Heading>
            <RegistrationForm />
            <div className="py-3">
                Already registered?{' '}
                <Link href="/login" className="text-blue-800 hover:underline">
                    Login
                </Link> instead
            </div>
        </>
    );
}