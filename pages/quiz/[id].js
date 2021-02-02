import React from 'react';
import { ThemeProvider } from 'styled-components';
import PropTypes from 'prop-types';

import QuizScreen from '../../src/screens/quiz';

export default function QuizDaGaleraPage({ dbExterno }) {
  return (
    <ThemeProvider theme={dbExterno.theme}>
      <QuizScreen
        externalQuestions={dbExterno.questions}
        externalBg={dbExterno.bg}
        externalTitle={dbExterno.title}
      />
    </ThemeProvider>
  );
}

QuizDaGaleraPage.propTypes = {
  dbExterno: PropTypes.exact({
    title: PropTypes.string,
    theme: PropTypes.object,
    questions: PropTypes.array,
    bg: PropTypes.string,
  }).isRequired,
};

export async function getServerSideProps(context) {
  const [projectName, githubUser] = context.query.id.split('___');

  try {
    const dbExterno = await fetch(`https://${projectName}.${githubUser}.vercel.app/api/db`)
      .then((respostaDoServer) => {
        if (respostaDoServer.ok) {
          return respostaDoServer.json();
        }
        throw new Error('Falha em pegar os dados');
      })
      .then((respostaConvertidaEmObjeto) => respostaConvertidaEmObjeto);
    return {
      props: {
        dbExterno,
      },
    };
  } catch (err) {
    throw new Error(err);
  }
}
