"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useEffect } from "react";
import CategoryItems from "./category-items";
import { EventSchema, eventSchema } from "@/schemas/event";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, ChevronsUpDown } from "lucide-react";
import { LocationSearch } from "@/components/shared/location-search";
import { LocationResponse } from "@/types/location";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardHeader } from "@/components/ui/card";
import { TimePicker } from "@/components/shared/time-picker";
import { AutosizeTextarea } from "@/components/shared/autosize-textarea";
import { useRouter } from "next/navigation";
import { AdminEventResponse } from "@/types/admin";
import Image from "next/image";
import { NEXT_PUBLIC_BASE_API_URL } from "@/lib/env";
import { useCreateEvent, useUpdateEvent } from "@/services/event/mutations";

type Props = {
  type?: "create" | "readonly" | "update";
  event?: AdminEventResponse;
};

const EventForm: React.FC<Props> = ({ type = "create", event }) => {
  const router = useRouter();
  const createEventMutation = useCreateEvent();
  const updateEventMutation = useUpdateEvent();
  const form = useForm<EventSchema>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      name: event?.name || "",
      price: event && event.price >= 0 ? event.price : undefined,
      startDate: event?.startDate ? new Date(event?.startDate) : undefined,
      endDate: event?.endDate ? new Date(event?.endDate) : undefined,
      location: event?.locationId || undefined,
      category: event?.categoryId || undefined,
      description: event?.description || "",
      maxCapacity: event?.maxCapacity || undefined,
      limitCheckout: event?.limitCheckout || undefined,
      image: event?.imageURL || undefined,
    },
  });

  const fileRef = form.register("image");

  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<
    LocationResponse | undefined
  >();

  useEffect(() => {
    if (event?.location.id) {
      setSelected({ id: event.location.id, name: event.location.name });
    }
  }, [event?.location]);

  const handleSetActive = React.useCallback((item: LocationResponse) => {
    setSelected(item);
    setOpen(false);
  }, []);

  const displayName = selected ? selected.name : "Select location";

  const onSubmit = async (data: EventSchema) => {
    if (type === "update" && event) {
      updateEventMutation.mutate({
        eventId: `${event.id}`,
        data: {
          ...data,
          locationId: data.location,
          categoryId: data.category,
          image: data.image[0],
        },
      });

      return router.push("/dashboard/events");
    }

    createEventMutation.mutate({
      ...data,
      locationId: data.location,
      categoryId: data.category,
      image: data.image[0],
    });

    router.push("/dashboard/events");
  };

  return (
    <Form {...form}>
      <form
        className="grid w-full gap-4 lg:grid-cols-3 lg:gap-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="space-y-4 lg:col-span-2 lg:space-y-6">
          <Card>
            <CardHeader className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Event Name"
                        {...field}
                        disabled={type === "readonly"}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <AutosizeTextarea
                        {...field}
                        className="resize-none"
                        disabled={type === "readonly"}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value ? `${field.value}` : ""}
                      defaultValue={`${field.value}`}
                      disabled={type === "readonly"}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <CategoryItems />
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location"
                render={() => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            disabled={type === "readonly"}
                            className={cn(
                              "w-full justify-between",
                              !selected && "text-muted-foreground",
                            )}
                          >
                            {displayName}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent align="start" className="p-0">
                        <LocationSearch
                          selectedResult={selected}
                          onSelectResult={(result) => {
                            form.setValue("location", result.id);
                            handleSetActive(result);
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="text-left">Start Date</FormLabel>
                      <Popover>
                        <FormControl>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              disabled={type === "readonly"}
                              className={cn(
                                "w-[280px] justify-start text-left font-normal",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {field.value ? (
                                format(field.value, "PPP HH:mm:ss")
                              ) : (
                                <span>Pick a date</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                        </FormControl>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                          <div className="border-t border-border p-3">
                            <TimePicker
                              setDate={field.onChange}
                              date={field.value}
                            />
                          </div>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="text-left">End Date</FormLabel>
                      <Popover>
                        <FormControl>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              disabled={type === "readonly"}
                              className={cn(
                                "w-[280px] justify-start text-left font-normal",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {field.value ? (
                                format(field.value, "PPP HH:mm:ss")
                              ) : (
                                <span>Pick a date</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                        </FormControl>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                          <div className="border-t border-border p-3">
                            <TimePicker
                              setDate={field.onChange}
                              date={field.value}
                            />
                          </div>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardHeader>
          </Card>
        </div>

        <div className="space-y-4 lg:space-y-6">
          <Card>
            <CardHeader className="space-y-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="0"
                        {...field}
                        type="number"
                        min={0}
                        value={field.value ?? ""}
                        disabled={type === "readonly"}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="maxCapacity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Max Capacity</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="0"
                        {...field}
                        type="number"
                        min={0}
                        value={field.value ?? ""}
                        disabled={type === "readonly"}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="limitCheckout"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Limit Checkout</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="0"
                        {...field}
                        type="number"
                        min={0}
                        value={field.value ?? ""}
                        disabled={type === "readonly"}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image</FormLabel>
                    <FormControl
                      className={cn(type === "readonly" && "hidden")}
                    >
                      <Input
                        placeholder="0"
                        {...fileRef}
                        type="file"
                        disabled={type === "readonly"}
                      />
                    </FormControl>
                    {event?.imageURL && (
                      <Image
                        src={NEXT_PUBLIC_BASE_API_URL + event.imageURL}
                        width={300}
                        height={180}
                        className="max-h-[180px] w-full rounded-lg object-cover object-top"
                        alt={event.name}
                      />
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardHeader>
          </Card>

          {type !== "readonly" && (
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="w-full"
            >
              {type === "create" && "Create Event"}
              {type === "update" && "Update Event"}
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
};

export default EventForm;
