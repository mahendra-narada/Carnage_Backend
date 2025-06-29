import Order from '../models/Order.js';

// @desc    Create a new order
// @route   POST /api/orders
export const createOrder = async (req, res) => {
    const { orderItems, totalPrice } = req.body;

    if (!orderItems || orderItems.length === 0) {
        return res.status(400).json({ message: 'No items in order' });
    }

    try {
        const order = new Order({
            user: req.user._id,
            orderItems,
            totalPrice,
            status: 'Pending'
        });

        await order.save();
        res.status(201).json({
            success: true,
            message: 'Order created successfully',
            order
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get all orders for a user
// @route   GET /api/orders
export const getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id }).populate('orderItems.productId');
        res.status(200).json({
            success: true,
            orders
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
export const getOrderById = async (req, res) => {
    const { id } = req.params;

    try {
        const order = await Order.findById(id).populate('orderItems.productId');
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        if (order.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Access denied' });
        }
        res.status(200).json({
            success: true,
            order
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

// @desc    Update order status
// @route   PUT /api/orders/:id/status
export const updateOrderStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!status || !['Pending', 'Shipped', 'Delivered', 'Cancelled'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status' });
    }

    try {
        const order = await Order.findById(id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        if (order.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Access denied' });
        }

        order.status = status;
        await order.save();
        res.status(200).json({
            success: true,
            message: 'Order status updated successfully',
            order
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Delete an order
// @route   DELETE /api/orders/:id
export const deleteOrder = async (req, res) => {
    const { id } = req.params;

    try {
        const order = await Order.findById(id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        if (order.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Access denied' });
        }
        await order.remove();
        res.status(200).json({
            success: true,
            message: 'Order deleted successfully'
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

// @desc    Get all orders (Admin)
// @route   GET /api/orders/admin
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('user', 'name email').populate('orderItems.productId');
        res.status(200).json({
            success: true,
            orders
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc Mark an order as Paid
// @route PUT /api/orders/:id/pay
export const markOrderAsPaid = async (req,res)=>{
    const order = await Order.findById(req.params.id);
    if (!order) {
        return res.status(404).json({ message: 'Order not found' });
    }
    if (order.user.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'Access denied' });
    }

    order.isPaid = true;
    order.paidAt = new Date();
    await order.save();
    res.status(200).json({
        success: true,
        message: 'Order marked as paid successfully',
        order
    });
}


