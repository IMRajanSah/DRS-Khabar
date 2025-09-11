// utils/auth.js
export async function verifyToken() {
  const token = localStorage.getItem("token");
  if (!token) return false;

  try {
    const res = await fetch("https://api.drskhabar.com/index.php?action=verify", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    if (!res.ok) return false;

    const data = await res.json();
    return data.user; // return user payload
  } catch (err) {
    console.error("Token verification failed:", err);
    return false;
  }
}
