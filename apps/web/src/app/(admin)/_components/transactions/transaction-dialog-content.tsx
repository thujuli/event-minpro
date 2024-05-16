"use client";

import React from "react";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import TransactionDialogBody from "./transaction-dialog-body";
import Cookie from "js-cookie";
import axios from "axios";
import { toast } from "sonner";
import { updateTransactionStatus } from "@/data/admin";
import { useRouter } from "next/navigation";
import { useUpdateTransactionStatus } from "@/services/admin/mutations";

type Props = {
  transactionId: number;
};

const TransactionDialogContent: React.FC<Props> = (props) => {
  const { transactionId } = props;

  const updateTransactionStatus = useUpdateTransactionStatus();

  const handlePaymentStatus = async (
    transactionId: number,
    data: { status: "success" | "failed" },
  ) => {
    updateTransactionStatus.mutate({
      transactionId,
      data,
    });
  };
  // const token = Cookie.get("admin-tkn");
  // const router = useRouter();

  // if (!token) return null;

  // const handlePaymentSuccess = async () => {
  //   try {
  //     const promise = updateTransactionStatus(token, transactionId, "success");

  //     toast.promise(promise, {
  //       loading: "Verifying payment...",
  //       success: (data) => {
  //         return data.message;
  //       },
  //     });

  //     await promise;
  //     router.push("/dashboard/transactions");
  //   } catch (error) {
  //     if (axios.isAxiosError(error)) {
  //       toast.error(error.response?.data.message);
  //     }
  //   }
  // };

  // const handlePaymentFailed = async () => {
  //   try {
  //     const promise = updateTransactionStatus(token, transactionId, "failed");

  //     toast.promise(promise, {
  //       loading: "Verifying payment...",
  //       success: (data) => {
  //         return data.message;
  //       },
  //     });

  //     await promise;
  //     router.push("/dashboard/transactions");
  //   } catch (error) {
  //     if (axios.isAxiosError(error)) {
  //       toast.error(error.response?.data.message);
  //     }
  //   }
  // };

  return (
    <DialogContent className="sm:max-w-[425px] md:max-w-xl">
      <DialogHeader>
        <DialogTitle>Payment Proof</DialogTitle>
        <DialogDescription>Here&apos;s the payment proof</DialogDescription>
      </DialogHeader>
      <TransactionDialogBody />
      <DialogFooter>
        <div className="flex items-center justify-end gap-2">
          <DialogClose asChild>
            <Button
              type="button"
              size="sm"
              onClick={() =>
                handlePaymentStatus(transactionId, { status: "success" })
              }
              className="bg-green-600 hover:bg-green-600/90"
            >
              Verify Payment
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              type="button"
              size="sm"
              onClick={() =>
                handlePaymentStatus(transactionId, { status: "failed" })
              }
              variant="destructive"
            >
              Mark As Failed
            </Button>
          </DialogClose>
        </div>
      </DialogFooter>
    </DialogContent>
  );
};

export default TransactionDialogContent;
