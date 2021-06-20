import React from 'react'
import {useStyle} from './hooks'
import withContainer from './withContaine'
interface LTPProps {
    w : number, 
    h : number, 
    scale : number, 
    onClick : Function 
}

const LineToParallel : React.FC<LTPProps> = (props : LTPProps) => {
    const {parentStyle, lineStyle} = useStyle(props.w, props.h, props.scale)
    return (
        <React.Fragment>
            <button onClick = {() => props.onClick()}>LineToParallel</button>
            <div style = {parentStyle()}>
                {[0, 1].map((i : number) =>(<div key = {`line_${i}`} style = {lineStyle(i)}></div>))}
            </div>
        </React.Fragment>
    )
}

export default withContainer(LineToParallel)