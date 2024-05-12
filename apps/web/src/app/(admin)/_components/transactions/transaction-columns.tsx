"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserEventTransactionResponse } from "@/types/user";
import Link from "next/link";
import { formatDate, formatNumber, formatPrice } from "@/lib/formater";
import { Badge } from "@/components/ui/badge";
import { PaymentStatus } from "@/types/transaction";
import StatusBadge from "./status-badge";

export const transactionColumns: ColumnDef<UserEventTransactionResponse>[] = [
  {
    id: "event_name",
    accessorKey: "event.name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Event
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "user.username",
    header: "Customer",
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Amount
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount: number = row.getValue("amount");
      return <div>{!amount ? <Badge>Free</Badge> : formatPrice(amount)}</div>;
    },
  },
  {
    accessorKey: "redeemedPoints",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Redeemed Points
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const points: number = row.getValue("redeemedPoints");
      return (
        <div>
          {!points ? (
            "No points provided"
          ) : (
            <Badge>{formatNumber(points)}</Badge>
          )}
        </div>
      );
    },
  },
  {
    id: "voucher_name",
    accessorKey: "voucher.name",
    header: "Voucher",
    cell: ({ row }) => {
      const voucher: string | undefined = row.getValue("voucher_name");
      return (
        <div>{!voucher ? "No voucher provided" : <Badge>{voucher}</Badge>}</div>
      );
    },
  },
  {
    accessorKey: "paymentStatus",
    header: "Payment Status",
    cell: ({ row }) => {
      const status: PaymentStatus = row.getValue("paymentStatus");
      return (
        <div>
          {status === "waiting" && (
            <StatusBadge status="waiting">Waiting</StatusBadge>
          )}
          {status === "paid" && <StatusBadge status="paid">Paid</StatusBadge>}
          {status === "success" && (
            <StatusBadge status="success">Success</StatusBadge>
          )}
          {status === "failed" && (
            <StatusBadge status="failed">Failed</StatusBadge>
          )}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const name = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              asChild
              className="cursor-pointer text-green-500 focus:text-green-600"
            >
              <Link href={`/admin/events/${name.id}/edit`}>Success</Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              asChild
              className="cursor-pointer text-red-500 focus:text-red-600"
            >
              <Link href={`/admin/events/${name.id}/edit`}>Failed</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
