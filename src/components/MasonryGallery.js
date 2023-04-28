import React, { Component, PureComponent } from 'react'
import PropTypes from 'prop-types'
import GalleryItem from './GalleryItem'
import Fullres from './Fullres'
import { galleryTags } from '../api/gallery'
import _ from 'lodash'

class NoResult extends PureComponent {
    render() {
        return (
            <div className={`${this.props.className}-noResult`}>
                <p>Seems like everything has been stolen by the <i>gnome</i><i>s</i>...</p>
            </div>
        )
    }
}

class MasonryGalleryColumn extends Component {
    constructor(props) {
      super(props)
    }

    render() {
        return (
            <div className={`${this.props.className}-column column-${this.props.id}`}>
                {
                    this.props.items.map((item, i) => {
                        return(
                            <GalleryItem
                                key={item.id}
                                id={item.id}
                                imgRef={item.imgRef}
                                imgRefHD={item.imgRefHD}
                                imgRefOrig={item.imgRefOrig}
                                year={item.year}
                                className={`${this.props.className}-column-item`}
                                title={item.title}
                                description={item.description}
                                tags={item.tags}
                                addTag={this.props.addTag}
                                toggleFullResolution={this.props.toggleFullResolution}
                            />
                        )
                    })
                }
            </div>
        )
    }
}


