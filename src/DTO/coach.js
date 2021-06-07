export function coachDTOInput(coach){
  return {
    id: coach.id,
    name: coach.user?.name,
    first_name: coach.user?.first_name,
    last_name: coach.user?.last_name,
    photo: coach.user?.photo
  }
}
