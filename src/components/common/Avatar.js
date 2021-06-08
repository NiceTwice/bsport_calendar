import React from "react";
import styled from "styled-components";

const Img = styled.img`
  width: 40px;
  height: 40px;
`

export const Avatar = ({className, ...props}) => {
  return <Img className={`rounded-circle ${className || ''}`} {...props}/>
}
