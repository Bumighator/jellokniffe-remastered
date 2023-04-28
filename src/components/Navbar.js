import React, { Component, createRef } from 'react'
import TextScramble from '../plugins/TextScramble'

export default class Navbar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            pcCollapsed: true
        }

        this.introductionRef = createRef()
        this.myWorksRef = createRef()
        this.creditsRef = createRef()
    }
    
    scrollTo(ref, section){
        if (ref && ref.current){
            ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
        //this.props.setActiveSection(section)
    }

    textScramble(ref, from, to, delay){
        const phrases = [
            from,
            to
        ]

        let counter = 0
        const el = ref
        const fx = new TextScramble(el)
        const next = () => {
            if(counter < 0){
                fx.setText(phrases[counter]).then(() => {
                    setTimeout(next, delay)
                })
                counter = counter + 1
            }
            else fx.setText(phrases[1])
        }

        next()
    }

    componentDidUpdate(prevProps, prevState){
        if(!this.state.pcCollapsed && prevState.pcCollapsed !== this.state.pcCollapsed){
            this.textScramble(this.introductionRef, '', 'Introduction', 800)
            this.textScramble(this.myWorksRef, '', 'My works', 800)
            this.textScramble(this.creditsRef, '', 'Credits', 800)
        }
        else if(this.state.pcCollapsed && prevState.pcCollapsed !== this.state.pcCollapsed){
            this.textScramble(this.introductionRef, 'Introduction','', 800)
            this.textScramble(this.myWorksRef, 'My works', '', 800)
            this.textScramble(this.creditsRef, 'Credits', '', 800)
        }
    }

    render() {
        const $class = 'navbarWrapper-navbar'
        return (
            <aside className={`${$class}`}>
                <nav className={`${$class}-pc`}>
                    <button name="Toggle navbar" onClick={() => this.setState({pcCollapsed: !this.state.pcCollapsed})} className={`${$class}-pc-logoWrapper`}>
                        <div className={`${$class}-pc-logoWrapper-burger ${this.state.pcCollapsed? 'navbarCollapsed' : 'navbarShowed'}`}>
                            <div className={`${$class}-pc-logoWrapper-burger-inner`}/>
                            <div className={`${$class}-pc-logoWrapper-burger-innerDots`}/>
                        </div>
                        <h1 className={`${$class}-pc-logoWrapper-logo`}>
                            JelloKniffe
                        </h1>
                    </button>
                    <div className={`${$class}-pc-navlinkWrapper${this.state.pcCollapsed? ' hidden' : ' showed'}`}>
                        <div className={`${$class}-pc-navlinkWrapper-subWrapper`}>
                            <button name="Scroll to Introduction" onClick={() => this.scrollTo(this.props.headerRef, 'header')} className={`${$class}-pc-navlinkWrapper-subWrapper-navlink navlink${this.props.activeSection === 'header' ? '-active': ''}`}>
                                Introduction
                                <i ref={(ref) => {this.introductionRef = ref}}></i>
                            </button>
                            <button name="Scroll to My works" onClick={() => this.scrollTo(this.props.galleryRef, 'gallery')} className={`${$class}-pc-navlinkWrapper-subWrapper-navlink navlink${this.props.activeSection === 'gallery' ? '-active': ''}`}>
                                My works
                                <i ref={(ref) => {this.myWorksRef = ref}}></i>
                            </button>
                            <button name="Scroll to Credits" onClick={() => this.scrollTo(this.props.footerRef, 'credits')} className={`${$class}-pc-navlinkWrapper-subWrapper-navlink navlink${this.props.activeSection === 'credits' ? '-active': ''}`}>
                                Credits
                                <i ref={(ref) => {this.creditsRef = ref}}></i>
                            </button>
                        </div>
                    </div>
                </nav>
            </aside>
        )
    }
}