class MasonryGallery extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            itemsDividedByColumns: Array,
            itemsFilteredAll: [],
            tags: [],
            tagsAll: [],
            tagsCounted: 0,
            year: 'all time',
            selectVisible: false,
            tagsVisible: false,
            openFullRes: false,
            willMount: false,
            willUnmount: false,
            imageToOpen: {
                id: 0,
                tags: [],
                title: [],
                description: '',
                imgRef: ''
            }
        }

        this.addTag = this.addTag.bind(this)
        this.toggleFullResolution = this.toggleFullResolution.bind(this)
    }

    componentDidMount(){
        this.divideByColumnsOnMount()
    }

    componentDidUpdate(prevProps, prevState){
        if(prevState.openFullRes !== this.state.openFullRes && this.state.openFullRes === true){
            this.handleFullResolutionAnimation(true, false)
        }
        else if(prevState.openFullRes !== this.state.openFullRes && this.state.openFullRes === false){
            this.handleFullResolutionAnimation(false, true)
        }
        if(prevProps.columns !== this.props.columns){
            this.divideByColumns()
        }
    }

    handleFullResolutionAnimation = _.debounce((willMount, willUnmount) => {
        this.setState({ willMount: willMount, willUnmount: willUnmount })
    }, 10)

    handleFullResolutionAnimationDismiss = _.debounce(() => {
        this.setState({ openFullRes: !this.state.openFullRes, willUnmount: false })
    }, 250)

    toggleFullResolution = _.debounce((type, id, tags, title, description, imgRef) => {
        switch(type){
            case 'toggle':
                this.setState({ openFullRes: !this.state.openFullRes, imageToOpen: { id: id, tags: tags, title: title, description: description, imgRef: imgRef } })
                break;
            case 'set':
                this.setState({ imageToOpen: { id: id, tags: tags, title: title, description: description, imgRef: imgRef } })
                break;
            default:
                this.setState({ willMount: false, willUnmount: true }, () => this.handleFullResolutionAnimationDismiss())
                break;
        }
    }, 100)

    divideByColumnsOnMount() {
        const array = this.props.items? this.props.items : null
        
        let step = this.props.columns
        let buffer = []
        let tempBuffer = this.filterByYear(this.filterByTags(array))
        let tempBufferAll = tempBuffer
        let tagsAll = []

        for(let i = 0; i < galleryTags.length; i++){
            tagsAll.push({tag: galleryTags[i], active: false})
        }

        for(let i = 0; i < array.length; i += step) {
            buffer.push(tempBuffer.slice(i, i+step))
        }

        let secondBuffer = Array
        let bufferReplacement = [...Array(this.props.columns)].map(_ => [])
        for(let k = 0; k < buffer.length; k++) {
            secondBuffer = buffer[k]
            for(let j = 0; j < secondBuffer.length; j++) {
                bufferReplacement[j].push(secondBuffer[j])
            }
        }

        buffer = bufferReplacement

        this.setState({ itemsDividedByColumns: buffer, itemsFilteredAll: tempBufferAll, tagsAll: tagsAll })
    }

    divideByColumns() {
        const array = this.props.items? this.props.items : null
        
        let step = this.props.columns
        let buffer = []
        let tempBuffer = this.filterByYear(this.filterByTags(array))
        let tempBufferAll = tempBuffer

        for(let i = 0; i < array.length; i += step) {
            buffer.push(tempBuffer.slice(i, i+step))
        }

        let secondBuffer = Array
        let bufferReplacement = [...Array(this.props.columns)].map(_ => [])
        for(let k = 0; k < buffer.length; k++) {
            secondBuffer = buffer[k]
            for(let j = 0; j < secondBuffer.length; j++) {
                bufferReplacement[j].push(secondBuffer[j])
            }
        }

        buffer = bufferReplacement

        this.setState({ itemsDividedByColumns: buffer, itemsFilteredAll: tempBufferAll })
    }

    filterByTags(buffer){
        let secondBuffer = Array
        let bufferReplacement = []
        if(this.state.tags)
            switch(this.state.tags.length > 0){
                case(true):
                    for(let i=0; i<buffer.length; i++){
                        secondBuffer = buffer[i]
                        if(secondBuffer.tags.filter(tag => this.state.tags.includes(tag)).length > 0 && secondBuffer.tags.filter(tag => this.state.tags.includes(tag)).length === this.state.tags.length){
                            bufferReplacement.push(secondBuffer)
                        }
                    }
                    return bufferReplacement;
                default:
                    for(let i=0; i<buffer.length; i++) {
                        secondBuffer = buffer[i]
                        bufferReplacement.push(secondBuffer)
                    }
                    return bufferReplacement;
            }
    }

    addTag(tag){
        let buffer = this.state.tags
        if(buffer.indexOf(tag) === -1){
            buffer.push(tag) 
        }

        this.setState(prevState => ({ 
            tagsAll: prevState.tagsAll.map(tags => tag === tags.tag? {...tags, active: true} : tags),
            tagsCounted: prevState.tagsCounted + 1
        }), () => this.divideByColumns(), this.toggleFullResolution())
    }

    dismissTag(index){
        let buffer = this.state.tags
        buffer.splice(index, 1)
        this.setState({tags: buffer}, () => this.divideByColumns())
    }

    filterByYear(buffer){
        let secondBuffer = Array
        let bufferReplacement = []
        switch(this.state.year === 'all time'){
            case(true):
                return buffer;
            default:
                for(let i=0; i<buffer.length; i++){
                    secondBuffer = buffer[i]
                    if(secondBuffer.year === this.state.year){
                        bufferReplacement.push(secondBuffer)
                    }
                }
                buffer = bufferReplacement
                return buffer;
        }
    }

    tagsHandleCheckbox(i){
        let active = !this.state.tagsAll[i].active
        this.setState(prevState => ({
            tagsAll: prevState.tagsAll.map((tag, index) => index === i? {...tag, active: active} : tag)
        }))
    }

    tagsHandleSubmit(e){
        e.preventDefault()
        let tags = []
        for(let i = 0; i < this.state.tagsAll.length; i++){
            if(this.state.tagsAll[i].active) tags.push(this.state.tagsAll[i].tag)
        }
        this.setState({ tags: tags }, () => this.divideByColumns(), this.countTags())
    }

    countTags(){
        let count = 0
        for(let i = 0; i < this.state.tagsAll.length; i++){
            if(this.state.tagsAll[i].active) ++count
        }
        this.setState({ tagsCounted: count })
    }

    resetTags(){
        this.setState(prevState => ({
            tagsAll: prevState.tagsAll.map((tag =>  ({...tag, active: false}))
        )}))
    }

    render() {
        //TODO: Сделать фильтрацию по годам в select-формате для мобилок
        const yearFilter = ['all time','2023', '2022', '2021']
        return (
            <div id={this.props.id} className={`${this.props.className}-masonryGrid`}>
                {this.state.openFullRes?
                    <Fullres
                        className={`${this.props.className}-masonryGrid-fullRes`}
                        itemsFilteredAll={this.state.itemsFilteredAll}
                        id={this.state.imageToOpen.id}
                        tags={this.state.imageToOpen.tags}
                        title={this.state.imageToOpen.title}
                        description={this.state.imageToOpen.description}
                        imgRef={this.state.imageToOpen.imgRef}
                        toggleFullResolution={this.toggleFullResolution}
                        addTag={this.addTag}
                        willMount={this.state.willMount}
                        willUnmount={this.state.willUnmount}
                        direction={this.props.direction}
                        autoHeight={this.props.autoHeight}
                        autoWidth={this.props.autoWidth}
                        height={this.props.height}
                        width={this.props.width}
                    /> : null
                }
                <div className={`${this.props.className}-masonryGrid-filtering`}>
                    <div className={`${this.props.className}-masonryGrid-filtering-byTag`}>
                        <span className={`${this.props.className}-masonryGrid-filtering-byTag-title`}>
                            tags:
                        </span>
                        <div className={`${this.props.className}-masonryGrid-filtering-byTag-wrapper`}>
                            <p onClick={() => this.setState({ tagsVisible: !this.state.tagsVisible })}>
                                applied: {`${this.state.tagsCounted}`}
                                <span className={`${this.props.className}-masonryGrid-filtering-byYear-select-options-title-arrow${this.state.tagsVisible? ' toggled' : ''}`}/>
                            </p>
                            <form className={`${this.state.tagsVisible? 'toggled': 'hidden'}`} onSubmit={(e) => this.tagsHandleSubmit(e)}>
                                {
                                    this.state.tagsAll && this.state.tagsAll.length > 0 ? this.state.tagsAll.map((tags, i) => {
                                            return(
                                                <span title="Click to toggle this tag" key={i} className={`${this.props.className}-masonryGrid-filtering-byTag-wrapper-tag`}>
                                                    <label>
                                                        <i>{tags.tag}</i>
                                                        <input
                                                            type="checkbox"
                                                            name={`${tags.tag}`}
                                                            onChange={() => {this.tagsHandleCheckbox(i)}}
                                                            checked={tags.active}
                                                        />
                                                        <i className="overtext">{tags.tag}</i>
                                                    </label>
                                                </span>
                                            )
                                        }) :
                                        <span className={`${this.props.className}-masonryGrid-filtering-byTag-wrapper-noTag`}>
                                            no tags selected
                                        </span>
                                }
                                <div>
                                    <button
                                        type="submit"
                                        name="apply tags"
                                        title="apply tags"
                                    >
                                        apply
                                    </button>
                                    <button
                                        type="button"
                                        name="reset selected"
                                        title="reset selected"
                                        onClick={() => { this.resetTags() }}
                                    >
                                        reset
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className={`${this.props.className}-masonryGrid-filtering-byYear`}>
                        <span className={`${this.props.className}-masonryGrid-filtering-byYear-title`}>
                            show works for
                        </span>
                        <div className={`${this.props.className}-masonryGrid-filtering-byYear-select`}>
                            <p
                                onClick={() => this.setState({selectVisible: !this.state.selectVisible}) }
                                className={`${this.props.className}-masonryGrid-filtering-byYear-select-options-title`}
                            >
                                {this.state.year}
                                <span className={`${this.props.className}-masonryGrid-filtering-byYear-select-options-title-arrow${this.state.selectVisible? ' toggled' : ''}`}/>
                            </p>
                            <ul className={`${this.props.className}-masonryGrid-filtering-byYear-select-options${this.state.selectVisible? ' toggled' : ''}`}>
                                {
                                    yearFilter.map((year, i) => {
                                        return(
                                            <li onClick={() => this.setState({year: year, selectVisible: !this.state.selectVisible}, () => {this.divideByColumns()})} key={i}>{year}</li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </div>
                <div className={`${this.props.className}-masonryGrid-wrapper`}>
                    {
                        Array.isArray(this.state.itemsDividedByColumns) && this.state.itemsDividedByColumns[1].length > 0 ? this.state.itemsDividedByColumns.map((g, i) => { 
                            return (
                                <MasonryGalleryColumn
                                    key={i}
                                    id={i+1}
                                    items={g}
                                    className={`${this.props.className}-masonryGrid-wrapper`}
                                    addTag={this.addTag}
                                    toggleFullResolution={this.toggleFullResolution}
                                />
                            )
                        }) : 
                        <NoResult
                            className={this.props.className}
                        />
                    }
                </div>
            </div>
        )
    }
}


MasonryGallery.propTypes = {
    className: PropTypes.string,
    id: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired,
    columns: PropTypes.number,
    sorting: PropTypes.string,
    children: PropTypes.element
}

export default MasonryGallery