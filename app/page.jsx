import Heading from '@/components/Heading';
import TicketList from "@/components/TicketList";
import TicketForm from "@/components/TicketForm";
import {Suspense} from "react";
import {getUserFromSession} from "@/lib/auth";

export default async function HomePage() {

    const user = await getUserFromSession();

    return (
        <>
            <Heading>Support Ticket</Heading>
            <ul className="flex flex-col gap-3">
                {user ? (<TicketForm userName={user.name} userEmail={user.email}></TicketForm>) :
                    (<li className="bg-white border rounded shadow w-80
                       hover:shadow-xl sm:w-full px-3 py-2">
                        <p className={"text-center"}>
                            You must be signed in to submit a ticket.
                        </p>
                    </li>)}
                <Suspense fallback={"<p>Loading</p>"}>
                    <TicketList></TicketList>
                </Suspense>
            </ul>
        </>
    )
        ;
}
