import React, { useState, useEffect } from 'react';
import { MuiColorInput } from 'mui-color-input';
import Button from '@mui/material/Button';

function App() {
  const [playerX, setPlayerX] = useState(100);
  const [playerY, setPlayerY] = useState(100);
  const [toggleScroll, setToggleScroll] = useState(true);
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth - 200,
    height: window.innerHeight - 200
  });
  const [color, setColor] = React.useState('maroon');

  const speed = 10;

  useEffect(() => {
    window.addEventListener('resize', function (event) {
      setDimensions({
        width: window.innerWidth - 200,
        height: window.innerHeight - 200
      });
    }, true);
  }, [window.innerWidth, window.innerHeight]);

  const handleKeyDown = (e) => {
    switch (e.key) {
      case 'ArrowUp':
        setPlayerY((y) => Math.max(y - speed, 0));
        break;
      case 'ArrowDown':
        console.log(playerY, dimensions.height);
        setPlayerY((y) => y + speed > dimensions.height - 50 ? dimensions.height - 50 : y + speed);
        break;
      case 'ArrowLeft':
        setPlayerX((x) => Math.max(x - speed, 0));
        break;
      case 'ArrowRight':
        setPlayerX((x) => x + speed > dimensions.width - 50 ? dimensions.width - 50 : x + speed);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

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
        </div>
        <Button style={{
          marginTop: 20,
          marginBottom: 50,
          backgroundColor: '#fff',
          color: '#000'
        }} onClick={handleStopScroll}>{toggleScroll ? 'DISABLE SCROLL' : 'ENABLE SCROLL'}</Button>
      </div>
    </div>
  );
}

export default App;
