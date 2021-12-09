import React, { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { menuData, tooltipData } from "../../data/menuData"
import MenuButton from "../buttons/MenuButton"
import MenuTooltip from "../tooltips/MenuTooltip"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef()
  const tooltipRef = useRef()

  function handleClickOutside(event) {
    if (
      ref.current &&
      !ref.current.contains(event.target) &&
      !tooltipRef.current.contains(event.target)
    ) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <Wrapper>
      <img src="/images/logos/logo.svg" alt="logo" />
      <MenuWrapper count={menuData.length} ref={ref}>
        {menuData.map((item, index) => {
          return item.link === "/account" ? (
            <MenuButton
              item={item}
              key={index}
              onClick={e => {
                e.preventDefault()
                setIsOpen(!isOpen)
              }}
            />
          ) : (
            <MenuButton item={item} key={index} />
          )
        })}
        <HamburgerWrapper>
          <MenuButton
            item={{ title: "", icon: "/images/icons/hamburger.svg", link: "/" }}
            onClick={e => {
              e.preventDefault()
              setIsOpen(!isOpen)
            }}
          />
        </HamburgerWrapper>
      </MenuWrapper>
      <div ref={tooltipRef}>
        <MenuTooltip isOpen={isOpen} />
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: absolute;
  top: 60px;
  display: grid;
  grid-template-columns: 44px auto;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  padding: 0 30px;

  @media (max-width: 768px) {
    top: 30px;
  }

  @media (max-width: 450px) {
    top: 20px;
    padding: 0 20px;
  }
`

const MenuWrapper = styled.div`
  display: grid;
  gap: 30px;
  grid-template-columns: repeat(${props => props.count}, auto);

  @media (max-width: 768px) {
    > a {
      display: none;
    }
    grid-template-columns: auto;
  }
`

const HamburgerWrapper = styled.div`
  display: none;

  @media (max-width: 760px) {
    display: block;
  }
`
