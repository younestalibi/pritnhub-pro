import BreadCrumb from "../../components/BreadCrumb/BreadCrum";
import ProductCustomization from "./ProductCustomization";

const Catalgo = () => {
    const handleSave = (customizationOptions) => {
        // Save the customization options, e.g., send them to a server for storage
        console.log('Saved customization options:', customizationOptions);
    };
    return ( 
        <>
        <BreadCrumb titles={['Home','Catalog',"Index"]}/>
        <ProductCustomization onSave={handleSave} />

        </>
     );
}
 
export default Catalgo;
