import EventCard from "@/components/eventcard"
import ExploreBtn from "@/components/Explore"

const events = [
  { image: "/images/event1.png", title: "Event 1" },
  { image: "/images/event2.png", title: "Event 2" },
];

const Page=()=>{
  return(
    <section>
      <h1 className="text-center">The Hub For Every Dev <br /> Event You Can't Miss</h1>
      <p className="text-center mt-5">Hackathons, Meetups, and Conferences, All in One Place</p>
      <ExploreBtn/>
      <div className="mt-20 space-y-7">
        {events.map((event)=>(
         <li key={event.title}>s
          <EventCard {...event}/>
         </li>
        ))}
      </div>
    </section>
  )
}

export default Page
