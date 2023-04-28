import React, { Component, createRef } from 'react'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import '@splidejs/react-splide/css/core'

export default class FullResolution extends Component {
    constructor(props) {
        super(props)

        this.state = {
            activeHeight: 0,
            wrapperWidth: 0,
            wrapperShrink: false,
            toggleContent: false
        }

        this.imageRef = createRef()
        this.containerRef = createRef()
    }

    setActiveImage = (slideIndex) => {
        if(slideIndex !== -1){
            this.props.toggleFullResolution('set',
                                                    this.props.itemsFilteredAll[slideIndex].id,
                                                    this.props.itemsFilteredAll[slideIndex].tags,
                                                    this.props.itemsFilteredAll[slideIndex].title,
                                                    this.props.itemsFilteredAll[slideIndex].description,
                                                    this.props.itemsFilteredAll[slideIndex].imgRef
                                            )
        }
    }

    componentDidMount(){
        if(this.imageRef.current !== undefined){
            this.setState({ wrapperWidth: this.imageRef.current.width })
        }
    }

    componentDidUpdate(prevProps, prevState){
        if(this.imageRef.current !== undefined){
            if(prevProps.id !== this.props.id && prevState.wrapperWidth > this.imageRef.current.width && prevState.wrapperHeight !== this.imageRef.current.height){
                this.setState({ wrapperWidth: this.imageRef.current.width, wrapperShrink: true })
                return
            }
            if(prevProps.id !== this.props.id && prevState.wrapperWidth < this.imageRef.current.width && prevState.wrapperHeight !== this.imageRef.current.height){
                this.setState({ wrapperWidth: this.imageRef.current.width, wrapperShrink: false })
                return
            }
        }
    }

    render() {
        return (
            <div ref={this.containerRef} className={`${this.props.className}${this.props.willUnmount? ' uninitializing' : ''}${this.props.willMount? ' initialized' : ''}`}>
                <div className={`${this.props.className}-imageWrapper`}>
                    <div
                        className={`${this.props.className}-imageWrapper-subWrapper`}
                    >
                        <img className={`${this.props.className}-imageWrapper-subWrapper-img`} ref={this.imageRef} src={this.props.imgRef} alt={this.props.title} />
                    </div>
                    <div className={`${this.props.className}-imageWrapper-subWrapper-viewport`}>
                        <div
                            style={{
                                width: this.state.wrapperWidth + 'px' 
                            }}
                            className={`${this.props.className}-imageWrapper-subWrapper-viewport-wrapper${this.state.wrapperShrink? ' shrink' : ' scale'}`}
                        >
                            <img src={this.props.imgRef} alt={this.props.title} />
                        </div>
                    </div>
                </div>
                <button className={`${this.props.className}-wrapper-toggleButton${this.state.toggleContent? ' opened' : ''}`} onClick={() => {this.setState({toggleContent: !this.state.toggleContent})}}>
                    {
                        this.state.toggleContent? 'HIDE' : 'MORE'
                    }
                </button>
                <div className={`${this.props.className}-wrapper${this.state.toggleContent? ' opened' : ''}`}>
                    <div className={`${this.props.className}-wrapper-content`}>
                        <h3 className={`${this.props.className}-wrapper-content-title`}>{this.props.title}</h3>
                        <p className={`${this.props.className}-wrapper-content-description`}>{this.props.description}</p>
                        <hr className={`${this.props.className}-wrapper-content-divider`}/>
                        <p className={`${this.props.className}-wrapper-content-tags`}>Tags: 
                            {
                                this.props.tags.map((tag, i) => {
                                    return (
                                        <span onClick={() => this.props.addTag(tag)} title="Click to show pictures with this tag" className={`${this.props.className}-wrapper-content-tags-tag`} key={i}>
                                            <i>{`${tag}`}</i><i className="overtext">{`${tag}`}</i>
                                        </span>
                                    )
                                })
                            }
                        </p>
                    </div>
                </div>
                <div className={`${this.props.className}-ui`}>
                    <div title="Dismiss" onClick={() => this.props.toggleFullResolution('unset')} className={`${this.props.className}-ui-dismiss`} />
                    <div className={`${this.props.className}-ui-slides`}>
                        <Splide
                            options={{
                                focus: 'center',
                                gap: '1em',
                                direction: this.props.direction,
                                wheel: true,
                                drag: true,
                                type: 'loop',
                                height: this.props.height,
                                width: this.props.width,
                                pagination: false,
                                arrows: false,
                                isNavigation: true,
                                autoHeight: this.props.autoHeight,
                                autoWidth: this.props.autoWidth,
                                updateOnMove: false,
                                start: this.props.id
                            }}
                            onActive={ ( splide, slide) => {this.setActiveImage(slide.slideIndex)} }
                        >
                            {
                                this.props.itemsFilteredAll? this.props.itemsFilteredAll.map((item, index) => {
                                    return(
                                        <SplideSlide key={index}>
                                           <img src={item.imgRef} alt={item.title} />
                                        </SplideSlide>
                                    )
                                }) : null
                            }
                        </Splide>
                        <div className={`${this.props.className}-ui-slides-caption`} />
                    </div>
                </div>
            </div>
        );
    }
}