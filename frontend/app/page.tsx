import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Ticket, BarChart3, QrCode } from "lucide-react"
import FeaturedEvents from "@/components/featured-events"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="py-12 md:py-20">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">
              Create, Manage, and Sell Event Tickets with Ease
            </h1>
            <p className="text-xl text-muted-foreground">
              A complete platform for event organizers to create events, sell tickets, and validate attendees with QR
              codes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button asChild size="lg" className="font-medium">
                <Link href="/create-event">Create an Event</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/events">Browse Events</Link>
              </Button>
            </div>
          </div>
          <div className="rounded-lg overflow-hidden shadow-xl">
            <img
              src="/placeholder.svg?height=600&width=800"
              alt="Event management dashboard"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything You Need for Successful Events</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our platform provides all the tools you need to create, promote, and manage your events from start to
            finish.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Event Creation</h3>
              <p className="text-muted-foreground">
                Create and configure events with multiple ticket types, pricing options, and customizable details.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Ticket className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Ticket Management</h3>
              <p className="text-muted-foreground">
                Sell tickets online with secure payment processing and automated delivery to attendees.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <QrCode className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">QR Validation</h3>
              <p className="text-muted-foreground">
                Generate unique QR codes for each ticket and validate them quickly at event entry points.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Analytics Dashboard</h3>
              <p className="text-muted-foreground">
                Track sales, attendance, and other key metrics with real-time analytics and reporting.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Featured Events Section */}
      <section className="py-12 md:py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Events</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">Discover popular events happening near you</p>
        </div>

        <FeaturedEvents />

        <div className="text-center mt-8">
          <Button asChild variant="outline" size="lg">
            <Link href="/events">View All Events</Link>
          </Button>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 md:py-20 bg-muted rounded-lg">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Hear from event organizers who have successfully used our platform
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardContent className="pt-6">
                <p className="italic mb-4">
                  "As a professional event planner, I need a reliable system that can handle multiple events
                  simultaneously. This platform has streamlined my workflow and helped me increase ticket sales."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-300 mr-3"></div>
                  <div>
                    <p className="font-semibold">Sarah Johnson</p>
                    <p className="text-sm text-muted-foreground">Event Planning Professional</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <p className="italic mb-4">
                  "The mobile ticket scanning app is incredibly easy to use. My staff picked it up with minimal
                  training, and we were able to process hundreds of attendees quickly without any issues."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-300 mr-3"></div>
                  <div>
                    <p className="font-semibold">Alex Rodriguez</p>
                    <p className="text-sm text-muted-foreground">Event Staff Coordinator</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <p className="italic mb-4">
                  "I organize events part-time and needed something simple yet professional. This platform gives me all
                  the tools I need without overwhelming me with complexity."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-300 mr-3"></div>
                  <div>
                    <p className="font-semibold">Michael Chen</p>
                    <p className="text-sm text-muted-foreground">Part-Time Event Organizer</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}

