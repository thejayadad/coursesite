'use server'
const { getServerSession } = require("next-auth")
import { authOptions } from "./auth";

const getServerUser = async () => {
  const session = await getServerSession(authOptions);

  return session?.user;
} 

export default getServerUser;