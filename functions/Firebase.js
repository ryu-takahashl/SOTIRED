import firebase from 'firebase';
import 'firebase/firestore';

export default {
  // Storageに保存
  async uploadFile(image) {
    const ext = image.split('.').slice(-1)[0];
    const path = `images/${this.uid}/${Date.now().toString()}.${ext}`;
    return new Promise(async (resolve, reject) => {
      const blob = await fetch(image).then((response) => response.blob());
      const ref = firebase.storage().ref(path);
      const unsubscribe = ref.put(blob).on('state_changed',
        (state) => { },
        (err) => {
          unsubscribe();
          reject(err);
        },
        async () => {
          unsubscribe();
          const url = await ref.getDownloadURL();
          resolve(url);
        });
    });
  },
  // itemコレクションに保存
  async addItem(img, text) {
    try {
      await this.itemsCollection.add({
        img,
        uid: this.uid,
        text,
        created_at: new Date(),
      });
      return true;
    } catch ({ message }) {
      return { error: message };
    }
  },

  // itemsコレクションから取得
  async getItems(cursor = null, num = 5) {
    let ref = this.itemsCollection
      .where('uid', '==', this.uid)
      .orderBy('created_at', 'desc')
      .limit(num);
    try {
      if (cursor) {
        ref = ref.startAfter(cursor);
      }

      const querySnapshot = await ref.get();
      const data = [];
      await Promise.all(querySnapshot.docs.map(async (doc) => {
        if (doc.exists) {
          const item = doc.data() || {};
          data.push({
            id: doc.id,
            ...item,
          });
        }
      }));
      const lastVisible = querySnapshot.docs.length > 0
        ? querySnapshot.docs[querySnapshot.docs.length - 1]
        : null;

      return { data, cursor: lastVisible };
    } catch ({ message }) {
      return { error: message };
    }
  },

  // itemコレクション
  get itemsCollection() {
    return firebase.firestore().collection('items');
  },

  // ログインユーザーのuid
  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  },
};
