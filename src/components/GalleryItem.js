import React, { Component } from 'react'

export default class GalleryItem extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className={`${this.props.className}-wrapper`}>
                <div id={this.props.id} className={`${this.props.className} column-${this.props.id}-item grid-item-${this.props.id}`}>
                    <img onClick={() => this.props.toggleFullResolution('toggle', this.props.id, this.props.tags, this.props.title, this.props.description, this.props.imgRef)} src={this.props.imgRef} alt={this.props.title} />
                </div>
            </div>
        )
    }
}
