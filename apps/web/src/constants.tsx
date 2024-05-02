import {
  ArrowRightLeft,
  Calendar,
  Home,
  LineChart,
  NotebookPen,
  TicketPercent,
} from "lucide-react";

export const dashboardMenuItems = [
  {
    name: "Dashboard",
    icon: Home,
    link: "/dashboard",
  },
  {
    name: "Events",
    icon: Calendar,
    link: "/dashboard/events",
  },
  {
    name: "Transactions",
    icon: ArrowRightLeft,
    link: "/dashboard/transactions",
  },
  {
    name: "Registrations",
    icon: NotebookPen,
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
