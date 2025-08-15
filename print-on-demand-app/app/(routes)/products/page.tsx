'use client'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Search, Filter, Grid, List } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface Product {
    id: string;
    attributes: {
        title: string;
        description: string;
        pricing: number;
        productimage: Array<{
            url: string;
        }>;
        isFeatures: boolean;
        category?: {
            data: {
                attributes: {
                    name: string;
                    slug?: string;
                };
            };
        };
    };
}

function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [categories, setCategories] = useState<Array<{ name: string; slug: string }>>([]);
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    useEffect(() => {
        const category = searchParams.get('category');
        if (category) {
            setSelectedCategory(category);
        }
    }, [searchParams]);

    const fetchProducts = async () => {
        try {
            const response = await fetch('/api/products?populate=*');
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await fetch('/api/categories?populate=*');
            const payload = await response.json();
            const data = payload?.data ?? payload; // our API returns { data: [...] }
            setCategories(
                (data || []).map((cat: any) => ({
                    name: cat?.attributes?.name,
                    slug: cat?.attributes?.slug ?? ''
                }))
            );
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.attributes.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             product.attributes.description.toLowerCase().includes(searchTerm.toLowerCase());
        const productSlug = product.attributes.category?.data?.attributes?.slug;
        const matchesCategory = !selectedCategory || (productSlug ? productSlug === selectedCategory : false);
        
        return matchesSearch && matchesCategory;
    });

    const handleCategoryChange = (categorySlug: string) => {
        setSelectedCategory(categorySlug);
        if (categorySlug) {
            router.push(`/products?category=${categorySlug}`);
        } else {
            router.push('/products');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="bg-white rounded-lg shadow-sm p-4">
                                <Skeleton className="w-full h-48 mb-4" />
                                <Skeleton className="w-3/4 h-4 mb-2" />
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
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl md:text-5xl font-bold mb-6"
                    >
                        Our Products
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-xl text-gray-300 max-w-2xl mx-auto"
                    >
                        Discover our collection of high-quality, customizable products
                    </motion.p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Filters and Search */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                    <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
                        {/* Search */}
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                            />
                        </div>

                        {/* Category Filter */}
                        <div className="flex items-center space-x-4">
                            <Filter className="h-5 w-5 text-gray-600" />
                            <select
                                value={selectedCategory}
                                onChange={(e) => handleCategoryChange(e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                            >
                                <option value="">All Categories</option>
                                {categories.map((category) => (
                                    <option key={category.slug} value={category.slug}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* View Mode Toggle */}
                        <div className="flex items-center space-x-2 border border-gray-300 rounded-lg p-1">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-black text-white' : 'text-gray-600 hover:text-black'}`}
                            >
                                <Grid className="h-5 w-5" />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-2 rounded ${viewMode === 'list' ? 'bg-black text-white' : 'text-gray-600 hover:text-black'}`}
                            >
                                <List className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Results Count */}
                <div className="mb-6">
                    <p className="text-gray-600">
                        Showing {filteredProducts.length} of {products.length} products
                    </p>
                </div>

                {/* Products Grid/List */}
                {filteredProducts.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="text-gray-400 mb-4">
                            <Search className="h-16 w-16 mx-auto" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
                        <p className="text-gray-600">Try adjusting your search or filter criteria</p>
                    </div>
                ) : (
                    <div className={viewMode === 'grid' 
                        ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                        : "space-y-4"
                    }>
                        {filteredProducts.map((product, index) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className={`bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow ${
                                    viewMode === 'list' ? 'flex' : ''
                                }`}
                            >
                                <Link href={`/product/${product.id}`} className="block">
                                    <div className={`${viewMode === 'list' ? 'w-48 h-48' : 'h-48'} relative overflow-hidden`}>
                                        <Image
                                            src={product.attributes.productimage?.[0]?.url || '/hero.png'}
                                            alt={product.attributes.title}
                                            fill
                                            className="object-cover hover:scale-105 transition-transform duration-300"
                                        />
                                        {product.attributes.isFeatures && (
                                            <div className="absolute top-2 left-2 bg-yellow-400 text-black text-xs px-2 py-1 rounded-full font-medium">
                                                Featured
                                            </div>
                                        )}
                                    </div>
                                    
                                    <div className="p-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <h3 className="font-semibold text-gray-900 line-clamp-2">
                                                {product.attributes.title}
                                            </h3>
                                        </div>
                                        
                                        {product.attributes.category && (
                                            <p className="text-sm text-gray-500 mb-2">
                                                {product.attributes.category.data.attributes.name}
                                            </p>
                                        )}
                                        
                                        <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                                            {product.attributes.description}
                                        </p>
                                        
                                        <div className="flex items-center justify-between">
                                            <span className="text-lg font-bold text-gray-900">
                                                ${product.attributes.pricing}
                                            </span>
                                            <Button className="px-4 py-2 bg-black text-white hover:bg-gray-800 rounded-lg text-sm">
                                                View Details
                                            </Button>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default ProductsPage
