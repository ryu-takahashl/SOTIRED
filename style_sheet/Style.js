import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
  getStartedContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 50,
  },
  getStartedText: {
    fontSize: 15,
    lineHeight: 24,
    textAlign: 'center',
    fontFamily: 'Inter_500Medium',
  },
  image: {
    marginTop: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    width: 220,
    height: 220,
  },
  btnarea: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    flex: 1.0,
    alignSelf: 'center',
    justifyContent: 'center',
    width: '97%',
    margin: 1,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '100%',
  },
  grediant: {
    height: '48%',
    width: '48%',
    justifyContent: 'center',
  },
  grediant_right: {
    height: '48%',
    width: '48%',
    justifyContent: 'center',
    marginLeft: '7%',
  },
  text: {
    fontFamily: 'Inter_700Bold',
    textAlign: 'center',
  },
  translating: {
    paddingTop: 10,
    fontFamily: 'Inter_500Medium',
  },
  box: {
    shadowColor: '#000',
    borderColor: '#F5ECF0',
    borderBottomWidth: 1,
  },
  itemList: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingRight: 16,
    paddingBottom: 10,
    paddingLeft: 16,
    position: 'relative',
    height: 150,
  },
  itemImg: {
    marginRight: 16,
    position: 'relative',
    height: 130,
    width: 130,
  },
  itemText: {
    fontFamily: 'Inter_400Regular',
    textAlign: 'center',
  },
  itemDate: {
    fontSize: 12,
    fontFamily: 'Inter_700Bold',
    textAlign: 'right',
    marginTop: 5,
  },
  modalText: {
    fontFamily: 'Inter_500Medium',
    marginLeft: 10,
    marginRight: 10,
    textAlign: 'center',
  },
  modalClose: {
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center',
    fontFamily: 'Inter_700Bold',
  },
  delete: {
    fontFamily: 'Inter_700Bold', lineHeight: 50, textAlign: 'center',
  },
});

export default style;
