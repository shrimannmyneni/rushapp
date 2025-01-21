import express from 'express';
import dotenv from "dotenv";
import {connectDB} from './config/db.js'; // .js at the end so it doesnt crash out

import Rush from './models/rush.model.js';

dotenv.config();

// starts express app
const app = express();
app.use(express.json());


app.post("/api/rushes", async (request, response) => {
    const rush = request.body;

    const notAllFieldsFilled = !rush.firstName || 
                                !rush.lastName || 
                                !rush.phoneNumber || 
                                !rush.hometownCity || 
                                !rush.hometownState || 
                                !rush.image;

    if (notAllFieldsFilled){
        return response.status(400).json(
            {
            success: false, 
            message: "Please provide every field."
            }
        );
    }

    // if all fields are filled
    const newRush = new Rush(rush);

    try{
        await newRush.save();
        response.status(200).json(
            {
            success: true, 
            data: newRush
            }
        );
    } catch (error) {
        response.status(500).json(
            {
            success: false, 
            message: "Server Error :("
            }
        );
    }
});

app.delete("/api/deleterush", async (request, response) => {
    try {
        const result = await Rush.deleteMany(); // Deletes all documents in the Rush collection
        response.status(200).json({
            success: true,
            message: `Successfully deleted ${result.deletedCount} rushes.`,
        });
    } catch (error) {
        console.error(error);
        response.status(500).json({
            success: false,
            message: "Failed to delete rushes. Server error.",
        });
    }
});

// connection to MongoDB
console.log(process.env.MONGO_URI);
// listens for app on port 4000
app.listen(4000, () => {
    connectDB();
    console.log("Server started at http://localhost:4000");
});
