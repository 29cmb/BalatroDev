import { Express } from 'express';
import { getGuides } from '../modules/database';
export default (app: Express) => {
    app.get("/api/v1/guides", (req, res) => {
        getGuides().then((guides) => {
            res.status(200).json({success: true, guides: guides.documents});
        }).catch((err) => {
            res.status(500).json({success: false, error: err.message});
        })
    })

    return {
        method: "GET",
        route: "/api/v1/guides"
    }
}