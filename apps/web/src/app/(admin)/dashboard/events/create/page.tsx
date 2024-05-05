import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import DashboardTemplate from "@/app/(admin)/_components/template";
import EventForm from "@/app/(admin)/_components/events/event-form";

const EventCreate: React.FC = () => {
  return (
    <DashboardTemplate>
      <Card className="mx-auto max-w-xl">
        <CardHeader>
          <CardTitle>Create New Event</CardTitle>
          <CardDescription>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odit
            dolore commodi dolorem architecto repudiandae deserunt nesciunt
            saepe eligendi numquam praesentium!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <EventForm />
        </CardContent>
      </Card>
    </DashboardTemplate>
  );
};

export default EventCreate;
