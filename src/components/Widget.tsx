import { useState } from 'react'
import { ChatTeardropDots } from 'phosphor-react'
import { Popover } from '@headlessui/react'

export function Widget() {
  // const [isWidgetOpen, setIsWidgetOpen] = useState(false)

  // function toggleWidgetVisibility() {
  //   setIsWidgetOpen(!isWidgetOpen)
  // } // Popover take care of it

  return (
    <Popover className='absolute bottom-5 right-5' >
      {/* {isWidgetOpen ? <p>Hello</p> : null} */}
      {/* {isWidgetOpen && <p>Hello</p>} */}
      <Popover.Panel>Hello</Popover.Panel>
      {/* <button onClick={toggleWidgetVisibility} className='bg-brand-500 rounded-full px-3 h-12 text-white flex items-center group' > */}
      <Popover.Button className='bg-brand-500 rounded-full px-3 h-12 text-white flex items-center group' >
        <h1><ChatTeardropDots className='w-6 h-6' /></h1>
        <span className='max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-linear' >
          <span className='pl-2'></span>
          Feedback
        </span>
      </Popover.Button>
    </Popover>
  )
}
