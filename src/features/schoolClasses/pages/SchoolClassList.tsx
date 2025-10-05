import MyClasses from "../components/listClasses/myClasses";
import SwiftAction from "../components/listClasses/swiftAction";
import Welcome from "../components/listClasses/welcome";

export default function SchoolClassList() {



	return (
		<div className="bg-gray-50 min-h-screen px-4 sm:px-20 lg:px-40 xl:px-80 pt-20">
			<Welcome />
			<SwiftAction />
			<MyClasses />

		</div>
	);
}
