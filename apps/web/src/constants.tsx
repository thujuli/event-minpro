import {
  ArrowRightLeft,
  BookOpenText,
  Home,
  LineChart,
  TicketPercent,
} from "lucide-react";

export const dashboardMenuItems = [
  {
    name: "Dashboard",
    icon: Home,
    link: "/dashboard",
  },
  {
    name: "Transactions",
    icon: ArrowRightLeft,
    link: "/dashboard/transactions",
  },
  {
    name: "Registrations",
    icon: BookOpenText,
    link: "/dashboard/registrations",
  },
  {
    name: "Promos",
    icon: TicketPercent,
    link: "/dashboard/promos",
  },
  {
    name: "Analytics",
    icon: LineChart,
    link: "/dashboard/analytics",
  },
];
