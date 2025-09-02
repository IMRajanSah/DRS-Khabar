import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import { Container, Navbar, Nav } from "react-bootstrap";
import data from "./data/data.json";
// Import your category components
import Home from "./pages/Home";
import Subcategory from "./pages/Subcategory";
import './App.css'
import Details from './pages/Details';

export default function App() {
  return (
    <Router>
      <Header />
      <Container style={{marginTop:'8rem',marginBottom:'8px'}}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/news" element={<Home />} />
          <Route path="/politics" element={<Subcategory type="politics"/>} />
          <Route path="/sports" element={<Subcategory type="sports"/>} />
          <Route path="/agriculture" element={<Subcategory type="agriculture"/>} />
          <Route path="/economy" element={<Subcategory type="economy"/>} />
          <Route path="/international" element={<Subcategory type="international"/>} />
          <Route path="/entertainment" element={<Subcategory type="entertainment"/>} />
          <Route path="/news/:id" element={<Details/>}/>
        </Routes>
      </Container>
      <Footer />
    </Router>
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
  const navigate = useNavigate();
  return (
    <>
      {/* Top Banner Image */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "4rem",
          zIndex: 1035,
          overflow:'hidden',display: 'flex',justifyContent:'left',alignItems:'center',backgroundColor:'white',paddingLeft:'3.5rem'
        }}
      >
        <img
          src="/logo-temp.JPG"
          alt="Top Banner"
          style={{ width: "auto", height: "100%", objectFit: "cover",objectPosition: "center", cursor:'pointer'}}
          onClick={()=>navigate('/')}
        />
      </div>

      <Navbar
        variant="dark"
        expand="lg"
        style={{
          position: "fixed",
          top: "4rem", // starts below the image
          width: "100%",
          backgroundColor: "#2d2767",
          color: "white",
          zIndex:700
        }}
      >
        <Container className="mx-5" style={{ color: "white" }}>
          <Navbar.Brand as={Link} to="/" style={{color:'red'}}>DRS खबर</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto" style={{ gap: "1rem" }}>
              {data.categories.map((cat) => (
                <Nav.Link as={Link} to={`/${cat.id}`} key={cat.id}>
                  {cat.name}
                </Nav.Link>
              ))}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}



// footer
function Footer() {
  return (
    <footer className="text-light text-end py-3 px-4 mt-auto w-100" style={{ backgroundColor: "#2d2767",fontSize:'0.8rem' }}>
  <div>
    &copy; {new Date().getFullYear()} DRS Khabar. All Rights Reserved.
  </div>
  <div>
    Contact us:{" "}
    <a href="mailto:nepalheadlinenews@gmail.com" className="text-light text-decoration-none">
      nepalheadlinenews@gmail.com
    </a>
  </div>
</footer>

  );
}

