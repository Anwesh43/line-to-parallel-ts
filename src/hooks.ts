import {
    CSSProperties,
    useEffect, 
    useState 
} from 'react'

const scGap : number = 0.02 
const delay : number = 20 

export const useAnimatedScale = () => {
    const [scale, setScale] = useState(0)
    const [animated, setAnimated] = useState(false)
    return {
        scale, 
        start() {
            if (!animated) {
                setAnimated(true)
                const interval = setInterval(() => {
                    setScale((prev : number) => {
                        if (prev > 1) {
                            setAnimated(false)
                            clearInterval(interval)
                            return 0 
                        }
                        return prev + scGap 
                    })
                })
            }
        }
    }
}

export const useDimension = () => {
    const [w, setW] = useState(window.innerWidth)
    const [h, setH] = useState(window.innerHeight)
    useEffect(() => {
        window.onresize = () => {
            setW(window.innerWidth)
            setH(window.innerHeight)
        }
        return () => {
            window.onresize = () => {

            }
        }
    })
    return {
        w,
        h,
    }
}

const maxScale = (scale : number, i : number, n : number) : number => Math.max(0, scale - i / n)
const divideScale = (scale : number, i : number, n : number) : number => Math.min(1 / n, maxScale(scale, i, n)) * n 
const sinify = (scale : number) : number => Math.sin(scale * Math.PI)

export const useStyle = (w : number, h : number, scale : number) => {
    const sf : number = sinify(scale)
    const sf1 : number = divideScale(sf, 0, 2)
    const sf2 : number = divideScale(sf, 1, 2)
    const position = 'absolute'
    const background = 'indigo'
    const size : number = Math.min(w, h)  / 5
    return {
        parentStyle() : CSSProperties {
            const left = `${w / 2}px`
            const top = `${h / 2}px`
            const transform = `rotate(${90 * sf2}deg)`
            return {
                left, 
                top, 
                position, 
                transform 

            }
        }, 
        lineStyle(i : number) : CSSProperties {
            const top = `${-size * 0.5 * (1 - 2 * i)}px`
            const left = `${-size / 2}px`
            const width = `${size}px`
            const height = `${Math.min(w, h) / 80}px`
            return {    
                top, 
                left, 
                width, 
                height, 
                background, 
                position 
            }
        }
    }
}
