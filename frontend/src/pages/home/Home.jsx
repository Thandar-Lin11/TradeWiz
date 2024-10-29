// import ForexPanel from "../../components/forexChannel/ForexPanel";
import MessageContainer from "../../components/messages/MessageContainer";
import Sidebar from "../../components/sidebar/Sidebar";

const Home = () => {
  return (
    <div className="flex w-full h-screen bg-blue-50 backdrop-filter backdrop-blur-lg bg-opacity-10 mx-[5%]">
      <Sidebar />
      <MessageContainer />
    </div>
  );
};
export default Home;
