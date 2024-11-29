"use client";

import { signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function UserInfo() {
  const { data: session, status } = useSession();

  // Save session.user.name into a variable
  // const userName = session?.user?.name;
  // const userEmail = session?.user?.email;

  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  // Initialize state when session is ready
  useEffect(() => {
    if (session) {
      setUserName(session.user?.name || "");
      setUserEmail(session.user?.email || "");
    }
  }, [session, session.user.name]);

  // Handle loading state
  if (status === "loading") {
    return (
      <div className="grid place-items-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  // Handle missing user data
  if (!userName) {
    return (
      <div className="grid place-items-center h-screen">
        <p>Error: User name is unavailable.</p>
      </div>
    );
  }

  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-8 bg-zince-300/10 flex flex-col gap-2 my-6">
        <div>
          Name: <span className="font-bold">{userName}</span>
        </div>
        <div>
          Email: <span className="font-bold">{userEmail}</span>
        </div>
        <Link
          href={{
            pathname: '/editpage',
            query: { passedName: userName, passedEmail: userEmail },
          }}
          className="bg-green-500 text-white font-bold px-6 py-2 mt-3"
        >
          Edit
        </Link>
        <button
          onClick={() => signOut()}
          className="bg-red-500 text-white font-bold px-6 py-2 mt-3"
        >
          Log Out
        </button>
      </div>
    </div>
  );
}
