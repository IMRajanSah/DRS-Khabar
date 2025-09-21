import { useParams } from 'react-router-dom';
// import data from "../data/data.json";
import '../App.css'
import RelatedPosts from './RelatedPosts';
import { useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { Row, Col } from "react-bootstrap";
import Ratio from "react-bootstrap/Ratio";

const Details = () => {
  const context = useContext(AppContext);
  const {posts} = context!;


    const { id } = useParams<{ id: string }>();
    const article = posts.find((item:any) => item.id === id);

    if (!article) return <h4 className='not-found'>Article Not Found !</h4>;
    // console.log(article);

    const articles = posts.filter(
  (item:any) => item.id !== id && item.category === article.category
);
    
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
      <div style={{ flex: 3, backgroundColor:'white',padding:'12px' }}>
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
    {article.image_urls.map((url:any, index:any) => (
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
        {article?.video_url.length>1 ?
        <div className="video-wrapper">
          { (article.video_url.includes("youtube.com") || article.video_url.includes("youtu.be"))?
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
    </div>:undefined}
        <div className="content">
            {article.content
        .split("\n") // split on line breaks
        .filter((para:any) => para.trim() !== "") // remove empty lines
        .map((para:any, index:any) => (
          <p key={index} style={{ marginBottom: "1rem", fontSize:"1.25rem", lineHeight:"1.6",fontWeight:"500" }}>
            {para}
          </p>
        ))}
        </div>
        {article?.video_url.length>0 && article?.image_urls?.length>0?
        <Row className="g-3 mb-3">
    {article.image_urls.map((url:any, index:any) => (
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
      {(!articles || articles.length===0)?null:
      <div className='related-post'>
        <RelatedPosts category={article.category} id={article.id}/>
      </div>
        }
    </div>


  )
}

export default Details