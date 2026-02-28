import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { getEventAttendees } from "@/lib/api";
import { EventAttendee, Page } from "@/domain/domain";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
    ChevronLeft,
    ChevronRight,
    UserCheck,
    UserX,
    ArrowLeft,
    Search,
} from "lucide-react";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { useAuth } from "react-oidc-context";

export default function OrganizerAttendeesPage() {
    const { user } = useAuth();
    const { eventId } = useParams<{ eventId: string }>();
    const [attendeePage, setAttendeePage] = useState<Page<EventAttendee> | null>(
        null
    );
    const [page, setPage] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (eventId) {
            loadAttendees();
        }
    }, [eventId, page]);

    const loadAttendees = async () => {
        if (!user?.access_token) return;

        try {
            setLoading(true);
            const data = await getEventAttendees(user.access_token, eventId!, page, 10);
            setAttendeePage(data);
        } catch (error) {
            console.error("Failed to load attendees", error);
        } finally {
            setLoading(false);
        }
    };

    const filteredAttendees = attendeePage?.content.filter(
        (a) =>
            a.purchaserName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            a.purchaserEmail.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container mx-auto py-10 space-y-8">
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <Link
                        to="/dashboard/events"
                        className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1 mb-2 transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Events
                    </Link>
                    <h1 className="text-3xl font-bold tracking-tight">Event Attendees</h1>
                    <p className="text-muted-foreground">
                        Manage and view all ticket purchasers for your event.
                    </p>
                </div>
            </div>

            <Card className="border-none shadow-lg bg-card/50 backdrop-blur-sm">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>Purchaser List</CardTitle>
                            <CardDescription>
                                A detailed list of all successful ticket purchases.
                            </CardDescription>
                        </div>
                        <div className="relative w-72">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search by name or email..."
                                className="pl-8"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border border-border/50 overflow-hidden">
                        <Table>
                            <TableHeader className="bg-muted/50">
                                <TableRow>
                                    <TableHead>Purchaser</TableHead>
                                    <TableHead>Ticket Type</TableHead>
                                    <TableHead>Price</TableHead>
                                    <TableHead>Purchased At</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Checked In</TableHead>
                                    <TableHead>Check-in Time</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {loading ? (
                                    <TableRow>
                                        <TableCell colSpan={7} className="h-24 text-center">
                                            Loading attendees...
                                        </TableCell>
                                    </TableRow>
                                ) : filteredAttendees && filteredAttendees.length > 0 ? (
                                    filteredAttendees.map((attendee) => (
                                        <TableRow key={attendee.ticketId} className="hover:bg-muted/30 transition-colors">
                                            <TableCell>
                                                <div className="flex flex-col">
                                                    <span className="font-medium text-foreground">
                                                        {attendee.purchaserName}
                                                    </span>
                                                    <span className="text-xs text-muted-foreground">
                                                        {attendee.purchaserEmail}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="outline" className="font-normal capitalize">
                                                    {attendee.ticketTypeName}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="font-medium">
                                                ৳{attendee.pricePaid.toFixed(2)}
                                            </TableCell>
                                            <TableCell className="text-muted-foreground">
                                                {format(new Date(attendee.purchasedAt), "MMM d, yyyy HH:mm")}
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    className={attendee.status === 'PURCHASED' ? "bg-green-500/10 text-green-500 border-green-500/20" : ""}
                                                    variant={attendee.status === 'PURCHASED' ? "outline" : "secondary"}
                                                >
                                                    {attendee.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center">
                                                    {attendee.checkedIn ? (
                                                        <div className="flex items-center gap-1.5 text-green-500">
                                                            <UserCheck className="h-4 w-4" />
                                                            <span className="text-sm font-medium">Yes</span>
                                                        </div>
                                                    ) : (
                                                        <div className="flex items-center gap-1.5 text-muted-foreground/60">
                                                            <UserX className="h-4 w-4" />
                                                            <span className="text-sm font-medium">No</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-muted-foreground italic text-sm">
                                                {attendee.checkedInAt
                                                    ? format(new Date(attendee.checkedInAt), "HH:mm:ss")
                                                    : "-"}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                                            No attendees found.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    {attendeePage && attendeePage.totalPages > 1 && (
                        <div className="flex items-center justify-end space-x-2 py-4">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setPage((p) => Math.max(0, p - 1))}
                                disabled={page === 0}
                                className="transition-all hover:bg-muted"
                            >
                                <ChevronLeft className="h-4 w-4 mr-1" />
                                Previous
                            </Button>
                            <div className="text-sm font-medium">
                                Page {page + 1} of {attendeePage.totalPages}
                            </div>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setPage((p) => Math.min(attendeePage.totalPages - 1, p + 1))}
                                disabled={page === attendeePage.totalPages - 1}
                                className="transition-all hover:bg-muted"
                            >
                                Next
                                <ChevronRight className="h-4 w-4 ml-1" />
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
