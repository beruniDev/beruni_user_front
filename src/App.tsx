import Header from "src/components/Header";
import Navigations from "./components/Navigations";
import Container from "./components/Container";
import Sidebar from "./components/Sidebar";
import Card from "./components/Card";
import Footer from "./components/Footer";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (window.location.pathname === "/") navigate("/main");
  }, []);

  return (
    <Container className="relative flex flex-col h-[100vh]">
      <Header />
      <Card className="flex p-4 h-[75vh]">
        <Sidebar />
        <Navigations />
      </Card>
      <Footer />
    </Container>
  );
};

export default App;
