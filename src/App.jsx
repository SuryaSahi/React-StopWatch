import { useState, useEffect } from 'react';

function App() {
  const [timer, setTimer] = useState(false);
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    let interval;

    if (timer) {
        // Start the interval if the timer is running
        interval = setInterval(() => {
            // Update count (milliseconds)
            setCount((prev) => {
                if (prev + 1 === 100) {  // If count reaches 100 (i.e., 1 second)
                    setSecond((sec) => (sec + 1 === 60 ? 0 : sec + 1)); // Increase second, reset at 60
                    return 0;  // Reset milliseconds to 0
                }
                return prev + 1;
            });

            // Update seconds
            setSecond((prev) => {
                if (prev + 1 === 60) {  // If seconds reach 60
                    setMinute((min) => (min + 1 === 60 ? 0 : min + 1)); // Increase minute, reset at 60
                    return 0;  // Reset seconds to 0
                }
                return prev;
            });

            // Update minutes
            setMinute((prev) => {
                if (prev + 1 === 60) {  // If minutes reach 60
                    setHour((hr) => hr + 1); // Increase hours
                    return 0;  // Reset minutes to 0
                }
                return prev;
            });
        }, 10); // Run every 10 milliseconds
    } else {
        // Stop the interval when timer is false
        clearInterval(interval);
    }

    // Cleanup function to clear interval when component timer changes
    return () => clearInterval(interval);
}, [timer]);


  return (
    <div className='container'>
      <h1>Dynamic Stop Watch</h1>
      <div className='Timer'>
        <span className='digit' id='hr'>{hour.toString().padStart(2, '0')}</span>
        <span className='txt'>Hr</span>
        <span className='digit' id='min'>{minute.toString().padStart(2, '0')}</span>
        <span className='txt'>Min</span>
        <span className='digit' id='second'>{second.toString().padStart(2, '0')}</span>
        <span className='txt'>Sec</span>
        <span className='digit' id='milli'>{count.toString().padStart(2, '0')}</span>
      </div>

      <div className='Buttons'>
        <button className='btn' id='start' onClick={() => setTimer(true)}>Start</button>
        <button className='btn' id='stop' onClick={() => setTimer(false)}>Stop</button>
        <button className='btn' id='reset' onClick={() => { 
          setTimer(false); 
          setHour(0); 
          setMinute(0); 
          setSecond(0); 
          setCount(0); 
        }}>Reset</button>
      </div>
    </div>
  );
}

export default App;
