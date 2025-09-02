import { Outlet } from "react-router-dom";

import { Navbar } from "./Navbar";
import { Container } from "./container";

export const MainLayout = () => {
  return (
    <>
      <Navbar />
      <main>
        <Container>
          <Outlet />
        </Container>
      </main>
    </>
  );
};
