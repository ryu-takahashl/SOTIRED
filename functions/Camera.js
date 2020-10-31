import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

async function Camera() {
  const { status } = await Permissions.askAsync(Permissions.CAMERA);
  let result = {};
  if (status === 'granted') {
    result = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });
  } else if (status === 'denied') {
    result.denied = true;
  }
  return result;
}

export default Camera;
