export function offerDTOInput(offer){
  return {
    id: offer.id,
    booking_ids: offer.bookings,
    level: offer.level,
    slots: offer.tot_slots,
    effectif: offer.effectif,
    duration: offer.duration_minute,
    validated_booking_count: offer.validated_booking_count,
    date_start: offer.date_start,
    establishment_id: offer.establishment,
    coach_id: offer.coach,
    activity_id: offer.meta_activity
  }
}
