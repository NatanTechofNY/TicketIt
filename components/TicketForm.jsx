'use client'

import {createTicketAction} from "@/lib/serverActions";
import {useFormState} from "@/lib/hooks";

export default function TicketForm({userName, userEmail, userRole}) {

    const [state, handleSubmit] = useFormState(createTicketAction);

    if (userRole === 'admin') {
        return (
            <p className="bg-red-500 text-white text-center rounded p-2">
                Admins cannot submit tickets. Click on a ticket below to view/respond to it.
            </p>
        );
    }

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