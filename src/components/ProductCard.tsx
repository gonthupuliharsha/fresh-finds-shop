
import { Link } from 'react-router-dom';
import { ShoppingCart, Star, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Product, useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    // Wishlist functionality would go here
  };

  return (
    <Card className="group relative overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border-0 rounded-2xl">
      {/* Sale Badge */}
      <div className="absolute top-4 left-4 z-10">
        <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white border-0 rounded-full px-3 py-1 text-xs font-semibold shadow-lg">
          -20%
        </Badge>
      </div>

      {/* Wishlist Button */}
      <button 
        onClick={handleWishlist}
        className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110"
      >
        <Heart className="h-4 w-4 text-gray-600 hover:text-red-500 transition-colors" />
      </button>

      <Link to={`/products/${product.id}`}>
        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 rounded-t-2xl">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
        </div>
      </Link>
      
      <CardContent className="p-6 space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="text-xs font-medium bg-blue-50 text-blue-700 hover:bg-blue-100">
              {product.category}
            </Badge>
            <div className="flex items-center space-x-1">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-xs text-gray-500 font-medium">(4.8)</span>
            </div>
          </div>
          
          <Link to={`/products/${product.id}`}>
            <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-tight">
              {product.name}
            </h3>
          </Link>
        </div>
        
        <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between pt-2">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ${product.price.toFixed(2)}
              </span>
              <span className="text-sm text-gray-400 line-through">
                ${(product.price * 1.25).toFixed(2)}
              </span>
            </div>
            <p className="text-xs text-green-600 font-medium">Free shipping</p>
          </div>
          
          <Button
            onClick={handleAddToCart}
            size="sm"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 rounded-xl px-4 py-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group/btn"
          >
            <ShoppingCart className="h-4 w-4 mr-2 group-hover/btn:animate-bounce" />
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
