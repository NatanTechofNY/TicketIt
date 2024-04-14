/**
 * Import necessary libraries and components
 */
import {UserCircleIcon} from "@heroicons/react/20/solid";
import {getTickets, getUserTickets} from "@/lib/tickets";
import Link from "next/link";
import {getUserFromSession} from "@/lib/auth";

/**
 * TicketList function is a component that renders a list of tickets.
 * It fetches the current user from the session and then fetches the tickets based on the user's role.
 * If the user is an admin, all tickets are fetched.
 * If the user is a regular user, only the tickets submitted by the user are fetched.
 * If no tickets are found, a message is displayed.
 * Each ticket is rendered as a list item with a link to the ticket's page.
 *
 * @async
 * @function
 * @returns {JSX.Element} The rendered TicketList component
 */
export default async function TicketList() {

    /**
     * Fetch the current user from the session
     * @type {Object}
     */
    const user = await getUserFromSession();

    /**
     * Initialize an empty array to store the tickets
     * @type {Array}
     */
    let tickets = [];

    /**
     * If the user is an admin, fetch all tickets
     */
    if (user?.role === 'admin') {
        tickets = await getTickets();
    }

    /**
     * If the user is a regular user, fetch only the tickets submitted by the user
     */
    if (user?.role === 'user') {
        tickets = await getUserTickets(user.id);
    }

    /**
     * If no tickets are found, render a message
     */
    if (tickets.length === 0) {
        return (
            <li className="bg-white border rounded shadow w-80
                       hover:shadow-xl sm:w-full px-3 py-2">
                <p className={"text-center"}>
                    No tickets found.
                </p>
            </li>
        );
    }

    /**
     * Render the TicketList component
     * Each ticket is rendered as a list item with a link to the ticket's page.
     */
    return (
        tickets.map(ticket => (
            <Link href={`/ticket/${ticket.id}`} key={ticket.id}>
                <li key={ticket.id}
                    className="bg-white border rounded shadow w-80
                       hover:shadow-xl sm:w-full px-3 py-2">
                    <div className={"flex gap-3 items-baseline"}>
                        <h2 className="flex gap-3 pb-1 text-blue-500">
                            <UserCircleIcon className={"h-6 w-6"}/>{ticket.user.name}: {ticket.subject}
                        </h2>
                        <span
                            className={`border flex gap-1 items-center px-2 py-1 rounded text-slate-500 text-sm ml-auto mr-2 ${
                                ticket.status === 'open'
                                    ? 'bg-green-500 text-white'
                                    : ticket.status === 'closed'
                                        ? 'bg-red-500 text-white'
                                        : 'bg-gray-200 text-black'
                            }`}>
                        {ticket.status}
                    </span>
                    </div>
                    <hr className={"m-1"}></hr>
                    <p>{ticket.message}</p>
                </li>
            </Link>
        ))
    );
}