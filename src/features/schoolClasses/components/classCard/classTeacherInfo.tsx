export default function ClassTeacherInfo({ teacher, isTeacher }: { teacher: any; isTeacher: boolean }) {
	return (
		<p className="text-gray-500 text-sm">
			Prof. {teacher.name} {teacher.lastName}{" "}
			{isTeacher && (
				<span className="ml-1 text-sm text-white bg-blue-500 px-2 py-1 rounded-xl">
					Tú
				</span>
			)}
		</p>
	);
}