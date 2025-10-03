import { apiClient } from "../../../services/apiClient"
import type { SchoolClass } from "../types/schoolClass.types"

export const getAllSchoolClassesByUserId = async () => {
	return apiClient.get<SchoolClass[]>("schoolclasses");
}
