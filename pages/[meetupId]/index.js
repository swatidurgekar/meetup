import { useRouter } from "next/router";
import Card from "@/components/ui/Card";
import classes from "../../styles/Home.module.css";
import { MongoClient } from "mongodb";
import { Fragment } from "react";
import Head from "next/head";

export async function getStaticProps() {
  //fetch data from an API
  const client = await MongoClient.connect(
    "mongodb+srv://swati:swati4s@cluster0.or8j6ek.mongodb.net/meetups"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetupData: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

function showDetails(props) {
  const router = useRouter();
  const id = router.query.meetupId;
  if (props.meetupData) {
    const meetup = props.meetupData.find((meetup) => meetup.id === id);

    return (
      <Fragment>
        <Head>
          <title>{meetup.title}</title>
          <meta name="description" content={meetup.description} />
        </Head>
        <li className={classes.item}>
          <Card>
            <div className={classes.image}>
              <img src={meetup.image} alt={meetup.title} />
            </div>
            <div className={classes.content}>
              <h3>{meetup.title}</h3>
              <address>{meetup.address}</address>
            </div>
          </Card>
        </li>
      </Fragment>
    );
  }
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://swati:swati4s@cluster0.or8j6ek.mongodb.net/meetups"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();
  return {
    fallback: "blocking",
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export default showDetails;
