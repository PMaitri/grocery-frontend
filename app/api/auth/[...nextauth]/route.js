import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { Pool } from "pg";

// PostgreSQL Connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Function to get or create a user
const findOrCreateUser = async (user) => {
  const client = await pool.connect();
  try {
    const result = await client.query(
      "SELECT * FROM users WHERE email = $1",
      [user.email]
    );
    if (result.rows.length > 0) {
      return result.rows[0];
    } else {
      const newUser = await client.query(
        "INSERT INTO users (name, email, image) VALUES ($1, $2, $3) RETURNING *",
        [user.name, user.email, user.image]
      );
      return newUser.rows[0];
    }
  } finally {
    client.release();
  }
};

// NextAuth Configuration
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      await findOrCreateUser(user);
      return true;
    },
    async session({ session }) {
      const client = await pool.connect();
      try {
        const result = await client.query(
          "SELECT id FROM users WHERE email = $1",
          [session.user.email]
        );
        if (result.rows.length > 0) {
          session.user.id = result.rows[0].id;
        }
      } finally {
        client.release();
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
