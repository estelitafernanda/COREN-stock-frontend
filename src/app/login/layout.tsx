import React from 'react'

function Layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <div className='w-full h-screen absolute top-0 bg-blackPrimary'>
        {children}
    </div>
  )
}

export default Layout