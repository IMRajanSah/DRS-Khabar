import CustomCard from '../component/CustomCard';
import { AppContext } from "../context/AppContext";
import { useContext, useEffect, useState } from "react";

const Home = () => {
  const context = useContext(AppContext);
  const {posts} = context!;
   const [showAd, setShowAd] = useState(true);

   useEffect(() => {
    const timer = setTimeout(() => {
      setShowAd(false);
    }, 5000);
    return () => clearTimeout(timer); 
  }, []);

  return (
    <div>
      {posts.map((item)=>(
        <CustomCard key={item.id} item={item}/>
      ))}
      {showAd && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <img
            src="https://content.drskhabar.com/wp-content/uploads/2025/10/Dami-Arts-Ad.jpeg"
            alt="Ad"
            style={{
              maxWidth: "90%",
              maxHeight: "90%",
              borderRadius: "8px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
            }}
          />
        </div>
      )}
    </div>
  )
}

export default Home
