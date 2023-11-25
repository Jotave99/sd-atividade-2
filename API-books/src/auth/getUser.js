import {OAuth2Client} from 'google-auth-library';

export async function getGoogleUser(token){
    const client = new OAuth2Client();

    const ticket = await client.verifyIdToken({
          idToken: token,
          audience: "1026815510927-1kjc1le4itbulrpukr1ar85u5gtlgaqb.apps.googleusercontent.com",  // Specify the CLIENT_ID of the app that accesses the backend
          // Or, if multiple clients access the backend:
          //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
    const userid = payload['sub'];

    return payload;
}