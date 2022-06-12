import React from "react";
import { MantineProvider } from "@mantine/core";

//components
import Authentication from "./pages/Authentication/Authentication";

const myTheme = {
  colorScheme: "dark",
  primaryColor: "green",
};

function App() {
  return (
    <MantineProvider theme={myTheme}>
      <Authentication />
    </MantineProvider>
  );
}

export default App;
