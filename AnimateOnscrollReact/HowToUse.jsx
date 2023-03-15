import React from 'react'
import AnimateOnscroll from './AnimateOnscroll'

const HowToUse = () => {
  return (
    <div>
        <AnimateOnscroll in_class="animate__slideInLeft" offset='0px' duration="1.5">
            {/* place you box here to be animated for all props of AnimateOnscroll see it. :) */}
        </AnimateOnscroll>
    </div>
  )
}

export default HowToUse