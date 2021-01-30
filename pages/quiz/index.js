import React from 'react';
import PropTypes from 'prop-types';
// import '@lottiefiles/lottie-player';

import db from '../../db.json';
import Widget from '../../src/components/Widget';
import GitHubCorner from '../../src/components/GitHubCorner';
import QuizBackground from '../../src/components/QuizBackground';
import QuizLogo from '../../src/components/QuizLogo';
import Button from '../../src/components/Button';
import QuizContainer from '../../src/components/QuizContainer';
import AlternativesForm from '../../src/components/AlternativesForm';
import BackLinkArrow from '../../src/components/BackLinkArrow';
import HomeLink from '../../src/components/HomeLink';

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
        <div style={{ padding: '20px' }}>
          <Button text="Voltar para o início" title="Voltar para o início" />
          <HomeLink href="/" />
        </div>
      </Widget.Content>
    </Widget>
  );
}

ResultWidget.propTypes = {
  results: PropTypes.string.isRequired,
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
        <h3>
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

          <Button text="Confirmar" title="Confirmar" type="submit" disabled={!hasAlternativeSelected} />

          {/* <p>
            selectedAlternative:
            {selectedAlternative}
          </p> */}
          {isQuestionSubmited && isCorrect && (
            <Widget.Content>
              <lottie-player
                autoplay
                src="https://assets7.lottiefiles.com/packages/lf20_oaw8d1yt.json"
                style={{
                  width: '50%',
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
  question: PropTypes.string.isRequired,
  questionIndex: PropTypes.string.isRequired,
  totalQuestions: PropTypes.string.isRequired,
  onSubmit: PropTypes.string.isRequired,
  addResult: PropTypes.string.isRequired,
};

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};

export default function QuizPage() {
  const [screenState, setScreenState] = React.useState(screenStates.LOADING);
  // const [screenState, setScreenState] = React.useState(screenStates.RESULT);
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
