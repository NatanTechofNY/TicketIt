/**
 * Import necessary components and libraries
 */
import Heading from '@/components/Heading';
import TicketList from "@/components/TicketList";
import TicketForm from "@/components/TicketForm";
import {Suspense} from "react";
import {getUserFromSession} from "@/lib/auth";

/**
 * HomePage function is the main component of the application.
 * It fetches the user from the session and displays the appropriate UI based on the user's role.
 *
 * @async
 * @function
 * @returns {JSX.Element} The rendered HomePage component
 */
export default async function HomePage() {

    /**
     * Fetch the user from the session
     * @type {Object}
     */
    const user = await getUserFromSession();

    /**
     * Render the HomePage component
     * If the user is logged in, render the TicketForm component with the user's details.
     * If the user is not logged in, display a message prompting them to sign in.
     * The TicketList component is always rendered, but it is wrapped in a Suspense component for fallback UI during data fetching.
     */
    return (
        <>
            <Heading>Support Ticket</Heading>
            <ul className="flex flex-col gap-3">
                {user ? (<TicketForm userName={user.name} userEmail={user.email} userRole={user.role}></TicketForm>) :
                    (<li className="bg-white border rounded shadow w-80
                       hover:shadow-xl sm:w-full px-3 py-2">
                        <p className={"text-center"}>
                            You must be signed in to submit a ticket.
                        </p>
                    </li>)}
                <Suspense fallback={"Loading..."}>
                    <TicketList></TicketList>
                </Suspense>
            </ul>
        </>
    )
        ;
}