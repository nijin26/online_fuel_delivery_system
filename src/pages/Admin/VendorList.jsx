import React, { useEffect, useState } from "react";
import { Table } from "@mantine/core";

import { getDocs, collection, db } from "../../utils/firebaseConfig";

const VendorList = () => {
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await getDocs(collection(db, "vendors"));
      const vendorDetails = [];
      snapshot.forEach((doc) => {
        vendorDetails.push(doc.data());
      });
      setVendors(vendorDetails);
    };
    fetchData();
  }, []);

  let rows = vendors?.map(({ displayName, email, phoneNumber, fuelStationsName, city }) => (
    <tr key={email}>
      <td>{displayName}</td>
      <td>{email}</td>
      <td>{fuelStationsName}</td>
      <td>{city}</td>
      <td>{phoneNumber}</td>
    </tr>
  ));

  return (
    <Table horizontalSpacing="sm" verticalSpacing="sm" fontSize="md" highlightOnHover>
      <thead>
        <tr>
          <th>Owner Name</th>
          <th>Email</th>
          <th>Fuel Station</th>
          <th>City</th>
          <th>Mobile Number</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
};

export default VendorList;
