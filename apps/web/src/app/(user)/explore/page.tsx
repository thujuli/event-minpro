"use client";
import * as React from "react";
import AllEventSection from "../views/home/all-event";
import { Button } from "@/components/ui/button";

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
      <AllEventSection />
      {showConfirmationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="rounded-lg bg-white p-8">
            <p>Apakah Anda yakin sudah melakukan pembayaran?</p>
            <div className="mt-4 flex justify-center space-x-4">
              {/* TINGGAL BUTTON YA NYA KASIH FUNCTION BUAT NGIRIM AXIOS */}
              <Button>Ya</Button>
              <Button onClick={handleCloseConfirmationModal}>Batal</Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Explore;
