import { useEffect, useState } from "react";
import { Table, Button, Form, Container, Row, Col, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { verifyToken } from "../../utils/auth";

interface Post {
  id: number;
  title: string;
  content: string;
  category: string;
  post_date: string;
  created_at: string;
  breaking_news: string | number;
  image_urls?: string[];
  video_url?: string;
}

const MyArticles = () => {
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();
  const pageSize = 5; // how many rows per page

  useEffect(() => {
    fetchPosts();
  }, []);

  // Fetch all posts once
  const fetchPosts = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const res = await fetch("https://api.drskhabar.com/index.php?action=getPosts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setAllPosts(data.posts || []);
      setPosts(data.posts || []);
      setTotalPages(Math.ceil((data.posts?.length || 1) / pageSize));
    } catch (err) {
      console.error("Error fetching posts:", err);
    } finally {
      setLoading(false);
    }
  };

  // Apply filters (search, category, date)
  const applyFilters = (e: any) => {
    e.preventDefault();
    setSearch(e.target.value)
    let searchValue = e.target.value
    let filtered = [...allPosts];

    if (searchValue.trim()) {
      const lower = searchValue.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(lower) ||
          p.content.toLowerCase().includes(lower) ||
          p.category.toLowerCase().includes(lower)
      );
    }
    setPosts(filtered);
    setPage(1);
    setTotalPages(Math.ceil(filtered.length / pageSize));
  };

  // Reset filters
  // const resetFilters = () => {
  //   setSearch("");
  //   setPosts(allPosts);
  //   setPage(1);
  //   setTotalPages(Math.ceil(allPosts.length / pageSize));
  // };

  // Slice posts for pagination
  const paginatedPosts = posts.slice((page - 1) * pageSize, page * pageSize);

  // Delete post
  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`https://api.drskhabar.com/index.php?action=deletePost&id=${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        alert("Post deleted!");
        fetchPosts();
      } else {
        alert(data.error || "Failed to delete post");
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };
  useEffect(() => {
    async function checkAuth() {
      const user = await verifyToken();
      if (!user) {
        navigate("/admin"); // redirect to login
      } else {
        navigate("/admin/my-articles");
      }
      setLoading(false);
    }
    checkAuth();
  }, [navigate]);
  return (
    <Container style={{ marginTop: "2rem" }}>
      <Row className="mb-3">
        <Col><h2>My Articles</h2></Col>
        <Col className="text-end">
          <Button variant="success" onClick={() => navigate("/admin/create-article")}>
            + Create Post
          </Button>
        </Col>
      </Row>

      {/* Filters */}
      <Row className="mb-3">
        <Col md={5}>
          <Form.Control
            type="text"
            placeholder="Search by title or content or category"
            value={search}
            onChange={(e) => applyFilters(e)}
          />
        </Col>
        {/* <Col md={3}>
          <Form.Select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Filter by category</option>
            <option value="news">News</option>
            <option value="politics">Politics</option>
            <option value="sports">Sports</option>
            <option value="economy">Economy</option>
            <option value="international">International</option>
            <option value="entertainment">Entertainment</option>
          </Form.Select>
        </Col> */}
        {/* <Col md={3}>
          <Form.Control
            type="date"
            value={postdate}
            onChange={(e) => setPostdate(e.target.value)}
          />
        </Col> */}
        {/* <Col md={2} className="d-flex gap-2">
          <Button variant="primary" onClick={applyFilters}>Apply</Button>
          <Button variant="secondary" onClick={resetFilters}>Reset</Button>
        </Col> */}
      </Row>

      {/* Table */}
      <Table bordered hover responsive>
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Post Date</th>
            <th>Created</th>
            <th>Breaking</th>
            <th>Image</th>
            <th>Video</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={7} className="text-center">
                <Spinner animation="border" role="status" variant="primary">
                  <span className="visually-hidden">Loading posts...</span>
                </Spinner>
              </td>
            </tr>
          ) : paginatedPosts.length > 0 ? (
            paginatedPosts.map((post) => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>{post.category}</td>
                <td>{post.post_date}</td>
                <td>{new Date(post.created_at).toLocaleString()}</td>
                <td>{post.breaking_news === "1" ? "Yes" : "No"}</td>
                <td>
                  {post.image_urls && post.image_urls.length > 0 ? (
                    <img
                      src={post.image_urls[0]}
                      alt={post.title}
                      style={{ width: "60px", height: "40px", objectFit: "cover" }}
                    />
                  ) : (
                    "-"
                  )}
                </td>
                <td>
                  {post.video_url ? (
                    <a
                      href={post.video_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View
                    </a>
                  ) : (
                    "-"
                  )}
                </td>
                <td>
                  <div className="d-flex flex-column flex-md-row">
                    <Button
                      variant="primary"
                      size="sm"
                      className="me-2"
                      onClick={() => navigate(`/admin/edit-article/${post.id}`)}
                    >
                      &#9999;
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(post.id)}
                    >
                      &#x1F5D1;
                    </Button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className="text-center">अहिलेसम्म कुनै पोस्ट छैन !</td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Pagination */}
      <div className="d-flex justify-content-center mt-4">
        <Button
          variant="outline-primary"
          disabled={page <= 1}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </Button>
        <span className="mx-3 align-self-center">Page {page} of {totalPages}</span>
        <Button
          variant="outline-primary"
          disabled={page >= totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </Button>
      </div>
    </Container>
  );
};

export default MyArticles;
