import { AppRoutes } from "./routes";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow container mx-auto mt-8">
        <AppRoutes />
      </div>
      <Footer />
    </div>
  );
};

export default App;
