import Link from "next/link";

interface Props {
    title: string;
    image: string;
    slug: string;
    location: string;
    date: string;
    time: string;
}

const EventCard = ({title, image, slug, location, date, time}: Props) => {
    return (
        <Link href={`/event${slug}`} id="event-card">
                <img src={image} alt={title} width={410} height={300} className="poster"/>
                <div className="flex flex-row gap-2">
                    <img src="/icons/pin.svg" alt="location" width={14} height={14}/>
                    <p>{location}</p>
                </div>
                <div className="datetime">
                    <div>
                        <img src="/icons/calendar.svg" alt="date" width={14} height={14}/>
                        <p>{date}</p>
                    </div>

                    <div>
                        <img src="/icons/mode.svg" alt="time" width={14} height={14}/>
                        <p>{time}</p>
                    </div>
                </div>
            <p className="title" aria-label={title}>
                {title}
            </p>
        </Link>
    )
}

export default EventCard