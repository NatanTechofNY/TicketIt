import {notFound} from 'next/navigation';
import Heading from '@/components/Heading';
import ShareLinkButton from '@/components/ShareLinkButton';
import {getTicket} from '@/lib/tickets';
import {UserCircleIcon} from "@heroicons/react/20/solid";
import TicketReplyForm from "@/components/TicketReplyForm";
import TicketReplyList from "@/components/TicketReplyList";
import {getUserFromSession} from "@/lib/auth";

export default async function TicketPage({params: {id}}) {

    const user = await getUserFromSession();

    const ticket = await getTicket(id);

    // Need to be signed in as an admin to view a ticket
    if (!ticket || !user) {
        notFound();
    }
    return (
        <>
            <Heading>Ticket #{ticket.id}: {ticket.subject}</Heading>
            <div key={ticket.id}
                 className="bg-white border rounded shadow w-80
                       hover:shadow-xl sm:w-full px-3 py-2">
                <div className="flex gap-3 items-baseline">
                    <p className="italic pb-2">{ticket.createdAt.toString()}</p>
                    <ShareLinkButton/>
                </div>
                <div className={"flex gap-3 items-baseline"}>
                    <h2 className="flex gap-3 pb-1 text-blue-500">
                        <UserCircleIcon className={"h-6 w-6"}/>{ticket.user.name}
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
            </div>
            <TicketReplyForm userEmail={user.email} ticketId={ticket.id} userRole={user.role} ticketStatus={ticket.status}></TicketReplyForm>
            <ul className="flex flex-col gap-3">
                <TicketReplyList id={ticket.id}></TicketReplyList>
            </ul>
        </>
    );
}
