"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Check, QrCode, Search, X } from "lucide-react"

export default function ValidateTicketsPage() {
  const [activeTab, setActiveTab] = useState("scan")
  const [ticketCode, setTicketCode] = useState("")
  const [validationResult, setValidationResult] = useState<null | {
    valid: boolean
    message: string
    ticketInfo?: any
  }>(null)
  const [isScanning, setIsScanning] = useState(false)

  const handleManualValidation = (e: React.FormEvent) => {
    e.preventDefault()

    if (!ticketCode.trim()) {
      return
    }

    // Simulate ticket validation
    // In a real app, this would call an API to validate the ticket
    if (ticketCode === "TICKET123" || ticketCode === "EVENT456") {
      setValidationResult({
        valid: true,
        message: "Ticket is valid!",
        ticketInfo: {
          eventName: "Tech Conference 2025",
          ticketType: "VIP Pass",
          attendeeName: "John Doe",
          ticketId: ticketCode,
        },
      })
    } else {
      setValidationResult({
        valid: false,
        message: "Invalid ticket code. Please try again.",
      })
    }
  }

  const handleScanQR = () => {
    setIsScanning(true)

    // Simulate QR scanning
    // In a real app, this would access the device camera and scan a QR code
    setTimeout(() => {
      setIsScanning(false)
      setValidationResult({
        valid: true,
        message: "Ticket is valid!",
        ticketInfo: {
          eventName: "Tech Conference 2025",
          ticketType: "General Admission",
          attendeeName: "Jane Smith",
          ticketId: "QRCODE789",
        },
      })
    }, 2000)
  }

  const resetValidation = () => {
    setValidationResult(null)
    setTicketCode("")
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold mb-6">Validate Tickets</h1>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="scan">Scan QR Code</TabsTrigger>
            <TabsTrigger value="manual">Manual Entry</TabsTrigger>
          </TabsList>

          <div className="mt-6">
            {validationResult ? (
              <Card className={validationResult.valid ? "border-green-500" : "border-red-500"}>
                <CardHeader
                  className={
                    validationResult.valid ? "bg-green-50 dark:bg-green-950/20" : "bg-red-50 dark:bg-red-950/20"
                  }
                >
                  <div className="flex items-center gap-2">
                    {validationResult.valid ? (
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                        <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
                      </div>
                    ) : (
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 dark:bg-red-900">
                        <X className="h-5 w-5 text-red-600 dark:text-red-400" />
                      </div>
                    )}
                    <CardTitle>{validationResult.valid ? "Valid Ticket" : "Invalid Ticket"}</CardTitle>
                  </div>
                  <CardDescription>{validationResult.message}</CardDescription>
                </CardHeader>

                {validationResult.valid && validationResult.ticketInfo && (
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="text-sm text-muted-foreground">Event:</div>
                        <div className="text-sm font-medium">{validationResult.ticketInfo.eventName}</div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="text-sm text-muted-foreground">Ticket Type:</div>
                        <div className="text-sm font-medium">{validationResult.ticketInfo.ticketType}</div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="text-sm text-muted-foreground">Attendee:</div>
                        <div className="text-sm font-medium">{validationResult.ticketInfo.attendeeName}</div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="text-sm text-muted-foreground">Ticket ID:</div>
                        <div className="text-sm font-medium">{validationResult.ticketInfo.ticketId}</div>
                      </div>
                    </div>
                  </CardContent>
                )}

                <CardFooter className="pt-4">
                  <Button onClick={resetValidation} className="w-full">
                    Validate Another Ticket
                  </Button>
                </CardFooter>
              </Card>
            ) : (
              <>
                <TabsContent value="scan">
                  <Card>
                    <CardHeader>
                      <CardTitle>Scan QR Code</CardTitle>
                      <CardDescription>Scan the QR code on the attendee's ticket</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="flex flex-col items-center justify-center">
                        {isScanning ? (
                          <div className="relative w-full aspect-square max-w-[300px] bg-muted rounded-lg overflow-hidden mb-4">
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-full h-0.5 bg-primary animate-pulse"></div>
                              <div className="h-full w-0.5 bg-primary animate-pulse"></div>
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <p className="text-sm text-muted-foreground">Scanning...</p>
                            </div>
                          </div>
                        ) : (
                          <div className="w-full aspect-square max-w-[300px] bg-muted rounded-lg flex items-center justify-center mb-4">
                            <QrCode className="h-24 w-24 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button onClick={handleScanQR} disabled={isScanning} className="w-full">
                        {isScanning ? "Scanning..." : "Start Scanning"}
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>

                <TabsContent value="manual">
                  <Card>
                    <CardHeader>
                      <CardTitle>Manual Entry</CardTitle>
                      <CardDescription>Enter the ticket code manually</CardDescription>
                    </CardHeader>
                    <form onSubmit={handleManualValidation}>
                      <CardContent className="pt-4">
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="ticket-code">Ticket Code</Label>
                            <Input
                              id="ticket-code"
                              placeholder="Enter ticket code"
                              value={ticketCode}
                              onChange={(e) => setTicketCode(e.target.value)}
                              required
                            />
                          </div>
                          <Alert>
                            <Search className="h-4 w-4" />
                            <AlertTitle>Tip</AlertTitle>
                            <AlertDescription>
                              Try entering "TICKET123" or "EVENT456" to see a valid ticket example.
                            </AlertDescription>
                          </Alert>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button type="submit" className="w-full">
                          Validate Ticket
                        </Button>
                      </CardFooter>
                    </form>
                  </Card>
                </TabsContent>
              </>
            )}
          </div>
        </Tabs>
      </div>
    </div>
  )
}

