import React, { Component, createRef } from 'react'

export default class Preloader extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            percentage: 0,
            isLoaded: false,
            hidden: ''
        }

        this.counter = createRef()
    }

    componentDidMount(){
        this.handlePageLoad()
    }

    handlePageLoad() {
        let imgs = document.images,
            len = imgs.length

        this.counter.current = 0;

        [].forEach.call( imgs, function( img ) {
            if(img.complete)
              incrementCounter(imgs);
            else
              img.addEventListener( 'load', incrementCounter, false );
        } );

        const incrementCounter = (imgs) => {
            this.counter.current = this.counter.current + 1
            let perc = Math.floor((this.counter.current / len) * 100)
            this.setState({ percentage: perc })
            if ( this.counter.current === len ) {
                this.setState({isLoaded: true}, () => setTimeout(() => this.setState({ hidden: 'hidden' }), 500));
                [].forEach.call(imgs, (img) =>
                    img.removeEventListener( 'load', incrementCounter)
                )
            }
        }
    }

    render(){
        const $class = 'preloader'
        return (
            <div className={`${$class} ${this.state.isLoaded? `loaded ${this.state.hidden}` : 'fetching'}`}>
                <h1>{this.state.isLoaded? 'Complete!' : `Loading... ${this.state.percentage}`}</h1>
            </div>
        )
    }
}
