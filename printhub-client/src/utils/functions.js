export const calculateItemTotal = (item) => {
    const basePrice = parseFloat(item.Product.price);
    const quantity = item.quantity;
  
    const customizationTotal = Object.keys(item.customizations).reduce(
      (sum, key) => {
        const customizationValue = item.customizations[key];
        const option = item.Product.options.find((opt) => opt.name === key);
  
        if (option) {
          if (Array.isArray(customizationValue)) {
            const adjustments = customizationValue.reduce((acc, value) => {
              const choice = option.choices.find(
                (choice) => choice.value === value
              );
              return acc + (choice ? parseFloat(choice.priceAdjustment) : 0);
            }, 0);
            return sum + adjustments;
          } else {
            const choice = option.choices
              ? option.choices.find(
                  (choice) => choice.value === customizationValue
                )
              : null;
            return sum + (choice ? parseFloat(choice.priceAdjustment) : 0);
          }
        }
  
        return sum;
      },
      0
    );
  
    const itemTotal = (basePrice + customizationTotal) * quantity;
    return itemTotal;
  };
  
export  const calculateTotal = (cartItems) => {
    return cartItems.reduce((total, item) => {
      const itemTotal = calculateItemTotal(item);
      return total + itemTotal;
    }, 0);
  };