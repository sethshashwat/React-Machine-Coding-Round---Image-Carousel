import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [images, setImages] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchImages = async () => {
    setLoading(true);
    const url = "https://www.reddit.com/r/aww/top/.json?t=all";
    const res = await fetch(url);
    const result = await res.json();
    const list = result.data.children.filter((item) => item.data.url_overridden_by_dest.includes(".jpg"));
    const imageUrls = list.map((item) => item.data.url_overridden_by_dest);
    setImages(imageUrls);
    setLoading(false);
  }

  useEffect(() => {
    fetchImages();
  }, [])

  const handleClick = (dir) => {
    const lastIndex = images.length - 1;
    if (dir === "left") {
      if (index === 0) {
        setIndex(lastIndex);
      } else {
        setIndex((i) => i - 1);
      }
    } else if (dir === "right") {
      if (index === lastIndex) {
        setIndex(0);
      } else {
        setIndex((i) => i + 1);
      }
    }
  }

  useEffect(() => {
    const tid = setInterval(() => {
      handleClick("right");
    }, 3000)

    return () => {
      clearInterval(tid);
    }
    // eslint-disable-next-line
  }, [index])


  return (
    <div className="App">
      {
        loading ? <h1>...loading</h1> :
          <>
            <button onClick={() => handleClick("left")}>{"<"}</button>
            <img src={images[index]} alt="not-found" />
            <button className='right' onClick={() => handleClick("right")}>{">"}</button>
          </>
      }
    </div>
  );
}

export default App;
