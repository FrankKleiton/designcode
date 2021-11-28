import { createGlobalStyle } from "styled-components"
import { themes } from "./ColorStyles"

export const GlobalStyle = createGlobalStyle`
    background: ${themes.light.background} !important;
    @media (prefers-colors-scheme: dark) {
        background: ${themes.dark.background} !important;
    }
`
