import HeroSection from '../components/home/HeroSection';
import FeaturedSection from '../components/home/FeaturedSection';
import AnnouncementSection from '../components/home/AnnouncementSection';
import CollectionSection from '../components/home/CollectionSection';
import TestimonialSection from '../components/home/TestimonialSection'
import { useState, useEffect } from 'react';

function HomePage() {
    const [items, setItems] = useState([]);
    const [collections, setCollections] = useState([]);

    const getItems = async () => {
        try {
            const res = await fetch('/item');
            const data = await res.json();

            if (res.ok) {
                const filteredItems = data.$values.filter(item => !item.$ref);
                setItems(filteredItems);
            }
        } catch (error) {
            console.error(error);
        } finally {
            //setLoading(false);
        }
    }

    const getCollections = async () => {
        try {
            const res = await fetch('/collection');
            const data = await res.json();

            if (res.ok) {
                setCollections(data.$values);
            }
        } catch (error) {
            console.error(error);
        } finally {
            //setLoading(false);
        }
    }

    useEffect(() => {
        getItems();
        getCollections();
    }, []);

    return (
        <>
            <HeroSection />
            <AnnouncementSection />
            <FeaturedSection items={items} />
            <CollectionSection collections={collections} />
            <TestimonialSection />
        </>
    )
}

export default HomePage