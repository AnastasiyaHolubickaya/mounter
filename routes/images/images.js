import { Router } from 'express';
import axios from 'axios';

const router = Router();

router.get('/curated', async (req, res) => {
  try {
    const { page, per_page } = req.query;

    const response = await axios.get('https://api.pexels.com/v1/curated', {
      headers: {
        Authorization:
          '8PSieWtK09vlW7mlJ8qJVS3W3CpKYLMlNCOvKD6Zz4UKfptt8sxHWF2G',
      },
      params: {
        per_page: per_page,
        page: page,
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching Pexels images:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
