'use client'
import dynamic from "next/dynamic"
import "react-quill/dist/quill.bubble.css"

import React, { useMemo } from 'react'

const PreviewEditor = ({value}) => {
    const ReactQuill = useMemo(() => dynamic(() => import("react-quill"), {
        ssr:false
    }), [])
  return (
    <div className="bg-white">
        <ReactQuill
        theme="bubble"
        value={value}
        readOnly
        />
    </div>
  )
}

export default PreviewEditor