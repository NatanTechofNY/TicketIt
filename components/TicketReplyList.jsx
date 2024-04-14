import {UserCircleIcon} from "@heroicons/react/20/solid";
import {getTicketReplies} from "@/lib/tickets";

export default async function TicketReplyList(id) {

    const replies = await getTicketReplies(id);

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