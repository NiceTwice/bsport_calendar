export function activityDTOInput(activity){
  return {
    id: activity.id,
    name: activity.name,
    cover_main: activity.cover_main,
    description: activity.description,
    color: activity.color,
    rating: activity.rating
  }
}
