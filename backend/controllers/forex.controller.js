import ForexData from "../models/forexData.model.js"; // Adjust the import based on your file structure

// Create new forex data entry
export const createForexData = async (req, res) => {
  try {
    const { pair, price } = req.body;

    const newForexData = new ForexData({
      pair,
      price,
    });

    await newForexData.save();
    res.status(201).json(newForexData);
  } catch (error) {
    console.log("Error in createForexData controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get all forex data
export const getForexData = async (req, res) => {
  try {
    const forexData = await ForexData.find();
    res.status(200).json(forexData);
  } catch (error) {
    console.log("Error in getForexData controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get forex data by currency pair
export const getForexDataByPair = async (req, res) => {
  try {
    const { pair } = req.params;
    const forexData = await ForexData.findOne({ pair });

    if (!forexData) {
      return res.status(404).json({ error: "Forex data not found" });
    }

    res.status(200).json(forexData);
  } catch (error) {
    console.log("Error in getForexDataByPair controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete forex data entry
export const deleteForexData = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedForexData = await ForexData.findByIdAndDelete(id);

    if (!deletedForexData) {
      return res.status(404).json({ error: "Forex data not found" });
    }

    res.status(200).json({ message: "Forex data deleted successfully" });
  } catch (error) {
    console.log("Error in deleteForexData controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
