import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EventForm from "./components/EventForm/EventForm";
import EventsList from "./components/EventList/EventsList";
import EventDetails from "./components/EventDetails/EventDetails";
import RemoteEvents from "./components/RemoteEvents/RemoteEvents";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EventsList />} />
        <Route path="/add-event" element={<EventForm />} />
        <Route path="/edit-event/:id" element={<EventForm />} />
        <Route path="/event/:id" element={<EventDetails />} />
        <Route path="/remote-events" element={<RemoteEvents />} />
      </Routes>
    </Router>
  );
}
