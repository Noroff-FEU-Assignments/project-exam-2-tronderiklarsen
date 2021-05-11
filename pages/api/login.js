import cookie from "cookie";
import { API_URL } from "../../constants/api";

export default async (request, response) => {
  if (request.method === "POST") {
    const { identifier, password } = request.body;

    const strapiResponse = await fetch(`${API_URL}/auth/local`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        identifier,
        password,
      }),
    });

    const data = await strapiResponse.json();

    if (strapiResponse.ok) {
      response.setHeader(
        "Set-Cookie",
        cookie.serialize("token", data.jwt, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          maxAge: 60 * 60 * 24 * 7,
          sameSite: "strict",
          path: "/",
        })
      );
      
      return response.status(200).json({ user: data.user });
    } else {
      response
        .status(data.statusCode)
        .json({ message: data.message[0].messages[0].message });
    }

    response.status(200).json({});
  } else {
    response.setHeader("Allow", ["POST"]);
    response
      .status(405)
      .json({ message: `Method ${request.method} not allowed` });
  }
};
