'use client'

import HomePage from "@/components/HomePage";
import { useUser } from "@clerk/nextjs";

export default function Home() {
  const { user } = useUser();
  console.log(user);

  return(
     <div> <HomePage/> </div>
    );
}
