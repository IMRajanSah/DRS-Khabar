import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import { Container, Navbar, Nav, Row, Col } from "react-bootstrap";
import data from "./data/data.json";
// Import your category components
import Home from "./pages/Home";
import Subcategory from "./pages/Subcategory";
import './App.css'
import Details from './pages/Details';
import { useContext, useEffect, useState } from 'react';
import NepaliDate  from "nepali-datetime";
import Login from './component/Admin/Login';
import CreateArticle from './component/Admin/CreateArticle';
import ArticleTable from './component/Admin/MyArticles';
import EditArticle from './component/Admin/EditArticle';
import { AppContext } from './context/AppContext';
import {
  Spinner,
  
} from "react-bootstrap";
export default function App() {
  const context = useContext(AppContext);
  const {loading, error} = context!;
  if(loading){
    return(
    <Container
                className="d-flex justify-content-center align-items-center"
                style={{ height: "80vh" }}
            >
                <Spinner animation="border" role="status" variant="primary">
                    <span className="visually-hidden">Checking authentication...</span>
                </Spinner>
            </Container>
  )}
  if(error){
    return(
    <Container
                className="d-flex justify-content-center align-items-center"
                style={{ height: "80vh", color:'red' }}
            >
        <h4 className="not-found">API Failure!</h4>
            </Container>
  )}
  return (
    <Router>
      <Layout />
    </Router>
  );
}

