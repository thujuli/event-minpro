"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import Cookie from "js-cookie";
import { getAdminEvents } from "@/data/admin";
import { AdminEventResponse } from "@/types/admin";
import { TableCell, TableRow } from "@/components/ui/table";
import { formatPrice } from "@/lib/formatter";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

const EventTableRow: React.FC = () => {
  const [events, setEvents] = useState<AdminEventResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setIsLoading(true);

    try {
      const token = Cookie.get("admin-tkn");
      if (!token) return;

      const adminEvents = await getAdminEvents(token, {
        page: 1,
        limit: 3,
        sort_by: "createdAt",
        order_by: "desc",
      });

      setEvents(adminEvents.result);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return Array(5)
      .fill(0)
      .map((_, index) => (
        <TableRow key={index}>
          <TableCell>
            <Skeleton className="h-5" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-5" />
          </TableCell>
        </TableRow>
      ));
  }

  return !events.length ? (
    <TableRow>
      <TableCell colSpan={2}>
        <div className="flex flex-col items-center justify-center gap-1 text-center">
          <h3 className="text-xl font-bold tracking-tight">No events found!</h3>
          <p className="text-sm text-muted-foreground">
            There are currently no events to display
          </p>
        </div>
      </TableCell>
    </TableRow>
  ) : (
    events.map((event) => (
      <TableRow key={event.id}>
        <TableCell className="font-medium">{event.name}</TableCell>
        <TableCell className="text-right">
          {!event.price ? <Badge>Free</Badge> : formatPrice(event.price)}
        </TableCell>
      </TableRow>
    ))
  );
};

export default EventTableRow;
