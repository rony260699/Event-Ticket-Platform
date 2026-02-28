import NavBar from "@/components/nav-bar";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EventStats } from "@/domain/domain";
import { getEventStats } from "@/lib/api";
import { AlertCircle, ArrowLeft, ArrowRight, BarChart3, Ticket, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "react-oidc-context";
import { Link, useNavigate, useParams } from "react-router";

const OrganizerAnalyticsPage: React.FC = () => {
    const { user } = useAuth();
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [stats, setStats] = useState<EventStats | undefined>();
    const [error, setError] = useState<string | undefined>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            if (!user?.access_token || !id) return;
            try {
                const data = await getEventStats(user.access_token, id);
                setStats(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Failed to load stats");
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, [user?.access_token, id]);

    if (loading) {
        return (
            <div className="bg-black min-h-screen text-white">
                <NavBar />
                <div className="flex items-center justify-center h-[60vh]">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-black min-h-screen text-white">
                <NavBar />
                <div className="p-4">
                    <Alert variant="destructive" className="bg-gray-900 border-red-700">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-black min-h-screen text-white">
            <NavBar />

            <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 hover:bg-gray-800 rounded-full transition-colors"
                    >
                        <ArrowLeft className="h-6 w-6" />
                    </button>
                    <div>
                        <h1 className="text-3xl font-bold flex items-center gap-2">
                            <BarChart3 className="h-8 w-8 text-purple-500" />
                            Event Analytics
                        </h1>
                        <p className="text-gray-400">Detailed performance metrics for your event</p>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Card className="bg-gray-900 border-gray-800 text-white">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-gray-400">Tickets Sold</CardTitle>
                            <Ticket className="h-5 w-5 text-purple-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-4xl font-bold">{stats?.totalTicketsSold}</div>
                            <p className="text-xs text-gray-500 mt-1">Total revenue from all tickets</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-gray-900 border-gray-800 text-white">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-gray-400">Actual Attendees</CardTitle>
                            <Users className="h-5 w-5 text-green-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-4xl font-bold text-green-400">{stats?.totalCheckedIn}</div>
                            <p className="text-xs text-gray-500 mt-1">
                                {stats?.checkInPercentage.toFixed(1)}% of purchasers attended
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="bg-gray-900 border-gray-800 text-white">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-gray-400">Total Revenue</CardTitle>
                            <span className="h-5 w-5 text-yellow-400 font-bold text-xl leading-none">৳</span>
                        </CardHeader>
                        <CardContent>
                            <div className="text-4xl font-bold">৳{stats?.totalRevenue.toLocaleString()}</div>
                            <p className="text-xs text-gray-500 mt-1">Direct sales and processing</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Attendance Analysis Section */}
                <Card className="bg-gray-900 border-gray-800 text-white overflow-hidden">
                    <CardHeader>
                        <CardTitle className="text-xl">Attendance Analysis</CardTitle>
                        <p className="text-sm text-gray-400">
                            Comparison between tickets sold and actual event attendance.
                        </p>
                    </CardHeader>
                    <CardContent className="space-y-8">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-400">Check-in Progress</span>
                                <span className="font-bold text-purple-400">
                                    {stats?.totalCheckedIn} / {stats?.totalTicketsSold}
                                </span>
                            </div>
                            <div className="h-4 w-full bg-gray-800 rounded-full overflow-hidden p-1 border border-gray-700">
                                <div
                                    className="h-full bg-gradient-to-r from-purple-600 to-blue-500 rounded-full transition-all duration-1000 ease-in-out"
                                    style={{ width: `${stats?.checkInPercentage}%` }}
                                ></div>
                            </div>
                        </div>

                        <div className="bg-gray-800/50 rounded-xl p-8 flex flex-col items-center text-center space-y-6 border border-gray-700/50">
                            <div className="p-4 bg-purple-500/10 rounded-full">
                                <Users className="h-10 w-10 text-purple-500" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-xl font-bold">Attendee Insights</h3>
                                <p className="text-gray-400 max-w-sm mx-auto">
                                    Get the full list of ticket purchasers, track their scan status, and view check-in timestamps.
                                </p>
                            </div>
                            <Button asChild className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 py-6 rounded-lg transition-all group">
                                <Link to={`/dashboard/events/${id}/attendees`} className="flex items-center gap-2">
                                    View Full Attendee List
                                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default OrganizerAnalyticsPage;
