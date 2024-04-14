'use client';

/**
 * Import necessary actions and hooks
 */
import {createReplyToTicketAction} from "@/lib/serverActions";
import {useFormState} from "@/lib/hooks";

/**
 * TicketReplyForm function is the main component of the ticket reply form.
 * It uses the useFormState hook to manage the form state and handle form submission.
 * The form consists of a hidden input field for the ticket id, a select field for the ticket status (only visible to admins),
 * an input field for the user's email, a textarea for the message, and a submit button.
 * If there is an error in the form state, an error message is displayed.
 *
 * @function
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.ticketId - The id of the ticket.
 * @param {string} props.userEmail - The email of the user.
 * @param {string} props.userRole - The role of the user.
 * @param {string} props.ticketStatus - The status of the ticket.
 * @returns {JSX.Element} The rendered TicketReplyForm component
 */
export default function TicketReplyForm({ticketId, userEmail, userRole, ticketStatus}) {

    /**
     * Use the useFormState hook to manage the form state and handle form submission.
     * The createReplyToTicketAction is passed as the argument to the useFormState hook.
     * @type {Array}
     */
    const [state, handleSubmit] = useFormState(createReplyToTicketAction);

    /**
     * Render the TicketReplyForm component
     * The form consists of a hidden input field for the ticket id, a select field for the ticket status (only visible to admins),
     * an input field for the user's email, a textarea for the message, and a submit button.
     * If there is an error in the form state, an error message is displayed.
     */
    return (
        <form onSubmit={handleSubmit} className="border bg-white flex flex-col gap-3 mt-3 px-3 py-2 rounded">
            <p className={"pb-1"}>
                Fill out the form below to reply to the ticket.
            </p>
            <input type="hidden" name="ticket_id" value={ticketId}/>
            {userRole === 'admin' && (
                <div className={"flex"}>
                    <label htmlFor={"statusField"} className={"shrink-0 w-full "}>
                        <span className="font-semibold">Change Status</span>
                        <select id="statusField" name="status" className={"py-3 px-4 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"} required>
                            <option value="open" selected={ticketStatus === 'open'}>Open</option>
                            <option value="pending" selected={ticketStatus === 'pending'}>Pending</option>
                            <option value="closed" selected={ticketStatus === 'closed'}>Closed</option>
                        </select>
                    </label>
                </div>
            )}
            <div className={"flex"}>
                <label className={"shrink-0 w-full"}>
                    <span className="font-semibold">Your Email: {userEmail}</span>
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
                Respond
            </button>
        </form>
    );
}