import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import { api } from "~/utils/api";

import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";


const AddPositionWizard = () => {
  const { user } = useUser();
  if (!user) return null;

  return <div>
    <img
      src={user.profileImageUrl}
      alt="Your profile picture"
      className="h-16 w-16 rounded-full"
    />
  </div>
}

const Home: NextPage = () => {

  const user = useUser();

  const { data , isLoading } = api.position.getAll.useQuery();

  if (isLoading) return <div>Loading...</div> 
  if(!data) return <div>Something went wrong D:</div>

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex justify-center h-screen">
        <div className="h-full w-full md:max-w-2xl border-x border-slate-300">
          
          <div className="border-b border-slate-300 p-4 flex" >
            {!user.isSignedIn && (
              <div className="flex justify-center"> <SignInButton /></div>
            )}
            {!!user.isSignedIn && (<div><AddPositionWizard/> <SignOutButton /></div>)}
          </div>
          
          <div className="flex flex-col">
            {data?.map(position => <div key={position.id}>{position.identifier}</div>)}
          </div>

        </div>
      </main>
    </>
  );
};

export default Home;
