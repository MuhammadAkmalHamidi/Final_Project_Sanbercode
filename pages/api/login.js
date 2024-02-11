import  Axios  from "axios";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(400).end()
    }
    try {
        const response = await Axios.post('https://paace-f178cafcae7b.nevacloud.io/api/login', req.body)
        res.status(200).json(response.data)
    } catch (error) {
        res.status(400).json(response.data)
    }
}