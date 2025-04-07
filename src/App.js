import React, { useState, useEffect, useRef } from 'react';
import { MuiColorInput } from 'mui-color-input';
import Button from '@mui/material/Button';

function App() {
  let currentCordsX;
  let currentCordsY;
  const speed = 10;
  const [playerX, setPlayerX] = useState(100);
  const [playerY, setPlayerY] = useState(100);
  const [toggleScroll, setToggleScroll] = useState(true);
  const [paintedElement, setPaintedElement] = useState([]);
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth - 200,
    height: window.innerHeight - 200
  });
  const [color, setColor] = React.useState('maroon');
  const parentCanvas = useRef(null);

  useEffect(() => {
    window.addEventListener('resize', function (event) {
      setDimensions({
        width: window.innerWidth - 200,
        height: window.innerHeight - 200
      });
    }, true);
  }, [window.innerWidth, window.innerHeight]);

  useEffect(() => {
    currentCordsX = playerX;
    currentCordsY = playerY;
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [playerX, playerY]);

  function handleXDown() {
    setPaintedElement(prev => [...prev, <div key={prev.length} style={{ position: 'absolute', top: currentCordsY, left: currentCordsX, width: 50, height: 50, backgroundColor: color, zIndex: prev.length }} />]);
    localStorage.setItem('painted Elements', paintedElement);
  }

  const handleClearScreen = () => {
    setPaintedElement([]);
  }

  const handleKeyDown = (e) => {
    switch (e.key) {
      case 'ArrowUp':
        setPlayerY((y) => Math.max(y - speed, 0));
        break;
      case 'ArrowDown':
        setPlayerY((y) => y + speed > dimensions.height - 50 ? dimensions.height - 50 : y + speed);
        break;
      case 'ArrowLeft':
        setPlayerX((x) => Math.max(x - speed, 0));
        break;
      case 'ArrowRight':
        setPlayerX((x) => x + speed > dimensions.width - 50 ? dimensions.width - 50 : x + speed);
        break;
      case 'x':
        handleXDown();
        break;
      default:
        break;
    }
  };

  function handleStopScroll() {
    setToggleScroll(!toggleScroll);
    !toggleScroll ? document.body.style.overflow = "auto" : document.body.style.overflow = "hidden";
  }

  return (
    <div>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
      }}>
        <MuiColorInput style={{ marginTop: 50, backgroundColor: '#fff', borderRadius: 4, height: 'fit-content' }} format="hex" value={color} onChange={(e) => setColor(e)} />
      </div>
      <div
        id='main-screen'
        style={{
          width: window.innerWidth - 15,
          height: window.innerHeight,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          backgroundColor: '#000',
          overflow: 'hidden'
        }}
      >
        <div
          ref={parentCanvas}
          style={{
            backgroundColor: 'pink',
            position: 'relative',
            width: dimensions.width,
            height: dimensions.height
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: playerY,
              left: playerX,
              width: 50,
              height: 50,
              backgroundColor: color,
            }}
          />
          {
            paintedElement && paintedElement.length > 0 ? paintedElement.map((e) => {
              return e;
            }) : ''
          }
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Button style={{
            marginTop: 20,
            marginBottom: 50,
            backgroundColor: '#fff',
            color: '#000'
          }} onClick={handleStopScroll}>{toggleScroll ? 'DISABLE SCROLL' : 'ENABLE SCROLL'}</Button>
          <Button style={{
            marginTop: 20,
            marginBottom: 50,
            marginLeft: 20,
            backgroundColor: '#fff',
            color: '#000'
          }} onClick={handleClearScreen}>CLEAR SCREEN</Button>

        </div>
      </div>
    </div>
  );
}

export default App;
