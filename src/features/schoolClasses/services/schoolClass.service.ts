import { apiClient } from "../../../services/apiClient"
import type { Activity } from "../../activities/types/activity.types";
import type { Team } from "../../teams/types/team.types";
import type { User } from "../../users/types/user.types";
import type { CreateSchoolClassDto, JoinClassRequest, UpdateSchoolClassDto } from "../dtos/schoolClass.dto";
import type { SchoolClass } from "../types/schoolClass.types"

export const getAllSchoolClassesByUserId = async (userId: number) => {
	return apiClient.get<SchoolClass[]>(`schoolclasses?userId=${userId}`);
};

export const getSchoolClassById = async (id: number) => {
	return apiClient.get<SchoolClass>(`schoolclasses/${id}`);
};

export const addSchoolClass = async (data: CreateSchoolClassDto) => {
	return apiClient.post<SchoolClass>("schoolclasses", data);
};

export const updateSchoolClass = async (id: number, data: UpdateSchoolClassDto) => {
	return apiClient.put<SchoolClass>(`schoolclasses/${id}`, data);
};

export const deleteSchoolClass = async (id: number) => {
	return apiClient.delete<void>(`schoolclasses/${id}`);
};

export const joinSchoolClass = async (data: JoinClassRequest) => {
	return apiClient.post<SchoolClass>("schoolclasses/join", data);
};

export const leaveSchoolClass = async (classId: number, userId: number) => {
	return apiClient.delete<void>(`schoolclasses/${classId}/members/${userId}`);
};

export const getStudentsByClassId = async (classId: number) => {
	return apiClient.get<User[]>(`schoolclasses/${classId}/students`);
};

export const getTeamsByClassId = async (classId: number) => {
	return apiClient.get<Team[]>(`schoolclasses/${classId}/teams`);
};

export const getActivitiesByClassId = async (classId: number) => {
	return apiClient.get<Activity[]>(`schoolclasses/${classId}/activities`);
};
