import NavBar from "@/components/nav-bar";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EventStats } from "@/domain/domain";
import { getEventStats } from "@/lib/api";
import { AlertCircle, ArrowLeft, BarChart3, DollarSign, Ticket, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "react-oidc-context";
import { useNavigate, useParams } from "react-router";

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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="bg-gray-900 border-gray-800 text-white">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-gray-400">Total Tickets Sold</CardTitle>
                            <Ticket className="h-5 w-5 text-purple-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-4xl font-bold">{stats?.totalTicketsSold}</div>
                            <p className="text-xs text-gray-500 mt-1">+12% from last week</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-gray-900 border-gray-800 text-white">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-gray-400">Total Revenue</CardTitle>
                            <DollarSign className="h-5 w-5 text-green-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-4xl font-bold">${stats?.totalRevenue.toLocaleString()}</div>
                            <p className="text-xs text-gray-500 mt-1">Direct sales and processing</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-gray-900 border-gray-800 text-white">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-gray-400">Check-in Rate</CardTitle>
                            <Users className="h-5 w-5 text-blue-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-4xl font-bold">{stats?.checkInPercentage.toFixed(1)}%</div>
                            <div className="w-full bg-gray-800 rounded-full h-2 mt-4">
                                <div
                                    className="bg-blue-500 h-2 rounded-full"
                                    style={{ width: `${stats?.checkInPercentage}%` }}
                                ></div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Placeholder for future Charts */}
                <Card className="bg-gray-900 border-gray-800 text-white p-8">
                    <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
                        <div className="p-4 bg-gray-800 rounded-full">
                            <BarChart3 className="h-12 w-12 text-gray-500" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold">More Insights Coming Soon</h3>
                            <p className="text-gray-400 max-w-md mx-auto">
                                We're building advanced time-series analysis and demographic charts to help you grow your audience.
                            </p>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default OrganizerAnalyticsPage;
