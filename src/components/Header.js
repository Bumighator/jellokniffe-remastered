import React, { Component, useState, useEffect, useRef } from 'react'
import { gallery } from '../api/gallery'
import { Parallax } from 'react-scroll-parallax'

const ParallaxTileRenderer = (props) => {
    const [images, setImages] = useState(null)
    const [imageStatusLoaded, setImageStatusLoaded] = useState(false)
    const [height, setHeight] = useState(0)
    const imageSchemaRef = useRef([])
    const selfWidthRef = useRef(null)
    const [width, setWidth] = useState(0)
    const [startSize, setStartSize] = useState(false)
    let imageCount = 0

    function prepareForMount(){
        let imagesList = []
        let n = 11
        let imgRef = String
        let randomIndex = 0
        let id = 0
        let title = String

        while(imagesList.length < n) {
            randomIndex = Math.floor(Math.random() * gallery.length)
            imgRef = gallery[randomIndex].imgRef
            id = gallery[randomIndex].id
            title = gallery[randomIndex].title
            if(imagesList.indexOf({id, imgRef, title}) === -1) imagesList.push({id,imgRef, title})
        }
        handleResize()
        setStartSize(true)
        setImages(imagesList)
    }

    useEffect(() => {
        window.addEventListener('resize', handleResize, true)
        prepareForMount()
        return () => {
            if(imageSchemaRef.current){
                for(let i = 0; i < i < imageSchemaRef.current.length; i++){
                    imageSchemaRef.current[i].removeEventListener('load', imageHandleLoad)
                    imageSchemaRef.current[i].removeEventListener('error', imageHandleError)
                    window.removeEventListener('resize', handleResize, true)
                }
            }
        }
    }, [])

    useEffect(() => {
        if(startSize){
            handleResize()
        }
    }, [startSize])

    useEffect(() => {
        if(images){
            for(let i = 0; i < images.length; i++){
                imageSchemaRef.current[i].addEventListener('load', imageHandleLoad(i))
                imageSchemaRef.current[i].addEventListener('error', imageHandleError)
            }
        }
    }, [images])

    const handleResize = () => {
        if(selfWidthRef.current){
            switch(window.document.documentElement.clientWidth > 991.98){
                case true:
                    setHeight(`${selfWidthRef.current.clientWidth / 1.55}px`)
                    setWidth(`100%`)
                    break;
                default:
                    setHeight(`80%`)
                    setWidth(`${selfWidthRef.current.clientHeight / 1.55}px`)
            }
        }
    }

    const imageHandleLoad = (id) => {
        imageCount += 1
        imageSchemaRef.current[id].classList.add(chooseImageTransitionClass())
        setTimeout(() => {
            imageSchemaRef.current[id].classList.add('executed')
            }, 10
        )
        if(imageCount === 11){
            setImageStatusLoaded(true) 
        }
    }

    const imageHandleError = () => {
        console.log('error!')
    }

    const chooseImageTransitionClass = () => {
        let random = Math.floor(Math.random() * 4)
        switch(random){
            case 0:
                return 'transition-leftToRight'
            case 1:
                return 'transition-rightToLeft'
            case 2:
                return 'transition-topToBottom'
            default: 
                return 'transition-bottomToTop'
        }
    }

    //TODO: Исправить поплывшые буквы Hero заголовка на альбомной ориентации (пока видно было только на планшете)

    return (
        <Parallax
            speed={-5}
            translateY={[-20, 20]}
            className='parallax'
            style={{
                height: height,
                width: width
            }}
        >
            <aside className={`${props.class} ${imageStatusLoaded? 'showed' : ''}`} ref={selfWidthRef}>
                {
                    images && images.length > 1 ? images.map((image, index) => {
                        return(
                            <div
                                key={index}
                                className={`${props.class}-tile tile-${index + 1}`}
                                style={{
                                    gridArea: `elem-${index + 1}`
                                }}
                            >
                                <img
                                    src={`${image.imgRef}`}
                                    alt={`${image.title}`}
                                    id="header-image"
                                    ref={(ref) => {imageSchemaRef.current[index] = ref}}
                                />
                            </div>
                        )
                    }) : null
                }
            </aside>
        </Parallax>
    );
}

