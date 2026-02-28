import { useAuth } from "react-oidc-context";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router";
import { Input } from "@/components/ui/input";
import { AlertCircle, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { PublishedEventSummary, SpringBootPagination } from "@/domain/domain";
import { listPublishedEvents, searchPublishedEvents } from "@/lib/api";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import PublishedEventCard from "@/components/published-event-card";
import { SimplePagination } from "@/components/simple-pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";

const AttendeeLandingPage: React.FC = () => {
  const { isAuthenticated, isLoading, signinRedirect, signoutRedirect } =
    useAuth();

  const navigate = useNavigate();

  const [page, setPage] = useState(0);
  const [publishedEvents, setPublishedEvents] = useState<
    SpringBootPagination<PublishedEventSummary> | undefined
  >();
  const [error, setError] = useState<string | undefined>();
  const [query, setQuery] = useState<string | undefined>();
  const [category, setCategory] = useState<string>("");

  useEffect(() => {
    if ((query && query.length > 0) || (category && category.length > 0)) {
      queryPublishedEvents();
    } else {
      refreshPublishedEvents();
    }
  }, [page, category]);

  const refreshPublishedEvents = async () => {
    try {
      setPublishedEvents(await listPublishedEvents(page));
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else if (typeof err === "string") {
        setError(err);
      } else {
        setError("An unknown error has occurred");
      }
    }
  };

  const queryPublishedEvents = async () => {
    if (!query && !category) {
      await refreshPublishedEvents();
    }

    try {
      setPublishedEvents(
        await searchPublishedEvents(query || "", category, page),
      );
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else if (typeof err === "string") {
        setError(err);
      } else {
        setError("An unknown error has occurred");
      }
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Alert variant="destructive" className="bg-gray-900 border-red-700">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="bg-black min-h-screen text-white">
      {/* Nav */}
      <div className="flex justify-end p-4 container mx-auto">
        {isAuthenticated ? (
          <div className="flex gap-4">
            <Button
              onClick={() => navigate("/dashboard")}
              className="cursor-pointer"
            >
              Dashboard
            </Button>
            <Button
              className="cursor-pointer"
              onClick={() => signoutRedirect()}
            >
              Log out
            </Button>
          </div>
        ) : (
          <div className="flex gap-4">
            <Button className="cursor-pointer" onClick={() => signinRedirect()}>
              Log in
            </Button>
            <Button
              className="cursor-pointer bg-transparent border border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white"
              onClick={() => signinRedirect({ prompt: "create" })}
            >
              Create Account
            </Button>
          </div>
        )}
      </div>
      {/* Hero */}
      <div className="container mx-auto px-4 mb-8">
        <div className="bg-[url(/organizers-landing-hero.png)] bg-cover min-h-[200px] rounded-lg bg-bottom md:min-h-[250px]">
          <div className="bg-black/45 min-h-[200px] md:min-h-[250px] p-15 md:p-20">
            <h1 className="text-2xl font-bold mb-4">
              Find Tickets to Your Next Event
            </h1>
            <div className="flex flex-col gap-2 max-w-lg">
              <div className="flex gap-2">
                <Input
                  className="bg-white text-black"
                  value={query}
                  placeholder="Search events..."
                  onChange={(e) => setQuery(e.target.value)}
                />
                <Button onClick={queryPublishedEvents}>
                  <Search />
                </Button>
              </div>
              <div className="flex gap-2 items-center">
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="bg-white text-black w-[200px]">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Music">Music</SelectItem>
                    <SelectItem value="Comedy">Comedy</SelectItem>
                    <SelectItem value="Tech">Tech</SelectItem>
                    <SelectItem value="Business">Business</SelectItem>
                    <SelectItem value="Sports">Sports</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {category && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setCategory("")}
                    className="text-white hover:bg-gray-800"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Published Event Cards */}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-4 px-4">
        {publishedEvents?.content?.map((publishedEvent) => (
          <PublishedEventCard
            publishedEvent={publishedEvent}
            key={publishedEvent.id}
          />
        ))}
      </div>

      {publishedEvents && (
        <div className="w-full flex justify-center py-8">
          <SimplePagination
            pagination={publishedEvents}
            onPageChange={setPage}
          />{" "}
        </div>
      )}
    </div>
  );
};

export default AttendeeLandingPage;
