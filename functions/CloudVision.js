import { ENV } from 'app/config/Env';
import axios from 'axios';
import Constant from 'app/config/Constant';

const { cloudVisonApiKey } = ENV;

async function CloudVision(img: string) {
  const body = JSON.stringify({
    requests: [
      {
        features: [{ type: 'TEXT_DETECTION', maxResults: 1 }],
        image: {
          content: img.base64,
        },
      },
    ],
  });
  try {
    const response = await axios.post(Constant.CLOUD_VISION_URL + cloudVisonApiKey,
      body, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
    const { data } = response;
    const { description } = data.responses[0].textAnnotations[0];
    return description;
  } catch (error) {
    console.error(error);
  }
}

export default CloudVision;
