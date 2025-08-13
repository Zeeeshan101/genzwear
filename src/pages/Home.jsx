import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="bg-white">
      {/* HERO SECTION */}
      <section className="relative w-full h-[80vh] flex items-center justify-center bg-cover bg-center" 
        style={{ backgroundImage: "url('https://effortlessgent.com/wp-content/uploads/2021/07/FeatureImage_01-2.jpeg')" }}>
        <div className="absolute inset-0 bg-black/30" /> {/* Overlay for contrast */}
        <div className="relative text-center text-white px-4">
          <h1 className="text-4xl sm:text-6xl font-bold tracking-wide uppercase">
            New Season, New Style
          </h1>
          <p className="mt-4 text-lg sm:text-xl max-w-lg mx-auto">
            Discover the latest trends in fashion and make them yours.
          </p>
          <Link to="/products">
            <button className="mt-6 px-6 py-3 bg-white text-black font-medium rounded hover:bg-gray-100 transition">
              Shop Now
            </button>
          </Link>
        </div>
      </section>

      {/* CATEGORY BANNERS */}
      <section className="py-12 px-4 sm:px-8 lg:px-16 grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[
          { title: "Men", img: "https://image.hm.com/assets/hm/36/35/36358e696ce87313ca408f959be86073645dced1.jpg?imwidth=1260" },
          { title: "Women", img: "https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/F04400s.jpg?im=Resize,width=750" },
          { title: "Accessories", img: "https://i0.wp.com/fashion2apparel.com/wp-content/uploads/2023/10/Fashion-Accessories.jpg?resize=600%2C400&quality=100&ssl=1" }
        ].map((cat, i) => (
          <Link key={i} to={`/products?category=${cat.title.toLowerCase()}`}>
            <div className="relative group rounded-xl overflow-hidden cursor-pointer">
              <img src={cat.img} alt={cat.title} className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-white text-xl font-semibold">{cat.title}</span>
              </div>
            </div>
          </Link>
        ))}
      </section>

      {/* COLLECTION HIGHLIGHT */}
      <section className="py-16 bg-gray-50 text-center px-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">Featured Collection</h2>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          Explore our handpicked outfits that define this season's trend.
        </p>
        <div className="mt-8">
          <Link to="/products">
            <button className="px-6 py-3 bg-black text-white rounded hover:bg-gray-800 transition">
              View Collection
            </button>
          </Link>
        </div>
      </section>

      
    </div>
  );
}
