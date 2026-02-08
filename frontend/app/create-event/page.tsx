"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { DatePicker } from "@/components/ui/date-picker"
import { TimePicker } from "@/components/ui/time-picker"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlusCircle, Trash2 } from "lucide-react"

export default function CreateEventPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("details")
  const [ticketTypes, setTicketTypes] = useState([
    { name: "General Admission", price: "", quantity: "", description: "" },
  ])

  const addTicketType = () => {
    setTicketTypes([...ticketTypes, { name: "", price: "", quantity: "", description: "" }])
  }

  const removeTicketType = (index: number) => {
    const newTicketTypes = [...ticketTypes]
    newTicketTypes.splice(index, 1)
    setTicketTypes(newTicketTypes)
  }

  const updateTicketType = (index: number, field: string, value: string) => {
    const newTicketTypes = [...ticketTypes]
    newTicketTypes[index] = { ...newTicketTypes[index], [field]: value }
    setTicketTypes(newTicketTypes)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your API
    router.push("/dashboard")
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Create a New Event</h1>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details">Event Details</TabsTrigger>
            <TabsTrigger value="tickets">Ticket Types</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <form onSubmit={handleSubmit}>
            <TabsContent value="details">
              <Card>
                <CardHeader>
                  <CardTitle>Event Details</CardTitle>
                  <CardDescription>Provide the basic information about your event</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="event-name">Event Name</Label>
                    <Input id="event-name" placeholder="Enter the name of your event" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="event-description">Description</Label>
                    <Textarea
                      id="event-description"
                      placeholder="Describe your event"
                      className="min-h-[120px]"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Event Date</Label>
                      <DatePicker />
                    </div>
                    <div className="space-y-2">
                      <Label>Event Time</Label>
                      <TimePicker />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="event-venue">Venue</Label>
                    <Input id="event-venue" placeholder="Enter the venue name" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="event-address">Address</Label>
                    <Input id="event-address" placeholder="Enter the venue address" required />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="event-city">City</Label>
                      <Input id="event-city" placeholder="City" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="event-state">State/Province</Label>
                      <Input id="event-state" placeholder="State/Province" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="event-zip">Postal Code</Label>
                      <Input id="event-zip" placeholder="Postal Code" required />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" type="button">
                    Save Draft
                  </Button>
                  <Button type="button" onClick={() => setActiveTab("tickets")}>
                    Continue to Tickets
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="tickets">
              <Card>
                <CardHeader>
                  <CardTitle>Ticket Types</CardTitle>
                  <CardDescription>Create different ticket types with varying prices and quantities</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {ticketTypes.map((ticket, index) => (
                    <div key={index} className="border rounded-lg p-4 space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">Ticket Type {index + 1}</h3>
                        {ticketTypes.length > 1 && (
                          <Button variant="ghost" size="icon" type="button" onClick={() => removeTicketType(index)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`ticket-name-${index}`}>Name</Label>
                        <Input
                          id={`ticket-name-${index}`}
                          value={ticket.name}
                          onChange={(e) => updateTicketType(index, "name", e.target.value)}
                          placeholder="e.g., General Admission, VIP, Early Bird"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor={`ticket-price-${index}`}>Price</Label>
                          <Input
                            id={`ticket-price-${index}`}
                            value={ticket.price}
                            onChange={(e) => updateTicketType(index, "price", e.target.value)}
                            placeholder="0.00"
                            type="number"
                            min="0"
                            step="0.01"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`ticket-quantity-${index}`}>Quantity Available</Label>
                          <Input
                            id={`ticket-quantity-${index}`}
                            value={ticket.quantity}
                            onChange={(e) => updateTicketType(index, "quantity", e.target.value)}
                            placeholder="Number of tickets"
                            type="number"
                            min="1"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`ticket-description-${index}`}>Description (Optional)</Label>
                        <Textarea
                          id={`ticket-description-${index}`}
                          value={ticket.description}
                          onChange={(e) => updateTicketType(index, "description", e.target.value)}
                          placeholder="Describe what's included with this ticket type"
                        />
                      </div>
                    </div>
                  ))}

                  <Button type="button" variant="outline" className="w-full" onClick={addTicketType}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Another Ticket Type
                  </Button>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" type="button" onClick={() => setActiveTab("details")}>
                    Back
                  </Button>
                  <Button type="button" onClick={() => setActiveTab("settings")}>
                    Continue to Settings
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Event Settings</CardTitle>
                  <CardDescription>Configure additional settings for your event</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="event-category">Event Category</Label>
                    <select
                      id="event-category"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      required
                    >
                      <option value="">Select a category</option>
                      <option value="business">Business & Professional</option>
                      <option value="music">Music</option>
                      <option value="food">Food & Drink</option>
                      <option value="community">Community & Culture</option>
                      <option value="arts">Arts</option>
                      <option value="sports">Sports & Fitness</option>
                      <option value="health">Health & Wellness</option>
                      <option value="family">Family & Education</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="event-image">Event Image</Label>
                    <Input id="event-image" type="file" accept="image/*" />
                    <p className="text-sm text-muted-foreground">
                      Recommended size: 1200 x 630 pixels. Max file size: 10MB.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="private-event" className="rounded border-gray-300" />
                      <Label htmlFor="private-event">Make this a private event</Label>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Private events won't be listed publicly. Attendees will need a direct link to register.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="event-reminders" className="rounded border-gray-300" checked />
                      <Label htmlFor="event-reminders">Send email reminders to attendees</Label>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Automatically send reminders 48 hours before the event starts.
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" type="button" onClick={() => setActiveTab("tickets")}>
                    Back
                  </Button>
                  <Button type="submit">Create Event</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </form>
        </Tabs>
      </div>
    </div>
  )
}

