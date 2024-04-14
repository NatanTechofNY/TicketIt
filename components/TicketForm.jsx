'use client'
/**
 * Import necessary actions and hooks
 */
import {createTicketAction} from "@/lib/serverActions";
import {useFormState} from "@/lib/hooks";

/**
 * TicketForm function is the main component of the ticket submission form.
 * It uses the useFormState hook to manage the form state and handle form submission.
 * The form consists of two input fields for subject and message, and a submit button.
 * If there is an error in the form state, an error message is displayed.
 * If the user is an admin, a message is displayed stating that admins cannot submit tickets.
 *
 * @function
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.userName - The name of the user.
 * @param {string} props.userEmail - The email of the user.
 * @param {string} props.userRole - The role of the user.
 * @returns {JSX.Element} The rendered TicketForm component
 */
export default function TicketForm({userName, userEmail, userRole}) {

    /**
     * Use the useFormState hook to manage the form state and handle form submission.
     * The createTicketAction is passed as the argument to the useFormState hook.
     * @type {Array}
     */
    const [state, handleSubmit] = useFormState(createTicketAction);

    /**
     * If the user is an admin, render a message stating that admins cannot submit tickets.
     */
    if (userRole === 'admin') {
        return (
            <p className="bg-red-500 text-white text-center rounded p-2">
                Admins cannot submit tickets. Click on a ticket below to view/respond to it.
            </p>
        );
    }

    /**
     * Render the TicketForm component
     * The form consists of two input fields for subject and message, and a submit button.
     * If there is an error in the form state, an error message is displayed.
     */
    return (
        <form onSubmit={handleSubmit} className="border bg-white flex flex-col gap-3 mt-3 px-3 py-2 rounded">
            <p className={"pb-1"}>
                Fill out the form below to submit a ticket.
            </p>
            <div className={"flex"}>
                <label className={"shrink-0 w-full"}>
                    <span className="font-semibold">Your Name: {userName}</span>
                </label>
            </div>
            <div className={"flex"}>
                <label className={"shrink-0 w-full"}>
                    <span className="font-semibold">Your Email: {userEmail}</span>
                </label>
            </div>
            <div className={"flex"}>
                <label htmlFor={"subjectField"} className={"shrink-0 w-full"}>
                    <span className="font-semibold">Subject</span>
                    <input id="subjectField" name="subject" type="text"
                           required
                           maxLength={25}
                           className="border px-2 py-1 rounded w-full"/>
                </label>
            </div>
            <div className={"flex"}>
                <label htmlFor={"messageField"} className={"shrink-0 w-full"}>
                    <span className="font-semibold">Message</span>
                    <textarea id="messageField" name="message"
                              required
                              className="border px-2 py-1 rounded w-full"></textarea>
                </label>
            </div>
            {Boolean(state.error) && (
                <p className="bg-red-500 text-white text-center rounded p-2">
                    {state.error}
                </p>
            )}
            <button type="submit" disabled={state.loading} className="bg-blue-500 border-none
                hover:bg-blue-600 px-3 py-2 rounded text-white
                disabled:bg-slate-500
                disabled:cursor-not-allowed">
                Submit
            </button>
        </form>
    );
}