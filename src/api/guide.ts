import { Express, Request, Response } from 'express';
import { getGuide } from '../modules/database';
import axios from 'axios'

export default (app: Express) => {
    app.get("/api/v1/guide/:id", async (req, res) => {
        if (!req.params.id) {
            res.status(400).json({success: false, error: "No guide ID provided."});
            return;
        }

        try {
            var guide = await getGuide(req.params.id);
            if (!guide) {
                res.status(404).json({success: false, error: "Guide not found."});
                return;
            }

            await axios.get(guide.file).then((file) => {
                guide.content = file.data;
            })

            res.status(200).json({success: true, guide});
        } catch (err: any) {
            res.status(500).json({success: false, error: err.message});
        }
    });

    return {
        method: "GET",
        route: "/api/v1/guide/:id"
    }
}