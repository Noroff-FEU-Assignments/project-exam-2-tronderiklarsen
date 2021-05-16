import cookie from "cookie";
import { API_URL } from "../../constants/api";

export default async (request, response) => {
  if (request.method === "GET") {
    if (!request.headers.cookie) {
      response.status(403).json({ message: "Not authorized" });
      return;
    }

    const { token } = cookie.parse(request.headers.cookie);

    const strapiResponse = await fetch(`${API_URL}/users/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const user = await strapiResponse.json();

    if (strapiResponse.ok) {
      response.status(200).json({ user });
    } else {
      response.status(403).json({ message: "User forbidden" });
    }
  } else {
    response.setHeader("Allow", ["GET"]);
    response
      .status(405)
      .json({ message: `Method ${request.method} not allowed` });
  }
};