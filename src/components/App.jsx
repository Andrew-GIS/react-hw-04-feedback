import { useState } from 'react';
import  FeedbackButtons from './feedbackButtons';
import StatisticBox from './statistic';
import  Notification from './Notification';
import { Section } from './section/Section';

export function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  // state = {
  //   good: 0,
  //   neutral: 0,
  //   bad: 0,
  // }

  // handleFeedback = (value) => {
  //   //  console.log('value :>> ', value);
  //   this.setState(prevState => {
  //     return { [ value ]: prevState[ value ] + 1 };
  //   });
  // }

  const handleFeedback = (value) => {
    console.log('value :>> ', value);
    switch (value) {
      case ("good"): {
        //console.log('You are in GOOD state :>> ');
        setGood((good) => good + 1);
        return;
      }
      case ("neutral"): {
        //console.log('You are in NEUTRAL state :>> ');
        setNeutral((neutral) => neutral + 1);
        return;
      }
      case ("bad"): {
        //console.log('You are in BAD state :>> ');
        setBad((bad) => bad + 1);
        return;
      }
      default: {
        alert("Error in Application");
        }
    }
  }

  const reset = () => {
    setGood(0);
    setNeutral(0);
    setBad(0);
  }
  
  const countTotalFeedback = () => {
    const feedbackSum = good + neutral + bad;
    return feedbackSum;
  }

  const countPositiveFeedbackPercentage = () => {
    const feedbackSum = countTotalFeedback();
    const goodFedbacksNumber = good;
    const positiveFeedbacksPersents = Math.round( goodFedbacksNumber / feedbackSum * 100 );
    return positiveFeedbacksPersents;
  }
  
    const options = ["good", "neutral", "bad"];
    const posFedbacks = countPositiveFeedbackPercentage();
   
    return (
      <>
        <Section title='Leave your feedback'>
          <FeedbackButtons
            options={options}
            onLeaveFeedback={handleFeedback}
            onReset={reset} />
        </Section>

        <Section title='Statistic'>
            {countTotalFeedback() === 0
            ? (<Notification message='No feedback given' />)
            :(<StatisticBox
              good={good}
              bad={bad}
              neutral={neutral}
              total={countTotalFeedback()}
              positiveFeedbacks={(Number.isNaN(posFedbacks) || 0) ? 0 : posFedbacks}/>)}
          </Section>
      </>
    )
}