/* Amplify Params - DO NOT EDIT
	API_INSPIRATIONALQUOTES_GRAPHQLAPIIDOUTPUT
	API_INSPIRATIONALQUOTES_QUOTEAPPDATATABLE_ARN
	API_INSPIRATIONALQUOTES_QUOTEAPPDATATABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */


/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

// // AWS packages
const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

//Image generation packages
const sharp = require("sharp");
const fetch = require("node-fetch");
const path = require("path");
const fs = require("fs");

//Function update DynamoDB table
async function updateQuoteDDBObject(){
    const quoteTableName = process.env.API_INSPIRATIONALQUOTES_QUOTEAPPDATATABLE_NAME;
    const quoteObjectID = "12232-234234-234234234-234234234";
    try {
        var quoteParams = {
            TableName: quoteTableName,
            Key: {
                "id": quoteObjectID,
            },
            UpdateExpression: "SET #quotesGenerated = #quotesGenerated + :inc",
            ExpressionAttributeValues: {
                ":inc": 1,
            },
            ExpressionAttributeNames: {
                "#quotesGenerated": "quotesGenerated",
            },
            ReturnValues: "UPDATED_NEW"
        };

        const updateQuoteObject = await docClient.update(quoteParams).promise();
        return updateQuoteObject();

    }catch (error) {
        console.log("error updating quote object in DynamoDB", error);
    }
}


async function handler(event) {
    console.log(`EVENT: ${JSON.stringify(event)}`);

    const apiURL = "https://zenquotes.io/api/random";

    //Function to Generate quote image
    async function getRandomQuote(apiURLInput) {
        //My quote is ...
        let quoteText;
        //Auther namer here ...
        let quoteAuthor;
      
        //Valifate response to the api
        const response = await fetch(apiURLInput);
        var quoteData = await response.json(); //turn into json format;
        console.log(quoteData);
      
        //Quote elements
        quoteText = quoteData[0].q;
        quoteAuthor = quoteData[0].a;
      
        //Image construction
        const width = 750;
        const height = 483;
        const text = quoteText;
        const words = text.split(" ");
        const lineBreak = 4;
        let newText = "";
      
        //Define some tSpanElements w/ 4 words each
        let tSpanElements = "";
        for (let i = 0; i < words.length; i++) {
          newText += words[i] + " ";
          if ((i + 1) % lineBreak === 0) {
            tSpanElements += `<tspan x="${width / 2}" dy="1.2em">${newText}</tspan>`;
            newText = "";
          }
        }
        if (newText !== "") {
          tSpanElements += `<tspan x="${width / 2}" dy="1.2em">${newText}</tspan>`;
        }
        console.log(tSpanElements);
      
        //Construct the SVG
        const svgImage = `
          <svg width='${width}' height="${height}">
            <style>
              .title {
                fill: #ffffff;
                font-size: 20px;
                font-weight: bold;
              }
              .quoteAuthorStyles {
                font-size: 35px;
                font-weight: bold;
                padding: 50px;
              }
              .footerStyles {
                font-size: 20px;
                font-weight: bold;
                fill: lightgrey;
                text-anchor: middle;
                font-family: Roboto;
              }
            </style>
            <g>
              <rect x="0" y="0" width="${width}" height="auto"></rect>
              <text
                id="lastLineOfQuote"
                x="375"
                y="120"
                font-family:"Roboto"
                font-size="35"
                fill="white"
                text-anchor="middle"
              >
                ${tSpanElements}
                <tspan class="quoteAuthorStyles" x="375" dy="1.8em">
                  - ${quoteAuthor}
                </tspan>
              </text>
          </g>
            <text x="${width / 2}" y="${height - 10}" class="footerStyles">Developed by Jianghua Lu</text>
          </svg>
        `;
      
        //Add background images for the svg creation
        const backgroundImages = [
          "backgrounds/Broken-Hearts.png",
          "backgrounds/Cool-Sky.png",
          "backgrounds/Dark-Ocean.png",
          "backgrounds/MegaTron.png",
          "backgrounds/Dusk.png",
          "backgrounds/Honey-Dew.png",
          "backgrounds/Dark-Skies.png",
          "backgrounds/Orca.png",
          "backgrounds/Sha-la-la.png",
          "backgrounds/Under-the-Lake.png",
        ];
        const randomId = Math.floor(Math.random() * backgroundImages.length);
        const selectBackgroundImages = backgroundImages[randomId];
      
        //Composite text and background together
        const timestamp = new Date().toLocaleTimeString().replace(/[^\d]/g, "");
        const svgBuffer = Buffer.from(svgImage);
        
        // const imagePath = '/tmp' + '/quote-card.png';
        const imagePath = path.join('/tmp', 'quote-card.png');
        const image = await sharp(selectBackgroundImages)
          .composite([
            {
              input: svgBuffer,
              top: 0,
              left: 0,
            },
          ])
        //   .toFile(`finals/quote-card_${timestamp}.png`);
        .toFile(imagePath);

        //Function to Update DynamoDB object in table
        try {
            updateQuoteDDBObject();
          } catch (error) {
            console.log('error updating quote object in DynamoDB', error)
          }
          return {
            statusCode: 200,
        //  Uncomment below to enable CORS requests
         headers: {
            "Content-Type": "image/png",
            "Access-Control-Allow-Origin": "*",
            //  "Access-Control-Allow-Headers": "*"
         },
            // body: JSON.stringify('Hello from Lambda!'),
            body: fs.readFileSync(imagePath).toString('base64'),
            isBase64Encoded: true,
        };
      }
      return await getRandomQuote(apiURL);
}

module.exports.handler = handler; 