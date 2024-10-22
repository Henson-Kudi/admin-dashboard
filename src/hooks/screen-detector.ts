import React from 'react'

export function useScreenSize() {
    const [isMobile, setIsMobile] = React.useState<boolean>(false)
    const [windowWidth, setWindowWidth] = React.useState<number>(0)
    const [windowHeight, setWindowHeight] = React.useState<number>(0)
    React.useEffect(() => {
        const checkScreenSize = () => {
            setWindowWidth(window.innerWidth)
            setWindowHeight(window.innerHeight)
            setIsMobile(window.innerWidth < 768)
        }

        checkScreenSize()
        window.addEventListener("resize", checkScreenSize)

        return () => {
            window.removeEventListener("resize", checkScreenSize)
        }
    }, [])

  return { width: windowWidth, height: windowHeight, isMobile }
}