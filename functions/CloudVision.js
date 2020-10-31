import axios from 'axios';
import Constant from 'app/config/Constant';
import { ENV } from 'app/config/Env';

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
  // POST
  const response = await axios.post(Constant.CLOUD_VISION_URL + cloudVisonApiKey,
    body, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  const { data } = response;
  // 検出されたテキスト
  const { description } = data.responses[0].textAnnotations[0];
  return description;
}

export default CloudVision;
