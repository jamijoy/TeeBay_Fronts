import logo from '../../logo.svg';
import '../../App.css';
import '../../teebay.css';


export const Login = () => {
    return (
        <header className="App-header">

        <img src={logo} className="App-logo" alt="logo" />
        <h2>
          TeeBay
        </h2>
        <a
          className="App-link"
          href=""
          target="_blank"
          rel="noopener noreferrer"
        >
           Login
        </a>
        <a
          className="App-link"
          href=""
          target="_blank"
          rel="noopener noreferrer"
        >
           Register
        </a>
        
      </header>
    )
}