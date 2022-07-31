// Library Imports
import React, { useEffect, useState } from "react";
import { Table } from "@mantine/core";

//Local File Imports
import { getDocs, collection, db } from "../../utils/firebaseConfig";

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
          <th>Subject</th>
          <th>Message</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
};

export default Contacts;
