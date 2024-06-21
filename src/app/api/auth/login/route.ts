import { getUserByUsername } from "@/lib/airtable";
import { encrypt } from "@/lib/lib";

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();
    
    const user = await getUserByUsername(username)

    if (!user) {
      return Response.json(
        {
          error: "Invalid email or password",
        },
        { status: 400 }
      );
    }

    const user_password = user?.fields.password?.toString();
    const compare = user_password === password;

    if (!compare) {
     
        return Response.json(
          {
            error: "Invalid email or password",
          },
          { status: 400 }
        );
    } 
    // Create the session
    const expires = new Date(Date.now() + 10 * 1000);
    const session = await encrypt({ user, expires });

    // Respond with it
    return Response.json({ token: session });
  } catch (error) {
    return Response.json({error: error });
  }
}
