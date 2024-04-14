'use server';

import {createTicket, createTicketReply, updateTicketStatus} from "@/lib/tickets";
import {revalidatePath} from "next/cache";
import {getUserFromSession} from '@/lib/auth';

/**
 * createTicketAction is an async function that creates a new ticket.
 * It first retrieves the user from the session.
 * If no user is found, it throws an Unauthorized error.
 * It then retrieves the form data and validates it.
 * If the data is invalid, it returns an error message.
 * If the data is valid, it creates a new ticket and revalidates the path.
 *
 * @async
 * @function
 * @param {FormData} formData - The form data.
 * @returns {Promise<Object>} The response object.
 * @throws {Error} If no user is found in the session.
 */
export async function createTicketAction(formData) {

    const user = await getUserFromSession();
    if (!user) {
        throw new Error('Unauthorized');
    }

    const data = {
        subject: formData.get('subject'),
        message: formData.get('message'),
        user_id: user.id,
        status: 'open'
    };

    const error = validate(data);
    if (error) {
        return {isError: true, message: error};
    }
    await createTicket(data).then((data) => {
        revalidatePath('/')
        return data;
    });
}

/**
 * validate is a function that validates the data.
 * If the data is invalid, it returns an error message.
 * If the data is valid, it returns undefined.
 *
 * @function
 * @param {Object} data - The data to validate.
 * @param {boolean} reply - Whether the data is for a reply.
 * @returns {string|undefined} The error message, or undefined if the data is valid.
 */
function validate(data, reply = false) {

    if (reply === false) {

        if (!data.subject) {
            return 'You must submit a subject.'
        }

        if (data.subject.length > 25) {
            return 'Your subject is too long.'
        }

    }

    if (!data.message) {
        return 'You must submit a message.'
    }

}

/**
 * createReplyToTicketAction is an async function that creates a new ticket reply.
 * It first retrieves the user from the session.
 * If no user is found, it throws an Unauthorized error.
 * If the user is an admin, it updates the ticket status.
 * It then retrieves the form data and validates it.
 * If the data is invalid, it returns an error message.
 * If the data is valid, it creates a new ticket reply and revalidates the path.
 *
 * @async
 * @function
 * @param {FormData} formData - The form data.
 * @returns {Promise<Object>} The response object.
 * @throws {Error} If no user is found in the session.
 */
export async function createReplyToTicketAction(formData) {

    const user = await getUserFromSession();
    if (!user) {
        throw new Error('Unauthorized');
    }

    if (user.role === 'admin') {

        const status = formData.get('status');
        await updateTicketStatus(formData.get('ticket_id'), status);

    }

    const data = {
        message: formData.get('message'),
        user_id: user.id,
        ticket_id: formData.get('ticket_id')
    };

    const error = validate(data, true);
    if (error) {
        return {isError: true, message: error};
    }

    await createTicketReply(data).then((data) => {
        console.log('Email would be sent here to the user.')
        revalidatePath('/')
        return data;
    });
}