import NewMeetupForm from "@/components/meetups/NewMeetupForm";
import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment } from "react";

function NewMeetupPage() {
  const router = useRouter();
  async function addMeetupHandler(enteredMeetupData) {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(enteredMeetupData),
      headers: {
        "Content-type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);

    router.push("/");
  }

  return (
    <Fragment>
      <Head>
        <title>Add a New Meetup</title>
        <meta name="description" content="adding new meetups"></meta>
      </Head>

      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </Fragment>
  );
}

export default NewMeetupPage;
