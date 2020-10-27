import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center',
  },
  helpContainer: {
    marginTop: 15,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    textAlign: 'center',
  },
  image: {
    marginTop: 20,
    alignItems: 'center',
    width: 200,
    height: 200,
  },
  btnarea: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  btn_ghost: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 5,
    width: '49.5%',
    height: 45,
    borderColor: '#199991',
    borderWidth: 1,
  },
  btn_green: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#199991',
    borderRadius: 5,
    width: '49.5%',
    height: 45,
    borderColor: '#199991',
    borderWidth: 1,
    marginLeft: 5,
  },
  btn_gtxt: {
    color: '#199991',
  },
  btn_txt: {
    color: '#fff',
  },
  btn_txtsub: {
    marginTop: 30,
    lineHeight: 25,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '500',
    color: '#129991',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});

export default style;
