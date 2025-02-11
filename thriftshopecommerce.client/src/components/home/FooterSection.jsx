import { Link } from 'react-router-dom';
import { BsFacebook } from "react-icons/bs";
import { BsInstagram } from "react-icons/bs";
import { BsTwitterX } from "react-icons/bs";
import { SHOP_NAME, SHOP_DESCRIPTION, FACEBOOK_LINK, INSTAGRAM_LINK, TWITTER_LINK } from '../../lib/Constants';

function FooterSection() {
  return (
    <div className='bg-main fw-light fs-7'>
        <div className='container py-5'>
            <div className="row row-cols-1 row-cols-md-3">
                <div className="col text-center py-2">
                    <p className='fs-6 fw-medium mb-3'>{SHOP_NAME}</p>
                    <p>{SHOP_DESCRIPTION}</p>
                </div>

                <div className="col text-center py-2">
                    <p className='fs-6 fw-medium mb-3'>Quick Links</p>

                    <ul className="d-flex flex-column w-100 p-0 gap-1">
                        <Link className="nav-link" to="/">Home</Link>
                        <a className="nav-link" href="#">About</a>
                        <a className="nav-link" href="#">FAQ</a>
                        <Link className="nav-link" to="/signin">Register</Link>
                        <Link className="nav-link" to="/signup">Sign In</Link>
                    </ul>
                </div>

                <div className="col text-center py-2">
                    <p className='fs-6 fw-medium mb-3'>Follow Us</p>
                    
                    <div className='d-flex justify-content-center gap-3 fs-4'>
                        <a className='text-dark' href={FACEBOOK_LINK} target='_blank'><BsFacebook/></a>
                        <a className='text-dark' href={INSTAGRAM_LINK} target='_blank'><BsInstagram/></a>
                        <a className='text-dark' href={TWITTER_LINK} target='_blank'><BsTwitterX/></a>
                    </div>
                </div>
            </div>
        </div>

        <hr className='my-0'/>

        <div className='text-center py-4 text-bg-dark'>
            <p>© 2025 {SHOP_NAME}. All rights reserved.</p>
        </div>
    </div>
  )
}

export default FooterSection