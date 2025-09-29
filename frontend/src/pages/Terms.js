import React from 'react';

const Terms = () => {
  const lastUpdated = 'December 1, 2023';

  return (
    <div className="terms-page">
      <div className="container">
        <div className="terms-header">
          <h1>Terms of Service</h1>
          <p className="last-updated">Last updated: {lastUpdated}</p>
        </div>

        <div className="terms-content">
          <div className="terms-section">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using SkillSwap ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. 
              If you do not agree to abide by the above, please do not use this service.
            </p>
          </div>

          <div className="terms-section">
            <h2>2. Description of Service</h2>
            <p>
              SkillSwap is a platform that connects individuals who want to share and learn skills. Users can create profiles, 
              offer skills they possess, request skills they want to learn, and connect with other users for skill exchange sessions.
            </p>
          </div>

          <div className="terms-section">
            <h2>3. User Accounts</h2>
            <h3>3.1 Account Creation</h3>
            <p>
              To use certain features of the Service, you must register for an account. You agree to provide accurate, 
              current, and complete information during the registration process.
            </p>
            <h3>3.2 Account Security</h3>
            <p>
              You are responsible for safeguarding the password and for maintaining the confidentiality of your account. 
              You agree not to disclose your password to any third party.
            </p>
            <h3>3.3 Account Termination</h3>
            <p>
              We reserve the right to terminate or suspend your account at any time for violations of these Terms of Service.
            </p>
          </div>

          <div className="terms-section">
            <h2>4. User Conduct</h2>
            <h3>4.1 Acceptable Use</h3>
            <p>You agree to use the Service only for lawful purposes and in accordance with these Terms. You agree not to:</p>
            <ul>
              <li>Use the Service for any illegal or unauthorized purpose</li>
              <li>Harass, abuse, or harm other users</li>
              <li>Post false, misleading, or fraudulent content</li>
              <li>Violate any applicable laws or regulations</li>
              <li>Interfere with or disrupt the Service or servers</li>
            </ul>
            <h3>4.2 Content Standards</h3>
            <p>
              All content you post must be respectful, appropriate, and relevant to skill sharing. 
              We reserve the right to remove any content that violates these standards.
            </p>
          </div>

          <div className="terms-section">
            <h2>5. Skill Exchange</h2>
            <h3>5.1 User Responsibility</h3>
            <p>
              Users are solely responsible for their interactions with other users. SkillSwap does not guarantee 
              the quality, safety, or legality of any skill exchange sessions.
            </p>
            <h3>5.2 No Employment Relationship</h3>
            <p>
              SkillSwap does not create an employment relationship between users. All skill exchanges are 
              independent arrangements between users.
            </p>
          </div>

          <div className="terms-section">
            <h2>6. Privacy</h2>
            <p>
              Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the Service, 
              to understand our practices.
            </p>
          </div>

          <div className="terms-section">
            <h2>7. Intellectual Property</h2>
            <h3>7.1 Service Content</h3>
            <p>
              The Service and its original content, features, and functionality are owned by SkillSwap and are protected 
              by international copyright, trademark, patent, trade secret, and other intellectual property laws.
            </p>
            <h3>7.2 User Content</h3>
            <p>
              You retain ownership of content you post to the Service. By posting content, you grant SkillSwap a 
              non-exclusive, worldwide, royalty-free license to use, modify, and display such content.
            </p>
          </div>

          <div className="terms-section">
            <h2>8. Disclaimers</h2>
            <p>
              The Service is provided on an "AS IS" and "AS AVAILABLE" basis. SkillSwap makes no warranties, 
              expressed or implied, and hereby disclaims all other warranties including implied warranties of 
              merchantability, fitness for a particular purpose, or non-infringement.
            </p>
          </div>

          <div className="terms-section">
            <h2>9. Limitation of Liability</h2>
            <p>
              In no event shall SkillSwap be liable for any indirect, incidental, special, consequential, or punitive damages, 
              including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
            </p>
          </div>

          <div className="terms-section">
            <h2>10. Indemnification</h2>
            <p>
              You agree to defend, indemnify, and hold harmless SkillSwap from and against any claims, damages, 
              obligations, losses, liabilities, costs, or debt arising from your use of the Service.
            </p>
          </div>

          <div className="terms-section">
            <h2>11. Termination</h2>
            <p>
              We may terminate or suspend your access immediately, without prior notice or liability, for any reason whatsoever, 
              including without limitation if you breach the Terms.
            </p>
          </div>

          <div className="terms-section">
            <h2>12. Changes to Terms</h2>
            <p>
              We reserve the right to modify or replace these Terms at any time. If a revision is material, 
              we will try to provide at least 30 days notice prior to any new terms taking effect.
            </p>
          </div>

          <div className="terms-section">
            <h2>13. Governing Law</h2>
            <p>
              These Terms shall be interpreted and governed by the laws of the State of California, without regard to 
              conflict of law provisions.
            </p>
          </div>

          <div className="terms-section">
            <h2>14. Contact Information</h2>
            <p>
              If you have any questions about these Terms of Service, please contact us at:
            </p>
            <div className="contact-info">
              <p>Email: legal@skillswap.com</p>
              <p>Address: 123 Skill Street, Learning City, LC 12345</p>
            </div>
          </div>
        </div>

        <div className="terms-footer">
          <p>
            By using SkillSwap, you acknowledge that you have read and understood these Terms of Service 
            and agree to be bound by them.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Terms;
