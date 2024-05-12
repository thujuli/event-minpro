"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import Cookie from "js-cookie";
import { getUserEvents } from "@/data/user";
import { UserEventResponse } from "@/types/user";
import { TableCell, TableRow } from "@/components/ui/table";
import { formatPrice } from "@/lib/formater";
import { Skeleton } from "@/components/ui/skeleton";

const EventTableRow: React.FC = () => {
  const [events, setEvents] = useState<UserEventResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setIsLoading(true);

    try {
      const token = Cookie.get("admin-tkn");
      if (!token) return;

      const userEvents = await getUserEvents(token, {
        page: 1,
        limit: 5,
        sort_by: "createdAt",
        order_by: "desc",
      });

      setEvents(userEvents.result);
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

  return events.map((event) => (
    <TableRow key={event.id}>
      <TableCell className="font-medium">{event.name}</TableCell>
      <TableCell className="text-right">
        {!event.price ? "Free" : formatPrice(event.price)}
      </TableCell>
    </TableRow>
  ));
};

export default EventTableRow;
