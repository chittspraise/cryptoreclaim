"use client";
import Image from 'next/image';
import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';

const faqData = [
  {
    question: "What is cryptocurrency recovery?",
    answer: "Cryptocurrency recovery is the process of retrieving lost or inaccessible digital assets. This can be due to various reasons such as forgotten passwords, hardware failure, or scams."
  },
  {
    question: "How does Cryptotrace work?",
    answer: "We use a combination of advanced blockchain analysis, forensic techniques, and legal expertise to trace and recover your stolen crypto assets. Our team of experts works diligently to track the movement of your funds and identify the culprits."
  },
  {
    question: "What is the success rate of recovery?",
    answer: "While we cannot guarantee a 100% success rate due to the complexities of the crypto world, we have a proven track record of successfully recovering assets for our clients. Our success rate is among the highest in the industry."
  },
  {
    question: "How long does the recovery process take?",
    answer: "2 weeks and most time less than 7 days"
  },
  {
    question: "What are the fees for your services?",
    answer: "We offer a free initial consultation to assess your case. Our fees are typically based on a percentage of the recovered assets, so we are motivated to get your funds back. We will discuss all fees upfront before starting the recovery process."
  },
  {
    question: "Is my information kept confidential?",
    answer: "Absolutely. We adhere to strict confidentiality protocols to ensure that all your personal and case-related information is kept secure and private. Your trust is our top priority."
  }
];

export default function Home() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [isNavOpen, setIsNavOpen] = useState(false);
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
        .from('case-files')
        .upload(fileName, file);

      if (fileError) {
        console.error('Error uploading file:', fileError);
        setError('Error uploading file. Please try again.');
        setUploading(false);
        return;
      }

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

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <main>
      <div className="container">
        <header>
          <div className="logo">CT.pro</div>
          <div className="hamburger" onClick={toggleNav}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </div>
          <nav className={isNavOpen ? 'active' : ''}>
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#contact">Contact</a></li>
              <li><a href="/login">Login</a></li>
            </ul>
          </nav>
          <a href="/open-case" className="btn header-btn">Open Case</a>
        </header>

        <section className="hero">
