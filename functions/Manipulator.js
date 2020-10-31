import * as ImageManipulator from 'expo-image-manipulator';

async function Manipulator(result) {
  const actions = [];
  actions.push({ resize: { height: 768, width: 768 } });
  const manipulatorResult = await ImageManipulator.manipulateAsync(
    result.uri,
    actions,
    {
      compress: 1,
      base64: true,
    },
  );
  return manipulatorResult;
}

export default Manipulator;
