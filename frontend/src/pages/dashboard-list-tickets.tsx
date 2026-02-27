import NavBar from "@/components/nav-bar";
import { SimplePagination } from "@/components/simple-pagination";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SpringBootPagination, TicketSummary } from "@/domain/domain";
import { cancelTicket, listTickets } from "@/lib/api";
import { AlertCircle, DollarSign, Tag, Ticket as TicketIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "react-oidc-context";
import { Link } from "react-router";

const DashboardListTickets: React.FC = () => {
  const { isLoading, user } = useAuth();

  const [tickets, setTickets] = useState<
    SpringBootPagination<TicketSummary> | undefined
  >();
  const [error, setError] = useState<string | undefined>();
  const [page, setPage] = useState(0);

  const fetchTickets = async () => {
    if (isLoading || !user?.access_token) {
      return;
    }
    try {
      setTickets(await listTickets(user.access_token, page));
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else if (typeof err === "string") {
        setError(err);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  useEffect(() => {
    fetchTickets();
  }, [isLoading, user?.access_token, page]);

  const handleCancel = async (e: React.MouseEvent, ticketId: string) => {
    e.preventDefault();
    if (!user?.access_token) return;

    try {
      await cancelTicket(user.access_token, ticketId);
      await fetchTickets(); // Refresh list
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to cancel ticket");
    }
  };

  if (error) {
    return (
      <div className="bg-black min-h-screen text-white">
        <NavBar />
        <Alert variant="destructive" className="bg-gray-900 border-red-700">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen text-white">
      <NavBar />

      {/* Title */}
      <div className="py-8 px-4">
        <h1 className="text-2xl font-bold">Your Tickets</h1>
        <p>Tickets you have purchased</p>
      </div>

      <div className="max-w-lg mx-auto space-y-4 px-4">
        {tickets?.content.map((ticketItem) => (
          <Link key={ticketItem.id} to={`/dashboard/tickets/${ticketItem.id}`}>
            <Card className="bg-gray-900 text-white border-gray-800 hover:border-gray-700 transition-colors">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <TicketIcon className="h-5 w-5 text-purple-400" />
                      <h3 className="font-bold text-xl">
                        {ticketItem.ticketType.eventName}
                      </h3>
                    </div>
                    <p className="text-gray-400 text-sm ml-7">
                      {ticketItem.ticketType.name}
                    </p>
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded-full font-medium ${ticketItem.status === "PURCHASED" ? "bg-green-900 text-green-200" :
                        ticketItem.status === "REFUND_PENDING" ? "bg-amber-900 text-amber-200" :
                          ticketItem.status === "CANCELLED" ? "bg-red-900 text-red-200" :
                            "bg-gray-800 text-gray-300"
                      }`}
                  >
                    {ticketItem.status}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-end">
                  <div className="space-y-4">
                    {/* Price */}
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5 text-gray-400" />
                      <p className="font-medium">${ticketItem.ticketType.price}</p>
                    </div>

                    {/* Ticket ID */}
                    <div className="flex items-center gap-2">
                      <Tag className="h-5 w-5 text-gray-400" />
                      <div>
                        <h4 className="font-medium">Ticket ID</h4>
                        <p className="text-gray-400 font-mono text-sm">
                          {ticketItem.id}
                        </p>
                      </div>
                    </div>
                  </div>

                  {ticketItem.status === "PURCHASED" && (
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={(e) => handleCancel(e, ticketItem.id)}
                      className="cursor-pointer"
                    >
                      Cancel Ticket
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      <div className="flex justify-center py-8">
        {tickets && (
          <SimplePagination pagination={tickets} onPageChange={setPage} />
        )}
      </div>
    </div>
  );
};

export default DashboardListTickets;
