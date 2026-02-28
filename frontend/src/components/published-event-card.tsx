import { PublishedEventSummary } from "@/domain/domain";
import { Card } from "./ui/card";
import { Calendar, Heart, MapPin, Share2 } from "lucide-react";
import { format } from "date-fns";
import { Link } from "react-router";
import RandomEventImage from "./random-event-image";

interface PublishedEventCardProperties {
  publishedEvent: PublishedEventSummary;
}

const PublishedEventCard: React.FC<PublishedEventCardProperties> = ({
  publishedEvent,
}) => {
  return (
    <Link to={`/events/${publishedEvent.id}`} className="block w-fit">
      <Card className="py-0 overflow-hidden max-w-[240px] gap-2 relative">
        {publishedEvent.salesStart && new Date() < new Date(publishedEvent.salesStart) && (
          <div className="absolute top-2 right-2 z-10 bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-lg animate-pulse">
            COMING SOON
          </div>
        )}
        {/* Card Image */}
        <div className="h-[140px]">
          <RandomEventImage />
        </div>
        <div className="px-2">
          <h3 className="text-lg font-medium">{publishedEvent.name}</h3>
          {publishedEvent.category && (
            <div className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-0.5 rounded-full font-medium mb-2">
              {publishedEvent.category}
            </div>
          )}
        </div>
        <div className="px-2">
          <div className="flex gap-2 text-sm mb-2 text-gray-500">
            <MapPin className="w-5" /> {publishedEvent.venue}
          </div>
          <div className="flex gap-2 text-sm mb-2 text-gray-500">
            {publishedEvent.start && publishedEvent.end ? (
              <div className="flex gap-2">
                <Calendar className="w-5" />{" "}
                {format(publishedEvent.start, "PP")} -{" "}
                {format(publishedEvent.end, "PP")}
              </div>
            ) : (
              <div className="flex gap-2">
                <Calendar />
                Dates TBD
              </div>
            )}
          </div>
          <div className="flex justify-between p-2 border-t text-gray-500">
            <button className="cursor-pointer">
              <Heart />
            </button>
            <button className="cursor-pointer">
              <Share2 />
            </button>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default PublishedEventCard;
