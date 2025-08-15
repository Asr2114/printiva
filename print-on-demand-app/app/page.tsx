import Image from "next/image";
import {Button} from '../components/ui/button';
import Header from "./_components/Header";
import Hero from "./_components/Hero";
import Categories from "./_components/Categories";
import PopularProducts from "./_components/PopularProducts";
import HomeSections from "./_components/HomeSections";

export default function Home() {
  return (
   <div>
    
    {/* Header */}
    

    {/* Hero */}
    <Hero/>

    {/* Category List */}
    <Categories/>


    {/* Product List */}
    <PopularProducts/>


    {/* Sections */}
    <HomeSections/>


    {/* Footer */}
    


    </div>
  );
}
