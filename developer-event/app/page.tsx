import EventCard from "@/components/eventcard"
import ExploreBtn from "@/components/Explore"
import { events, type Event } from "@/lib/constants"  // ✅ Named import + type

const Page = () => {
  return (
    <section>
      <h1 className="text-center">The Hub For Every Dev <br /> Event You Can't Miss</h1>
      <p className="text-center mt-5">Hackathons, Meetups, and Conferences, All in One Place</p>
      <ExploreBtn/>
      <div className="mt-20 space-y-7">
        <h3>Feaured Events</h3>
        <ul className="events">
          {events.map((event: Event) => (  // ✅ Added type annotation
            <li key={event.slug}>
              <EventCard {...event}/>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Page