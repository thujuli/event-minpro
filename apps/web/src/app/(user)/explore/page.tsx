"use client";
import * as React from "react";
import AllEventSection from "../views/home/all-event";
import { Button } from "@/components/ui/button";
import NavbarDetail from "../views/navbar-detail";
import NavbarDesktop from "../views/navbar-desktop";

interface IExploreProps {}

const Explore: React.FunctionComponent<IExploreProps> = (props) => {
  const [showConfirmationModal, setShowConfirmationModal] =
    React.useState(false);
  const handleShowConfirmationModal = () => {
    setShowConfirmationModal(true);
  };

  const handleCloseConfirmationModal = () => {
    setShowConfirmationModal(false);
  };
  return (
    <section>
      <NavbarDesktop />
      <AllEventSection />
    </section>
  );
};

export default Explore;
