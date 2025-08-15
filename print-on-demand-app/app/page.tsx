import Hero from "./_components/Hero";
import Categories from "./_components/Categories";
import PopularProducts from "./_components/PopularProducts";
import HomeSections from "./_components/HomeSections";

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <Hero/>

      {/* Category List */}
      <Categories/>

      {/* Product List */}
      <PopularProducts/>

      {/* Sections */}
      <HomeSections/>
    </div>
  );
}
