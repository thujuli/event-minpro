import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const EventCreate: React.FC = () => {
  return (
    <Card className="mx-auto max-w-xl">
      <CardHeader>
        <CardTitle>Create New Event</CardTitle>
        <CardDescription>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odit dolore
          commodi dolorem architecto repudiandae deserunt nesciunt saepe
          eligendi numquam praesentium!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="name">Name</Label>
            <Input id="name" type="text" className="w-full" />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="price">Price</Label>
            <Input id="price" type="number" className="w-full" />
          </div>
          <div className="flex gap-4">
            <div className="grid flex-1 gap-3">
              <Label htmlFor="start-date">Start Date</Label>
              <DatePicker id="start-date" placeholder="Event Start Date" />
            </div>
            <div className="grid flex-1 gap-3">
              <Label htmlFor="end-date">End Date</Label>
              <DatePicker id="end-date" placeholder="Event End Date" />
            </div>
          </div>
          <div className="grid gap-3">
            <Label htmlFor="location">Location</Label>
            <Select>
              <SelectTrigger className="w-full" id="location">
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-3">
            <Label htmlFor="category">Category</Label>
            <Select>
              <SelectTrigger className="w-full" id="category">
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-3">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" className="w-full resize-none" />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="capacity">Capacity</Label>
            <Input id="capacity" type="number" className="w-full" />
          </div>
          <Button className="w-full">Create Event</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default EventCreate;
