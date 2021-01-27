import React from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { FiChevronLeft } from 'react-icons/fi';

import db from '../db.json';
import Widget from '../src/components/Widget';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import QuizBackground from '../src/components/QuizBackground';
import QuizLogo from '../src/components/QuizLogo';
import Button from '../src/components/Button';

export const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`;

export default function QuizPage() {
  const router = useRouter();

  return (
    <QuizBackground backgroundImage={db.bg}>
      <Head>
        <title>Pergunta - 1</title>
      </Head>
      <QuizContainer>
        <QuizLogo />
        <Widget>
          <Widget.Header>
            <FiChevronLeft
              // eslint-disable-next-line react/jsx-no-bind
              onClick={function (event) {
                event.preventDefault();

                router.push('/');
              }}
            />
            <h1>Pergunta 1 de 5</h1>
          </Widget.Header>

          <Widget.Content>
            <p>AQUI VAI A PERGUNTA</p>
            <p>AQUI VAI A DICA</p>
            <p>Alternativa 01</p>
            <p>Alternativa 02</p>
            <p>Alternativa 03</p>
            <p>Alternativa 04</p>
            <Button text="Confirmar" title="Confirmar" />
          </Widget.Content>
        </Widget>
        <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/Sotoriva" />
    </QuizBackground>
  );
}
