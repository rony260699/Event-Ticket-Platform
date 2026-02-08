import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Clock } from "lucide-react"

// Mock data for featured events
const featuredEvents = [
  {
    id: 1,
    title: "Tech Conference 2025",
    description: "Join industry leaders for a day of innovation and networking",
    date: "May 15, 2025",
    time: "9:00 AM - 5:00 PM",
    location: "Convention Center, Downtown",
    image: "/placeholder.svg?height=400&width=600",
    category: "Business",
    price: "$299",
  },
  {
    id: 2,
    title: "Summer Music Festival",
    description: "A weekend of live music performances across multiple stages",
    date: "July 10-12, 2025",
    time: "12:00 PM - 11:00 PM",
    location: "Riverside Park",
    image: "/placeholder.svg?height=400&width=600",
    category: "Music",
    price: "$150",
  },
  {
    id: 3,
    title: "Family Fun Day",
    description: "Activities and entertainment for the whole family",
    date: "June 5, 2025",
    time: "10:00 AM - 4:00 PM",
    location: "City Park",
    image: "/placeholder.svg?height=400&width=600",
    category: "Family",
    price: "$25",
  },
]

export default function FeaturedEvents() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {featuredEvents.map((event) => (
        <Card key={event.id} className="overflow-hidden">
          <div className="aspect-video relative">
            <img src={event.image || "/placeholder.svg"} alt={event.title} className="object-cover w-full h-full" />
            <Badge className="absolute top-4 right-4">{event.category}</Badge>
          </div>
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-2">{event.title}</h3>
            <p className="text-muted-foreground mb-4">{event.description}</p>
            <div className="space-y-2">
              <div className="flex items-center text-sm">
                <Calendar className="mr-2 h-4 w-4" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center text-sm">
                <Clock className="mr-2 h-4 w-4" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center text-sm">
                <MapPin className="mr-2 h-4 w-4" />
                <span>{event.location}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="p-6 pt-0 flex justify-between items-center">
            <div className="font-bold">{event.price}</div>
            <Button asChild>
              <Link href={`/events/${event.id}`}>View Details</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

