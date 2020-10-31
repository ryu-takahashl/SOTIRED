import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

async function Library() {
  const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
  let result = {};
  if (status === 'granted') {
    result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });
  } else if (status === 'denied') {
    result.denied = true;
  }
  return result;
}
export default Library;
