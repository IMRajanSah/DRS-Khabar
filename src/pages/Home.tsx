import data from "../data/data.json";
import CustomCard from '../component/CustomCard';

const Home = () => {
  return (
    <div>
      {data.news.map((item)=>(
        <CustomCard key={item.id} item={item}/>
      ))}
    </div>
  )
}

export default Home