export interface CreateSchoolClassDto {
	name: string;
	description: string;
	teacher: {
		id: number;
	};
}

export interface UpdateSchoolClassDto {
	name?: string;
	description?: string;
}

export interface JoinClassRequest {
	joinCode: string;
	userId: number;
}

