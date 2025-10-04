import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./features/schoolClasses/components/header";
import SchoolClassList from "./features/schoolClasses/pages/SchoolClassList";
import Activities from "./features/activities/pages/Activities";
import Teams from "./features/teams/pages/Teams";
import SchoolClassDetail from "./features/schoolClasses/pages/SchoolClassDetail";

function App() {
	return (
		<Router>
			<Header />
			<Routes>
				{/*<Route path="/" element={<Home />} />*/}
				<Route path="/schoolclasses" element={<SchoolClassList />} />
				<Route path="/teams" element={<Teams />} />
				<Route path="/activities" element={<Activities />} />
				<Route path="/schoolclasses/:id" element={<SchoolClassDetail />} />

			</Routes>
		</Router>
	);
}

export default App
