import xlsx from "xlsx";

// Read the Excel file
const workbook = xlsx.readFile("./properties_2025\ 3.xlsx");

// Get the first sheet
const worksheet = workbook.Sheets[workbook.SheetNames[0]];

// Convert the sheet to JSON (array of objects)
const data = xlsx.utils.sheet_to_json(worksheet);

// Debugging: Log the data to inspect the exact structure

// Mapping column names from Excel to schema fields
const mappedData = data.map((row) => {

  return {
    propertyId: row["كود"], // Property ID
    createdAt: row["تاريخ"], // Date
    category: row["التصنيف"], // Category
    agent: row["الوكيل"], // Agent
    area: row["المنطقة"], // Area
    size: row["المساحة"], // Size
    floor: row["الدور"], // Floor
    isLastFloor: row["الاخير"] === "نعم", // Last floor check
    price: row["السعر"], // Price
    finishing: row["التشطيب"], // Finishing
    rooms: row["الغرف"], // Rooms
    reception: row["الريسبشن"], // Reception
    bathrooms: row["الحمامات"], // Bathrooms
    yearBuilt: row["عام البناء"], // Year built
    elevators: row["المصعد"], // Elevators
    meters: row["العدادات"] ? row["العدادات"].split(",") : [], // Meters
    notes: row["الملاحظات"], // Notes
    type: row["النوع"], // Type field
    images: [], // Placeholder for images
  };
});

// Log the mapped data to verify the transformation
console.log(mappedData)
export default mappedData; // Log the first mapped data
