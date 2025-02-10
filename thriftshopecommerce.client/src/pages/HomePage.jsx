import React from 'react';
import HeroSection from '../components/home/HeroSection';
import FeaturedSection from '../components/home/FeaturedSection';
import AnnouncementSection from '../components/home/AnnouncementSection';
import CollectionSection from '../components/home/CollectionSection';
import TestimonialSection from '../components/home/TestimonialSection'

function HomePage() {
  return (
    <>
      <HeroSection/>
      <AnnouncementSection/>
      <FeaturedSection/>
      <CollectionSection/>
      <TestimonialSection/>
    </>
  )
}

export default HomePage