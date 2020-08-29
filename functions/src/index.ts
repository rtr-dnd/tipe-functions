import * as functions from 'firebase-functions';

import * as admin from 'firebase-admin'
admin.initializeApp();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const db = admin.firestore()

export const documentWriteListener = 
    functions.firestore.document('/ver2users/{userId}/tipes/{docId}')
    .onWrite((change, context) => {
      const FieldValue = admin.firestore.FieldValue
      const userId = context.params.userId
      const metaRef = '/ver2users/'+userId+'/tipes/meta'

    if (!change.before.exists) {
        // New document Created : add one to count

        //tslint:disable-next-line
        db.doc(metaRef).update({numberOfDocs: FieldValue.increment(1)});
    } else if (change.before.exists && change.after.exists) {
        // Updating existing document : Do nothing

    } else if (!change.after.exists) {
        // Deleting document : subtract one from count

        //tslint:disable-next-line
        db.doc(metaRef).update({numberOfDocs: FieldValue.increment(-1)});

    }

return;
});