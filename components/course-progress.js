import { Progress } from '@nextui-org/react'
import React from 'react'

const colorByVariant = {
    default: "text-sky-700",
    success: "text-em"
}
const sizeByVariany = {
    default: "text-sm",
    sm: "text-xs",
}
const CourseProgress = ({variant, value, size}) => {
  return (
    <div>      
       <Progress
        className='h-2'
        value={value}
       />
       <p
       className='text-sky-700 font-medium mt-2'
       >{Math.round(value)}% Complete
       </p>
    </div>
  )
}

export default CourseProgress