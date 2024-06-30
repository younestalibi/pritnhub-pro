export const calculateItemTotal = (item) => {
  const basePrice = parseFloat(item.Product.price);
  const quantity = item.quantity;
  const itemQuantity = item.Product.quantity;
  let adjustmentQuantityPrice = 0;
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

  if (itemQuantity) {
    if (itemQuantity && itemQuantity.priceAdjustments) {
      for (const adjustment of itemQuantity.priceAdjustments) {
        const [min, max] = adjustment.range.split("-").map(Number);
        if (quantity >= min && (max === undefined || quantity <= max)) {
          adjustmentQuantityPrice += parseFloat(adjustment.price);
          break;
        }
      }
    }
  }

  const itemTotal =
    (basePrice + customizationTotal + adjustmentQuantityPrice) * quantity;
  return itemTotal;
};

export const calculateTotal = (cartItems) => {
  return cartItems.reduce((total, item) => {
    const itemTotal = calculateItemTotal(item);
    return total + itemTotal;
  }, 0);
};

export const calculateTotalPrice = (items) => {
  return items.reduce((total, item) => {
    return total + parseFloat(item.price);
  }, 0);
};

export const goUp = () => {
  window.scrollTo(0, 0);
};
