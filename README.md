# TicketIt

TicketIt is a support ticket system built with Next.JS, React, and Prisma.

## User Registration
To register as a user, navigate to the registration page and enter your details.  
- Normal users: Register using a regular email. Normal users can submit/view their tickets. Users can also click on a ticket in order to view responses/respond.
- Admin users: Register with an email that includes `+admin`. Admin users can view, reply to, and change the status of tickets by clicking on them.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- You have installed Node.js and npm.
- You have a macOS machine. This app may work on other operating systems, but it was developed and tested on macOS.

## Installing TicketIt

To install TicketIt, follow these steps:

1. Clone the repository:
```bash
git clone https://github.com/NatanTechofNY/TicketIt.git
```

2. Navigate to the project directory:
```bash
cd TicketIt
```

3. Install the dependencies:
```bash
npm install
```

## Setting up Prisma

This application uses Prisma as an ORM. You can set it up with either SQLite or PostgreSQL.

### SQLite

1. Update the `DATABASE_URL` in the `.env` file to use SQLite:
```env
DATABASE_URL="file:./dev.db"
```

2. Run the Prisma migration:
```bash
npx prisma migrate dev
```

### PostgreSQL

1. Update the `DATABASE_URL` in the `.env` file to your PostgreSQL connection string:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/mydb?schema=public"
```

2. Run the Prisma migration:
```bash
npx prisma migrate dev
```

## Using TicketIt

To use TicketIt, follow these steps:

1. Start the development server:
```bash
npm run dev
```

2. Open your web browser and navigate to `http://localhost:3000`.

## Contact

If you want to contact me, you can reach me at `natanyagudayev@gmail.com`.

## License
I don't care if you use it, we learn by learning.