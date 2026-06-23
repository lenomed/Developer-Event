import Link from "next/link";

interface Props {
    title: string;
    image: string;
}

const EventCard = ({title, image}: Props) => {
    return (
        <Link href={`/event`} id="event-card">
                <img src={image} alt={title} width={410} height={300} className="poster"/>
            <p className="title" aria-label={title}>
                {title}
            </p>
        </Link>
    )
}

export default EventCard