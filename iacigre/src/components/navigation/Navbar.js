import { connect } from 'react-redux';

function Navbar({
}) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container px-5">
            <a className="navbar-brand" href="#">CIGRE C2.5</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li className="nav-item"><a className="nav-link" href="about.html">About</a></li>
                    <li className="nav-item"><a className="nav-link" href="contact.html">Contact</a></li>
                    <li className="nav-item"><a className="nav-link" href="pricing.html">Blog</a></li>
                </ul>
            </div>
        </div>
    </nav>
  )
}
const mapStateToProps = state => ({

})
export default connect(mapStateToProps, {

})(Navbar)