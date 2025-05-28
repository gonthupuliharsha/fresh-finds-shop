
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Star, Heart, Truck, Shield, RefreshCw, Plus, Minus, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/context/CartContext';
import { sampleProducts } from '@/data/sampleProducts';
import { toast } from "@/hooks/use-toast";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const product = sampleProducts.find(p => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-center p-8 bg-white rounded-3xl shadow-xl">
          <h1 className="text-3xl font-bold mb-4 text-gray-900">Product not found</h1>
          <p className="text-gray-600 mb-6">The product you're looking for doesn't exist.</p>
          <Button 
            onClick={() => navigate('/products')}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    toast({
      title: "Added to cart!",
      description: `${quantity} x ${product.name} added to your cart.`,
    });
  };

  const handleWishlist = () => {
    toast({
      title: "Added to wishlist",
      description: `${product.name} has been added to your wishlist.`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/products')}
            className="flex items-center hover:bg-white/50 rounded-xl"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-6">
            <div className="relative">
              <Badge className="absolute top-4 left-4 z-10 bg-gradient-to-r from-red-500 to-pink-500 text-white border-0 rounded-full px-4 py-2 shadow-lg">
                -20% OFF
              </Badge>
              <div className="aspect-square bg-white rounded-3xl overflow-hidden shadow-lg">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
            
            {/* Thumbnail images */}
            <div className="grid grid-cols-4 gap-3">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className={`aspect-square bg-white rounded-2xl overflow-hidden cursor-pointer border-2 transition-all duration-300 hover:scale-105 ${
                    selectedImage === i ? 'border-blue-500 shadow-lg' : 'border-gray-200'
                  }`}
                  onClick={() => setSelectedImage(i)}
                >
                  <img
                    src={product.image}
                    alt={`${product.name} view ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 rounded-full px-4 py-2">
                {product.category}
              </Badge>
              
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                {product.name}
              </h1>
              
              <div className="flex items-center space-x-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-gray-600">(4.8) • 127 reviews</span>
              </div>
              
              <div className="flex items-center space-x-4">
                <span className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  ${product.price.toFixed(2)}
                </span>
                <span className="text-2xl text-gray-400 line-through">
                  ${(product.price * 1.25).toFixed(2)}
                </span>
                <Badge className="bg-green-100 text-green-700 rounded-full px-3 py-1">
                  Save 20%
                </Badge>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Description</h3>
              <p className="text-gray-700 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-6">
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-4">
                  <label className="text-lg font-semibold text-gray-900">Quantity:</label>
                  <div className="flex items-center bg-white border-2 border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                    <button
                      onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                      className="px-4 py-3 text-gray-600 hover:text-gray-800 hover:bg-gray-50 transition-colors"
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="px-6 py-3 border-x-2 border-gray-200 font-semibold text-gray-900 min-w-[60px] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-4 py-3 text-gray-600 hover:text-gray-800 hover:bg-gray-50 transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-700 rounded-full px-4 py-2">
                  {product.stock} in stock
                </Badge>
              </div>
              
              <div className="flex space-x-4">
                <Button
                  onClick={handleAddToCart}
                  size="lg"
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-2xl py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <ShoppingCart className="mr-3 h-6 w-6" />
                  Add to Cart
                </Button>
                <Button
                  onClick={handleWishlist}
                  variant="outline"
                  size="lg"
                  className="px-6 rounded-2xl border-2 hover:bg-red-50 hover:border-red-200 transition-all duration-300 hover:scale-105"
                >
                  <Heart className="h-6 w-6 text-red-500" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="px-6 rounded-2xl border-2 hover:bg-blue-50 hover:border-blue-200 transition-all duration-300 hover:scale-105"
                >
                  <Share2 className="h-6 w-6 text-blue-500" />
                </Button>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-blue-100 rounded-xl">
                    <Truck className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Free Shipping</p>
                    <p className="text-sm text-gray-600">On orders over $50</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-green-100 rounded-xl">
                    <Shield className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Secure Payment</p>
                    <p className="text-sm text-gray-600">100% protected</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-purple-100 rounded-xl">
                    <RefreshCw className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Easy Returns</p>
                    <p className="text-sm text-gray-600">30-day policy</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold mb-8 text-gray-900">Customer Reviews</h2>
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 border-0 rounded-2xl">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      C{i}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-4">
                          <h4 className="font-bold text-lg text-gray-900">Customer {i}</h4>
                          <div className="flex">
                            {[...Array(5)].map((_, idx) => (
                              <Star key={idx} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                        </div>
                        <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">2 days ago</span>
                      </div>
                      <p className="text-gray-700 leading-relaxed">
                        Great product! Exactly as described and arrived quickly. 
                        The quality exceeded my expectations and I would definitely recommend to others.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
