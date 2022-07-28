import React, { useEffect, useState } from "react";
import { Table } from "@mantine/core";

import { getDocs, collection, db } from "../../utils/firebaseConfig";

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await getDocs(collection(db, "customers"));
      const customerDetails = [];
      snapshot.forEach((doc) => {
        customerDetails.push(doc.data());
      });
      setCustomers(customerDetails);
    };
    fetchData();
  }, []);

  let rows = customers?.map(({ displayName, email, phoneNumber }) => (
    <tr key={email}>
      <td>{displayName}</td>
      <td>{email}</td>
      <td>{phoneNumber}</td>
    </tr>
  ));

  return (
    <Table horizontalSpacing="sm" verticalSpacing="sm" fontSize="md" highlightOnHover>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Mobile Number</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
};

export default CustomerList;
