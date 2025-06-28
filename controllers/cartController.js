import Cart from '../models/Cart.js';


// @desc    Get cart items
// @route   GET /api/cart
export const getCart = async (req,res)=>{
    const cart = await Cart.findOne({
        user:req.user._id
    }).populate('cartItems.product');

    res.status(200).json({
        success:true,
        cart
    });
};

// @desc    Add item to cart
// @route   POST /api/cart
export const addtoCart = async (req,res)=>{
    const {productId,quantity} = req.body;
    console.log(`Adding product ${productId} with quantity ${quantity} to cart for user ${req.user._id}`);
    

    let cart = await Cart.findOne({user:req.user._id});
    if(!cart){
        cart = await Cart.create({
            user:req.user._id,
            cartItems:[{productId,quantity}]
        });
    }
    const existingItem = cart.cartItems.find(item => item.productId.toString() === productId);
    if(existingItem){
        existingItem.quantity += quantity;
    }else{
        cart.cartItems.push({productId,quantity});
    }
    
    cart.updatedAt = Date.now();
    await cart.save();
    res.status(201).json({
        success:true,
        message:"Item added to cart",
        cart
    });
};

// @desc Remove item from cart
// @route DELETE /api/cart/:productId
export const removeFromCart = async (req, res) => {
  const { productId } = req.params;

  const cart = await Cart.findOne({ user: req.user._id });

  if (!cart) return res.status(404).json({ message: 'Cart not found' });

  cart.cartItems = cart.cartItems.filter(item => item.product.toString() !== productId);
  cart.updatedAt = Date.now();

  await cart.save();
  res.json({ message: 'Item removed from cart' });
};

// @desc Clear Entire cart
// @route DELETE /api/cart/clear
export const clearCart = async (req, res) => {
  await Cart.findOneAndDelete({ user: req.user._id });
  res.json({ message: 'Cart cleared' });
};

