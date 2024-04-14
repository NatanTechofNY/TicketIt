import { PrismaClient } from '@prisma/client'

/**
 * The Prisma client instance used to interact with the database.
 * @type {PrismaClient}
 */
export const db = createPrismaClient();

/**
 * Creates a new Prisma client instance if one does not already exist, and returns it.
 * The Prisma client is stored in the globalThis object to ensure that only one instance is created during the lifetime of the application.
 * The Prisma client is configured to log all queries to stdout.
 *
 * @function
 * @returns {PrismaClient} The Prisma client instance.
 */
function createPrismaClient() {
    if (!globalThis.prismaClient) {
        globalThis.prismaClient = new PrismaClient({
            log: [{ emit: 'stdout', level: 'query' }]
        })
    }
    return globalThis.prismaClient
}