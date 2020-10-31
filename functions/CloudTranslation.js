import axios from 'axios';
import Constant from 'app/config/Constant';
import { ENV } from 'app/config/Env';

const { cloudTranslationApiKey } = ENV;

async function CloudTranslation(description: string) {
  // POST
  const response = await axios.post(`${Constant.CLOUD_TRANSLATION_URL + cloudTranslationApiKey}&q=${encodeURI(description)}&target=ja`);
  // 翻訳されたテキスト
  const { translatedText } = response.data.data.translations[0];
  return translatedText;
}

export default CloudTranslation;
