import React from 'react'
import { Outlet } from 'react-router-dom';
import NavMain from '../components/layout/NavMain';
import NavMarquee from '../components/home/NavMarquee';
import FooterSection from '../components/home/FooterSection';

function MainLayout() {
  return (
    <div className='bg-white vh-100 vw-100 overflow-x-hidden text-dark'>
        <NavMarquee/>
        <NavMain/>
        <Outlet />
        <FooterSection />
    </div>
  )
}

export default MainLayout