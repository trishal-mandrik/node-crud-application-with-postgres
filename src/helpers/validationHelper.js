const validationHelper = {};

validationHelper.verifyAllFieldsPresent = (fieldsObj) => {
    const requiredFields = [
        { field: 'product_name', message: 'Please provide product_name' },
        { field: 'quantity', message: 'Please provide quantity' },
        { field: 'price', message: 'Please provide price' }
    ];

    // Check if all required fields are missing
    const allFieldsMissing = requiredFields.every(({ field }) => !fieldsObj[field]);
    if (allFieldsMissing) {
        return { message: "Please provide product_name, quantity and price" };
    }

    // Check for missing required fields
    for (const { field, message } of requiredFields) {
        if (!fieldsObj[field]) {
            return { message };
        }
    }

    // Validate quantity
    const quantity = Number(fieldsObj.quantity);
    if (isNaN(quantity) || quantity <= 0) {
        return { message: "Please enter a valid quantity" };
    }

    // Validate price
    const price = Number(fieldsObj.price);
    if (isNaN(price) || price <= 0) {
        return { message: "Please enter a valid price" };
    }

    return { message: null };
};

module.exports = validationHelper;
