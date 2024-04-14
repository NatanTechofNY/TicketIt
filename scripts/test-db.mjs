import {PrismaClient} from '@prisma/client'

const db = new PrismaClient({
    log: [{emit: 'stdout', level: 'query'}]
});
const ticket = await db.ticket.createMany({
    data: [{
        name: 'Bob Junior',
        email: 'bob@gmail.com',
        subject: 'Website is working',
        message: 'I can access the website',
        status: 'open',
    }, {
        name: 'John Smith',
        email: 'john@gmail.com',
        subject: 'Website is not working',
        message: 'I cannot access the website',
        status: 'closed',
    }, {
        name: 'Natan Yagudayev',
        email: 'bob.marley@gmail.com',
        subject: 'I made this website',
        message: 'Can you shut it down?',
        status: 'closed',
    }, {
        name: 'Seth Rogen',
        email: 'seth@gmail.com',
        subject: 'Who is an apple?',
        message: 'I do not know who the apple is',
        status: 'pending',
    }]
})