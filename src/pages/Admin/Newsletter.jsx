import React, { useState, useEffect } from "react";
import { Table } from "@mantine/core";
import { getDocs, collection, db } from "../../utils/firebaseConfig";

const Newsletter = () => {
  const [Newsletter, setNewsletter] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await getDocs(collection(db, "newsletter"));
      const newsletterDetails = [];
      snapshot.forEach((doc) => {
        newsletterDetails.push(doc.data());
      });
      setNewsletter(newsletterDetails);
    };
    fetchData();
  }, []);

  let rows = Newsletter?.map(({ email, time }) => (
    <tr key={email}>
      <td>{new Date(time)}</td>
      <td>{email}</td>
    </tr>
  ));
  return (
    <Table horizontalSpacing="sm" verticalSpacing="sm" fontSize="md" highlightOnHover>
      <thead>
        <tr>
          <th>Subcribed At</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
};

export default Newsletter;
