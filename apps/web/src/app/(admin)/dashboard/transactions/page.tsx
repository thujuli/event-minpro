"use client";

import React, { useEffect, useState } from "react";
import DashboardTemplate from "../../_components/template";
import { useSearchParams } from "next/navigation";
import { ResponseDataPagination } from "@/types/global";
import { UserEventTransactionResponse } from "@/types/user";
import usePagination from "@/hooks/usePagination";
import Cookie from "js-cookie";
import { getUserEventTransactions } from "@/data/user";
import axios from "axios";
import { toast } from "sonner";
import LoadingDashboard from "../../_components/loading";
import { TransactionDataTable } from "../../_components/transactions/transaction-data-table";
import { transactionColumns } from "../../_components/transactions/transaction-columns";

const TransactionsPage: React.FC = () => {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<
    ResponseDataPagination<UserEventTransactionResponse[]> | undefined
  >(undefined);
  const {
    canNextPage,
    canPrevPage,
    setCanNextPage,
    setCanPrevPage,
    setTotalPages,
    totalPages,
  } = usePagination();

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const getData = async () => {
    setIsLoading(true);

    try {
      const token = Cookie.get("admin-tkn")!;
      if (!token) return;

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

      const eventTransactions = await getUserEventTransactions(token, {
        page,
        limit,
        sort_by,
        order_by,
      });

      setData(eventTransactions);
      setCanNextPage(
        eventTransactions.total >
          eventTransactions.limit * eventTransactions.page,
      );
      setCanPrevPage(eventTransactions.page > 1);
      setTotalPages(
        Math.ceil(eventTransactions.total / eventTransactions.limit),
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <LoadingDashboard />;

  return (
    <DashboardTemplate>
      <div className="flex flex-1 justify-center">
        {data && data.result.length > 0 ? (
          <div className="w-full">
            <TransactionDataTable
              columns={transactionColumns}
              data={data.result}
              page={data.page}
              totalPages={totalPages}
              canNextPage={canNextPage}
              canPrevPage={canPrevPage}
            />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight">
              No transactions found!
            </h3>
            <p className="text-sm text-muted-foreground">
              There are currently no transactions to display
            </p>
          </div>
        )}
      </div>
    </DashboardTemplate>
  );
};

export default TransactionsPage;
