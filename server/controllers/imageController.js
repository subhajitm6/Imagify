import userModel from '../models/userModel.js';
import FormData from 'form-data'
import axios from 'axios'

const generateImage = async (req, res) => {
    try {
        const { prompt, size = '512x512', userId } = req.body;

        if (!prompt) {
            return res.json({
                success: false,
                message: "Please provide a prompt"
            });
        }

        // Check if user has enough credits
        const user = await userModel.findById(userId);
        if (!user || user.credits <= 0) {
            return res.json({
                success: false,
                message: "Insufficient credits",
                credits: user.credits
            });
        }

        const formdata = new FormData()
        formdata.append('prompt', prompt);

        const {data} = await axios.post('https://clipdrop-api.co/text-to-image/v1', formdata, {
            headers: {
                'x-api-key': process.env.CLIPDROP_API
              },
              responseType: 'arraybuffer'
        })

        const base64Image = Buffer.from(data, 'binary').toString('base64')
        const resultImage = `data:image/png;base64,${base64Image}`

        await userModel.findByIdAndUpdate(user._id,{credits: user.credits-1})

        res.json({
            success:true,
            message: "Image Generated",
            credits: user.credits-1,
            resultImage
        })

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message
        });
    }
};

export { generateImage };
