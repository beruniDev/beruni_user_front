import Header from "src/components/Header";
import Navigations from "./components/Navigations";
import Container from "./components/Container";
import Sidebar from "./components/Sidebar";
import Card from "./components/Card";
import Footer from "./components/Footer";

const App = () => {
  console.log("first");
  return (
    <Container>
      <Header />
      <Card className="flex p-4 h-[70vh]">
        <Sidebar />
        <Navigations />
      </Card>
      <Footer />
    </Container>
  );
};

export default App;
