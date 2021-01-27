import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import db from '../db.json';
import Widget from '../src/components/Widget';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import QuizBackground from '../src/components/QuizBackground';
import QuizLogo from '../src/components/QuizLogo';
import QuizContainer from '../src/components/QuizContainer';
import Button from '../src/components/Button';

import FormField from '../src/components/FormField';

export default function Home() {
  const router = useRouter();
  const [name, setName] = React.useState('');

  return (
    <QuizBackground backgroundImage={db.bg}>
      <Head>
        <title>AluraQuiz - Modelo Base</title>
      </Head>
      <QuizContainer>
        <QuizLogo />
        <Widget>
          <Widget.Header>
            <h1>Imerção React Quiz</h1>
          </Widget.Header>

          <Widget.Content>
            <p>Teste os seus conhecimentos sobre o TEMA e divirta-se criando o seu AluraQuiz!</p>
            <form onSubmit={function (event) {
              event.preventDefault();

              router.push(`/quiz?name=${name}`);
            }}
            >
              <FormField
                placeholder="Diz aí seu nome para começar a jogar"
                // eslint-disable-next-line react/jsx-no-bind
                onChange={function (event) {
                  setName(event.target.value);
                }}
              />
              {/* <input
                onChange={function (event) {
                  // State
                  setName(event.target.value);
                }}
                placeholder="Diz aí seu nome pra jogar :)"
              /> */}
              <Button disabled={name.length === 0} title="Jogar" text="Jogar" />
              {/* <button type="submit" disabled={name.length === 0}>
                Jogar
              </button> */}
            </form>
          </Widget.Content>
        </Widget>
        <Widget>
          <Widget.Content>
            <h1>Quizes da galera</h1>

            <p>Dá uma olhada nesses quizes incríveis que o pessoal da Imersão Alguma coisa fez:</p>
          </Widget.Content>
        </Widget>
        <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/Sotoriva" />
    </QuizBackground>
  );
}
