import { useQuery } from "@tanstack/react-query";
import Cookie from "js-cookie";
import { getAdminEvents, getAdminEventTransactions } from "./fetchers";
import { Pagination } from "@/types/global";

export const useAdminEventTransactions = ({
  pagination,
}: {
  pagination: Pagination;
}) => {
  const token = Cookie.get("admin-tkn");

  return useQuery({
    queryKey: ["adminEventTransactions", { token, pagination }],
    queryFn: () => getAdminEventTransactions(token!, pagination),
  });
};

export const useAdminEvents = ({ pagination }: { pagination: Pagination }) => {
  const token = Cookie.get("admin-tkn");

  return useQuery({
    queryKey: ["adminEvents", { token, pagination }],
    queryFn: () => getAdminEvents(token!, pagination),
  });
};
