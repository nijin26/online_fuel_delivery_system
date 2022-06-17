import React from "react";
import { Drawer } from "@mantine/core";
import AdminNavbar from "../../components/AdminNavbar";

const Admin = () => {
  const [open, setOpen] = React.useState(true);

  return (
    <Drawer opened={open} onClose={() => setOpen(false)} size="xl" closeButtonLabel="">
      <AdminNavbar />
    </Drawer>
  );
};

export default Admin;
