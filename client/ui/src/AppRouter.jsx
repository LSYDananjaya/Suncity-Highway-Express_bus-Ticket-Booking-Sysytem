import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import Register from "./components/User_Auth/Register";
import MyProfile from "./components/User_Auth/MyProfile";
import ReportForm from "./components/Financial/ReportForm";
import FinancialReport from "./components/Financial/FinancialReport";
import Sign from "./components/User_Auth/Sign";
import MyForm from "./components/Bookings/MyForm";
import BusCardlist from "./components/Bookings//BusCardlist";
import Update from "./components/Bookings//Update";
import Reservationlist from "./components/Bookings//Reservationlist";
import Navbar from "./components/NavBar/Navbar";
import LastD from "./components/Footer/LastD";
import EmployeeList from "./components/Employee/EmployeeList";
import InsertEmployee from "./components/Employee/InsertEmployee";
import ContactUs from "./components/Employee/ContactUs";
import Navbar1 from "./components/NavBar/Navbar1";
import Footer from "./components/Footer/Footer";
import AddReview from "./components/Feedback/AddReview";
import Feedbacklist from "./components/Feedback/Feedbacklist";
import PackageList from "./components/Package_Management/PackageList";
import InsertPackage from "./components/Package_Management/InsertPackage";
import Navbar2 from "./components/NavBar/Navbar2";
import LuggageList from "./components/Luggage/LuggageList";
import ViewLuggage from "./components/Luggage/ViewLuggage";
import InsertLuggageForm from "./components/Luggage/InsertLuggage";
import Navbar3 from "./components/NavBar/Navbar3";
import AdminDashboard from "./components/User_Auth/adminDash";
import Home from "./Home";
import ScheduleForm from "./components/Schedule/shMyForm";
import ScheduleList from "./components/Schedule/sheduleList";
import UpdateScheduleForm from "./components/Schedule/updateschedule";
import BusList from "./components/Employee/BusList";
import InsertBus from "./components/Employee/InsertBus";
import Navbar4 from "./components/NavBar/Navbar4";

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeRoutes />} />
        <Route path="/Home" element={<HomeWithNav />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/MyProfile/:id" element={<MyProfileWithNav />} />
        <Route path="/Report" element={<ReportFormWithNav />} />
        <Route path="/financial-report" element={<FinancialReportWithNav />} />
        <Route path="/buslist/form/:id" element={<MyFormWithNav />} />
        <Route path="/form" element={<MyFormWithNav />} />
        <Route path="/read" element={<ReservationlistWithNav />} />
        <Route path="/buslist" element={<BusCardlistWithNav />} />
        <Route path="/read/updateForm/:id" element={<UpdateWithNav />} />
        <Route path="/luggage" element={<LuggageWithNav />} />
        <Route path="/insert" element={<InsertLuggageWithNav />} />
        <Route path="/luggage/:id" element={<ViewLuggageWithNav />} />
        <Route path="/employees" element={<EmployeeListWithNav />} />
        <Route path="/insertemp" element={<InsertEmployeeWithNav />} />
        <Route path="/contactus" element={<ContactUsWithNav />} />
        <Route path="/AddReview" element={<AddReviewWithNav />} />
        <Route path="/ViewReview" element={<ViewReviewWithNav />} />
        <Route path="/AddPackage" element={<AddPackageWithNav />} />
        <Route path="/ViewPackage" element={<ViewPackageWithNav />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/InsertSchedule" element={<InsertScheduleWithNav />} />
        <Route path="/ViewSchedule" element={<ViewScheduleWithNav />} />
        <Route path="/UpdateSchedule" element={<UpdateScheduleWithNav />} />
        <Route path="/addBus" element={<InsertBusWithNav />} />
        <Route path="/busses" element={<BusListWithNav />} />
      </Routes>
    </Router>
  );
}

function HomeRoutes() {
  return (
    <>
      <Sign />
    </>
  );
}

function HomeWithNav() {
  return (
    <>
      <Navbar />
      <Home />
      <Footer />
    </>
  );
}

function ReportFormWithNav() {
  return (
    <>
      <Navbar3 />
      <ReportForm />
      <Footer />
    </>
  );
}

function MyProfileWithNav() {
  return (
    <>
      <Navbar />
      <MyProfile />
      <Footer />
    </>
  );
}

function FinancialReportWithNav() {
  return (
    <>
      <Navbar3 />
      <FinancialReport />
      <Footer />
    </>
  );
}

function MyFormWithNav() {
  return (
    <>
      <Navbar />
      <MyForm />
      <Footer />
    </>
  );
}

function ReservationlistWithNav() {
  return (
    <>
      <Navbar />
      <Reservationlist />
      <Footer />
    </>
  );
}

function BusCardlistWithNav() {
  return (
    <>
      <Navbar />
      <BusCardlist />
      <Footer />
    </>
  );
}

function UpdateWithNav() {
  return (
    <>
      <Navbar />
      <Update />
      <Footer />
    </>
  );
}

function InsertLuggageWithNav() {
  return (
    <>
      <Navbar />
      <InsertLuggageForm />
      <Footer />
    </>
  );
}

function ViewLuggageWithNav() {
  return (
    <>
      <Navbar />
      <ViewLuggage />
      <Footer />
    </>
  );
}

function LuggageWithNav() {
  return (
    <>
      <Navbar />
      <LuggageList />
      <Footer />
    </>
  );
}

function EmployeeListWithNav() {
  return (
    <>
      <Navbar1 />
      <EmployeeList />
      <Footer />
    </>
  );
}

function InsertEmployeeWithNav() {
  return (
    <>
      <Navbar1 />
      <InsertEmployee />
      <Footer />
    </>
  );
}

function ContactUsWithNav() {
  return (
    <>
      <Navbar />
      <ContactUs />
      <Footer />
    </>
  );
}

function AddReviewWithNav() {
  return (
    <>
      <Navbar />
      <AddReview />
      <Footer />
    </>
  );
}

function ViewReviewWithNav() {
  return (
    <>
      <Navbar />
      <Feedbacklist />
      <Footer />
    </>
  );
}

function AddPackageWithNav() {
  return (
    <>
      <Navbar2 />
      <InsertPackage />
      <Footer />
    </>
  );
}

function ViewPackageWithNav() {
  return (
    <>
      <Navbar2 />
      <PackageList />
      <Footer />
    </>
  );
}

function InsertScheduleWithNav() {
  return (
    <>
      <Navbar4 />
      <ScheduleForm />
      <Footer />
    </>
  );
}
function UpdateScheduleWithNav() {
  return (
    <>
      <UpdateScheduleForm />
      <Footer />
    </>
  );
}

function ViewScheduleWithNav() {
  return (
    <>
      <Navbar4 />
      <ScheduleList />
      <Footer />
    </>
  );
}

function InsertBusWithNav() {
  return (
    <>
      <Navbar1 />
      <InsertBus />
      <Footer />
    </>
  );
}

function BusListWithNav() {
  return (
    <>
      <Navbar1 />
      <BusList />
      <Footer />
    </>
  );
}

export default AppRouter;
