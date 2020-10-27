import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

async function Library() {
  const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
  if (status === 'granted') {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });
    return result;
  }
}
export default Library;
