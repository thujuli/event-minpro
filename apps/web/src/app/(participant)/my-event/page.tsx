import { Button } from "@/components/ui/button";
import * as React from "react";

interface IAppProps {}

const App: React.FunctionComponent<IAppProps> = (props) => {
  return (
    <section className="flex flex-1 flex-col items-center gap-4 md:gap-6">
      <div className="flex flex-col items-center gap-1 text-center">
        <h3 className="text-2xl font-bold tracking-tight">
          You have no events
        </h3>
        <p className="text-sm text-muted-foreground">
          Set up an event and proceed to sell tickets.
        </p>
        <Button className="mt-4">Add Event</Button>
      </div>
    </section>
  );
};

export default App;