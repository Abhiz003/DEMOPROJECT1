import './Hero.css';

export function Hero(props) {
  return (
    <>
      <div className={props.cName}>
        <img alt="backimg" src={props.heroImg} />
      </div>
      <div className="hero-text">
        <h1>{props.title}</h1>
        <p>{props.text}</p>
        <a href={props.url} className={props.btnClass}>
          {props.btntext}
        </a>
      </div>
    </>
  );
}
