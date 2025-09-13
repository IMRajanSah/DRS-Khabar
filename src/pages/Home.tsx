import CustomCard from '../component/CustomCard';
import { AppContext } from "../context/AppContext";
import { useContext } from "react";

const Home = () => {
  const context = useContext(AppContext);
  const {posts} = context!;
  
  return (
    <div>
      {posts.map((item)=>(
        <CustomCard key={item.id} item={item}/>
        // <div>{item.title}</div>
      ))}
    </div>
  )
}

export default Home