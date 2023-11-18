## Issue Tracker App

View a summary of project issues, assign issue to users and change issue status.

First, clone the git repository, then cd into the folder

Rename .env.example to .env, update the environment variables properly,
otherwise application will not work properly.

Run the following command:

```bash
npm install

# To generate database tables
npx prisma migrate dev

# To run development server
npm run dev

# To run production server
npm run start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
