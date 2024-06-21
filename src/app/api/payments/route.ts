import { getPayments } from "@/lib/airtable";
import { decrypt } from "@/lib/lib";
import { NextRequest } from "next/server";


export async function GET(req: NextRequest) {
  try {
    const session = req.cookies.get('session')?.value as string;
    const decrypted = await decrypt(session);
    const id = decrypted.user.fields.id;
  
    if(id){
      const payment = await getPayments(id)
      if (payment) {
        return Response.json({ message: 'successful', payment: payment });
      } else {
        return Response.json({ error: 'Invalid id' });
      }
    }
  } catch (error) {
    return Response.json({error: error });
  }
}