const SVGLineArt = {
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: '0',
    left: '0'
}

const svgLineLBtRT =    <svg style={SVGLineArt}>
                            <defs>
                                <linearGradient id="letterLineart" x1="0" y1="0" x2="100%" y2="0" gradientUnits="userSpaceOnUse">
                                    <stop offset="0" stopColor="#39393500" />
                                    <stop offset="0.3" stopColor="#393935" />
                                    <stop offset="0.7" stopColor="#393935" />
                                    <stop offset="1" stopColor="#39393500" />
                                </linearGradient>
                                <linearGradient id="letterLineartVertical" x1="0" y1="0" x2="0" y2="100%" gradientUnits="userSpaceOnUse">
                                    <stop offset="0" stopColor="#39393500" />
                                    <stop offset="0.3" stopColor="#393935" />
                                    <stop offset="0.7" stopColor="#393935" />
                                    <stop offset="1" stopColor="#39393500" />
                                </linearGradient>
                            </defs>
                            <line x1="0" y1="100%" x2="100%" y2="5%" stroke="url(#letterLineart)" strokeWidth="1" />
                            <line x1="100%" y1="100%" x2="0" y2="5%" stroke="url(#letterLineart)" strokeWidth="1" />
                            <line x1="110%" y1="91.5%" x2="-10%" y2="91.5%" stroke="url(#letterLineart)" strokeWidth="1" />
                            <line x1="110%" y1="15%" x2="-10%" y2="15%" stroke="url(#letterLineart)" strokeWidth="1" />
                            <line x1="7%" y1="110%" x2="7%" y2="-10%" stroke="url(#letterLineartVertical)" strokeWidth="1" />
                            <line x1="93%" y1="110%" x2="93%" y2="-10%" stroke="url(#letterLineartVertical)" strokeWidth="1" />
                        </svg>

class LetterWrapper extends Component {
    constructor(props) {
      super(props)
    }

    render() {
        const letterStyle = {
            under: {
                color: 'transparent'
            },
            overlay: {
                position: 'absolute',
                top: '0',
                left: '0',
                bottom: '0',
                margin: 'auto',
                display: 'flex',
                alignItems: 'center',
                color: 'transparent',
                WebkitTextStroke: '2px #F2EED3'
            }
        }
        return (
            <i className={this.props.class}>
                {
                    this.props.string.toLowerCase().split('').map((letter, index) => {
                        return(
                            <i
                                key={index}
                                className={`${this.props.class}-inner-${this.props.wrapper}-letter text-${this.props.wrapper}-letter-${index}`}
                                style={{position: 'relative'}}
                            >
                                {svgLineLBtRT}
                                <i style={letterStyle.under}>{letter}</i>
                                <i style={letterStyle.overlay}>{letter}</i>
                            </i>
                        )
                    })
                }
            </i>
        );
    }
}


class HeaderText extends Component {
    render() {
        return (
            <div className={`${this.props.class}`}>
                <span className={`${this.props.class}-inner`}>
                    <div>
                        <LetterWrapper
                            string="hello,"
                            class={`${this.props.class}-inner-1`}
                            wrapper="1"
                        />
                        <LetterWrapper
                            string="i'm"
                            class={`${this.props.class}-inner-2`}
                            wrapper="2"
                        />
                    </div>
                    <div>
                        <LetterWrapper
                            string="jello"
                            class={`${this.props.class}-inner-3`}
                            wrapper="3"
                        />
                        <LetterWrapper
                            string="kniffe"
                            class={`${this.props.class}-inner-3`}
                            wrapper="3"
                        />
                    </div>
                </span>
            </div>
        );
    }
}

class Header extends Component {
    constructor(props) {
        super(props)
        
        this.state = {

        }
    }

    render() {
        const $class = 'header'
        return (
            <div className='sectionWrapperAdaptive' ref={this.props.headerRef}>
                <div className="sectionWrapperAdaptive-subWrapper">
                    <div className={`${$class}`}>
                        <div className={`${$class}-contentWrapper`}>
                            <ParallaxTileRenderer
                                class={`${$class}-contentWrapper-parallaxTiles`}
                            />
                            <HeaderText
                                class={`${$class}-contentWrapper-textWrapper`}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;
