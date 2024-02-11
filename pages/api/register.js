import Axios from "axios";

export default async function register(req, res) {
  if (req.method !== "POST") {
    return res.status(400).end();
  }
  try {
    const response = await Axios.post(
      "https://paace-f178cafcae7b.nevacloud.io/api/register",
      req.body
    );
    console.log(response.data);
    res.status(200).json(response.data);
  } catch (error) {
    console.log(error.response.data);
    res.status(400).json(error.response.data)
  }
}
