import React, { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";

// Components:
import {
  GradientBackgroundCon,
  BackgroundImageFireWorks1,
  BackgroundImageFireWorks,
  FooterCon,
  FooterLink,
  QuoteGeneratorCon,
  QuoteGeneratorInnerCon,
  QuoteGeneratorTitle,
  QuoteGeneratorSubTitle,
  QuoteButton,
  QuoteButtonText,
} from "@/components/QuoteGenerator/QuoteGeneratorElements";

//Assets:
import Moon from "../assets/moon.png";
import Fireworks from "../assets/fireworks.png";
import Fireworks1 from "../assets/firework1.png";

export default function Home() {
  const [numberOfQuotes, setNumberOfQuotes] = useState<Number | null>(0);

  return (
    <>
      <Head>
        <title>Inspirational Quote Generator</title>
        <meta name="description" content="A fun project to generate quotes" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Backgrounds */}
      <GradientBackgroundCon>
        {/* Quote Generator Modal Pop*/}
        {/* <QuoteGeneratorModal></QuoteGeneratorModal> */}

        {/* Quote Generator */}
        <QuoteGeneratorCon>
          <QuoteGeneratorInnerCon>
            <QuoteGeneratorTitle>
              Daily Inspirational Quotes
            </QuoteGeneratorTitle>
            <QuoteGeneratorSubTitle>
              Get your quote card with a random inspirational quote provided by {' '}
              <FooterLink
                href="https://zenquotes.io/"
                target="_blank"
                rel="noopener noreferrer"
              >
                ZenQuotes API
              </FooterLink>
              .
            </QuoteGeneratorSubTitle>
            <QuoteButton>
              <QuoteButtonText onClick={null}>
                Make a Quote
              </QuoteButtonText>
            </QuoteButton>
          </QuoteGeneratorInnerCon>
        </QuoteGeneratorCon>

        {/* Background Images */}
        
        {/* <BackgroundImageMoon src={Moon} height="200" alt="moonbackground" /> */}
        <BackgroundImageFireWorks
          src={Fireworks}
          height="500"
          alt="fireworksbackground"
        />
        <BackgroundImageFireWorks1
          src={Fireworks1}
          height="500"
          alt="fireworksbackground"
        />
        {/* Footer */}
        <FooterCon>
          <>
            Quotes Generated: {numberOfQuotes}
            <br />
            Developed by{" "}
            <FooterLink
              href="https://www.linkedin.com/in/jianghua-lu-0310651a8/"
              target="_blank"
              rel="noopener noreferrer"
            >
              @Jianghua Lu
            </FooterLink>
          </>
        </FooterCon>
      </GradientBackgroundCon>
    </>
  );
}
