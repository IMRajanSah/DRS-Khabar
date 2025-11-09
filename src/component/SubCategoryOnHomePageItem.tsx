import { useNavigate } from 'react-router-dom';
import './SubCategoryOnHomePageItem.css'
const SubCategoryOnHomePageItem = ({ category, posts }: any) => {
  const navigate = useNavigate();
    if (!posts || posts.length < 3) return null;

  const [main, second, third, ...rest] = posts;

    return (
        
    <div className="category-news">
      <h2 className="category-title">{category}</h2>

      <div className="news-grid">
        {/* LEFT COLUMN */}
        <div className="left-column">
          {/* Top Half - Main Post */}
          <div className="left-top">
            {main.image_urls[0] && (
              <img src={main.image_urls[0]} alt={main.title} className="main-image" onClick={() => navigate(`/news/${main?.id}`)}/>
            )}
            <h3 className="main-title">{main.title}</h3>
          </div>

          {/* Bottom Half - Two Posts Side by Side */}
          <div className="left-bottom">
            {[second, third].map((post) => (
              <div className="bottom-post" key={post.id}>
                {post.image_urls[0] && (
                  <img src={post.image_urls[0]} alt={post.title} className="bottom-img" onClick={() => navigate(`/news/${post?.id}`)}/>
                )}
                <p className="bottom-title" onClick={() => navigate(`/news/${post?.id}`)}>{post.title}</p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="right-column">
          {rest.map((post:any) => (
            <div className="right-item" key={post.id}>
              {post.image_urls[0] && (
                <img src={post.image_urls[0]} alt={post.title} className="right-thumb" onClick={() => navigate(`/news/${post?.id}`)}/>
              )}
              <div style={{display:'block', gap:'0'}} onClick={() => navigate(`/news/${post?.id}`)}>
              <div className="right-title">{post.title}</div>
            <div className='date'>{post.post_date}</div>
            </div>

            </div>
          ))}
          {rest.length===6?
          <div className="date" style={{textAlign:'center'}}>Go to category page for more posts</div>
          :
          <div className="date" style={{textAlign:'center'}}>That’s all for this category.</div>}
        </div>
      </div>
    </div>

    )
}

export default SubCategoryOnHomePageItem
