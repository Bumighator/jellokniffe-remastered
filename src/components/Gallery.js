import React, { Component } from 'react'
import MasonryGallery from './MasonryGallery'
import { gallery } from '../api/gallery'
import SectionWrapperAdaptive from './SectionWrapperAdaptive'

class Gallery extends Component {
    constructor(props){
        super(props)
        this.state={
            columns: 3,
            direction: 'ttb',
            autoHeight: false,
            autoWidth: false
        }
    }

    componentDidMount(){
        window.addEventListener('resize', (e) => (this.handleResize(e)), true)
        this.handleMount()
    }

    componentWillUnmount(){
        window.removeEventListener('resize', this.handleResize, true)
    }

    handleMount(){
        if(document.documentElement.clientWidth > 1400){
            this.setState({columns: 5})
        }
        else{
            this.setState({columns: 3})
        }
        if(document.documentElement.clientWidth > 768){
            this.setState({ direction: 'ttb', autoHeight: true, autoWidth: false, height: '100vh', width: '5em' })
        }
        else{
            this.setState({ direction: 'ltr', autoHeight: false, autoWidth: true, height: '5em', width: '100vw' })
        }
    }

    handleResize(e){
        if(document.documentElement.clientWidth > 1400){
            this.setState({ columns: 5 })
        }
        else{
            this.setState({ columns: 3 })
        }
        if(document.documentElement.clientWidth > 768){
            this.setState({ direction: 'ttb', autoHeight: true, autoWidth: false, height: '100vh', width: '5em' })
        }
        else{
            this.setState({ direction: 'rtl', autoHeight: false, autoWidth: true, height: '5em', width: '100vw' })
        }
    }

    render() {
        const $class = "gallery"
        return (
            <SectionWrapperAdaptive
                sectionName={$class}
                sectionRef={this.props.galleryRef}
            >
                <div className={`${$class}`}>
                    <div className={`${$class}-sectionWrapper sectionWrapper`}>
                        <h2>MY WORKS</h2>
                        <MasonryGallery
                            id="gallery-grid"
                            className={`${$class}-sectionWrapper-grid`}
                            items={gallery}
                            columns={this.state.columns}
                            direction={this.state.direction}
                            autoHeight={this.state.autoHeight}
                            autoWidth={this.state.autoWidth}
                            height={this.state.height}
                            width={this.state.width}
                        />
                    </div>
                </div>
            </SectionWrapperAdaptive>
        );
    }
}

export default Gallery;