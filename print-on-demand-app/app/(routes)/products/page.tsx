'use client'

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Search, Filter, Grid, List } from 'lucide-react';
import { axiosClient } from '@/lib/axiosClient';
import ProductCard from '@/app/_components/ProductCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Product } from '@/app/_components/PopularProducts';

interface StrapiProduct {
  id: number;
  attributes: {
    title: string;
    description: string;
    pricing: number;
    productimage: {
      data: Array<{
        attributes: {
          url: string;
        };
      }>;
    };
    isFeatures: boolean;
    size: any;
    category: {
      data: {
        attributes: {
          name: string;
          slug: string;
        };
      };
    };
  };
}

export default function ProductsPage() {
  const [strapiProducts, setStrapiProducts] = useState<StrapiProduct[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [categories, setCategories] = useState<Array<{ name: string; slug: string }>>([]);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [searchTerm, selectedCategory, products]);

  // Transform Strapi product to expected Product type
  const transformStrapiProduct = (strapiProduct: StrapiProduct): Product => {
    return {
      id: strapiProduct.id,
      title: strapiProduct.attributes.title,
      pricing: strapiProduct.attributes.pricing,
      description: strapiProduct.attributes.description,
      longDescription: strapiProduct.attributes.description, // Using description as fallback
      isFeatures: strapiProduct.attributes.isFeatures,
      size: strapiProduct.attributes.size || [],
      productimage: strapiProduct.attributes.productimage.data.map(img => ({
        url: img.attributes.url
      })),
      documentId: strapiProduct.id.toString()
    };
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      // Use the same API call that PopularProducts uses
      const response = await fetch('/api/products?isPopular=1');
      const data = await response.json();
      console.log('Products API response:', data);
      
      if (data && Array.isArray(data)) {
        // Data is already in the correct format from local API
        setProducts(data);
        // Also set Strapi products for category filtering
        setStrapiProducts(data.map((product: any) => ({
          id: product.id,
          attributes: {
            title: product.title,
            description: product.description,
            pricing: product.pricing,
            productimage: {
              data: product.productimage?.map((img: any) => ({
                attributes: { url: img.url }
              })) || []
            },
            isFeatures: product.isFeatures,
            size: product.size || [],
            category: product.category || { data: { attributes: { name: '', slug: '' } } }
          }
        })));
      } else {
        console.error('Invalid products data format:', data);
        setProducts([]);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      const data = await response.json();
      console.log('Categories API response:', data);
      
      if (data && Array.isArray(data)) {
        setCategories(data.map((cat: any) => ({
          name: cat.name,
          slug: cat.slug
        })));
      } else {
        console.error('Invalid categories data format:', data);
        setCategories([]);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      setCategories([]);
    }
  };

  const filterProducts = () => {
    let filtered = products;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(product => {
        // Find the corresponding Strapi product to get category info
        const strapiProduct = strapiProducts.find(sp => sp.id === product.id);
        return strapiProduct?.attributes.category?.data?.attributes?.slug === selectedCategory;
      });
    }

    setFilteredProducts(filtered);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg p-4">
                <Skeleton className="w-full h-48 mb-4" />
                <Skeleton className="w-3/4 h-6 mb-2" />
                <Skeleton className="w-1/2 h-4 mb-2" />
                <Skeleton className="w-1/4 h-6" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Popular <span className="text-blue-600">Products</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our most popular and trending print-on-demand products. 
            From custom t-shirts to personalized accessories, these are the favorites our customers love.
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-xl p-6 shadow-sm mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category.slug} value={category.slug}>
                    {category.name}
                  </option>
                ))}
              </select>

              {/* View Mode Toggle */}
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-3 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-3 py-3 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>

              {/* Clear Filters */}
              {(searchTerm || selectedCategory) && (
                <button
                  onClick={clearFilters}
                  className="px-4 py-3 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-6"
        >
          <p className="text-gray-600">
            Showing {filteredProducts.length} of {products.length} products
            {searchTerm && ` for "${searchTerm}"`}
            {selectedCategory && ` in ${categories.find(c => c.slug === selectedCategory)?.name}`}
          </p>
        </motion.div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                : 'grid-cols-1'
            }`}
          >
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center py-16"
          >
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || selectedCategory 
                ? 'Try adjusting your search or filters'
                : 'No products available at the moment'
              }
            </p>
            {(searchTerm || selectedCategory) && (
              <button
                onClick={clearFilters}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Clear All Filters
              </button>
            )}
          </motion.div>
        )}


      </div>
    </div>
  );
} 
