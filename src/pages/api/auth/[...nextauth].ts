import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
const { GOOGLE_ID = "", GOOGLE_SECRET = "" } = process.env;
export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: GOOGLE_ID,
      clientSecret: GOOGLE_SECRET,
    }),
  ],
});
