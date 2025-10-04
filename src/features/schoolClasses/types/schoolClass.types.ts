import type { Activity } from "../../activities/types/activity.types"
import type { Team } from "../../teams/types/team.types"
import type { User } from "../../users/types/user.types"

export interface SchoolClass {
	id: number
	name: string
	description: string
	createdAt: Date
	joinCode: string
	teacher: User
	teams: Team[]
	students: User[]
	activities: Activity[]
}