<h1>Cryptotrace</h1>
          <p>Cybercrime Investigations And Crypto Asset Recovery</p>
          <p>Romance Scams | Online Blackmail | Crypto Recovery | Investment Scams | Blockchain Forensics</p>
          <a href="/open-case" className="btn">Get a Free Consultation</a>
        </section>

        <section id="about" className="section">
          <div className="about-grid">
            <div className="about-content">
              <h2>About Us</h2>
              <p>Cryptotrace is a leading expert in the field of cybercrime investigation and crypto asset recovery. We are a team of seasoned cybersecurity experts, blockchain analysts, and financial forensic specialists dedicated to helping victims of online scams and cryptocurrency theft. Our mission is to provide our clients with the best possible service and support in navigating the complex world of digital asset recovery.</p>
              <p>We understand the distress and frustration that comes with losing your hard-earned assets. That’s why we are committed to employing cutting-edge technology and investigative techniques to trace, track, and retrieve your funds. With a high success rate and a client-centric approach, we strive to deliver results and restore your peace of mind.</p>
              <a href="#" className="btn">Learn More</a>
            </div>
            <div className="about-image">
              <Image src="/images/top-view-of-business-people-sitting-at-table-and-working-together-in-office-business-meeting-on-a-working-table-top-view-no-visible-faces-ai-generated-free-photo.jpg" alt="About Us" width={500} height={350} />
            </div>
          </div>
        </section>

        <section id="services" className="section">
          <h2>Our Services</h2>
          <div className="grid">
            <div className="card">
              <Image src="https://cdn-icons-png.flaticon.com/512/1006/1006431.png" alt="Strategic Planning" width={50} height={50} />
              <h3>Strategic Planning</h3>
              <p>We develop a strategic plan to recover your assets.</p>
            </div>
            <div className="card">
              <Image src="https://cdn-icons-png.flaticon.com/512/3997/3997842.png" alt="Crypto Wallet Tracing" width={50} height={50} />
              <h3>Crypto Wallet Tracing</h3>
              <p>We trace crypto wallets to locate your stolen funds.</p>
            </div>
            <div className="card">
              <Image src="https://cdn-icons-png.flaticon.com/512/1087/1087840.png" alt="Blockchain Recovery" width={50} height={50} />
              <h3>Blockchain Recovery</h3>
              <p>We use advanced techniques to recover your assets from the blockchain.</p>
            </div>
            <div className="card">
              <Image src="https://cdn-icons-png.flaticon.com/512/1006/1006561.png" alt="Ransomware Analysis" width={50} height={50} />
              <h3>Ransomware Analysis</h3>
              <p>We analyze ransomware attacks to help you recover your data.</p>
            </div>
            <div className="card">
              <Image src="https://cdn-icons-png.flaticon.com/512/1006/1006561.png" alt="Phishing Attack Mitigation" width={50} height={50} />
              <h3>Phishing Attack Mitigation</h3>
              <p>We help you mitigate the damage from phishing attacks.</p>
            </div>
            <div className="card">
              <Image src="https://cdn-icons-png.flaticon.com/512/1006/1006561.png" alt="Crypto Wallet Analysis" width={50} height={50} />
              <h3>Crypto Wallet Analysis</h3>
              <p>We analyze crypto wallets to identify vulnerabilities.</p>
            </div>
          </div>
        </section>

        <section id="benefits" className="section">
          <h2>Exceptional Benefits for Your Business</h2>
          <div className="grid">
            <div className="card">
              <Image src="https://cdn-icons-png.flaticon.com/512/2706/2706821.png" alt="Support Systems" width={50} height={50} />
              <h3>Support Systems</h3>
              <p>Our support systems are designed to provide you with the best assistance.</p>
            </div>
            <div className="card">
              <Image src="https://cdn-icons-png.flaticon.com/512/1067/1067492.png" alt="Quick Navigation" width={50} height={50} />
              <h3>Quick Navigation</h3>
              <p>Our platform is easy to navigate, ensuring a seamless experience.</p>
            </div>
            <div className="card">
              <Image src="https://cdn-icons-png.flaticon.com/512/2165/2165549.png" alt="Resource Allocation" width={50} height={50} />
              <h3>Resource Allocation</h3>
              <p>We allocate the necessary resources to ensure a successful recovery.</p>
            </div>
          </div>
        </section>

        <section id="portfolio" className="section">
          <h2>Asset Tracking Portfolio</h2>
          <p>We are here to assist you in locating the offenders and regaining control of your finances.</p>
          <div className="progress-container">
            <div className="progress-bar">
              <p>Bitcoin Recovery</p>
              <div className="progress" style={{width: '90%'}}>90%</div>
            </div>
            <div className="progress-bar">
              <p>Investment Fraud Recovery</p>
              <div className="progress" style={{width: '85%'}}>85%</div>
            </div>
            <div className="progress-bar">
              <p>Romance Scams Recovery</p>
              <div className="progress" style={{width: '95%'}}>95%</div>
            </div>
            <div className="progress-bar">
              <p>Other Scam Resolutions</p>
              <div className="progress" style={{width: '80%'}}>80%</div>
            </div>
          </div>
        </section>

        <section id="asset-charts" className="section">
          <h2>ASSET CHARTS</h2>
          <div className="grid">
            <div className="chart-card">
              <Image src="/images/Screenshot 2025-09-24 104731.png" alt="Asset Chart" width={800} height={600} />
            </div>
          </div>
        </section>

        <section id="faq" className="section">
          <h2>Frequently Asked Questions</h2>
          <p className="faq-subtitle">We have answers to your most common questions.</p>
          <div className="faq-grid">
            {faqData.map((faq, index) => (
              <div key={index} className="faq-item">
                <button className="faq-question" onClick={() => toggleFaq(index)}>
                  <span>{faq.question}</span>
                  <span className="faq-icon">{openFaqIndex === index ? '-' : '+'}</span>
                </button>
                <div className={`faq-answer ${openFaqIndex === index ? 'open' : ''}`}>
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="testimonials" className="section">
          <h2>Testimonials</h2>
          <div className="grid">
            <div className="card text-center">
              <Image src="/images/off2.jpeg" alt="Testimonial 1" width={100} height={100} className="rounded-full mx-auto" />
              <p className="mt-4">&quot;I am grateful for their help in recovering my stolen crypto.&quot;</p>
              <div className="flex items-center justify-center mt-4 space-x-2">
                <span className="text-yellow-400 text-xl">★★★★</span>
                <span className="text-sm font-semibold text-green-500">Verified</span>
              </div>
              <h4 className="mt-4 font-bold">- Alex Cohen</h4>
            </div>
            <div className="card text-center">
              <Image src="/images/offic1.jpg" alt="Testimonial 2" width={100} height={100} className="rounded-full mx-auto" />
              <p className="mt-4">&quot;The customer service alone deserves 5 stars.Every question I had was answered clearly and politely.The results were even better than I expected, and I feel confident recommending them to anyone.&quot;</p>
              <div className="flex items-center justify-center mt-4 space-x-2">
                <span className="text-yellow-400 text-xl">★★★★</span>
                <span className="text-sm font-semibold text-green-500">Verified</span>
              </div>
              <h4 className="mt-4 font-bold">- Sarah Miller</h4>
            </div>
            <div className="card text-center">
              <Image src="/images/test.jpeg" alt="Testimonial 3" width={100} height={100} className="rounded-full mx-auto" />
              <p className="mt-4">&quot;I can recommend Cryptotrace 100 %. Profund knowledge about crypto, absolute integrity, reasonable cost, quick reaction! Top contact!&quot;</p>
              <div className="flex items-center justify-center mt-4 space-x-2">
                <span className="text-yellow-400 text-xl">★★★★★</span>
                <span className="text-sm font-semibold text-green-500">Verified</span>
              </div>
              <h4 className="mt-4 font-bold">Allen</h4>
            </div>
          </div>
        </section>

    

        <section id="news" className="section">
          <h2>News Update</h2>
          <div className="tags-container">
            <span className="tag tag-blue">ALL POST</span>
            <span className="tag tag-green">CRYPTO NEWS</span>
            <span className="tag tag-purple">CYBER SECURITY</span>
            <span className="tag tag-red">ENTREPRENEURSHIP</span>
            <span className="tag tag-orange">FINANCIAL</span>
            <span className="tag tag-teal">LEADERSHIP</span>
          </div>
          <div className="grid">
            <div className="card">
              <Image src="/images/ai-generated-8165298_960_720.jpg" alt="Crypto Security" width={300} height={200} className="card-image" />
              <h3>Increased Fraud Cases</h3>
              <p>The rise of cryptocurrency has also led to an increase in fraud cases. Learn how to protect yourself from crypto scams.</p>
            </div>
            <div className="card">
              <Image src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto-format=fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Cyber Security" width={300} height={200} className="card-image" />
              <h3>The Future of Crypto Security</h3>
              <p>Discover the latest trends and technologies that are shaping the future of crypto security.</p>
            </div>
            <div className="card">
              <Image src="/images/top-view-of-business-people-sitting-at-table-and-working-together-in-office-business-meeting-on-a-working-table-top-view-no-visible-faces-ai-generated-free-photo.jpg" alt="Financial" width={300} height={200} className="card-image" />
              <h3>Revolutionized Financial Landscape</h3>
              <p>Explore how cryptocurrency is revolutionizing the financial landscape and what it means for the future of money.</p>
            </div>
          </div>
        </section>

        <section id="contact" className="section reach-out-section">
          <div className="reach-out-content">
            <div className="reach-out-text">
              <h2>Reach Out Now</h2>
              <p>Ready to take the first step towards recovering your assets? Contact us today for a free, no-obligation consultation. Our team is standing by to listen to your story and provide you with a clear action plan. Every second counts in the world of crypto recovery, so don’t delay.</p>
              <div className="contact-info">
                <p><strong>Email:</strong> support@cryptotrace.pro</p>
                <p><strong>Phone:</strong> +1 (615) 507-5115</p>
                <p><strong>Address:</strong> 45th Street Down Town Los Angeles California 90001</p>
              </div>
            </div>
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
          </div>
        </section>

        <footer className="reclaim-assets-footer">
          <div className="footer-content">
            <h2>Reclaim Your Lost Assets</h2>
            <p>Don&#39;t let scammers get away with your hard-earned money. Take action now and let our team of experts help you recover your stolen crypto assets.</p>
            <a href="#" className="btn btn-large">GET A FREE CONSULTATION</a>
          </div>
          <div className="footer-links">
            <div className="footer-grid">
              <div>
                <h3>About CT.pro</h3>
                <p>Cryptotrace is a leading expert in the field of cybercrime investigation and crypto asset recovery. We are dedicated to providing our clients with the best possible service and support.</p>
              </div>
              <div>
                <h3>Quick Links</h3>
                <ul>
                  <li><a href="#">Home</a></li>
                  <li><a href="#services">Services</a></li>
                  <li><a href="#about">About</a></li>
                  <li><a href="#contact">Contact</a></li>
                </ul>
              </div>
              <div>
                <h3>Contact Us</h3>
                <p>Email: support@cryptotrace.pro</p>
                <p>Phone: +1 (615) 507-5115</p>
              </div>
              <div>
                <h3>Follow Us</h3>
                <div className="social-media">
                  <a href="#"><Image src="https://cdn-icons-png.flaticon.com/512/174/174848.png" alt="Facebook" width={30} height={30} /></a>
                  <a href="https://www.instagram.com/cryptotrace65?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="><Image src="https://cdn-icons-png.flaticon.com/512/174/174855.png" alt="Instagram" width={30} height={30} /></a>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-copyright">
            <p>&copy; 2025 Cryptotrace. All rights reserved.</p>
          </div>
        </footer>

        <a href="https://wa.me/16155075115" className="whatsapp-icon" target="_blank">
          <Image src="https://cdn-icons-png.flaticon.com/512/124/124034.png" alt="WhatsApp" width={50} height={50} />
        </a>
      </div>
    </main>
  );
}
