"use client";
import Image from 'next/image';
import Link from 'next/link';

export default function OpenCase() {
  return (
    <main>
      <div className="container">
        <header>
          <div className="logo">CT.pro</div>
          <nav>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/#services">Services</Link></li>
              <li><Link href="/#about">About</Link></li>
              <li><Link href="/#contact">Contact</Link></li>
            </ul>
          </nav>
          <Link href="/open-case" className="btn">Open Case</Link>
          <a href="/open-case" className="btn">Open Case</a>
        </header>

        <section className="section">
          <h2>Open a Case</h2>
          <div className="reach-out-form">
            <form>
              <div className="form-group">
                <input type="text" placeholder="Your Name" required />
                <input type="email" placeholder="Your Email" required />
              </div>
              <div className="form-group">
                <input type="text" placeholder="Subject" required />
              </div>
              <div className="form-group">
                <textarea placeholder="Your Message" rows={5} required></textarea>
              </div>
              <div className="form-group file-upload">
                <label htmlFor="file-upload" className="file-upload-label">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                  <span>Upload a File</span>
                </label>
                <input id="file-upload" type="file" />
              </div>
              <button type="submit" className="btn">Send Message</button>
            </form>
          </div>
        </section>

        <footer className="reclaim-assets-footer">
          <div className="footer-content">
            <h2>Reclaim Your Lost Assets</h2>
            <Link href="/open-case" className="btn btn-large">GET A FREE CONSULTATION</Link>
            <a href="/open-case" className="btn btn-large">GET A FREE CONSULTATION</a>
          </div>
          <div className="footer-links">
            <div className="footer-grid">
              <div>
                <h3>About CT.pro</h3>
                <p>Crypto Reclaim is a leading expert in the field of cybercrime investigation and crypto asset recovery. We are dedicated to providing our clients with the best possible service and support.</p>
              </div>
           
              <div>
                <h3>Contact Us</h3>
                <p>Email: cryptoreclaim@usa.com</p>
                <p>Phone: +1 (530) 414-0088</p>
              </div>
              <div>
                <h3>Follow Us</h3>
                <div className="social-media">
                  <a href="#"><Image src="https://cdn-icons-png.flaticon.com/512/174/174848.png" alt="Facebook" width={30} height={30} /></a>
                  <a href="https://www.instagram.com/cryptocurrencyreclaim?igsh=MXJkZ2JkOGZkcnFqeQ=="><Image src="https://cdn-icons-png.flaticon.com/512/174/174855.png" alt="Instagram" width={30} height={30} /></a>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-copyright">
            <p>&copy; 2025 Crypto Reclaim. All rights reserved.</p>
          </div>
        </footer>

        <a href="https://wa.me/16155075115" className="whatsapp-icon" target="_blank">
          <Image src="/images/iconapp.png" alt="WhatsApp" width={50} height={50} />
        </a>
      </div>
    </main>
  );
}
