import {db} from "@/lib/db";

/**
 * Creates a new ticket in the database.
 *
 * @async
 * @function
 * @param {Object} ticketData - The data for the new ticket.
 * @param {string} ticketData.subject - The subject of the ticket.
 * @param {string} ticketData.message - The message of the ticket.
 * @param {string} ticketData.status - The status of the ticket.
 * @param {number} ticketData.user_id - The id of the user who created the ticket.
 * @returns {Promise<Object>} The created ticket.
 */
export async function createTicket({subject, message, status, user_id}) {
    return db.ticket.create({
        data: {
            subject,
            message,
            status,
            user_id
        }
    });
}

/**
 * Creates a new ticket reply in the database.
 *
 * @async
 * @function
 * @param {Object} replyData - The data for the new ticket reply.
 * @param {string} replyData.message - The message of the reply.
 * @param {number} replyData.ticket_id - The id of the ticket to which the reply belongs.
 * @param {number} replyData.user_id - The id of the user who created the reply.
 * @returns {Promise<Object>} The created ticket reply.
 */
export async function createTicketReply({message, ticket_id, user_id}) {
    ticket_id = parseInt(ticket_id);
    return db.ticketReplies.create({
        data: {
            message,
            ticket_id,
            user_id
        }
    });
}

/**
 * Retrieves all tickets from the database, ordered by creation date in descending order.
 * Includes the name of the user who created each ticket.
 *
 * @async
 * @function
 * @returns {Promise<Array>} The retrieved tickets.
 */
export async function getTickets() {
    return db.ticket.findMany({
        orderBy: {
            createdAt: 'desc'
        },
        include: {
            user: {
                select: {name: true},
            },
        },
    });
}

/**
 * Retrieves all tickets from the database that were created by a specific user, ordered by creation date in descending order.
 * Includes the name of the user who created each ticket.
 *
 * @async
 * @function
 * @param {number} userId - The id of the user.
 * @returns {Promise<Array>} The retrieved tickets.
 */
export async function getUserTickets(userId) {
    return db.ticket.findMany({
        where: {user_id: userId},
        orderBy: {
            createdAt: 'desc'
        },
        include: {
            user: {
                select: {name: true},
            },
        },
    });
}

/**
 * Retrieves a specific ticket from the database.
 * Includes the name of the user who created the ticket.
 *
 * @async
 * @function
 * @param {number} id - The id of the ticket.
 * @returns {Promise<Object|null>} The retrieved ticket, or null if no ticket with the given id is found.
 */
export async function getTicket(id) {
    id = parseInt(id);
    return db.ticket.findFirst({
        where: {id},
        include: {
            user: {
                select: {name: true},
            },
        },
    });
}

/**
 * Retrieves all replies to a specific ticket from the database, ordered by creation date in descending order.
 * Includes the name and role of the user who created each reply.
 *
 * @async
 * @function
 * @param {Object} id - The id of the ticket.
 * @returns {Promise<Array>} The retrieved ticket replies.
 */
export async function getTicketReplies(id) {
    return db.ticketReplies.findMany({
        where: {ticket_id: id.id},
        orderBy: {
            createdAt: 'desc'
        },
        include: {
            user: {
                select: {name: true, role: true},
            },
        },
    });
}

/**
 * Updates the status of a specific ticket in the database.
 *
 * @async
 * @function
 * @param {number} id - The id of the ticket.
 * @param {string} ticketStatus - The new status of the ticket.
 * @returns {Promise<Object>} The updated ticket.
 */
export async function updateTicketStatus(id, ticketStatus) {
    id = parseInt(id);
    return db.ticket.update({
        where: {id},
        data: {status: ticketStatus}
    });
}