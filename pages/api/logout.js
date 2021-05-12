import cookie from "cookie";

export default async (request, response) => {
  if (request.method === "POST") {
    response.setHeader(
        "Set-Cookie",
        cookie.serialize("token", "", {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          expires: new Date(0),
          sameSite: "strict",
          path: "/"
        })
      );

      response.status(200).json({message: "Success"})
  } else {
    response.setHeader("Allow", ["POST"]);
    response
      .status(405)
      .json({ message: `Method ${request.method} not allowed` });
  }
};
