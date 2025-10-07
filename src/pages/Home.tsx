import { Carousel } from 'react-bootstrap';
import { AppContext } from "../context/AppContext";
import { useContext, useEffect, useState } from "react";
import MyTabs from '../component/MyTabs';

const Home = () => {
  const context = useContext(AppContext);
  const { posts } = context!;
  const [showAd, setShowAd] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAd(false);
    }, 15000);
    return () => clearTimeout(timer);
  }, []);

  const adImageUrl = "https://content.drskhabar.com/wp-content/uploads/2025/10/Dami-Arts-Ad.jpeg";
  
  return (
    <div>
      {/* Top 5 news */}
      <Carousel controls={false}>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={posts[0]?.image_urls[0]}
      alt="First slide"
      style={{ height: "60vh", objectFit: "cover" }}
    />
    <Carousel.Caption>
      <h3 style={{backgroundColor: "rgba(0, 0, 0, 0.5)", textShadow: "2px 2px 8px rgba(0, 0, 0, 0.7)"}}>{posts[0]?.title}</h3>
      {/* <p>Description for first slide.</p> */}
    </Carousel.Caption>
  </Carousel.Item>

  <Carousel.Item>
    <img
      className="d-block w-100"
      src={posts[1]?.image_urls[0]}
      alt="Second slide"
      style={{ height: "60vh", objectFit: "cover" }}
    />
    <Carousel.Caption>
      <h3 style={{backgroundColor: "rgba(0, 0, 0, 0.5)", textShadow: "2px 2px 8px rgba(0, 0, 0, 0.7)"}}>{posts[1]?.title}</h3>
      {/* <p>Description for second slide.</p> */}
    </Carousel.Caption>
  </Carousel.Item>

  <Carousel.Item>
    <img
      className="d-block w-100"
      src={posts[2]?.image_urls[0]}
      alt="Third slide"
      style={{ height: "60vh", objectFit: "cover" }}
    />
    <Carousel.Caption>
      <h3 style={{backgroundColor: "rgba(0, 0, 0, 0.5)", textShadow: "2px 2px 8px rgba(0, 0, 0, 0.7)"}}>{posts[2]?.title}</h3>
      {/* <p>Description for third slide.</p> */}
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={posts[3]?.image_urls[0]}
      alt="Fourth slide"
      style={{ height: "60vh", objectFit: "cover" }}
    />
    <Carousel.Caption>
      <h3 style={{backgroundColor: "rgba(0, 0, 0, 0.5)", textShadow: "2px 2px 8px rgba(0, 0, 0, 0.7)"}}>{posts[3]?.title}</h3>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={posts[4]?.image_urls[0]}
      alt="Fifth slide"
      style={{ height: "60vh", objectFit: "cover" }}
    />
    <Carousel.Caption>
      <h3 style={{backgroundColor: "rgba(0, 0, 0, 0.5)", textShadow: "2px 2px 8px rgba(0, 0, 0, 0.7)"}}>{posts[4]?.title}</h3>
      {/* <p>Description for third slide.</p> */}
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>
        {/* {posts.slice(5,16).map((item) => (
  <CustomCard key={item.id} item={item} />
))} */}
    <MyTabs/>
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
          <div
            style={{
              position: "relative",
              display: "inline-block",
              maxWidth: window.innerWidth <= 768 ? "90%" : "50%",
              maxHeight: "80%",
            }}
          >
            {/* Button container (outside top-right) */}
            <div
              style={{
                position: "absolute",
                top: "-40px", // Positioned above the image
                right: "0px",
                display: "flex",
                gap: "10px",
              }}
            >
              {/* View Button */}
              <button
                onClick={() => window.open(adImageUrl, "_blank", "noopener,noreferrer")}
                style={{
                  padding: "6px 12px",
                  fontSize: "0.9rem",
                  borderRadius: "5px",
                  border: "none",
                  cursor: "pointer",
                  backgroundColor: "#fff",
                  color: "#000",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                }}
              >
                View Ad
              </button>

              {/* Close Button */}
              <button
                onClick={() => setShowAd(false)}
                style={{
                  padding: "4px 8px",
                  fontSize: "0.9rem",
                  borderRadius: "5px",
                  border: "none",
                  cursor: "pointer",
                  backgroundColor: "#fff",
                  color: "#000",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                }}
                aria-label="Close Ad"
              >
                ✖
              </button>
            </div>

            {/* Ad Image */}
            <img
              src={adImageUrl}
              alt="Ad"
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "8px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
                display: "block",
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
