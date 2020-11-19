import './Loader.css';

function Loader() {
  return (
    <div className="App">
      <div className="camera__wrap">
        <div className="camera__body">
          <div className="camera__body-k7">
            <div className="tape">
              <div className="roll"></div>
              <div className="roll"></div>
              <div className="roll"></div>
              <div className="roll"></div>
              <div className="center"></div>
            </div>
            <div className="tape">
              <div className="roll"></div>
              <div className="roll"></div>
              <div className="roll"></div>
              <div className="roll"></div>
              <div className="center"></div>
            </div>
          </div>
          <div className="camera__body__stuff">
            <div className="camera__body__stuff-bat"></div>
            <div className="camera__body__stuff-pointer first"></div>
            <div className="camera__body__stuff-pointer"></div>
          </div>
        </div>
        <div className="camera__body-optic"></div>
        <div className="camera__body-light"></div>
      </div>
    </div>
  );
}

export default Loader;
