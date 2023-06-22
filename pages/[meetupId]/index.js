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
];

function showDetails() {
  const router = useRouter();
  const id = router.query.meetupId;
  const meetup = DUMMY_MEETUPS.find((meetup) => meetup.id === id);
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
export default showDetails;
