import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import VacationTable from "./components/vacationTable/vacationTable"
import SingleViewVacationTable from "./components/singleViewVacationTable/singleViewVacationTable";
import SubmitVacationRequest from "./components/submitVacationRequest/submitVacationRequest";

const App = () => (
        <div className="App">
          <Router>
            <Routes>
              <Route path="/" element={<VacationTable/>} />
              <Route path="/submit-request" element={<SubmitVacationRequest/>} />
              <Route path="/view-user-requests/:userId" element={<SingleViewVacationTable />} />
              <Route path="/view-user-requests/submit-request/:userId" element={<SubmitVacationRequest />} />
            </Routes>
          </Router>
        </div>
    )
;
export default App;
