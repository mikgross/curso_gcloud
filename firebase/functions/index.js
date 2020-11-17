


const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors');

admin.initializeApp();
const firestore = admin.firestore();

const corsCheck = cors({
    origin: [ 'http://127.0.0.1:8080' ],
    methods: 'POST',
    credentials: true
});

exports.writeDB = functions.https.onRequest( async (request, response) => {
    corsCheck(request, response, async () => {
        const result = await firestore.collection('httpEvents').doc().create({
            message: 'event received from http',
            timestamp: new Date().toISOString()
        });
    
        if (result) {
            response.send({
                success: true,
                data: result
            });
        } else {
            response.send({
                success: false,
                data: null
            });
        }
    });
});

exports.writeDbSdk = functions.https.onCall( async (data, context) => {
    console.log(data);
    console.log(context);

    if (!context.auth) {
        return { success: false, data: null };
    } else {
        const result = await firestore.collection('httpEvents').doc().create({
            message: 'event received from our app authenticated',
            auth: context.auth.uid,
            timestamp: new Date().toISOString()
        });
        return { success: true, data: result };
    }
});
