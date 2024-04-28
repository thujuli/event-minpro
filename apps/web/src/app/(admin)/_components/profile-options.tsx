import {
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import React from "react";

const ProfileOptions: React.FC = () => {
  return (
    <>
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem className="cursor-pointer">Settings</DropdownMenuItem>
      <DropdownMenuItem className="cursor-pointer text-red-400 focus:text-red-500">
        Logout
      </DropdownMenuItem>
    </>
  );
};

export default ProfileOptions;
