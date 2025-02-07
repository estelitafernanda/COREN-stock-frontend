import React from 'react'

function Loading() {
  return (
        <div className="flex justify-center items-center absolute top-0 w-screen h-screen bg-blackPrimary">
            <div className="flex flex-row gap-2">
            <div className="w-8 h-8 rounded-full bg-primary animate-bounce"></div>
            <div className="w-8 h-8 rounded-full bg-primary animate-bounce [animation-delay:-.3s]"></div>
            <div className="w-8 h-8 rounded-full bg-primary animate-bounce [animation-delay:-.5s]"></div>
            </div>
        </div>
  )
}

export default Loading