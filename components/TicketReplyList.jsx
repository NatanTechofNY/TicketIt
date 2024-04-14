/**
 * Import necessary libraries and components
 */
import {UserCircleIcon} from "@heroicons/react/20/solid";
import {getTicketReplies} from "@/lib/tickets";

/**
 * TicketReplyList function is a component that renders a list of replies to a ticket.
 * It fetches the replies to the ticket with the given id.
 * If no replies are found, a message is displayed.
 * Each reply is rendered as a list item.
 * If the reply is from a user, the user's name is displayed on the left and the reply's creation date is displayed on the right.
 * If the reply is from an admin, the reply's creation date is displayed on the left and the admin's name is displayed on the right.
 *
 * @async
 * @function
 * @param {string} id - The id of the ticket.
 * @returns {JSX.Element} The rendered TicketReplyList component
 */
export default async function TicketReplyList(id) {

    /**
     * Fetch the replies to the ticket with the given id
     * @type {Array}
     */
    const replies = await getTicketReplies(id);

    /**
     * If no replies are found, render a message
     */
    if (replies.length === 0) {
        return (
            <div className="bg-white border rounded shadow w-80
                       hover:shadow-xl sm:w-full px-3 py-2">
                <p className={"text-center"}>
                    No replies found.
                </p>
            </div>
        );
    }

    /**
     * Render the TicketReplyList component
     * Each reply is rendered as a list item.
     * If the reply is from a user, the user's name is displayed on the left and the reply's creation date is displayed on the right.
     * If the reply is from an admin, the reply's creation date is displayed on the left and the admin's name is displayed on the right.
     */
    return (
        replies.map(reply => (
            reply.user.role === 'user' ? (
                    <li key={reply.id}
                        className="bg-white border rounded shadow w-80
                       hover:shadow-xl sm:w-full px-3 py-2 mt-2">
                        <div className={"flex gap-3 items-baseline"}>
                            <h2 className="flex gap-3 pb-1 text-blue-500">
                                <UserCircleIcon className={"h-6 w-6"}/>{reply.user.name}
                            </h2>
                            <span
                                className={`border flex gap-1 items-center px-2 py-1 rounded text-slate-500 text-sm ml-auto mr-2`}>
                        {reply.createdAt.toString()}
                    </span>
                        </div>
                        <hr className={"m-1"}></hr>
                        <p>{reply.message}</p>
                    </li>
                ) :
                (<li key={reply.id}
                     className="bg-white border rounded shadow w-80
                       hover:shadow-xl sm:w-full px-3 py-2 mt-2">
                        <div className={"flex gap-3 items-baseline"}>
                            <span
                                className={`border flex gap-3 items-center px-2 py-1 rounded text-slate-500 text-sm mr-2`}>
                        {reply.createdAt.toString()}
                    </span>
                            <h2 className="flex gap-3 pb-1 text-blue-500 ml-auto">
                                <UserCircleIcon className={"h-6 w-6"}/>{reply.user.name}
                            </h2>
                        </div>
                        <hr className={"m-1"}></hr>
                        <p className={"text-right"}>{reply.message}</p>
                    </li>
                )
        )))
}