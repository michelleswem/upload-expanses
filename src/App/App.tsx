import React from "react";
import { ExpanseContextProvider } from "../store/expanses-context";
import { Layout } from "../components/layout";
import { Expanses } from "../components/expanses/Expenses";

export const App: React.FC = () => {
  return (
    <ExpanseContextProvider>
      <Layout>
        <Expanses />
      </Layout>
    </ExpanseContextProvider>
  );
};
