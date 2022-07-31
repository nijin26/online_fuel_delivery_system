// Library Imports
import React, { useEffect, useState } from "react";
import { Table } from "@mantine/core";

//Local File Imports
import { getDocs, collection, db } from "../../utils/firebaseConfig";

const elements = [
  { position: 6, mass: 12.011, symbol: "C", name: "Carbon" },
  { position: 7, mass: 14.007, symbol: "N", name: "Nitrogen" },
  { position: 39, mass: 88.906, symbol: "Y", name: "Yttrium" },
  { position: 56, mass: 137.33, symbol: "Ba", name: "Barium" },
  { position: 58, mass: 140.12, symbol: "Ce", name: "Cerium" },
];

const Contacts = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await getDocs(collection(db, "contacts"));
      const contactdetails = [];
      snapshot.forEach((doc) => {
        contactdetails.push(doc.data());
      });
      setContacts(contactdetails);
    };
    fetchData();
  }, []);

  let rows = contacts?.map(({ email, name, message, subject }) => (
    <tr key={email}>
      <td>{name}</td>
      <td>{email}</td>
      <td>{subject}</td>
      <td>{message}</td>
    </tr>
  ));

  return (
    <Table horizontalSpacing="sm" verticalSpacing="sm" fontSize="md" highlightOnHover>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Message</th>
          <th>Subject</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
};

export default Contacts;
