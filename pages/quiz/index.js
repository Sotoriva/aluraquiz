import React from 'react';
import PropTypes from 'prop-types';
import '@lottiefiles/lottie-player';

import db from '../../db.json';
import Widget from '../../src/components/Widget';
import GitHubCorner from '../../src/components/GitHubCorner';
import QuizBackground from '../../src/components/QuizBackground';
import QuizLogo from '../../src/components/QuizLogo';
import Link from '../../src/components/Link';
import Button from '../../src/components/Button';
import QuizContainer from '../../src/components/QuizContainer';
import AlternativesForm from '../../src/components/AlternativesForm';
import BackLinkArrow from '../../src/components/BackLinkArrow';

function ResultWidget({ results }) {
  return (
    <Widget>
      <Widget.Header>
        Tela de resultado:
      </Widget.Header>

      <Widget.Content>
        <p>
          {`Você acertou ${results.filter((x) => x).length} perguntas!`}
        </p>
        {results.map((result, index) => (
          <Widget.Result key={`result__${result}`}>
            <lottie-player
              autoplay
              src={result === true ? 'https://assets7.lottiefiles.com/packages/lf20_oaw8d1yt.json' : 'https://assets5.lottiefiles.com/packages/lf20_y8t1nosz.json'}
              style={{ width: '35px', height: '35px' }}
            />
            {`#${index + 1} ${result ? 'Você acertou!' : 'Alternativa correta: '}${result ? '' : ''}`}
          </Widget.Result>
        ))}
        <Link href="/">
          <svg height="20px" width="20px" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
            <path fill="#ffffff" d="m498.195312 222.695312c-.011718-.011718-.023437-.023437-.035156-.035156l-208.855468-208.847656c-8.902344-8.90625-20.738282-13.8125-33.328126-13.8125-12.589843 0-24.425781 4.902344-33.332031 13.808594l-208.746093 208.742187c-.070313.070313-.140626.144531-.210938.214844-18.28125 18.386719-18.25 48.21875.089844 66.558594 8.378906 8.382812 19.445312 13.238281 31.277344 13.746093.480468.046876.964843.070313 1.453124.070313h8.324219v153.699219c0 30.414062 24.746094 55.160156 55.167969 55.160156h81.710938c8.28125 0 15-6.714844 15-15v-120.5c0-13.878906 11.289062-25.167969 25.167968-25.167969h48.195313c13.878906 0 25.167969 11.289063 25.167969 25.167969v120.5c0 8.285156 6.714843 15 15 15h81.710937c30.421875 0 55.167969-24.746094 55.167969-55.160156v-153.699219h7.71875c12.585937 0 24.421875-4.902344 33.332031-13.808594 18.359375-18.371093 18.367187-48.253906.023437-66.636719zm0 0" />
          </svg>
          Voltar para o início
        </Link>
      </Widget.Content>
    </Widget>
  );
}

ResultWidget.propTypes = {
  results: PropTypes.arrayOf(PropTypes.array).isRequired,
};

function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>
        Carregando...
      </Widget.Header>

      <Widget.Content>
        <lottie-player
          autoplay
          loop
          src="https://assets3.lottiefiles.com/packages/lf20_ZeRz5S.json"
          style={{
            width: '100%',
          }}
        />
      </Widget.Content>
    </Widget>
  );
}

function QuestionWidget({
  question,
  questionIndex,
  totalQuestions,
  onSubmit,
  addResult,
}) {
  const questionId = `question__${questionIndex}`;
  const [selectedAlternative, setSelectedAlternative] = React.useState();
  const isCorrect = selectedAlternative === question.answer;
  const [isQuestionSubmited, setIsQuestionSubmited] = React.useState(false);
  const hasAlternativeSelected = selectedAlternative !== undefined;

  return (
    <Widget>
      <Widget.Header>
        <BackLinkArrow href="/" />
        <h3 style={{ paddingLeft: '10px' }}>
          {`Pergunta ${questionIndex + 1} de ${totalQuestions}`}
        </h3>
      </Widget.Header>

      <img
        alt="Descrição"
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover',
        }}
        src={question.image}
      />

      <Widget.Content>
        <h2>{question.title}</h2>
        <p>{question.description}</p>

        <AlternativesForm onSubmit={(event) => {
          event.preventDefault();

          setIsQuestionSubmited(true);
          setTimeout(() => {
            addResult(isCorrect);
            onSubmit();
            setIsQuestionSubmited(false);
            setSelectedAlternative(undefined);
          }, 2 * 1000);
        }}
        >
          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative__${alternativeIndex}`;
            const alternativeStatus = isCorrect ? 'SUCESS' : 'ERROR';
            const isSelected = selectedAlternative === alternativeIndex;

            return (
              <Widget.Topic
                as="label"
                htmlFor={alternativeId}
                key={alternativeId}
                data-selected={isSelected}
                data-status={isQuestionSubmited && alternativeStatus}
              >
                <input
                  style={{ display: 'none' }}
                  id={alternativeId}
                  name={questionId}
                  type="radio"
                  onChange={() => setSelectedAlternative(alternativeIndex)}
                />
                {alternative}
              </Widget.Topic>
            );
          })}

          <Button title="Confirmar" type="submit" disabled={!hasAlternativeSelected}>
            Confirmar
          </Button>
          {isQuestionSubmited && isCorrect && (
            <Widget.Content>
              <lottie-player
                autoplay
                src="https://assets7.lottiefiles.com/packages/lf20_oaw8d1yt.json"
                style={{
                  width: '50%',
                  height: '50%',
                }}
              />
            </Widget.Content>
          )}
          {isQuestionSubmited && !isCorrect && (
            <Widget.Content>
              <lottie-player
                autoplay
                src="https://assets5.lottiefiles.com/packages/lf20_y8t1nosz.json"
                style={{
                  width: '50%',
                }}
              />
            </Widget.Content>
          )}
        </AlternativesForm>
      </Widget.Content>
    </Widget>
  );
}

QuestionWidget.propTypes = {
  question: PropTypes.func.isRequired,
  questionIndex: PropTypes.number.isRequired,
  totalQuestions: PropTypes.number.isRequired,
  onSubmit: PropTypes.func.isRequired,
  addResult: PropTypes.func.isRequired,
};

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};

export default function QuizPage() {
  const [screenState, setScreenState] = React.useState(screenStates.LOADING);
  const [results, setResults] = React.useState([]);
  const totalQuestions = db.questions.length;
  const [currentQuestion, setCurrentQuestionIndex] = React.useState(0);
  const questionIndex = currentQuestion;
  const question = db.questions[questionIndex];

  function addResult(result) {
    setResults([
      ...results,
      result,
    ]);
  }

  React.useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1 * 1000);
  }, []);

  function handleSubmit() {
    const nextQuestion = questionIndex + 1;
    if (nextQuestion < totalQuestions) {
      setCurrentQuestionIndex(nextQuestion);
    } else {
      setScreenState(screenStates.RESULT);
    }
  }

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />

        {screenState === screenStates.QUIZ && (
          <QuestionWidget
            question={question}
            totalQuestions={totalQuestions}
            questionIndex={questionIndex}
            onSubmit={handleSubmit}
            addResult={addResult}
          />
        )}

        {screenState === screenStates.LOADING && <LoadingWidget />}

        {screenState === screenStates.RESULT && <ResultWidget results={results} />}

      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/Sotoriva" />
    </QuizBackground>
  );
}
