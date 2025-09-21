import { useContext, useState } from "react";
import CardWithPagination from "../component/CardWithPagination";
import { AppContext } from "../context/AppContext";
import { Category } from "../utils/auth";
import { Col, Pagination, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const Subcategory = ({ type }: { type: string }) => {
  const context = useContext(AppContext);
  const { posts } = context!;
  const nepaliCategory = Category[type];
  const navigate = useNavigate();
  // console.log(nepaliCategory);

  const filtered = posts.filter((item) => item.category === nepaliCategory);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 6; // cards per page
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filtered.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (pageNumber:any) => {
    setCurrentPage(pageNumber);
  };
  // if(filtered.length === 0){
  //   return <h4 className="not-found">अहिलेसम्म कुनै पोस्ट छैन !</h4>
  // }
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
  return (
    <Row className="align-items-stretch">
      <Col xs={12} md={9} className="mb-3 mydiv" style={{ border: 'none', boxShadow: '0 0 10px rgba(0,0,0,0.1)', backgroundColor: 'white' }}>
        {filtered.length === 0 ? <h4 className="not-found">अहिलेसम्म कुनै पोस्ट छैन !</h4> :
          <Row >
            <span style={{fontSize:'2rem', color:'rgb(45, 39, 103)',borderBottom:'2px solid rgb(45, 39, 103)', fontWeight:'bold', padding:'0 0 0 1.5rem',height:'3rem'}}>{nepaliCategory}</span>
            {currentItems .map((item) => (
              <Col
                key={item.id}
                xs={12}
                md={6}
                className="mb-3"
              >
                <CardWithPagination item={item} />
              </Col>
            ))}
            {totalPages > 1 &&(
            <Pagination className="justify-content-center mt-3">
              <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
              <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />

              {Array.from({ length: totalPages }, (_, i) => (
                <Pagination.Item
                  key={i + 1}
                  active={currentPage === i + 1}
                  onClick={() => handlePageChange(i + 1)}
                >
                  {i + 1}
                </Pagination.Item>
              ))}

              <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
              <Pagination.Last onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} />
            </Pagination>
            )}
          </Row>
        }
      </Col>
      <Col xs={12} md={3} className="mb-3">
        <div style={{ backgroundColor: 'white', padding: '8px' }}>
          <div style={{ backgroundColor: 'red', color: 'white', padding: '4px', fontWeight: 'bold' }}>ताजा समाचार</div>
          {posts.length > 0 && posts.slice(0, 4).map((item) => (
            <div className='cardItem' key={item.id} onClick={() => navigate(`/news/${item.id}`)}>
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
      </Col>
    </Row>
  )
}

export default Subcategory