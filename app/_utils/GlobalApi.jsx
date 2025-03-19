
const { default: axios } = require("axios");

const axiosClient = axios.create({
  baseURL: 'http://192.168.43.163:1338/api'
});

// Fetch categories
const getCategory = () => axiosClient.get('/categories?populate=*');

// Fetch sliders
const getSliders = () => axiosClient.get('/sliders?populate=*').then(resp => {
  return resp.data.data;
});

// Fetch category list
const getCategoryList = () => axiosClient.get('/categories?populate=*').then(resp => {
  return resp.data.data;
});

// Fetch all products
const getAllProducts = () => axiosClient.get('/products?populate=*').then(resp => {
  return resp.data.data;
});

// Fetch products by category
const getProductsByCategory = async (category) => {
  try {
    console.log("Fetching category:", category); // ✅ Debugging

    const response = await axiosClient.get(`/products?filters[categories][name][$contains]=${encodeURIComponent(category)}&populate=*`);

    console.log("API Response for Category:", response.data);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching products by category:", error.response?.data || error.message);
    return []; // Ensure a valid return type
  }
};


// User registration
const registerUser = (username, email, password) => axiosClient.post('/auth/local/register', {
  username: username,
  email: email,
  password: password
});

// User sign-in
const SignIn = (email, password) => axiosClient.post('/auth/local', {
  identifier: email,
  password: password
});

// Add item to cart
const addToCart = (data, jwt) => axiosClient.post('/user-carts', data, {
  headers: {
    Authorization: `Bearer ${jwt}`
  }
});

// Get cart items for a user
const getCartItems = (userId, jwt) => axiosClient.get('/user-carts?filters[userId][$eq]=' + userId + '&[populate][products][populate][images][populate][0]=url',
  {
    headers: {
      Authorization: `Bearer ${jwt}`
    }
  }).then(resp => {
    const data = resp.data.data;
    const cartItemsList = data.map((item, index) => ({
      name: item.attributes.products?.data[0].attributes.name,
      quantity: item.attributes.quantity,
      amount: item.attributes.amount,
      image: item.attributes.products?.data[0].attributes.images.data[0].attributes.baseURL,
      actualPrice: item.attributes.products?.data[0].attributes.mrp,
      id: item.id,
      product: item.attributes.products?.data[0].id,
      status: item.attributes.status
    }));
    return resp.data.data;
  });

// Delete item from cart
const deleteCartItem = (id, jwt) => axiosClient.delete('/user-carts/' + id, {
  headers: {
    Authorization: `Bearer ${jwt}`
  }
});

// Create a new order
const createOrder = (data, jwt) => axiosClient.post('/orders', data, {
  headers: {
    Authorization: `Bearer ${jwt}`
  }
});

// Get orders for a user
const getMyOrder = (userId, jwt) => axiosClient.get('orders?filters[userId][$eq]=' + userId + '&populate[orderItemList][populate][product][populate][images]=url')
  .then(resp => {
    const response = resp.data.data;
    const orderList = response.map(item => ({
      id: item.id,
      totalOrderAmount: item.attributes.totalOrderAmount,
      paymentId: item.attributes.paymentId,
      orderItemList: item.attributes.orderItemList,
      createdAt: item.attributes.createdAt,
      trackingStatus: item.attributes.Tracking_Status // Access the tracking status here
    }));
    return orderList;
  });

// Update the tracking status of an order
const updateOrderStatus = async (orderId, newStatus, jwt) => {
  try {
    await axiosClient.put(`/orders/${orderId}`, {
      Tracking_Status: newStatus
    }, {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    });
    console.log("Order status updated successfully");
    return true; // Indicate success
  } catch (error) {
    console.error("Error updating order status:", error);
    return false; // Indicate failure
  }
};

export default {
  getCategory,
  getSliders,
  getCategoryList,
  getAllProducts,
  getProductsByCategory,
  registerUser,
  SignIn,
  addToCart,
  getCartItems,
  deleteCartItem,
  createOrder,
  getMyOrder,
  updateOrderStatus 
};
