import React from 'react';
import PropTypes from 'prop-types';

const SectionWrapperAdaptive = ({children, sectionName, sectionRef}) => {
    return (
        <section className={`sectionWrapperAdaptive section-${sectionName}`} ref={sectionRef}>
            <div className="sectionWrapperAdaptive-subWrapper">
                {children}
            </div>
        </section>
    );
}

SectionWrapperAdaptive.propTypes = {
    children: PropTypes.element.isRequired,
    sectionName: PropTypes.string.isRequired,
    sectionRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({ current: PropTypes.any })
    ])
}

export default SectionWrapperAdaptive;
