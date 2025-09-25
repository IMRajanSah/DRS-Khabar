import { useParams } from 'react-router-dom';
import '../App.css'
import RelatedPosts from './RelatedPosts';
import { useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { Row, Col } from "react-bootstrap";
import Ratio from "react-bootstrap/Ratio";

const Details = () => {
  const context = useContext(AppContext);
  const { posts } = context!;


  const { id } = useParams<{ id: string }>();
  const article = posts.find((item: any) => item.id === id);

  if (!article) return <h4 className='not-found'>Article Not Found !</h4>;
  // console.log(article);

  const articles = posts.filter(
    (item: any) => item.id !== id && item.category === article.category
  );

  const encodedUrl = encodeURIComponent(window.location.href);
  const encodedTitle = encodeURIComponent(article.title || "");

  const handleNativeShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title || '',
        text: article.title || '',
        url:window.location.href,
      });
    } else {
      alert("Sharing not supported on this browser.");
    }
  };
  const handleFacebookShare = () => {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const fbUrl = isMobile
    ? `fb://facewebmodal/f?href=${encodedUrl}` // open app on mobile
    : `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`; // fallback web
  window.open(fbUrl, "_blank");
};
const handleMessengerShare = () => {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const messengerUrl = isMobile
    ? `fb-messenger://share/?link=${encodedUrl}` // opens app
    : `https://www.facebook.com/dialog/send?link=${encodedUrl}&app_id=YOUR_APP_ID&redirect_uri=${encodedUrl}`; // web fallback
  window.open(messengerUrl, "_blank");
};
      // <a
      //   href={`https://www.facebook.com/dialog/send?link=${encodedUrl}&app_id=YOUR_APP_ID&redirect_uri=${encodedUrl}`}
      //   target="_blank"
      //   rel="noreferrer"


  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);
  return (
    <div
      className="article-detail-container"
      style={{
        display: 'flex',
        flexDirection: 'row',
        gap: '20px',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '5px',
        flexWrap: 'wrap',
      }}
    >
      {/* Main Article */}
      <div style={{ flex: 3, backgroundColor: 'white', padding: '12px' }}>
        <h1>{article.title}</h1>
        <p>
          <strong>प्रकाशित मिति:</strong> {article.post_date} | <strong>वर्ग :</strong> {article.category}
        </p>
        {/* {article?.video_url.length===0 && article?.image_urls?.length>0?
        <img
      src={article?.image_urls[0]}
          alt={article.title}
          style={{ width: '100%', height: 'auto', borderRadius: '8px', marginBottom: '20px' }}
        />:undefined
        } */}
        {article?.video_url.length === 0 && article?.image_urls?.length > 0 ? (
          <Row className="g-3 mb-3">
            {article.image_urls.map((url: any, index: any) => (
              <Col
                key={index}
                xs={12}
                sm={article.image_urls.length === 1 ? 12 : 6} // full width if only one image
              >
                <img
                  src={url}
                  alt={`${article.title}-${index}`}
                  style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "8px",
                    objectFit: "cover",
                  }}
                />
              </Col>
            ))}
          </Row>
        ) : null}
        {/* {article?.image_urls?.length>0?
        <img
      src={article?.image_urls[0]}
          alt={article.title}
          style={{ width: '100%', height: 'auto', borderRadius: '8px', marginBottom: '20px' }}
        />:undefined} */}
        {article?.video_url.length > 1 ?
          <div className="video-wrapper">
            {(article.video_url.includes("youtube.com") || article.video_url.includes("youtu.be")) ?
              <Ratio aspectRatio="16x9">
                <iframe
                  width="100%"
                  height="auto"
                  src={article.video_url}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </Ratio>
              :
              <video width="100%" height="auto" controls>
                <source src={article.video_url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>

            }
          </div> : undefined}
          <div className="share-buttons">
      <button
      onClick={handleFacebookShare}
        style={{
          background: "#1877f2",
          padding: "10px",
          borderRadius: "6px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "36px",
          border: "none",
        }}
      >
        {/* <button>Facebook</button> */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="white"
          viewBox="0 0 24 24"
          width="24"
          height="24"
        >
          <path d="M22 12c0-5.522-4.477-10-10-10S2 6.478 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.988H7.898v-2.89h2.54V9.797c0-2.506 1.493-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.242 0-1.63.771-1.63 1.562v1.875h2.773l-.443 2.89h-2.33V21.88C18.343 21.128 22 16.991 22 12" />
        </svg>
      </button>

      <a
        href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
        target="_blank"
        rel="noreferrer"
        style={{
          background: "black",
          padding: "10px",
          borderRadius: "6px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "36px",
          textDecoration: "none"
        }}
      >
        <span style={{color:'white',fontSize:'18px'}}>X</span>

      </a>

      <a
        href={`https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`}
        target="_blank"
        rel="noreferrer"
        style={{
    background: "#25D366",
    padding: "10px",
    borderRadius: "6px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "36px",
  }}

        
      >
         <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="white"
    viewBox="0 0 24 24"
    width="24"
    height="24"
  >
    <path d="M20.52 3.48A11.95 11.95 0 0012 0C5.373 0 0 5.373 0 12c0 2.108.551 4.076 1.514 5.78L0 24l6.49-1.516A11.957 11.957 0 0012 24c6.627 0 12-5.373 12-12 0-3.191-1.247-6.201-3.48-8.52zm-8.5 17.36c-2.18 0-4.228-.715-5.883-1.91l-.422-.292-3.857.902.922-3.765-.276-.435A9.962 9.962 0 012.5 12c0-5.248 4.252-9.5 9.5-9.5s9.5 4.252 9.5 9.5-4.252 9.5-9.5 9.5zm5.246-7.656c-.074-.124-.27-.198-.565-.347-.296-.15-1.75-.865-2.02-.965-.27-.1-.467-.149-.664.149-.198.296-.764.964-.936 1.16-.172.198-.345.223-.64.074-.296-.149-1.25-.46-2.38-1.462-.88-.784-1.474-1.75-1.647-2.046-.172-.296-.018-.456.13-.604.134-.133.296-.345.446-.518.15-.172.198-.296.298-.494.1-.198.05-.372-.025-.52-.075-.149-.664-1.604-.91-2.2-.24-.578-.487-.5-.664-.51l-.565-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.476 1.065 2.872 1.214 3.074c.149.198 2.09 3.192 5.06 4.48.708.305 1.26.487 1.69.624.71.227 1.36.195 1.872.118.571-.085 1.75-.715 2-1.407.248-.69.248-1.28.173-1.407z" />
  </svg>
      </a>

      <button
      onClick={handleMessengerShare}
        style={{
          background: "#0084ff",
          padding: "10px",
          borderRadius: "6px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "36px",
          border: "none",
        }}

      >
         <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="white"
          viewBox="0 0 24 24"
          width="24"
          height="24"
        >
          <path d="M12 2C6.477 2 2 6.08 2 11.1c0 2.86 1.436 5.42 3.728 7.093V22l3.404-1.87c.9.25 1.857.383 2.868.383 5.523 0 10-4.08 10-9.1S17.523 2 12 2zm.27 12.82l-2.49-2.64-4.11 2.64 4.52-4.82 2.49 2.64 4.11-2.64-4.52 4.82z" />
        </svg>
      </button>

      {/* Native share */}
      <button
        onClick={handleNativeShare}
        style={{
          background: "#8bc34a",
          padding: "10px",
          borderRadius: "6px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "36px",
          border: "none",
          cursor: "pointer",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="white"
          viewBox="0 0 24 24"
          width="24"
          height="24"
        >
          <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7a3.27 3.27 0 000-1.39l7.05-4.11a2.99 2.99 0 10-.91-1.48L8 9.82a3 3 0 100 4.36l7.05 4.11c.47.46 1.12.71 1.83.71a2.99 2.99 0 100-5.92z" />
        </svg>
      </button>
    </div>
        <div className="content">
          {article.content
            .split("\n") // split on line breaks
            .filter((para: any) => para.trim() !== "") // remove empty lines
            .map((para: any, index: any) => (
              <p key={index} style={{ marginBottom: "1rem", fontSize: "1.25rem", lineHeight: "1.6", fontWeight: "500",textAlign: "justify" }}>
                {para}
              </p>
            ))}
        </div>
        
        {article?.video_url.length > 0 && article?.image_urls?.length > 0 ?
          <Row className="g-3 mb-3">
            {article.image_urls.map((url: any, index: any) => (
              <Col
                key={index}
                xs={12}
                sm={article.image_urls.length === 1 ? 12 : 6} // full width if only one image
              >
                <img
                  src={url}
                  alt={`${article.title}-${index}`}
                  style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "8px",
                    objectFit: "cover",
                  }}
                />
              </Col>
            ))}
          </Row>
          : null}


      </div>

      {/* Related Posts on Right */}
      {(!articles || articles.length === 0) ? null :
        <div className='related-post'>
          <RelatedPosts category={article.category} id={article.id} />
        </div>
      }
    </div>


  )
}

export default Details