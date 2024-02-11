import axios from "axios";

export default async function handler(req, res) {
    try {
        const token = req.headers.authorization
        const response = await axios.get('https://paace-f178cafcae7b.nevacloud.io/api/posts?type=all',{
            headers: {Authorization: `${token}`}
        })
        res.status(200).send(response.data.data)
    } catch (error) {
        res.status(400).send(error.response.data)
    }
}