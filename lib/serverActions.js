'use server';

import {createTicket, createTicketReply, updateTicketStatus} from "@/lib/tickets";
import {revalidatePath} from "next/cache";
import {getUserFromSession} from '@/lib/auth';

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
        revalidatePath('/')
        return data;
    });
}