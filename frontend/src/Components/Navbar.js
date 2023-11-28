import {Link} from 'react-router-dom';

const Navbar = () => {
    return ( 
            <header>
                <div className="navbar">
                    <a href="http://localhost:3000/">
                        <img className="logo" src="/logo.png" alt="Pawsitive Adoptions Logo" />
                    </a>
                    
                    <div className="webName">
                        <a href="/">Pawsitive <br/>Adoptions</a>
                    </div>
                    

                    <div className="links">
                        <Link to="/">HOME</Link>
                        <Link to="/adopt">ADOPT</Link>
                        <Link to="/contact">CONTACT</Link>
                        <Link to="/donation">DONATION</Link>
                        <Link to="/about">ABOUT</Link>
                    </div>
                </div>
            </header>
        
     );
}
 
export default Navbar;