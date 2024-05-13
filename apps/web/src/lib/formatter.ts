import { format } from "date-fns";

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(price);
};

export const formatNumber = (number: number) => {
  return new Intl.NumberFormat("id-ID").format(number);
};

export const formatDate = (date: string | number | Date) => {
  return format(date, "dd/MM/yyyy");
};
