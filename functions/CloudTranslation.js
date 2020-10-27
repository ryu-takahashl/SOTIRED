import { ENV } from 'app/config/Env';
import axios from 'axios';
import Constant from 'app/config/Constant';

const { cloudTranslationApiKey } = ENV;

async function CloudTranslation(description: string) {
  try {
    const response = await axios.post(`${Constant.CLOUD_TRANSLATION_URL + cloudTranslationApiKey}&q=${encodeURI(description)}&target=ja`);
    const { translatedText } = response.data.data.translations[0];
    return translatedText;
  } catch (error) {
    console.error(error);
  }
}

export default CloudTranslation;
