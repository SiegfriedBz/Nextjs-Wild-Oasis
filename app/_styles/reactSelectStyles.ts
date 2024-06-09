import { StylesConfig } from 'react-select'

const accentColor = '#C69963'
const lightColor = '#FAF5F0'
const darkColor = '#1B2631'
const focusedBorderColor = `1px solid ${accentColor}`
const defaultBorderColor = `1px solid ${lightColor}`

const colourStyles = <TOption>(): StylesConfig<TOption, boolean> => ({
  singleValue: (styles) => ({
    ...styles,
    color: lightColor
  }),
  control: (styles, { isFocused }) => {
    return {
      ...styles,
      backgroundColor: isFocused ? accentColor : darkColor,
      color: lightColor,
      boxShadow: 'none',
      border: isFocused ? focusedBorderColor : defaultBorderColor
    }
  },
  menuList: (styles) => ({
    ...styles,
    padding: '1px 0',
    backgroundColor: lightColor
  }),
  option: (styles, { isSelected }) => {
    return {
      ...styles,
      backgroundColor: isSelected ? accentColor : darkColor,
      color: lightColor,
      fontWeight: isSelected ? 'bold' : 'normal'
    }
  }
})

export default colourStyles
