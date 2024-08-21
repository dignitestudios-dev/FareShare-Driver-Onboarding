import "./App.css";
import Splash from "./pages/extras/Splash";
import { Route, Routes } from "react-router-dom";
import Signup from "./pages/onboarding/Signup";
import VerifyOtpEmail from "./pages/onboarding/VerifyOtpEmail";
import VerifyOtpPhone from "./pages/onboarding/VerifyOtpPhone";
import CompleteProfile from "./pages/onboarding/CompleteProfile";
import AddVehicle from "./pages/onboarding/AddVehicle";
import UploadVehicleImages from "./pages/onboarding/UploadVehicleImages";
import AwaitingApproval from "./pages/onboarding/AwaitingApproval";
import ApprovedProfile from "./pages/onboarding/ApprovedProfile";
import Summary from "./pages/onboarding/Summary";
import AddBank from "./pages/onboarding/AddBank";
import AddCard from "./pages/onboarding/AddCard";
import Success from "./pages/onboarding/Success";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Splash />} />
      <Route path="/:id/:token" element={<Splash />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/verify-otp-email" element={<VerifyOtpEmail />} />
      <Route path="/verify-otp-phone" element={<VerifyOtpPhone />} />
      <Route path="/complete-profile" element={<CompleteProfile />} />
      <Route path="/add-vehicle" element={<AddVehicle />} />
      <Route path="/upload-vehicle-images" element={<UploadVehicleImages />} />
      <Route path="/awaiting-approval" element={<AwaitingApproval />} />
      <Route path="/profile-approved" element={<ApprovedProfile />} />
      <Route path="/summary" element={<Summary />} />
      <Route path="/add-card" element={<AddCard />} />
      <Route path="/add-bank" element={<AddBank />} />
      <Route path="/success" element={<Success />} />
    </Routes>
  );
}

export default App;
