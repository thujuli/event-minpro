"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import Cookie from "js-cookie";
import { getUserEvents, getUserEventTransactions } from "@/data/user";
import { UserEventTransactionResponse } from "@/types/user";
import { TableCell, TableRow } from "@/components/ui/table";
import { formatPrice } from "@/lib/formater";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

const TransactionTableRow: React.FC = () => {
  const [transactions, setTransactions] = useState<
    UserEventTransactionResponse[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setIsLoading(true);

    try {
      const token = Cookie.get("admin-tkn");
      if (!token) return;

      const userEventTransactions = await getUserEventTransactions(token, {
        page: 1,
        limit: 5,
        sort_by: "createdAt",
        order_by: "desc",
      });

      setTransactions(userEventTransactions.result);
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

  return !transactions.length ? (
    <TableRow>
      <TableCell colSpan={2}>
        <div className="flex flex-col items-center justify-center gap-1 text-center">
          <h3 className="text-xl font-bold tracking-tight">
            No transactions found!
          </h3>
          <p className="text-sm text-muted-foreground">
            There are currently no transactions to display
          </p>
        </div>
      </TableCell>
    </TableRow>
  ) : (
    transactions.map((transaction) => (
      <TableRow key={transaction.id}>
        <TableCell className="font-medium">
          {transaction.user.username}
        </TableCell>
        <TableCell className="text-right">
          {!transaction.amount ? (
            <Badge>Free</Badge>
          ) : (
            formatPrice(transaction.amount)
          )}
        </TableCell>
      </TableRow>
    ))
  );
};

export default TransactionTableRow;
