import {UserCircleIcon} from "@heroicons/react/20/solid";
import {getTickets, getUserTickets} from "@/lib/tickets";
import Link from "next/link";
import {getUserFromSession} from "@/lib/auth";

export default async function TicketList() {

    const user = await getUserFromSession();

    let tickets = [];

    if (user?.role === 'admin') {
        tickets = await getTickets();
    }

    if (user?.role === 'user') {
        tickets = await getUserTickets(user.id);
    }

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