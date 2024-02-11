import axios from "axios";

export default async function handler(req, res) {
  try {
    const token = req.headers.authorization;
    console.log(token);
    const { id } = req.query;
    console.log(id);
    const response = await axios.get(
      `https://paace-f178cafcae7b.nevacloud.io/api/post/${id}`,
      {
        headers: { Authorization: token },
      }
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(400).send(error);
  }
}
