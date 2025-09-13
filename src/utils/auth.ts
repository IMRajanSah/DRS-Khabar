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


export const Category: Record<string, string> = {
  news: "समाचार",
  politics: "राजनीति",
  sports: "खेलकुद",
  economy: "अर्थतन्त्र",
  international: "अन्तर्राष्ट्रिय",
  entertainment: "मनोरञ्जन",
};


