import { useContext } from "react";
import CustomCard from "../component/CustomCard";
import { AppContext } from "../context/AppContext";
import { Category } from "../utils/auth";
const Subcategory = ({type}:{type:string}) => {
  const context = useContext(AppContext);
  const {posts} = context!;
  const nepaliCategory = Category[type];
  console.log(nepaliCategory);
  
  const filtered = posts.filter((item) => item.category === nepaliCategory);
  return (
    <div>
      {filtered.length > 0 ? (
        filtered.map((item) => <CustomCard key={item.id} item={item} />)
      ) : (
        <h4 className="not-found">अहिलेसम्म कुनै पोस्ट छैन !</h4>
      )}
    </div>
  )
}

export default Subcategory