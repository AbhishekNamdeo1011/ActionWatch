import nodemailer from "nodemailer";
import { google } from "googleapis";
import config from "./config.js";

const oauth2Client = new google.auth.OAuth2(
    config.GOOGLE_CLIENT_ID,
    config.GOOGLE_CLIENT_SECRET
);

oauth2Client.setCredentials({
    refresh_token: config.GOOGLE_REFRESH_TOKEN,
});

export const createTransporter = async () => {

    const accessTokenResponse =
        await oauth2Client.getAccessToken();

    const accessToken = accessTokenResponse.token;

    return nodemailer.createTransport({

        service: "gmail",

        auth: {

            type: "OAuth2",

            user: config.EMAIL_USER,

            clientId: config.GOOGLE_CLIENT_ID,

            clientSecret: config.GOOGLE_CLIENT_SECRET,

            refreshToken: config.GOOGLE_REFRESH_TOKEN,

            accessToken,

        },

    });

};
