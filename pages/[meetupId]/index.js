import { useRouter } from "next/router";
import Card from "@/components/ui/Card";
import classes from "../../styles/Home.module.css";

const DUMMY_MEETUPS = [
  {
    id: "m1",
    title: "A First Meetup",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg",
    address: "Some address 5,12345 Some City",
    description: "This is a first meetup!!",
  },
  {
    id: "m2",
    title: "A Second Meetup",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg",
    address: "Some address 10,12345 Some City",
    description: "This is a second meetup!!",
  },
  {
    id: "m3",
    title: "A Third Meetup",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg",
    address: "Some address 15,12345 Some City",
    description: "This is a third meetup!!",
  },
];

function showDetails(props) {
  const id = props.meetupData.id;
  const meetup = props.meetupData.data.find((meetup) => meetup.id === id);
  if (meetup) {
    return (
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
    );
  }
}

export async function getStaticPaths() {
  return {
    fallback: false,
    paths: [
      {
        params: {
          meetupId: "m1",
        },
      },
      {
        params: {
          meetupId: "m2",
        },
      },
      {
        params: {
          meetupId: "m3",
        },
      },
    ],
  };
}

export function getStaticProps(context) {
  //fetch data for a single meetup

  const meetupId = context.params.meetupId;
  return {
    props: {
      meetupData: {
        id: meetupId,
        data: DUMMY_MEETUPS,
      },
    },
  };
}

export default showDetails;
