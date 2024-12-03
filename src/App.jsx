import "./App.css";
import "./fonts/stylesheet.css";

import { Routes, Route } from "react-router-dom";
import Splash from "./pages/extras/Splash";
import Signup from "./pages/onboarding/Signup";
import VerifyOtpEmail from "./pages/onboarding/VerifyOtpEmail";
import VerifyOtpPhone from "./pages/onboarding/VerifyOtpPhone";
import CompleteProfile from "./pages/onboarding/CompleteProfile";
import UploadVehicleImages from "./pages/onboarding/UploadVehicleImages";
import AddVehicle from "./pages/onboarding/AddVehicle";
import AwaitingApproval from "./pages/onboarding/AwaitingApproval";
import ApprovedProfile from "./pages/onboarding/ApprovedProfile";
import Summary from "./pages/onboarding/Summary";
import Success from "./pages/onboarding/Success";
import AddCard from "./pages/onboarding/AddCard";
import AddBank from "./pages/onboarding/AddBank";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Splash />} />
      <Route path="/:id/:token" element={<Splash />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/verify-otp-email" element={<VerifyOtpEmail />} />
      <Route path="/verify-otp-phone" element={<VerifyOtpPhone />} />
      <Route path="/complete-profile" element={<CompleteProfile />} />
      <Route path="/upload-vehicle-images" element={<UploadVehicleImages />} />
      <Route path="/add-vehicle" element={<AddVehicle />} />
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
