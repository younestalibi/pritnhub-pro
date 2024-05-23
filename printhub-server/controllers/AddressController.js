const { Address, User } = require("../models");

// Create address
exports.createAddress = async (req, res) => {
  try {
    const { firstName, lastName, company, address1, address2, address3, city, country, phone, postal_code } = req.body;
    const userId = req.userId;

    const address = await Address.create({
      firstName,
      lastName,
      company,
      address1,
      address2,
      address3,
      city,
      country,
      phone,
      postal_code,
      user_id: userId
    });

    res.status(201).json({ message: "Address created successfully", address });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all addresses for a user
exports.index = async (req, res) => {
  try {
    const userId = req.userId;
    const addresses = await Address.findAll({ where: { user_id: userId }, order: [["id", "desc"]] });

    if (addresses) {
      return res.status(200).json({ addresses, message: "Returned Addresses Successfully!" });
    } else {
      res.status(404).json({ error: "Addresses not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// // Get an address by ID
// exports.getAddressById = async (req, res) => {
//   const addressId = req.params.id;
//   try {
//     const address = await Address.findByPk(addressId);

//     if (address) {
//       res.status(200).json({ address });
//     } else {
//       res.status(404).json({ error: "Address not found" });
//     }
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Update an address
// exports.updateAddress = async (req, res) => {
//   const addressId = req.params.id;
//   try {
//     const { firstName, lastName, company, address1, address2, address3, city, country, state, phone, email, postal_code } = req.body;
//     const address = await Address.findByPk(addressId);

//     if (!address) {
//       return res.status(404).json({ error: "Address not found" });
//     }

//     address.firstName = firstName;
//     address.lastName = lastName;
//     address.company = company;
//     address.address1 = address1;
//     address.address2 = address2;
//     address.address3 = address3;
//     address.city = city;
//     address.country = country;
//     address.state = state;
//     address.phone = phone;
//     address.email = email;
//     address.postal_code = postal_code;

//     await address.save();
//     res.status(200).json({ message: "Address updated successfully", address });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// Delete an address
exports.deleteAddress = async (req, res) => {
  const addressId = req.params.id;

  try {
    const address = await Address.findByPk(addressId);
    if (!address) {
      return res.status(404).json({ error: "Address not found" });
    }

    const deleted = await Address.destroy({ where: { id: addressId } });

    if (deleted) {
      res.status(200).json({ message: "Address deleted successfully", id: addressId });
    } else {
      res.status(404).json({ error: "Address not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
