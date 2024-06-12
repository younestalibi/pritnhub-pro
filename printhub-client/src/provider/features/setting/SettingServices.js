import axiosHttp from "../../../utils/axios-client";
import config from '../../../utils/config'

const getSettings = async () => {
  try {
    const response = await axiosHttp.get(`/setting`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const resetCatalog = async () => {
  try {
    const response = await axiosHttp.post(`/setting/reset`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
const updateSetting= async (setting) => {
  try {
    const response = await axiosHttp.put(`/setting/update`,setting,config);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
// {
//   "phone_number": "123-456-7890",
//   "address": "123 Main St, Anytown, USA",
//   "contact_email": "contact@example.com",
//   "favicon": "/path/to/favicon.ico",
//   "logo": "/path/to/logo.png",
//   "website_name": "My Awesome Website",
//   "social_media_links": {
//     "facebook": "https://facebook.com/myprofile",
//     "twitter": "https://twitter.com/myprofile",
//     "instagram": "https://instagram.com/myprofile"
//   },
//   "whatsapp_chat_url": "https://wa.me/1234567890"
// }


const settingService = {
  getSettings,
  updateSetting,
  resetCatalog
};

export default settingService;
