import React from 'react'
import styled from '@emotion/styled'
import system from '../design/theme'
import check from '../img/check.svg'
import x from '../img/x.svg'

const Status = props => {
  return (
    // Pass this component a "success" boolean from your component's state. It will handle the rest.
    <Container success={props.success}>
      <img src={props.success ? check : x} />
      <p>{props.children}</p>
    </Container>
  )
}

export default Status

const Container = styled.div`
  display: flex;
  position: relative;
  flex-flow: row nowrap;
  align-items: center;
  width: 60%;
  background: ${props =>
    props.success ? system.color.success : system.color.danger};
  padding: ${system.spacing.standardPadding};
  border-radius: ${system.borders.bigRadius};
  box-shadow: ${system.shadows.otherLight};
  margin-bottom: 20px;

  p {
    color: ${system.color.white};
    margin-left: ${system.spacing.bigPadding};
    font-size: ${system.fontSizing.m};
  }

  img {
    height: 50px;
    width: 50px;
  }

  /* span {
    font-size: 30px;
    color: ${system.color.white};
    text-align: center;
    margin: 10px 15px;
  } */
`