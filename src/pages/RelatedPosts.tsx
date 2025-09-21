import { useNavigate } from 'react-router-dom';
import '../App.css'
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const RelatedPosts = (props:any) => {
  const context = useContext(AppContext);
    const {posts} = context!;
  const navigate = useNavigate();
    const {category,id}=props
    const articles = posts.filter(
  (item) => item.id !== id && item.category === category
);
    if (!articles || articles.length===0) {
        return <></>;
    }
    const styles = {
  image: {
    width: "100%",
    height: "150px",
    // objectFit: "cover",
  },
  text: {
    padding: "8px",
    fontSize: "14px",
    color: "#333",
  },
};
console.log(articles);

  return (
    <div style={{backgroundColor:'white', padding:'8px', boxShadow: '0 0 10px rgba(0,0,0,0.1)'}}>
    <div style={{backgroundColor:'red',color:'white', padding:'4px', fontWeight:'bold'}}>Related Post</div>
    {articles.slice(0, 3).map((item)=>(
        <div className='cardItem' key={item.id} onClick={()=>navigate(`/news/${item.id}`)}>
      <img
        src={item.image_urls[0]}
        alt="News"
        style={styles.image}
      />
      <p style={styles.text}>
        {item.title}
      </p>
    </div>
    ))}
    
    </div>

  )
}

export default RelatedPosts