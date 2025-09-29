import React from 'react';

const PrivacyPolicy = () => {
  const lastUpdated = 'December 1, 2023';

  return (
    <div className="privacy-page">
      <div className="container">
        <div className="privacy-header">
          <h1>Privacy Policy</h1>
          <p className="last-updated">Last updated: {lastUpdated}</p>
        </div>

        <div className="privacy-content">
          <div className="privacy-section">
            <h2>1. Information We Collect</h2>
            <h3>1.1 Personal Information</h3>
            <p>We collect information you provide directly to us, such as:</p>
            <ul>
              <li>Name and contact information (email address, phone number)</li>
              <li>Profile information (bio, skills, location)</li>
              <li>Account credentials (username, password)</li>
              <li>Communication data (messages, reviews, ratings)</li>
            </ul>
            <h3>1.2 Usage Information</h3>
            <p>We automatically collect information about your use of our Service, including:</p>
            <ul>
              <li>Device information (IP address, browser type, operating system)</li>
              <li>Usage patterns (pages visited, time spent, features used)</li>
              <li>Log data (access times, error logs, performance data)</li>
            </ul>
          </div>

          <div className="privacy-section">
            <h2>2. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Provide, maintain, and improve our Service</li>
              <li>Connect you with other users for skill exchanges</li>
              <li>Send you notifications and updates</li>
              <li>Respond to your comments and questions</li>
              <li>Analyze usage patterns to improve user experience</li>
              <li>Prevent fraud and ensure platform safety</li>
            </ul>
          </div>

          <div className="privacy-section">
            <h2>3. Information Sharing</h2>
            <h3>3.1 With Other Users</h3>
            <p>
              Your profile information, skills, and ratings are visible to other users to facilitate skill exchanges. 
              You can control what information is shared through your privacy settings.
            </p>
            <h3>3.2 With Service Providers</h3>
            <p>
              We may share your information with third-party service providers who help us operate our Service, 
              such as hosting providers, analytics services, and customer support tools.
            </p>
            <h3>3.3 Legal Requirements</h3>
            <p>
              We may disclose your information if required by law or if we believe such disclosure is necessary 
              to protect our rights or comply with legal obligations.
            </p>
          </div>

          <div className="privacy-section">
            <h2>4. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal information 
              against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission 
              over the internet is 100% secure.
            </p>
          </div>

          <div className="privacy-section">
            <h2>5. Data Retention</h2>
            <p>
              We retain your personal information for as long as necessary to provide our Service and fulfill 
              the purposes outlined in this Privacy Policy, unless a longer retention period is required by law.
            </p>
          </div>

          <div className="privacy-section">
            <h2>6. Your Rights</h2>
            <p>Depending on your location, you may have the following rights:</p>
            <ul>
              <li><strong>Access:</strong> Request access to your personal information</li>
              <li><strong>Correction:</strong> Request correction of inaccurate information</li>
              <li><strong>Deletion:</strong> Request deletion of your personal information</li>
              <li><strong>Portability:</strong> Request a copy of your data in a portable format</li>
              <li><strong>Objection:</strong> Object to certain processing of your information</li>
            </ul>
          </div>

          <div className="privacy-section">
            <h2>7. Cookies and Tracking</h2>
            <p>
              We use cookies and similar tracking technologies to enhance your experience on our Service. 
              You can control cookie settings through your browser preferences.
            </p>
          </div>

          <div className="privacy-section">
            <h2>8. Third-Party Links</h2>
            <p>
              Our Service may contain links to third-party websites. We are not responsible for the privacy 
              practices of these external sites and encourage you to review their privacy policies.
            </p>
          </div>

          <div className="privacy-section">
            <h2>9. Children's Privacy</h2>
            <p>
              Our Service is not intended for children under 13 years of age. We do not knowingly collect 
              personal information from children under 13.
            </p>
          </div>

          <div className="privacy-section">
            <h2>10. International Data Transfers</h2>
            <p>
              Your information may be transferred to and processed in countries other than your own. 
              We ensure appropriate safeguards are in place for such transfers.
            </p>
          </div>

          <div className="privacy-section">
            <h2>11. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any material changes 
              by posting the new policy on this page and updating the "Last updated" date.
            </p>
          </div>

          <div className="privacy-section">
            <h2>12. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy or our privacy practices, please contact us at:
            </p>
            <div className="contact-info">
              <p>Email: privacy@skillswap.com</p>
              <p>Address: 123 Skill Street, Learning City, LC 12345</p>
            </div>
          </div>
        </div>

        <div className="privacy-footer">
          <p>
            By using SkillSwap, you acknowledge that you have read and understood this Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
