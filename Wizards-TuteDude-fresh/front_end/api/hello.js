// front_end/api/hello.js

export default function handler(req, res) {
  res.status(200).json({ message: "Hello from your Vercel API endpoint!" });
}
