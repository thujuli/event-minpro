"use client";

import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { eventColumns } from "../../_components/events/event-columns";
import DashboardTemplate from "../../_components/template";
import { getUserEvents } from "@/data/user";
import { EventDataTable } from "../../_components/events/event-data-table";
import { ResponseDataPagination } from "@/types/global";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Cookie from "js-cookie";
import { UserEventResponse } from "@/types/user";

const EventPage: React.FC = () => {
  const searchParams = useSearchParams();
  const [data, setData] = useState<
    ResponseDataPagination<UserEventResponse[]> | undefined
  >(undefined);
  const [canNextPage, setCanNextPage] = useState<boolean>(false);
  const [canPrevPage, setCanPrevPage] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const getData = async () => {
      const page = searchParams.get("page")
        ? Number(searchParams.get("page"))
        : 1;
      const limit = searchParams.get("limit")
        ? Number(searchParams.get("limit"))
        : 10;
      const sort_by = searchParams.get("sort_by")
        ? searchParams.get("sort_by")!
        : "createdAt";
      const order_by = searchParams.get("order_by")
        ? searchParams.get("order_by")!
        : "desc";

      const userEvents = await getUserEvents(Cookie.get("admin-tkn")!, {
        page,
        limit,
        sort_by,
        order_by,
      });
      setData(userEvents);
      setCanNextPage(userEvents.total > userEvents.limit * userEvents.page);
      setCanPrevPage(userEvents.page > 1);
      setTotalPages(Math.ceil(userEvents.total / userEvents.limit));
    };

    getData();
  }, [searchParams]);

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
      <div className="flex flex-1 justify-center">
        {data && data.result.length > 0 ? (
          <div className="w-full">
            <EventDataTable
              columns={eventColumns}
              data={data.result}
              page={data.page}
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
