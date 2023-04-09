Set up (One time):

1. clone repo
2. npm install (install deps)
3. change .env to match your postgres server
4. npx prisma migrate dev --name init (create db)

After pull:

1. npm install (install deps)
2. npx prisma migrate reset (reset db)

Running (Every time):

1. npm run dev (run app)

Debug:

1. npx prisma studio (view db)
2. delete migrate folder then run: npx prisma migrate dev --name init (recreate db)

Unit Tests:
/_ Use to unit test form states _/
// const simulateSubmissionData = async (e: React.SyntheticEvent) => {
// console.log("Hello");
// e.preventDefault();
// setFormState(FormState.Submitting);
// setTimeout(() => {
// console.log("Sending");
// setFormState(FormState.Input);
// }, 3000);
// }
