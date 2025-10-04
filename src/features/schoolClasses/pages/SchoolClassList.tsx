import Welcome from "../components/welcome";
import SwiftAction from "../components/swiftAction";
import MyClasses from "../components/myClasses";

export default function SchoolClassList() {



	return (
		<div className="bg-gray-50 min-h-screen px-4 sm:px-20 lg:px-40 xl:px-80">
			<Welcome />
			<SwiftAction />
			<MyClasses />

		</div>
	);
}
