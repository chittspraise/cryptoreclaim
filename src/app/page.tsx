"use client";
import Image from 'next/image';
import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { motion } from 'framer-motion';

const faqData = [
  {
    question: "What is cryptocurrency recovery?",
    answer: "Cryptocurrency recovery is the process of retrieving lost or inaccessible digital assets. This can be due to various reasons such as forgotten passwords, hardware failure, or scams."
  },
  {
    question: "How does Crypto Reclaim work?",
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
      const { error: fileError } = await supabase.storage
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
      .from('claims')
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
      <div className="w-full max-w-7xl mx-auto my-8 p-8 bg-neutral-800 border border-neutral-700 rounded-lg px-4 sm:px-6 lg:px-8">
        <header>
          <div className="logo">
            <Image src="/images/lofinal.png" alt="Crypto Reclaim Logo" width={150} height={120} />
          </div>
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
          <div className="hero-logo">
            <Image src="/images/lofinal.png" alt="Crypto Reclaim" width={300} height={114} />
          </div>
          <p className="text-center text-lg text-white my-4">Romance Scams | Online Blackmail | Crypto Recovery | Investment Scams | Blockchain Forensics</p>
          <a href="/open-case" className="btn">Get a Free Consultation</a>
        </section>

        <section id="about" className="section">
          <div className="about-image">
            <Image src="/images/finace1.png" alt="About Us" width={1200} height={400} className="about-banner-image" />
          </div>
          <div className="about-content text-center mt-8">
            <h2>About Us</h2>
                          <p>At Crypto Reclaim, we stand as a premier authority in cybercrime investigation and the intricate process of crypto asset recovery. Our dedicated team comprises experienced cybersecurity professionals, adept blockchain analysts, and skilled financial forensic specialists. We are committed to assisting individuals who have fallen victim to online scams and cryptocurrency theft, ensuring they receive unparalleled service and guidance through the challenging landscape of digital asset retrieval.</p>              <p>Recognizing the profound distress and frustration caused by the loss of valuable digital assets, we are steadfast in our commitment. We leverage state-of-the-art technology and advanced investigative methodologies to meticulously trace, track, and recover your funds. Our proven track record of high success, combined with a client-focused philosophy, drives us to achieve tangible results and ultimately restore your peace of mind.</p>
            
          </div>
        </section>

        <section id="services" className="section">
          <h2>Our Services</h2>
          <div className="grid">
            <motion.div 
              className="card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Image src="https://cdn-icons-png.flaticon.com/512/1006/1006431.png" alt="Strategic Planning" width={50} height={50} className="service-icon" />
              <h3>Custom Recovery Strategies</h3>
              <p>Our experts design a tailored action plan to maximize the chances of retrieving your digital assets.</p>
            </motion.div>
            <motion.div 
              className="card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Image src="https://cdn-icons-png.flaticon.com/512/3997/3997842.png" alt="Crypto Wallet Tracing" width={50} height={50} className="service-icon" />
              <h3>Digital Wallet Tracking</h3>
              <p>Using advanced forensic tools, we meticulously trace wallet activities to pinpoint the location of your funds.</p>
            </motion.div>
            <motion.div 
              className="card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Image src="https://cdn-icons-png.flaticon.com/512/1087/1087840.png" alt="Blockchain Recovery" width={50} height={50} className="service-icon" />
              <h3>On-Chain Asset Retrieval</h3>
              <p>We employ sophisticated on-chain methods to reclaim your assets directly from the blockchain.</p>
            </motion.div>
            <motion.div 
              className="card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Image src="https://cdn-icons-png.flaticon.com/512/1006/1006561.png" alt="Ransomware Analysis" width={50} height={50} className="service-icon" />
              <h3>Ransomware Incident Response</h3>
              <p>Our team dissects ransomware attacks to identify recovery vectors and help restore your critical data.</p>
            </motion.div>
            <motion.div 
              className="card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Image src="https://cdn-icons-png.flaticon.com/512/1006/1006561.png" alt="Phishing Attack Mitigation" width={50} height={50} className="service-icon" />
              <h3>Phishing Scam Defense</h3>
              <p>We assist in minimizing the impact of phishing schemes and help secure your accounts from further harm.</p>
            </motion.div>
            <motion.div 
              className="card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Image src="https://cdn-icons-png.flaticon.com/512/1006/1006561.png" alt="Crypto Wallet Analysis" width={50} height={50} className="service-icon" />
              <h3>Wallet Security Audits</h3>
              <p>We conduct in-depth analyses of crypto wallets to uncover and fortify potential security weaknesses.</p>
            </motion.div>
          </div>
        </section>

        <section id="benefits" className="section">
          <h2>Exceptional Benefits for Your Business</h2>
          <div className="grid">
            <div className="card">
              <Image src="https://cdn-icons-png.flaticon.com/512/2706/2706821.png" alt="Support Systems" width={50} height={50} />
              <h3>Dedicated Client Support</h3>
              <p>Our robust support systems are designed to provide you with unparalleled assistance throughout your recovery journey.</p>
            </div>
            <div className="card">
              <Image src="https://cdn-icons-png.flaticon.com/512/1067/1067492.png" alt="Quick Navigation" width={50} height={50} />
              <h3>Streamlined Process</h3>
              <p>Experience a seamless and efficient recovery process with our intuitive platform and expert guidance.</p>
            </div>
            <div className="card">
              <Image src="https://cdn-icons-png.flaticon.com/512/2165/2165549.png" alt="Resource Allocation" width={50} height={50} />
              <h3>Optimized Resource Deployment</h3>
              <p>We strategically allocate all necessary resources to ensure the most effective and successful asset recovery.</p>
            </div>
          </div>
        </section>

        <section id="portfolio" className="section">
          <h2>Asset Tracking Portfolio</h2>
          <p>We are here to assist you in locating the offenders and regaining control of your finances.</p>
          <div className="progress-container">
            <motion.div 
              className="progress-bar"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p>Bitcoin Recovery</p>
              <div className="progress" style={{width: '90%'}}>90%</div>
            </motion.div>
            <motion.div 
              className="progress-bar"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <p>Investment Fraud Recovery</p>
              <div className="progress" style={{width: '85%'}}>85%</div>
            </motion.div>
            <motion.div 
              className="progress-bar"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <p>Romance Scams Recovery</p>
              <div className="progress" style={{width: '95%'}}>95%</div>
            </motion.div>
            <motion.div 
              className="progress-bar"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <p>Other Scam Resolutions</p>
              <div className="progress" style={{width: '80%'}}>80%</div>
            </motion.div>
          </div>
        </section>

        <section id="asset-charts" className="section">
          <h2>ASSET RECOVERY GROWTH (2021-2025)</h2>
          <p>Annual overview of successfully recovered cases, demonstrating our consistent growth and effectiveness.</p>
          <div className="chart-container">
            {(() => {
              const yearlyData = [
                { year: 2021, cases: 450 },
                { year: 2022, cases: 620 },
                { year: 2023, cases: 890 },
                { year: 2024, cases: 1150 },
                { year: 2025, cases: 1420, projected: true },
              ];
              const maxValue = Math.max(...yearlyData.map(d => d.cases));

              return yearlyData.map((data, index) => (
                <div key={index} className="chart-bar-wrapper">
                  <div className="chart-value">{data.cases}{data.projected && '*'}</div>
                  <motion.div
                    className="chart-bar"
                    style={{ backgroundColor: data.projected ? '#a08d3a' : '#FFC700' }}
                    initial={{ height: 0 }}
                    animate={{ height: `${(data.cases / maxValue) * 100}%` }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                  ></motion.div>
                  <div className="chart-label">{data.year}</div>
                </div>
              ));
            })()}
          </div>
          <p style={{textAlign: 'center', marginTop: '15px', fontSize: '12px', color: '#aaa'}}>*Projected</p>
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
          <h2>What Our Clients Say</h2>
          <div className="grid">
            <motion.div
              className="card text-center"
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Image src="/images/finance4.png" alt="Testimonial 1" width={100} height={100} className="rounded-full mx-auto" />
              <p className="mt-4">&quot;I was devastated after losing a significant amount of crypto. The team at Crypto Reclaim was incredibly supportive and professional, and I&apos;m so grateful for their expertise in helping me recover my funds.&quot;</p>
              <div className="flex items-center justify-center mt-4 space-x-2">
                <span className="text-yellow-400 text-xl">★★★★</span>
                <span className="text-sm font-semibold text-green-500">Verified</span>
              </div>
              <h4 className="mt-4 font-bold">- Michael Harold</h4>
            </motion.div>
            <motion.div
              className="card text-center"
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Image src="/images/offic1.jpg" alt="Testimonial 2" width={100} height={100} className="rounded-full mx-auto" />
              <p className="mt-4">&quot;The level of customer service I received was outstanding. Every question was answered with patience and clarity. The final result exceeded my expectations, and I wholeheartedly recommend their services.&quot;</p>
              <div className="flex items-center justify-center mt-4 space-x-2">
                <span className="text-yellow-400 text-xl">★★★★</span>
                <span className="text-sm font-semibold text-green-500">Verified</span>
              </div>
              <h4 className="mt-4 font-bold">- Mercy Lorraine Mayers</h4>
            </motion.div>
            <motion.div
              className="card text-center"
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <Image src="/images/financ3.png" alt="Testimonial 3" width={100} height={100} className="rounded-full mx-auto" />
              <p className="mt-4">&quot;I can&apos;t recommend Crypto Reclaim enough. Their deep knowledge of the crypto space, combined with their integrity and prompt communication, made all the difference. A top-tier service from start to finish.&quot;</p>
              <div className="flex items-center justify-center mt-4 space-x-2">
                <span className="text-yellow-400 text-xl">★★★★★</span>
                <br></br>
                <span className="text-sm font-semibold text-green-500">Verified</span>
              </div>
              <h4 className="mt-4 font-bold">Patricia Hudson</h4>
            </motion.div>
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
              <Image src="/images/OIP.jpeg" alt="Crypto Security" width={300} height={200} className="card-image" />
              <h3>Increased Fraud Cases</h3>
              <p>The rise of cryptocurrency has also led to an increase in fraud cases. Learn how to protect yourself from crypto scams.</p>
            </div>
            <div className="card">
              <Image src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto-format=fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Cyber Security" width={300} height={200} className="card-image" />
              <h3>The Future of Crypto Security</h3>
              <p>Discover the latest trends and technologies that are shaping the future of crypto security.</p>
            </div>
            <div className="card">
              <Image src="/images/pple.png" alt="Financial" width={300} height={200} className="card-image" />
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
                <p><strong>Email:</strong> cryptoreclaim@usa.com</p>
                <p><strong>Phone:</strong> +1 302 334 2200</p>
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
                <h3>About Crypto Reclaim</h3>
                <p>Crypto Reclaim is a leading expert in the field of cybercrime investigation and crypto asset recovery. We are dedicated to providing our clients with the best possible service and support.</p>
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
                <p>Email: cryptoreclaim@usa.com</p>
                <p>Phone: +1 302 334 2200</p>
              </div>
              <div>
                <h3>Follow Us</h3>
                <div className="social-media">
                            <a href="https://www.facebook.com/profile.php?id=100091801771587&ref=fb_bidir_ig_profile_ac"><Image src="/images/facebook.png" alt="Facebook" width={30} height={30} /></a>
                            <a href="https://www.instagram.com/cryptocurrencyreclaim?igsh=MXJkZ2JkOGZkcnFqeQ=="><Image src="/images/insta.avif" alt="Instagram" width={30} height={30} /></a>                </div>
              </div>
            </div>
          </div>
          <div className="footer-copyright">
            <p>&copy; 2025 Crypto Reclaim. All rights reserved.</p>
          </div>
        </footer>

        <a href="https://wa.me/13023342200" className="whatsapp-icon" target="_blank">
          <Image src="/images/iconapp.png" alt="WhatsApp" width={50} height={50} />
        </a>
      </div>
    </main>
  );
}
