import './style/index.sass'
import React, { useState, useEffect, useRef } from 'react'
import Navbar from './components/Navbar'
import Header from './components/Header'
import Quote from './components/Quote'
import Gallery from './components/Gallery'
import Footer from './components/Footer'
import _ from 'lodash'
import { ParallaxProvider } from 'react-scroll-parallax'

function App() {
  const [scrollEl, setScrollElement] = useState(null)
  const [activeSection, setActiveSection] = useState(null)
  const scrollContainer = useRef(null)
  const headerRef = useRef(null)
  const quoteRef = useRef(null)
  const galleryRef = useRef(null)
  const footerRef = useRef(null)

  const scrollDistancePrev = useRef(0)
  const scrollDistance = useState(0)

  useEffect(() => {
    printRegardsToConsole('#D2AA6D')
    scrollContainer.current.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    //scrollContainer.current.addEventListener('scroll', handleScrollMomentum(0, scrollContainer.current), { passive: true })
    setScrollElement(scrollContainer.current)
    return () => {
      scrollContainer.current.removeEventListener('scroll', handleScroll)
      //scrollContainer.current.removeEventListener('scroll', handleScrollMomentum)
    }
  }, [])

  const printRegardsToConsole = _.debounce((color) => {
    console.log("\n\n%c" + 'THANK YOU' + "\n\n%cLorem ipsum dolor sit amet consectetur. Lacus vulputate curabitur sit tellus sed ac aenean enim donec. Aliquam sem sed in pharetra elementum. Sem massa aliquet elit iaculis duis id praesent. Dictum enim nulla quam non nulla convallis. Mattis purus interdum odio neque. Morbi leo vitae consequat blandit. Duis sit risus sed purus lacus eu auctor id. Malesuada lacus semper venenatis turpis et at vitae.\n\nBest regards,\n@Bumighator\n\n", "color:" + color + ";font-weight:bold;font-size:32px;")
  },400)

  //TODO: Доделать кинетический скролл. Вывести дистанцию скролла или анимировать скролл с предыдущего положения до нового
  /*const handleScrollMomentum = (easeSpeed, wrapper) => _.throttle(() => {
    scrollDistance.current = wrapper.scrollTop - scrollDistancePrev.current
    console.log(`
      scrolled for: ${scrollDistance.current}
      offset top: ${wrapper.scrollTop}
      prev scroll distance: ${scrollDistancePrev.current}`
    )
    scrollDistancePrev.current = wrapper.scrollTop - scrollDistancePrev.current
  }, 1000) */

  const handleScroll = _.debounce(() => {
    let section = String
    if( headerRef.current.getBoundingClientRect().top < 150 && 
        headerRef.current.getBoundingClientRect().top + headerRef.current.clientHeight > -150 && 
        headerRef.current.getBoundingClientRect().top + headerRef.current.clientHeight < headerRef.current.clientHeight + 150){
      section = 'header'
    }
    if( quoteRef.current.getBoundingClientRect().top < 150 && 
        quoteRef.current.getBoundingClientRect().top + quoteRef.current.clientHeight > -150 && 
        quoteRef.current.getBoundingClientRect().top + quoteRef.current.clientHeight < quoteRef.current.clientHeight + 150){
      section = 'header'
    }
    if( galleryRef.current.getBoundingClientRect().top < 150 && 
        galleryRef.current.getBoundingClientRect().top + galleryRef.current.clientHeight > -150 && 
        galleryRef.current.getBoundingClientRect().top + galleryRef.current.clientHeight < galleryRef.current.clientHeight + 150){
      section = 'gallery'
    }
    if( footerRef.current.getBoundingClientRect().top < 150 && 
        footerRef.current.getBoundingClientRect().top + footerRef.current.clientHeight > -150 && 
        footerRef.current.getBoundingClientRect().top + footerRef.current.clientHeight < footerRef.current.clientHeight + 150){
      section = 'credits'
    }

    setActiveSection(section)
  }, 10)

  return (
    <div id='scrollContainer' ref={scrollContainer} className="App">
      <ParallaxProvider scrollContainer={scrollEl}>
        <Navbar
          activeSection={activeSection}
          headerRef={headerRef}
          quoteRef={quoteRef}
          galleryRef={galleryRef}
          footerRef={footerRef}
          setActiveSection={setActiveSection}
        />
        <Header headerRef={headerRef} />
        <Quote quoteRef={quoteRef}/>
        <Gallery galleryRef={galleryRef}/>
        <Footer footerRef={footerRef} />
      </ParallaxProvider>
    </div>
  );
}

export default App;
