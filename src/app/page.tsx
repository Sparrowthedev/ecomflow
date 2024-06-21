import Login from "@/components/Login/Login";
// import { getSession } from "@/lib/lib";
import { redirect } from "next/navigation";


export default async function Home() {
  // const session = await getSession()
  // if(session){
  //   redirect('/dashboard')
  // }

  return (
    <main className="bg-[#0b0b0b]">
      <Login />
    </main>
  );
}
