import { useEffect, useState } from "react";
import { verifyToken } from "../../utils/auth";
import { useNavigate } from "react-router-dom";
import {
  Spinner,
  Container,
  Form,
  Button,
  Row,
  Col,
  ListGroup,
  Modal
} from "react-bootstrap";
const CreateArticle = () => {
    const [loading, setLoading] = useState(true);
    const [authorized, setAuthorized] = useState(false);
    const navigate = useNavigate();
    const [currentImage, setCurrentImage] = useState("");
    const [show, setShow] = useState(false);
    const [createdPostId, setCreatedPostId] = useState(false);

  const handleClose = () => {
    setShow(false)
    navigate("/admin/my-articles")
  };
  const handleShow = () => setShow(true);
   const [formData, setFormData] = useState<{
  title: string;
  content: string;
  image_urls: string[]; // <-- explicitly string[]
  video_url: string;
  category: string;
  postdate: string;
  breakingNews: boolean;
}>({
  title: "",
  content: "",
  image_urls: [], // empty but typed
  video_url: "",
  category: "",
  postdate: "",
  breakingNews: false,
});
  const handleChange = (e:any) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };
   // ✅ Handle image URL add/remove
  const addImage = () => {
    if (currentImage.trim() !== "") {
      setFormData({
        ...formData,
        image_urls: [...formData.image_urls, currentImage.trim()],
      });
      setCurrentImage("");
    }
  };
   const removeImage = (index:any) => {
    const updatedImages = formData.image_urls.filter((_, i) => i !== index);
    setFormData({ ...formData, image_urls: updatedImages });
  };

//   // ✅ Handle multiple image URLs
//   const handleImageChange = (index:any, value:any) => {
//     const updatedImages = [...formData.image_urls];
//     updatedImages[index] = value;
//     setFormData({ ...formData, image_urls: updatedImages });
//   };

//   const addImageField = () => {
//     setFormData({ ...formData, image_urls: [...formData.image_urls, ""] });
//   };

//   const removeImageField = (index:any) => {
//     // Prevent removing the last image field
//     if (formData.image_urls.length === 1) return;
//     const updatedImages = formData.image_urls.filter((_, i) => i !== index);
//     setFormData({ ...formData, image_urls: updatedImages });
//   };

  // ✅ Submit form
  const handleSubmit = (e:any) => {
    e.preventDefault();
    // console.log("Submitting form:", formData);
    

    // TODO: send POST request to PHP API
    fetch("https://api.drskhabar.com/index.php?action=createPost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCreatedPostId(data.postId)
        handleShow();
        // navigate("/admin/my-articles")
      })
      .catch((err) => {console.error(err);navigate("/admin");});
  };


    useEffect(() => {
        async function checkAuth() {
            const user = await verifyToken();
            if (!user) {
                navigate("/admin"); // redirect to login
            } else {
                setAuthorized(true);
            }
            setLoading(false);
        }
        checkAuth();
    }, [navigate]);
    if (loading)
        return (
            <Container
                className="d-flex justify-content-center align-items-center"
                style={{ height: "80vh" }}
            >
                <Spinner animation="border" role="status" variant="primary">
                    <span className="visually-hidden">Checking authentication...</span>
                </Spinner>
            </Container>
        );
    if (!authorized) navigate("/admin");
    return (
        <Container style={{marginTop: "2rem", backgroundColor: "white", padding: "2rem", borderRadius: "8px", boxShadow: "0 0 10px rgba(0,0,0,0.1)"}}>
      {/* <h2 className="mb-4">Create News Article</h2>
      <Col className="text-end">
          <Button variant="success" onClick={() => navigate("/admin/create-article")}>
            + Create Post
          </Button>
        </Col> */}
        <Row className="mb-3">
        <Col><h2>Create News Article</h2></Col>
        <Col className="text-end">
          <Button variant="info" onClick={() => navigate("/admin/my-articles")}>
            Go Back
          </Button>
        </Col>
      </Row>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Content</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Label>Image URL</Form.Label>
        <Row className="mb-2">
          <Col>
            <Form.Control
              type="text"
              value={currentImage}
              onChange={(e) => setCurrentImage(e.target.value)}
              placeholder="https://example.com/image.jpg"
            />
          </Col>
          <Col xs="auto">
            <Button variant="secondary" onClick={addImage}>
              + Add
            </Button>
          </Col>
        </Row>

        {formData.image_urls.length > 0 && (
          <ListGroup className="mb-3">
            {formData.image_urls.map((url, index) => (
              <ListGroup.Item
                key={index}
                className="d-flex justify-content-between align-items-center"
              >
                <span>{url}</span>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => removeImage(index)}
                >
                  ❌
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}

        <Form.Group className="mt-3">
          <Form.Label>Video URL</Form.Label>
          <Form.Control
            type="text"
            name="video_url"
            value={formData.video_url}
            onChange={handleChange}
            placeholder="https://youtube.com/..."
          />
        </Form.Group>

        <Form.Group className="mt-3">
          <Form.Label>Category</Form.Label>
          <Form.Select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select category</option>
            <option value="समाचार">समाचार</option>
            <option value="राजनीति">राजनीति</option>
            <option value="खेलकुद">खेलकुद</option>
            <option value="अर्थतन्त्र">अर्थतन्त्र</option>
            <option value="अन्तर्राष्ट्रिय">अन्तर्राष्ट्रिय</option>
            <option value="मनोरञ्जन">मनोरञ्जन</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mt-3">
          <Form.Label>Post Date (string)</Form.Label>
          <Form.Control
            type="text"
            name="postdate"
            value={formData.postdate}
            onChange={handleChange}
            placeholder="YYYY-MM-DD (or Nepali date string)"
            required
          />
        </Form.Group>

        <Form.Group className="mt-3">
          <Form.Check
            type="switch"
            id="breakingNews"
            label="Breaking News"
            name="breakingNews"
            checked={formData.breakingNews}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-4">
          Submit Article
        </Button>
      </Form>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Saved Successfully!</Modal.Title>
        </Modal.Header>
        <Modal.Body><p>Click on See Post button to view the post.</p></Modal.Body>
        <Modal.Footer>
          <Button variant="primary">
            <a href={"/news/"+createdPostId} style={{color: "white", textDecoration: "none"}} target="_blank" rel="noreferrer">See Post</a>
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
    )
}


export default CreateArticle