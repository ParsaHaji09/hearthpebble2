"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function EditForm({ searchParams }) {

  const router = useRouter();

  const { data: session, status } = useSession();
  const [name, setName] = useState( searchParams.passedName );
  const [email, setEmail] = useState( searchParams.passedEmail );

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        console.log(name)
        const res = await fetch("/api/edit", 
            {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify({ newName: name, email: email }),
            }
        );

        if (res.ok) {
            await signIn("credentials", { redirect: false })
            router.push("/");
        } else {
            console.log("User name change failed.");
        }

    } catch (error) {
      console.log("Error during update: ", error);
    }
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-8 bg-zince-300/10 flex flex-col gap-2 my-6">
        <h1> Change Name </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Full Name"
          />
          <button className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2">
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
