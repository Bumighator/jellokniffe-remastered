import React, { Component, useState, useEffect, useRef } from 'react'
import SectionWrapperAdaptive from './SectionWrapperAdaptive'

const QuoteWrapper = () => {
    const [height, setHeight] = useState(0)
    const resizeRef = useRef(null)

    useEffect(() => {
        handleResize()
        window.addEventListener("resize", handleResize, true)

        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, [])

    const handleResize = () => {
        if(resizeRef.current !== undefined){
            setHeight(resizeRef.current.clientWidth)
        }
    }

    const $class = "quoteWithGeometry"
    return(
        <div className={`${$class + "-wrapper"}`}>
            <div
                ref={resizeRef}
                style={{
                    height: `${height}px`
                }}
                className={`${$class + "-wrapper-geometryWrapper"}`}
            >
                <div className={`${$class + "-wrapper-geometryWrapper-circleMedium"}`}>
                    <svg>
                        <defs>
                            <linearGradient id="linearRayCircleMedium" x1="0%" y1="0%" x2="100%" y2="0%" gradientTransform="rotate(0)">
                                <stop offset="25" stopColor="#10101000">
                                    <animate
                                        attributeName="offset"
                                        values="0;0.10;0.60;1;0" //-15
                                        dur="9s"
                                        repeatCount="indefinite"
                                    />
                                </stop>
                                <stop offset="41" stopColor="#16161600">
                                    <animate
                                        attributeName="offset"
                                        values="0;0.21;0.71;1;0" //-20
                                        dur="9s"
                                        repeatCount="indefinite"
                                    />
                                </stop>    
                                <stop offset="50" stopColor="#393935">
                                    <animate
                                        attributeName="offset"
                                        values="0;0.50;1;1;0"
                                        dur="9s"
                                        repeatCount="indefinite"
                                    />
                                </stop>    
                                <stop offset="59" stopColor="#16161600">
                                    <animate
                                        attributeName="offset"
                                        values="0;0.79;1;1;0" //+20
                                        dur="9s"
                                        repeatCount="indefinite"
                                    />
                                </stop>    
                                <stop offset="75" stopColor="#10101000">
                                    <animate
                                        attributeName="offset"
                                        values="0;0.9;1;1;0" //+15
                                        dur="9s"
                                        repeatCount="indefinite"
                                    />
                                </stop>    
                            </linearGradient>
                        </defs>
                        <g transform="translate(1, 1)">
                            <rect className="circleMedium-rect" x="0" y="0" fill="none" stroke="#272727" rx='100%' ry='100%' strokeWidth='2' strokeDasharray='0' strokeDashoffset='0' strokeLinecap='square'/>
                            <rect className="circleMedium-rect" x="0" y="0" fill="none" stroke="url(#linearRayCircleMedium)" rx='100%' ry='100%' strokeWidth='2' strokeDasharray='0' strokeDashoffset='0' strokeLinecap='square'/>
                        </g>
                    </svg>
                </div>
                <div className={`${$class + "-wrapper-geometryWrapper-circleSmall"}`}>
                    <svg>
                        <defs>
                            <linearGradient id="linearRayCircleSmall" x1="0%" y1="0%" x2="100%" y2="100%" gradientTransform="rotate(-45)">
                                <stop offset="0" stopColor="#10101000">
                                    <animate
                                        attributeName="offset"
                                        values="0;0;0;0.10;0.25;0.64;0.75;0.75;0.79;0.81;0.81;0.81;0.81;"
                                        dur="15s"
                                        repeatCount="indefinite"
                                    />
                                </stop>
                                <stop offset="0" stopColor="#16161600">
                                    <animate
                                        attributeName="offset"
                                        values="0;0;0;0.26;0.41;0.80;0.91;0.91;0.95;0.95;0.97;0.97;0.97;"
                                        dur="15s"
                                        repeatCount="indefinite"
                                    />
                                </stop>    
                                <stop offset="0" stopColor="#393935">
                                    <animate
                                        attributeName="offset"
                                        values="0;0;0.1;0.35;0.50;0.50;0.89;0.89;0.89;0.89;1;1;1;"
                                        dur="15s"
                                        repeatCount="indefinite"
                                    />
                                </stop>    
                                <stop offset="0" stopColor="#16161600">
                                    <animate
                                        attributeName="offset"
                                        values="0;0;0.19;0.44;0.59;0.59;0.98;0.98;0.98;0.98;1;1;1;"
                                        dur="15s"
                                        repeatCount="indefinite"
                                    />
                                </stop>    
                                <stop offset="0" stopColor="#10101000">
                                    <animate
                                        attributeName="offset"
                                        values="0;0;0.35;0.6;0.6;0.75;0.75;1;1;1;1;1;1;"
                                        dur="15s"
                                        repeatCount="indefinite"
                                    />
                                </stop>    
                            </linearGradient>
                        </defs>
                        <g transform="translate(1, 1)">
                            <rect className="circleSmall-rect" x="0" y="0" fill="none" stroke="#202020" rx='100%' ry='100%' strokeWidth='2' strokeDasharray='0' strokeDashoffset='0' strokeLinecap='square'/>
                            <rect className="circleSmall-rect" x="0" y="0" fill="none" stroke="url(#linearRayCircleSmall)" rx='100%' ry='100%' strokeWidth='2' strokeDasharray='0' strokeDashoffset='0' strokeLinecap='square'/>
                        </g>
                    </svg>
                </div>
                <div className={`${$class + "-wrapper-geometryWrapper-squareTop"}`}>
                    <svg xmlns='http://www.w3.org/2000/svg' width="100%" height="100%">
                        <defs>
                            <linearGradient id="linearRaySquareTop" x1="0%" y1="0%" x2="100%" y2="100%" gradientTransform="rotate(180)">
                                <stop offset="25" stopColor="#10101000">
                                    <animate
                                        attributeName="offset"
                                        values="0;0.25;0.75;1;0"
                                        dur="10s"
                                        repeatCount="indefinite"
                                    />
                                </stop>
                                <stop offset="41" stopColor="#16161600">
                                    <animate
                                        attributeName="offset"
                                        values="0;0.41;0.91;1;0"
                                        dur="10s"
                                        repeatCount="indefinite"
                                    />
                                </stop>    
                                <stop offset="50" stopColor="#393935">
                                    <animate
                                        attributeName="offset"
                                        values="0;0.50;1;1;0"
                                        dur="10s"
                                        repeatCount="indefinite"
                                    />
                                </stop>    
                                <stop offset="59" stopColor="#16161600">
                                    <animate
                                        attributeName="offset"
                                        values="0;0.59;1;1;0"
                                        dur="10s"
                                        repeatCount="indefinite"
                                    />
                                </stop>    
                                <stop offset="75" stopColor="#10101000">
                                    <animate
                                        attributeName="offset"
                                        values="0;0.75;1;1;0"
                                        dur="10s"
                                        repeatCount="indefinite"
                                    />
                                </stop>    
                            </linearGradient>
                        </defs>
                        <rect width="100%" height="100%" fill="none" stroke="url(#linearRaySquareTop)" strokeWidth='2' strokeDashoffset='0' strokeLinecap='square'/>
                    </svg>
                </div>
                <div className={`${$class + "-wrapper-geometryWrapper-squareRight"}`}>
                    <svg xmlns='http://www.w3.org/2000/svg' width="100%" height="100%">
                        <defs>
                            <linearGradient id="linearRaySquareRight" x1="0%" y1="0%" x2="100%" y2="100%" gradientTransform="rotate(-90)">
                                <stop offset="0" stopColor="#10101000">
                                    <animate
                                        attributeName="offset"
                                        values="0;0;0.10;0.25;0.64;0.75;0.79;0.81;0.81;0.81;1;1"
                                        dur="15s"
                                        repeatCount="indefinite"
                                    />
                                </stop>
                                <stop offset="0" stopColor="#16161600">
                                    <animate
                                        attributeName="offset"
                                        values="0;0;0.26;0.41;0.80;0.91;0.95;0.97;0.97;0.97;1;1"
                                        dur="15s"
                                        repeatCount="indefinite"
                                    />
                                </stop>    
                                <stop offset="0" stopColor="#393935">
                                    <animate
                                        attributeName="offset"
                                        values="0;0.1;0.35;0.50;0.89;0.89;0.89;1;1;1;1;1"
                                        dur="15s"
                                        repeatCount="indefinite"
                                    />
                                </stop>    
                                <stop offset="0" stopColor="#16161600">
                                    <animate
                                        attributeName="offset"
                                        values="0;0.19;0.44;0.59;0.98;0.98;0.98;1;1;1;1;1"
                                        dur="15s"
                                        repeatCount="indefinite"
                                    />
                                </stop>    
                                <stop offset="0" stopColor="#10101000">
                                    <animate
                                        attributeName="offset"
                                        values="0;0.35;0.6;0.75;1;1;1;1;1;1;1;1"
                                        dur="15s"
                                        repeatCount="indefinite"
                                    />
                                </stop>    
                            </linearGradient>
                        </defs>
                        <rect width="100%" height="100%" fill="none" stroke="url(#linearRaySquareRight)" strokeWidth='2' strokeDashoffset='0' strokeLinecap='square'/>
                    </svg>
                </div>
                <div className={`${$class + "-wrapper-geometryWrapper-squareBottom"}`}>
                    <svg xmlns='http://www.w3.org/2000/svg' width="100%" height="100%">
                        <defs>
                            <linearGradient id="linearRaySquareBottom" x1="0%" y1="0%" x2="100%" y2="100%" gradientTransform="rotate(0)">
                                <stop offset="25" stopColor="#10101000">
                                    <animate
                                        attributeName="offset"
                                        values="0;0.25;0.75;1;0"
                                        dur="12s"
                                        repeatCount="indefinite"
                                    />
                                </stop>
                                <stop offset="41" stopColor="#16161600">
                                    <animate
                                        attributeName="offset"
                                        values="0;0.41;0.91;1;0"
                                        dur="12s"
                                        repeatCount="indefinite"
                                    />
                                </stop>    
                                <stop offset="50" stopColor="#393935">
                                    <animate
                                        attributeName="offset"
                                        values="0;0.50;1;1;0"
                                        dur="12s"
                                        repeatCount="indefinite"
                                    />
                                </stop>    
                                <stop offset="59" stopColor="#16161600">
                                    <animate
                                        attributeName="offset"
                                        values="0;0.59;1;1;0"
                                        dur="12s"
                                        repeatCount="indefinite"
                                    />
                                </stop>    
                                <stop offset="75" stopColor="#10101000">
                                    <animate
                                        attributeName="offset"
                                        values="0;0.75;1;1;0"
                                        dur="12s"
                                        repeatCount="indefinite"
                                    />
                                </stop>    
                            </linearGradient>
                        </defs>
                        <rect width="100%" height="100%" fill="none" stroke="url(#linearRaySquareBottom)" strokeWidth='2' strokeDasharray='0' strokeDashoffset='0' strokeLinecap='square'/>
                    </svg>
                </div>
                <div className={`${$class + "-wrapper-geometryWrapper-squareLeft"}`}>
                    <svg xmlns='http://www.w3.org/2000/svg' width="100%" height="100%">
                        <defs>
                            <linearGradient id="linearRaySquareLeft" x1="0%" y1="0%" x2="100%" y2="100%" gradientTransform="rotate(90)">
                                <stop offset="25" stopColor="#10101000">
                                    <animate
                                        attributeName="offset"
                                        values="0;0.25;0.75;1;0"
                                        dur="9s"
                                        repeatCount="indefinite"
                                    />
                                </stop>
                                <stop offset="41" stopColor="#16161600">
                                    <animate
                                        attributeName="offset"
                                        values="0;0.41;0.91;1;0"
                                        dur="9s"
                                        repeatCount="indefinite"
                                    />
                                </stop>    
                                <stop offset="50" stopColor="#393935">
                                    <animate
                                        attributeName="offset"
                                        values="0;0.50;1;1;0"
                                        dur="9s"
                                        repeatCount="indefinite"
                                    />
                                </stop>    
                                <stop offset="59" stopColor="#16161600">
                                    <animate
                                        attributeName="offset"
                                        values="0;0.59;1;1;0"
                                        dur="9s"
                                        repeatCount="indefinite"
                                    />
                                </stop>    
                                <stop offset="75" stopColor="#10101000">
                                    <animate
                                        attributeName="offset"
                                        values="0;0.75;1;1;0"
                                        dur="9s"
                                        repeatCount="indefinite"
                                    />
                                </stop>    
                            </linearGradient>
                        </defs>
                        <rect width="100%" height="100%" fill="none" stroke="url(#linearRaySquareLeft)" strokeWidth='2' strokeDasharray='0' strokeLinecap='square'/>
                    </svg>
                </div>
                <div className={`${$class + "-wrapper-geometryWrapper-circleBig"}`}>
                    <div className={`${$class + "-wrapper-geometryWrapper-circleBig-animationColorWrap"}`}>
                        <svg xmlns='http://www.w3.org/2000/svg' width="100%" height="100%">
                            <defs>
                                <linearGradient id="linearRay" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="25%" stopColor="#10101000" />
                                    <stop offset="41%" stopColor="#16161600" />
                                    <stop offset="50%" stopColor="#393935" />
                                    <stop offset="59%" stopColor="#16161600" />
                                    <stop offset="75%" stopColor="#10101000" />
                                </linearGradient>
                                <linearGradient id="linearRaySecondary" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="40%" stopColor="#16161694" />
                                    <stop offset="46%" stopColor="#16161694" />
                                    <stop offset="50%" stopColor="#50504b46" />
                                    <stop offset="54%" stopColor="#16161694" />
                                    <stop offset="60%" stopColor="#16161694" />
                                </linearGradient>
                            </defs>
                            <g transform="translate(9, 9)">
                                <rect className="circleRect-1" x="0" y="0" width="100%" height="100%" fill="none" stroke="url(#linearRay)" rx='100%' ry='100%' strokeWidth='2' strokeDasharray='90%' strokeDashoffset='20%' strokeLinecap='square'/>
                            </g>
                            <g transform="translate(15, 15)">
                                <rect className="circleRect-2" x="0" y="0" fill="none" stroke="#050505" rx='100%' ry='100%' strokeWidth='2' strokeDasharray='4 15 7 10 20 5 4 7' strokeDashoffset='0' strokeLinecap='square'/>
                            </g>
                            <g transform="translate(15, 15)">
                                <rect className="circleRect-3" x="0" y="0" fill="none" stroke="url(#linearRaySecondary)" rx='100%' ry='100%' strokeWidth='4' strokeDasharray='0' strokeDashoffset='0' strokeLinecap='square'/>
                            </g>
                            <g transform="translate(3, 3)">
                                <rect className="circleRect-4" x="0" y="0" fill="none" stroke="#050505" rx='100%' ry='100%' strokeWidth='2' strokeDasharray='4 15 7 10 20 5 4 7' strokeDashoffset='0' strokeLinecap='square'/>
                            </g>
                            <g transform="translate(3, 3)">
                                <rect className="circleRect-5" x="0" y="0" fill="none" stroke="url(#linearRaySecondary)" rx='100%' ry='100%' strokeWidth='4' strokeDasharray='0' strokeDashoffset='0' strokeLinecap='square'/>
                            </g>
                        </svg>
                    </div>
                </div>
                <div className="line"></div>
            </div>
            <div className={`${$class + "-wrapper-textWrapper"}`}>
                <div>
                    <h3>Have no fear in perfection,<br/>you’ll never reach it.<br/><span>&#8212; Salvador Dali</span></h3>
                </div>
            </div>
        </div>
    )
}

export default class Quote extends Component {

    render() {
        const $class = "quoteWithGeometry"
        return (
            <SectionWrapperAdaptive
                sectionName={$class}
                sectionRef={this.props.quoteRef}
            >
                <QuoteWrapper
                
                />
            </SectionWrapperAdaptive>
        )
    }
}
