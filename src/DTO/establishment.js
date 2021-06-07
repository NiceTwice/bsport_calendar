export function establishmentDTOInput(establishment){
  return {
    id: establishment.id,
    title: establishment.title,
    address: establishment.location?.address,
    specific_info: establishment.specific_info
  }
}
