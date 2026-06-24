export interface Event {
  title: string;
  image: string;
  slug: string;
  location: string;
  date: string;
  time: string;
}

export const events: Event[] = [
  {
    title: "React Summit",
    slug: "react-summit",
    date: "October 17",
    time: "09:00 AM",
    location: "Amsterdam, Netherlands",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop",
  },
  {
    title: "Next.js Conf",
    slug: "nextjs-conf",
    date: "October 24",
    time: "10:00 AM",
    location: "San Francisco, CA",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&h=300&fit=crop",
  },
  {
    title: "PyCon US",
    slug: "pycon-us",
    date: "May 15",
    time: "08:00 AM",
    location: "Pittsburgh, PA",
    image: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=500&h=300&fit=crop",
  },
  {
    title: "AI Summit",
    slug: "ai-summit",
    date: "November 2",
    time: "09:30 AM",
    location: "Las Vegas, NV",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=500&h=300&fit=crop",
  },
  {
    title: "GitHub Universe",
    slug: "github-universe",
    date: "October 29",
    time: "09:00 AM",
    location: "San Francisco, CA",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop",
  },
  {
    title: "Node.js Conf",
    slug: "nodejs-conf",
    date: "September 11",
    time: "10:00 AM",
    location: "Dublin, Ireland",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&h=300&fit=crop",
  },
  {
    title: "Web Summit",
    slug: "web-summit",
    date: "November 11",
    time: "09:00 AM",
    location: "Lisbon, Portugal",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop",
  },
  {
    title: "TypeScript Congress",
    slug: "typescript-congress",
    date: "October 10",
    time: "08:30 AM",
    location: "Berlin, Germany",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop",
  },
];