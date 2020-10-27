import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

async function Camera() {
  const { status } = await Permissions.askAsync(Permissions.CAMERA);
  if (status === 'granted') {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });
    return result;
  }
}

export default Camera;
