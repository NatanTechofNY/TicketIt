'use client'

import {createReplyToTicketAction} from "@/lib/serverActions";
import {useFormState} from "@/lib/hooks";

export default function TicketReplyForm({ticketId, userEmail, userRole, ticketStatus}) {
    const [state, handleSubmit] = useFormState(createReplyToTicketAction);
    return (<form onSubmit={handleSubmit} className="border bg-white flex flex-col gap-3 mt-3 px-3 py-2 rounded">
        <p className={"pb-1"}>
            Fill out the form below to reply to the ticket.
        </p>
        <input type="hidden" name="ticket_id" value={ticketId}/>
        {userRole === 'admin' && (<div className={"flex"}>
                <label htmlFor={"statusField"} className={"shrink-0 w-full "}>
                    <span className="font-semibold">Change Status</span>
                    <select id="statusField" name="status" className={"py-3 px-4 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-200 dark:border-gray-700 dark:text-black dark:focus:ring-gray-600"} required>
                        <option value="open" selected={ticketStatus === 'open'}>Open</option>
                        <option value="pending" selected={ticketStatus === 'pending'}>Pending</option>
                        <option value="closed" selected={ticketStatus === 'closed'}>Closed</option>
                    </select>
                </label>
        </div>)}
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
        {Boolean(state.error) && (<p className="bg-red-500 text-white text-center rounded p-2">
            {state.error}
        </p>)}
        <button type="submit" disabled={state.loading} className="bg-blue-500 border-none
                hover:bg-blue-600 px-3 py-2 rounded text-white
                disabled:bg-slate-500
                disabled:cursor-not-allowed">
            Respond
        </button>
    </form>);
}