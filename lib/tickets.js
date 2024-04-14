import {db} from "@/lib/db";

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

export async function updateTicketStatus(id, ticketStatus) {
    id = parseInt(id);
    return db.ticket.update({
        where: {id},
        data: {status: ticketStatus}
    });
}