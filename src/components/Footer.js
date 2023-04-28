import React, { Component } from 'react'
import SectionWrapperAdaptive from './SectionWrapperAdaptive'
import {ReactComponent as IconDeviantArt} from '../icons/Vector-1.svg'
import {ReactComponent as IconArtStation} from '../icons/Vector-2.svg'
import {ReactComponent as IconInstagram} from '../icons/Vector-3.svg'
import {ReactComponent as IconTwitter} from '../icons/Vector.svg'
import {ReactComponent as IconReact} from '../icons/React.svg'

class Footer extends Component {
    render() {
        const $class = 'footer'
        return (
            <SectionWrapperAdaptive
                sectionName={$class}
                sectionRef={this.props.footerRef}
            >
                <footer className={`${$class}`}>
                    <div className={`${$class}-content`}>
                        <div className={`${$class}-content-wrapper`}>
                            <div className={`${$class}-content-wrapper-title`}>
                                <h4>
                                    <i>Check</i> out my social media
                                </h4>
                                <div className={`${$class}-content-wrapper-title-links`}>
                                    <a title="DeviantArt" href="" target="_blank" ><IconDeviantArt /></a>
                                    <a title="ArtStation" href="" target="_blank" ><IconArtStation /></a>
                                    <a title="Instagram" href="" target="_blank" ><IconInstagram /></a>
                                    <a title="Twitter" href="" target="_blank" ><IconTwitter /></a>
                                </div>
                            </div>
                            <div className={`${$class}-content-wrapper-about`}>
                                <p>
                                    Hello, guys! I would like to say that I simply like to recreate what I see, or what I really like, 
                                    as an illustration. I like to put my imagination to work and share my artwork with other people. 
                                    For me, illustration, and art in general, is a way to express my thoughts and emotions. 
                                    Illustration is a tool that is easier for me to work with in general, and that's why I prefer to introduce myself 
                                    by illustration. What does art mean to you? How do you express your thoughts? I know you have wonderful thoughts and 
                                    your own way to express them. There are many amazing artists in the world and I wish nothing changes them. 
                                    Because there would be nothing better for people that enjoy imagining.
                                </p>
                            </div>
                        </div>
                        <div className={`${$class}-content-wrapper`}>
                            <div className={`${$class}-content-wrapper-title`}>
                                <h4>
                                    <i>Please,</i> don't use my works without permission.
                                </h4>
                            </div>
                            <div className={`${$class}-content-wrapper-copyright`}>
                                <div className={`${$class}-content-wrapper-copyright-wrapper`}>
                                    <span className={`${$class}-content-wrapper-copyright-wrapper-inner`}>
                                        © 2023 <i>jello</i><i>Kniffe</i>
                                    </span>
                                    <span className={`${$class}-content-wrapper-copyright-wrapper-inner`}>
                                        all rights reserved
                                    </span>
                                </div>
                                <div className={`${$class}-content-wrapper-copyright-wrapper`}>
                                    <span className={`${$class}-content-wrapper-copyright-wrapper-inner`}>
                                        designed and implemented by @<i>Bumighator</i>
                                    </span>
                                    <span className={`${$class}-content-wrapper-copyright-wrapper-inner`}>
                                        Powered by <a href="https://react.dev/"><IconReact /></a>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </SectionWrapperAdaptive>
        );
    }
}

export default Footer;
