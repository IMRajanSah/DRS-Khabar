import { useEffect, useState } from "react";
import { Form, Button, Container, Row, Col, Card, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { verifyToken } from "../../utils/auth";
import { Spinner } from "react-bootstrap";


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const handleSubmit = (e: any) => {
        e.preventDefault();

        if (!email || !password) {
            setError("Email and Password are required!");
            return;
        }

        // Example: API call
        fetch("https://api.drskhabar.com/index.php?action=login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.token) {
                    localStorage.setItem("token", data.token);
                    navigate("/admin/my-articles");
                    //   alert("Login successful!");
                } else {
                    setError(data.error || "Invalid credentials");
                }
            })
            .catch(() => setError("Something went wrong"));
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
    return (
        <Container className="d-flex vh-100 align-items-center justify-content-center">
            <Row>
                <Col>
                    <Card className="p-4 shadow-lg rounded-4" style={{ width: "350px" }}>
                        <h3 className="text-center mb-3">Login</h3>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Enter password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Form.Group>

                            <Button variant="primary" type="submit" className="w-100">
                                Login
                            </Button>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </Container>
    );

}

export default Login