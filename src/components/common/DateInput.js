import React, {useMemo} from "react";
import "flatpickr/dist/themes/light.css";
import Flatpickr from "react-flatpickr";

export const DateInput = ({value = new Date(), onChange}) => {
  const options = useMemo(() => ({
    mode: "range",
    dateFormat: "d-m-Y"
  }), []);

  return (
    <Flatpickr
      className="form-control"
      onChange={onChange}
      options={options}
      value={value}/>
  )
}

export default DateInput;
