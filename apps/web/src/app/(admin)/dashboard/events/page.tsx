import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { eventColumns } from "../../_components/events/event-columns";
import DashboardTemplate from "../../_components/template";
import { getEvents } from "@/data/event";
import { EventDataTable } from "../../_components/events/event-data-table";

type Props = {
  searchParams: {
    page?: string;
  };
};

const EventPage: React.FC<Props> = async ({ searchParams }: Props) => {
  let pageNumber: number;

  if (!searchParams.page) {
    pageNumber = 1;
  } else if (!isNaN(Number(searchParams.page))) {
    pageNumber = Number(searchParams.page);
  } else {
    pageNumber = 1;
  }

  const data = await getEvents(pageNumber);
  const canNextPage = data.total > data.limit * pageNumber;
  const canPrevPage = pageNumber > 1;
  const totalPages = Math.ceil(data.total / data.limit);

  return (
    <DashboardTemplate>
      <div>
        <Button asChild size="sm" className="h-8 gap-1">
          <Link href="/dashboard/events/create">
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Add Event
            </span>
          </Link>
        </Button>
      </div>
      <div className="flex flex-1 items-center justify-center">
        {data.result.length > 0 ? (
          <div className="w-full">
            <EventDataTable
              columns={eventColumns}
              data={data.result}
              pageNumber={pageNumber}
              totalPages={totalPages}
              canNextPage={canNextPage}
              canPrevPage={canPrevPage}
            />
          </div>
        ) : (
          <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight">
              You have no events
            </h3>
            <p className="text-sm text-muted-foreground">
              Set up an event and proceed to sell tickets.
            </p>
            <Button className="mt-4">Add Event</Button>
          </div>
        )}
      </div>
    </DashboardTemplate>
  );
};

export default EventPage;
