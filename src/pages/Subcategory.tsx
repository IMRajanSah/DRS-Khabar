import CustomCard from "../component/CustomCard";
import data from "../data/data.json";
const Subcategory = ({type}:{type:string}) => {
  return (
    // <div>{type}</div>
    <div>
  {data.news.map(item => 
    item.category === type ? <CustomCard key={item.id} item={item} /> : null
  )}
</div>
  )
}

export default Subcategory