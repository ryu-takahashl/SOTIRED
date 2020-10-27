import * as ImageManipulator from 'expo-image-manipulator';

async function Manipulator(result) {
  const actions = [];
  actions.push({ resize: { height: 1024, width: 768 } });
  const manipulatorResult = await ImageManipulator.manipulateAsync(
    result.uri,
    actions,
    {
      compress: 0.4,
      base64: true,
    },
  );
  return manipulatorResult;
}

export default Manipulator;
