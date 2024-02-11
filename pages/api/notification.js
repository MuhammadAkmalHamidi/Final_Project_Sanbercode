import axios from "axios"

export default async function notification(req, res) {
    try {
        const token = req.headers.authorization
        const response = await axios.get('https://paace-f178cafcae7b.nevacloud.io/api/notifications',{
            headers: {Authorization: `${token}`}
        })
        res.status(200).json(response.data)
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
}