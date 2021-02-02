// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { motion } from 'framer-motion';

import db from '../db.json';
import Widget from '../src/components/Widget';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import QuizBackground from '../src/components/QuizBackground';
import QuizLogo from '../src/components/QuizLogo';
import QuizContainer from '../src/components/QuizContainer';
import Button from '../src/components/Button';

import Input from '../src/components/Input';
import Link from '../src/components/Link';

export default function Home() {
  const router = useRouter();
  const [name, setName] = React.useState('');

  return (
    <QuizBackground backgroundImage={db.bg}>
      <Head>
        <title>Tomorrowland Quiz</title>
      </Head>
      <QuizContainer>
        <QuizLogo />
        <Widget
          as={motion.section}
          transition={{ delay: 0, duration: 0.5 }}
          variants={{
            show: { opacity: 1, x: '0' },
            hidden: { opacity: 0, x: '-100%' },
          }}
          initial="hidden"
          animate="show"
        >
          <Widget.Header>
            <h1>{db.title}</h1>
          </Widget.Header>

          <Widget.Content>
            <p>{db.description}</p>
            <form onSubmit={(event) => {
              event.preventDefault();

              router.push(`/quiz?name=${name}`);
            }}
            >
              <Input
                placeholder="Diz aí seu nome para começar a jogar"
                onChange={(event) => setName(event.target.value)}
                name="nome do jogador"
                value={name}
              />
              <Button title="Jogar" type="submit" disabled={name.length === 0}>
                Jogar
              </Button>
            </form>
          </Widget.Content>
        </Widget>
        <Widget
          as={motion.section}
          transition={{ delay: 0.2, duration: 0.5 }}
          variants={{
            show: { opacity: 1, x: '0' },
            hidden: { opacity: 0, x: '-100%' },
          }}
          initial="hidden"
          animate="show"
        >
          <Widget.Content>
            <h2>Quizes da galera</h2>

            <p>Dá uma olhada nesses quizes incríveis que o pessoal da Imersão Alguma coisa fez:</p>
            <ul>
              {db.external.map((linkExterno) => {
                const [projectName, githubUser] = linkExterno
                  .replace(/\//g, '')
                  .replace('https:', '')
                  .replace('.vercel.app', '')
                  .split('.');

                return (
                  <li key={linkExterno}>
                    <Widget.Topic as={Link} href={`/quiz/${projectName}___${githubUser}`}>
                      {`${githubUser}/${projectName}`}
                    </Widget.Topic>
                  </li>
                );
              })}
            </ul>
          </Widget.Content>
        </Widget>
        <Footer
          as={motion.footer}
          transition={{ delay: 0.4, duration: 0.5 }}
          variants={{
            show: { opacity: 1, x: '0' },
            hidden: { opacity: 0, x: '-100%' },
          }}
          initial="hidden"
          animate="show"
        />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/Sotoriva" />
    </QuizBackground>
  );
}

// "secondary": "#ff6d00"