function Layout() {
  const location = useLocation();
  const hideLayout = location.pathname.startsWith("/admin");

  return (
    <>
      {!hideLayout && <Header />}
      <Container style={{ marginTop: hideLayout ? "0" : "5rem", marginBottom: "8px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/news" element={<Home />} />
          <Route path="/politics" element={<Subcategory type="politics" />} />
          <Route path="/sports" element={<Subcategory type="sports" />} />
          <Route path="/agriculture" element={<Subcategory type="agriculture" />} />
          <Route path="/economy" element={<Subcategory type="economy" />} />
          <Route path="/international" element={<Subcategory type="international" />} />
          <Route path="/entertainment" element={<Subcategory type="entertainment" />} />
          <Route path="/news/:id" element={<Details />} />
          <Route path="/admin" element={<Login />} />
          <Route path="admin/create-article" element={<CreateArticle />} />
          <Route path="/admin/my-articles" element={<ArticleTable />} />
          <Route path="/admin/edit-article/:id" element={<EditArticle />} />
        </Routes>
      </Container>
      {!hideLayout && <Footer />}
    </>
  );
}
// ---------- Header ----------
// function Header() {
//   return (
//     <Navbar variant='dark' expand="lg" fixed="top" style={{backgroundColor:'#2d2767', color:'white'}}>
//       <Container style={{color:'white'}}>
//         <Navbar.Brand as={Link} to="/">KP Khabar</Navbar.Brand>
//         <Navbar.Toggle aria-controls="basic-navbar-nav" />
//         <Navbar.Collapse id="basic-navbar-nav">
//           <Nav className="me-auto" style={{gap:'1rem'}}>
//             {data.categories.map((cat)=>(
//               <Nav.Link as={Link} to={`/${cat.id}`}>{cat.name}</Nav.Link>
//             ))}
//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// }
function Header() {
  // const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  const [dateTime, setDateTime] = useState("");
   const toNepaliDigits = (input: string) => {
    const nepaliDigits = ["०","१","२","३","४","५","६","७","८","९"];
    return input.replace(/\d/g, (d) => nepaliDigits[parseInt(d)]);
  };
  const formatBsDateTime = () => {
    const now = new NepaliDate();
    const bsDate = now.format("YYYY-MM-DD");

    // Get current time
    const adNow = new Date();
    let hours = adNow.getHours();
    const minutes = adNow.getMinutes();
    const seconds = adNow.getSeconds();
    const ampm = hours < 12 ? "बिहान" : "दिउँसो";
    hours = hours % 12 || 12; // convert 24h -> 12h

    // Format Nepali digits
    const formatted = `${toNepaliDigits(bsDate.replace(/-/g, "/"))} ${toNepaliDigits(hours.toString().padStart(2,"0"))}:${toNepaliDigits(minutes.toString().padStart(2,"0"))}:${toNepaliDigits(seconds.toString().padStart(2,"0"))} ${ampm}`;
    return formatted;
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(formatBsDateTime());
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  return (
    <>
      {/* <div
  style={{
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "4rem",
    zIndex: 1035,
    display: "flex",
    justifyContent: "space-between", // space between logo and right content
    alignItems: "flex-end",
    backgroundColor: "white",
    padding: "0 3.75rem", // horizontal padding
    overflow: "hidden",
  }}
>
  <img
    src="/drs.png"
    alt="Top Banner"
    style={{
      height: "100%",
      width: "auto",
      objectFit: "cover",
      objectPosition: "center",
      cursor: "pointer",
    }}
    onClick={() => navigate("/")}
  />

  <div >Hello</div>
</div> */}


      <Navbar
        variant="dark"
        expand="lg"
        expanded={expanded}
        onToggle={() => setExpanded(!expanded)}
        style={{
          position: "fixed",
          top: "0", // starts below the image
          width: "100%",
          backgroundColor: "#2d2767",
          color: "white",
          zIndex: 700
        }}
      >
        <Container className="mx-5" style={{ color: "white" }}>
          <Navbar.Brand as={Link} to="/" >
            <img
    src="/drs.png"
    alt="Top Banner"
    style={{
      height: "2.5rem",
      width: "2.5rem",
      objectFit: "cover",
      objectPosition: "center",
      cursor: "pointer",
      background:"white", borderRadius:"50%"
    }}
  />
          </Navbar.Brand>
    
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto" style={{ gap: "1rem" }}>
              {data.categories.map((cat) => (
                <Nav.Link as={Link} to={`/${cat.id}`} key={cat.id} onClick={() => setExpanded(false)}>
                  {cat.name}
                </Nav.Link>
              ))}
            </Nav>
          <div className="d-lg-block mt-3 mt-md-0" style={{ color: "white", fontWeight:'bold' }}> {toNepaliDigits(dateTime)} </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

// footer
function Footer() {
  return (
    <footer>
      {/* Main Footer */}
      <div style={{ backgroundColor: "#2d2767", color: "white", padding: "40px 0" }}>
        <Container>
          <Row className="text-center text-md-start">
            {/* Logo Section */}
            <Col xs={12} md={4} className="text-center mb-4 mb-md-0" >
              <img src="/drs.png" alt="Logo" style={{ width: "150px", height: "auto",background:"white", borderRadius:"50%"}} />
            </Col>

            {/* About Section */}
            <Col xs={12} md={4} className="mb-4 mb-md-0">
              <h5 style={{ borderBottom: "2px solid red", display: "inline-block", paddingBottom: "5px" }}>
                हाम्रो बारेमा
              </h5>
              <p className="mt-3 mb-1">डी.आर.एस मिडिया</p>
              <p className="mb-1">जनकपुरधाम उपमहानगरपालिका - ४, धनुषा</p>
              <p className="mb-1">
                <a href="mailto:nepalheadlinenews@gmail.com" className="text-light text-decoration-none">
                  nepalheadlinenews@gmail.com
                </a>
              </p>
            </Col>
            <Col xs={12} md={4}>
              <h5
                style={{
                  borderBottom: "2px solid red",
                  display: "inline-block",
                  paddingBottom: "5px",
                }}
              >
                सामाजिक मिडिया
              </h5>

              <div className="d-flex justify-content-center justify-content-md-start align-items-center gap-3">
                {/* Facebook Icon */}
                <a href="https://www.facebook.com/profile.php?id=61574987473882" target="_blank" rel="noreferrer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="white">
                    <path d="M22.675 0h-21.35C.598 0 0 .598 0 1.325v21.351C0 23.403.598 24 1.325 24h11.494v-9.294H9.691v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.794.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.403 24 24 23.403 24 22.675V1.325C24 .598 23.403 0 22.675 0z" />
                  </svg>
                </a>

                {/* YouTube Icon */}
                <a href="https://www.youtube.com/@DRSMedia-v3n" target="_blank" rel="noreferrer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="#FF0000">
                    <path d="M23.498 6.186a2.972 2.972 0 0 0-2.094-2.098C19.751 3.5 12 3.5 12 3.5s-7.751 0-9.404.588a2.972 2.972 0 0 0-2.094 2.098A31.26 31.26 0 0 0 0 12a31.26 31.26 0 0 0 .502 5.814 2.972 2.972 0 0 0 2.094 2.098C4.249 20.5 12 20.5 12 20.5s7.751 0 9.404-.588a2.972 2.972 0 0 0 2.094-2.098A31.26 31.26 0 0 0 24 12a31.26 31.26 0 0 0-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              </div>
            </Col>

          </Row>
        </Container>
      </div>

      {/* Bottom Bar */}
      <div style={{ backgroundColor: "#cd060d", color: "white", padding: "10px 0" }}>
        <Container>
          <Row>
            <Col className="d-flex justify-content-start gap-4" style={{ whiteSpace: "nowrap" }}>
              &copy; {new Date().getFullYear()} DRS Khabar. All Rights Reserved.
            </Col>
            <Col className="d-flex justify-content-end gap-4">
              <div style={{ color: "red", cursor: "pointer"}} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="white">
  <path d="M12 4l-8 8h5v8h6v-8h5z"/>
</svg>

              </div>
            </Col>
            
          </Row>
        </Container>
      </div>
    </footer>
  )
}