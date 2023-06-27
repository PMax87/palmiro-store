import { useState, useContext, createContext, useEffect } from "react";
import { DataRepository } from "./DataRespository";
import { useQuery } from "@tanstack/react-query";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState("electronics");
  const [selectedOrderBy, setSelectedOrderBy] = useState("lowest-price");
  const [sortedData, setSortedData] = useState([]);
  const [activeSelectedCategory, setActiveSelectedCategory] = useState(0);
  const [cart, setCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [productQty, setProductQty] = useState(1);
  const [countInCart, setCountInCart] = useState(0);

  //Fetch Products Category
  const getCategory = async () => {
    const res = await DataRepository.getProductsCategory();
    return res.data;
  };

  const {
    isLoading: isLoadingCategory,
    error: errorCategory,
    data: dataCategory,
  } = useQuery(["category"], getCategory);
  // Fine Fetch Products Category

  //Fetch Products By Category
  const getSpecCategory = (e, id) => {
    setSelectedOrderBy("lowest-price");
    const value = e.target.innerHTML;
    setActiveSelectedCategory(id);
    setSelectedCategory(value);
  };

  const getProducts = async () => {
    const res = await DataRepository.getProdByCategory(selectedCategory);
    return res.data;
  };

  const {
    isLoading: loadingProducts,
    error: errorProducts,
    data: dataProducts,
  } = useQuery({
    queryKey: ["products", selectedCategory, selectedOrderBy],
    queryFn: () => getProducts(selectedCategory),
    keepPreviousData: true,
  });
  //End Products By Category

  //Reduce Length of Title
  const truncateTitleLength = (title) => {
    if (title.length > 20) {
      let truncateLength = title.substring(0, 20) + "...";
      return truncateLength;
    }
    return title;
  };

  const handleSelectedChange = (e) => {
    setSelectedOrderBy(e.target.value);
  };

  useEffect(() => {
    if (selectedOrderBy === "lowest-price" && dataProducts) {
      setSortedData(dataProducts.sort((a, b) => a.price - b.price));
    }
    if (selectedOrderBy === "highest-price" && dataProducts) {
      setSortedData(dataProducts.sort((a, b) => b.price - a.price));
    }
    if (selectedOrderBy === "order-AZ" && dataProducts) {
      setSortedData(
        dataProducts.sort((a, b) =>
          a.title.localeCompare(b.title, undefined, { sensitivity: "base" })
        )
      );
    }
    if (selectedOrderBy === "order-ZA" && dataProducts) {
      setSortedData(
        dataProducts.sort((a, b) =>
          b.title.localeCompare(a.title, undefined, { sensitivity: "base" })
        )
      );
    }
  }, [selectedOrderBy, dataProducts]);

  const addToCart = (id, title, price, image, qty) => {
    const tempItem = cart.find((i) => i.id === id);
    if (tempItem) {
      setCart((cart) =>
        cart.map((item) =>
          item.id === id
            ? {
                ...item,
                qty: item.qty + qty,
              }
            : item
        )
      );
    } else {
      setCart([
        ...cart,
        {
          id,
          title,
          price,
          image,
          qty,
        },
      ]);
    }
    setProductQty(1);
  };

  useEffect(() => {
    if (cart.length !== 0) {
      window.localStorage.setItem("cart", JSON.stringify(cart));
    }
    let total = cart.reduce((total, item) => {
      return total + item.qty * item.price;
    }, 0);

    let totalItemInCart = cart.reduce((total, item) => {
      return total + item.qty;
    }, 0);

    setCountInCart(totalItemInCart);

    setTotalAmount(total);
  }, [cart]);

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cart"));
    if (cartItems) {
      setCart(cartItems);
    }
  }, []);

  const addProductQty = () => {
    setProductQty((oldValue) => {
      return oldValue + 1;
    });
  };

  const decProductQty = () => {
    setProductQty((oldValue) => {
      return oldValue - 1;
    });
  };

  const addPrdQtInCart = (id, itemQty) => {
    setCart((cart) =>
      cart.map((item) =>
        item.id === id
          ? {
              ...item,
              qty: itemQty + 1,
            }
          : item
      )
    );
  };

  const decPrdQtInCart = (id, itemQty) => {
    setCart((cart) =>
      cart.map((item) =>
        item.id === id
          ? {
              ...item,
              qty: itemQty - 1,
            }
          : item
      )
    );
  };

  const deleteSingleItem = (id) => {
    let newCart = cart.filter((item) => item.id !== id);
    if (newCart.length === 0) {
      localStorage.clear();
    }
    setCart(newCart);
  };

  const deleteAllItems = () => {
    setCart([]);
    localStorage.clear();
  };

  return (
    <AppContext.Provider
      value={{
        isLoadingCategory,
        errorCategory,
        dataCategory,
        getSpecCategory,
        loadingProducts,
        sortedData,
        truncateTitleLength,
        selectedOrderBy,
        handleSelectedChange,
        activeSelectedCategory,
        cart,
        addToCart,
        productQty,
        addProductQty,
        decProductQty,
        totalAmount,
        addPrdQtInCart,
        decPrdQtInCart,
        deleteSingleItem,
        countInCart,
        deleteAllItems,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useGlobalContext };
