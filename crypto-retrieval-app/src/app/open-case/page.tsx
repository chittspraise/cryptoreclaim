"use client";
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';

export default function OpenCase() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const supabase = createClient();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    setError(null);

    let fileUrl: string | null = null;

    if (file) {
      const fileName = `${Date.now()}_${file.name}`;
      const { data: fileData, error: fileError } = await supabase.storage
        .from('case-files') // Make sure you have a bucket named 'case-files' in your Supabase project
        .upload(fileName, file);

      if (fileError) {
        console.error('Error uploading file:', fileError);
        setError('Error uploading file. Please try again.');
        setUploading(false);
        return;
      }
      
      // Get public URL
      const { data: urlData } = supabase.storage
        .from('case-files')
        .getPublicUrl(fileName);

      fileUrl = urlData.publicUrl;
    }

    const { data, error: insertError } = await supabase
      .from('cases')
      .insert([{ name, email, subject, message, file_url: fileUrl }]);

    if (insertError) {
      console.error('Error inserting data:', insertError);
      setError('Error submitting case. Please try again.');
    } else {
      console.log('Data inserted:', data);
      setSubmitted(true);
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
      setFile(null);
    }
    setUploading(false);
  };

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
        </header>

        <section className="section">
          <h2>Open a Case</h2>
          <div className="reach-out-form">
            {submitted ? (
              <p className="success-message">Your case has been submitted successfully!</p>
            ) : (
              <form onSubmit={handleSubmit}>
                {error && <p className="error-message">{error}</p>}
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <textarea
                    placeholder="Your Message"
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  ></textarea>
                </div>
                <div className="form-group file-upload">
                  <label htmlFor="file-upload" className="file-upload-label">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                    <span>{file ? file.name : 'Upload a File'}</span>
                  </label>
                  <input id="file-upload" type="file" onChange={handleFileChange} />
                </div>
                <button type="submit" className="btn" disabled={uploading}>
                  {uploading ? 'Submitting...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </section>

        <footer className="reclaim-assets-footer">
          <div className="footer-content">
            <h2>Reclaim Your Lost Assets</h2>
            <p>Don&apos;t let scammers get away with your hard-earned money. Take action now and let our team of experts help you recover your stolen crypto assets.</p>
            <Link href="/open-case" className="btn btn-large">GET A FREE CONSULTATION</Link>
          </div>
          <div className="footer-links">
            <div className="footer-grid">
              <div>
                <h3>About CT.pro</h3>
                <p>CRYPTO RECOVERY SOLUTIONS is a leading expert in the field of cybercrime investigation and crypto asset recovery. We are dedicated to providing our clients with the best possible service and support.</p>
              </div>
              <div>
                <h3>Quick Links</h3>
                <ul>
                  <li><Link href="/">Home</Link></li>
                  <li><Link href="/#services">Services</Link></li>
                  <li><Link href="/#about">About</Link></li>
                  <li><Link href="/#contact">Contact</Link></li>
                </ul>
              </div>
              <div>
                <h3>Contact Us</h3>
                <p>Email: support@cryptotrace.pro</p>
                <p>Phone: +1 (530) 414-0088</p>
              </div>
              <div>
                <h3>Follow Us</h3>
                <div className="social-media">
                  <a href="#"><Image src="https://cdn-icons-png.flaticon.com/512/174/174848.png" alt="Facebook" width={30} height={30} /></a>
                  <a href="#"><Image src="https://cdn-icons-png.flaticon.com/512/174/174855.png" alt="Twitter" width={30} height={30} /></a>
                  <a href="https://www.instagram.com/cryptotrace65?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="><Image src="https://cdn-icons-png.flaticon.com/512/174/174855.png" alt="Instagram" width={30} height={30} /></a>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-copyright">
            <p>&copy; 2025 CRYPTO RECOVERY SOLUTIONS. All rights reserved.</p>
          </div>
        </footer>

        <a href="https://wa.me/16155075115" className="whatsapp-icon" target="_blank">
          <Image src="https://cdn-icons-png.flaticon.com/512/124/124034.png" alt="WhatsApp" width={50} height={50} />
        </a>
      </div>
    </main>
  );
}
