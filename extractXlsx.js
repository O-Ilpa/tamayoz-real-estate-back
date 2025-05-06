import xlsx from "xlsx";

const workbook = xlsx.readFile("./properties_2025.xlsx");

const worksheet = workbook.Sheets[workbook.SheetNames[0]];

const data = xlsx.utils.sheet_to_json(worksheet);


const mappedData = data.map((row) => {

  return {
    propertyId: row["كود"],   
    createdAt: row["تاريخ"],  
    category: row["التصنيف"],  
    agent: row["الوكيل"],  
    area: row["المنطقة"],  
    size: row["المساحة"],  
    floor: row["الدور"],  
    isLastFloor: row["الاخير"] === "نعم",    
    price: row["السعر"],  
    finishing: row["التشطيب"],  
    rooms: row["الغرف"], 
    reception: row["الريسبشن"],  
    bathrooms: row["الحمامات"],  
    yearBuilt: row["عام البناء"],  
    elevators: row["المصعد"], 
    meters: row["العدادات"] ? row["العدادات"].split("+") : [], 
    notes: row["الملاحظات"], 
    type: row["النوع"], 
    images: [],
  };
});

console.log(mappedData)
export default mappedData; 
