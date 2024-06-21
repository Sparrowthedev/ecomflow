import { getSession } from "@/lib/lib";

const TopBar =  async () => {
    const session = await getSession();

  return (
    <div className="flex flex-col ">
    <h1 className="text-white font-bold text-xl md:text-2xl">
      {session ? session.user?.fields.first_name : "Hi Julius!"}
    </h1>
    <p className="text-[#585858]">
      Welcome back to your affiliate dashboard
    </p>
  </div>
  )
}

export default TopBar