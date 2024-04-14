'use client'

/**
 * Import necessary actions and hooks
 */
import { registerAction } from '@/app/register/actions';
import { useFormState } from '@/lib/hooks';

/**
 * SignUpForm function is the main component of the registration form.
 * It uses the useFormState hook to manage the form state and handle form submission.
 * The form consists of three input fields for email, name, and password, and a submit button.
 * If there is an error in the form state, an error message is displayed.
 *
 * @function
 * @returns {JSX.Element} The rendered SignUpForm component
 */
export default function SignUpForm() {
    /**
     * Use the useFormState hook to manage the form state and handle form submission.
     * The registerAction is passed as the argument to the useFormState hook.
     * @type {Array}
     */
    const [state, handleSubmit] = useFormState(registerAction);

    /**
     * Render the SignUpForm component
     * The form consists of three input fields for email, name, and password, and a submit button.
     * If there is an error in the form state, an error message is displayed.
     */
    return (
        <form onSubmit={handleSubmit}
              className="border bg-white flex flex-col gap-2
                 max-w-screen-sm mt-3 px-3 py-3 rounded">
            <div className="flex">
                <label htmlFor="emailField" className="shrink-0 w-32">
                    Email
                </label>
                <input id="emailField" name="email" type="email" required
                       className="border px-2 py-1 rounded w-full"
                />
            </div>
            <div className="flex">
                <label htmlFor="nameField" className="shrink-0 w-32">
                    Name
                </label>
                <input id="nameField" name="name" type="text" required
                       className="border px-2 py-1 rounded w-full"
                />
            </div>
            <div className="flex">
                <label htmlFor="passwordField" className="shrink-0 w-32">
                    Password
                </label>
                <input id="passwordField" name="password" type="password" required
                       className="border px-2 py-1 rounded w-full"
                />
            </div>
            {Boolean(state.error) && (
                <p className="text-red-700">{state.error.message}</p>
            )}
            <button type="submit" disabled={state.loading}
                    className="bg-blue-500 rounded px-2 py-1 self-center
                   text-slate-50 w-32 hover:bg-blue-700
                   disabled:bg-slate-500 disabled:cursor-not-allowed">
                Submit
            </button>
        </form>
    );
}