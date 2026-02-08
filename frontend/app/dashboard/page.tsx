"use client"

import { Input } from "@/components/ui/input"

import { Label } from "@/components/ui/label"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  BarChart,
  Calendar,
  Clock,
  Download,
  Edit,
  MapPin,
  MoreHorizontal,
  PlusCircle,
  QrCode,
  Ticket,
  Trash2,
  Users,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Mock data for events
const events = [
  {
    id: 1,
    title: "Tech Conference 2025",
    date: "May 15, 2025",
    time: "9:00 AM - 5:00 PM",
    location: "Convention Center, Downtown",
    ticketsSold: 245,
    totalTickets: 500,
    revenue: 73255,
    status: "upcoming",
  },
  {
    id: 2,
    title: "Product Launch Webinar",
    date: "April 10, 2025",
    time: "2:00 PM - 3:30 PM",
    location: "Online",
    ticketsSold: 178,
    totalTickets: 1000,
    revenue: 0,
    status: "upcoming",
  },
  {
    id: 3,
    title: "Annual Charity Gala",
    date: "March 5, 2025",
    time: "7:00 PM - 11:00 PM",
    location: "Grand Hotel Ballroom",
    ticketsSold: 320,
    totalTickets: 350,
    revenue: 64000,
    status: "past",
  },
]

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  // Calculate summary statistics
  const totalRevenue = events.reduce((sum, event) => sum + event.revenue, 0)
  const totalTicketsSold = events.reduce((sum, event) => sum + event.ticketsSold, 0)
  const totalTickets = events.reduce((sum, event) => sum + event.totalTickets, 0)
  const ticketSalesPercentage = Math.round((totalTicketsSold / totalTickets) * 100)

  const upcomingEvents = events.filter((event) => event.status === "upcoming")
  const pastEvents = events.filter((event) => event.status === "past")

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Manage your events and track performance</p>
        </div>
        <Button asChild>
          <Link href="/create-event">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create New Event
          </Link>
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList className="grid grid-cols-3 md:grid-cols-5 lg:w-[600px]">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="tickets">Tickets</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-8">
          {/* Summary Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">+20.1% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tickets Sold</CardTitle>
                <Ticket className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalTicketsSold.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">{ticketSalesPercentage}% of total capacity</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{upcomingEvents.length}</div>
                <p className="text-xs text-muted-foreground">Next event in 15 days</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Attendees</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalTicketsSold.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">+12.5% from last month</p>
              </CardContent>
            </Card>
          </div>

          {/* Upcoming Events */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
              <CardDescription>You have {upcomingEvents.length} upcoming events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {upcomingEvents.map((event) => (
                  <div
                    key={event.id}
                    className="flex flex-col md:flex-row justify-between gap-4 border-b pb-4 last:border-0 last:pb-0"
                  >
                    <div className="space-y-1">
                      <h3 className="font-semibold">{event.title}</h3>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Calendar className="mr-1 h-4 w-4" />
                          {event.date}
                        </div>
                        <div className="flex items-center">
                          <Clock className="mr-1 h-4 w-4" />
                          {event.time}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="mr-1 h-4 w-4" />
                          {event.location}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 self-end md:self-center">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/events/${event.id}`}>
                          <Ticket className="mr-1 h-4 w-4" />
                          Manage Tickets
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/events/${event.id}/edit`}>
                          <Edit className="mr-1 h-4 w-4" />
                          Edit
                        </Link>
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>
                            <QrCode className="mr-2 h-4 w-4" />
                            View QR Codes
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <BarChart className="mr-2 h-4 w-4" />
                            View Analytics
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="mr-2 h-4 w-4" />
                            Export Attendees
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Cancel Event
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="events" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Events</CardTitle>
              <CardDescription>Manage all your events in one place</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {events.map((event) => (
                  <div
                    key={event.id}
                    className="flex flex-col md:flex-row justify-between gap-4 border-b pb-4 last:border-0 last:pb-0"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{event.title}</h3>
                        <Badge variant={event.status === "upcoming" ? "default" : "secondary"}>
                          {event.status === "upcoming" ? "Upcoming" : "Past"}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Calendar className="mr-1 h-4 w-4" />
                          {event.date}
                        </div>
                        <div className="flex items-center">
                          <Clock className="mr-1 h-4 w-4" />
                          {event.time}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="mr-1 h-4 w-4" />
                          {event.location}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 self-end md:self-center">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/events/${event.id}`}>
                          <Ticket className="mr-1 h-4 w-4" />
                          Manage Tickets
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/events/${event.id}/edit`}>
                          <Edit className="mr-1 h-4 w-4" />
                          Edit
                        </Link>
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>
                            <QrCode className="mr-2 h-4 w-4" />
                            View QR Codes
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <BarChart className="mr-2 h-4 w-4" />
                            View Analytics
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="mr-2 h-4 w-4" />
                            Export Attendees
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Cancel Event
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tickets" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Ticket Sales</CardTitle>
              <CardDescription>Monitor ticket sales across all your events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {events.map((event) => (
                  <div key={event.id} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold">{event.title}</h3>
                      <span className="text-sm text-muted-foreground">{event.date}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span>
                        Tickets Sold: {event.ticketsSold} / {event.totalTickets}
                      </span>
                      <span className="font-medium">{Math.round((event.ticketsSold / event.totalTickets) * 100)}%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2.5">
                      <div
                        className="bg-primary h-2.5 rounded-full"
                        style={{ width: `${(event.ticketsSold / event.totalTickets) * 100}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span>Revenue: ${event.revenue.toLocaleString()}</span>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/events/${event.id}/tickets`}>
                          <QrCode className="mr-1 h-4 w-4" />
                          Manage Tickets
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Analytics</CardTitle>
              <CardDescription>View detailed analytics for your events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center border rounded-md">
                <div className="text-center">
                  <BarChart className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-2 text-lg font-medium">Analytics Dashboard</h3>
                  <p className="text-sm text-muted-foreground">Detailed charts and analytics would be displayed here</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Manage your account settings and preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-medium">Profile Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" defaultValue="Jane Smith" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" defaultValue="jane.smith@example.com" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">Notification Preferences</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="email-notifications" className="rounded border-gray-300" checked />
                      <Label htmlFor="email-notifications">Email notifications</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="sms-notifications" className="rounded border-gray-300" />
                      <Label htmlFor="sms-notifications">SMS notifications</Label>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <Button>Save Changes</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

