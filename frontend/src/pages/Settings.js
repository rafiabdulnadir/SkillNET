import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme, ThemeSelector } from '../contexts/ThemeContext';
import LoadingSpinner from '../components/LoadingSpinner';
import Modal, { ConfirmModal, useModal } from '../components/Modal';

const Settings = () => {
  const { user, updateUser } = useAuth();
  const { theme } = useTheme();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [activeTab, setActiveTab] = useState('profile');

  // Modal hooks
  const deleteAccountModal = useModal();
  const deactivateAccountModal = useModal();

  // Form states
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    bio: '',
    location: '',
    website: '',
    linkedin: '',
    github: '',
    twitter: ''
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    messageNotifications: true,
    skillRequestNotifications: true,
    ratingNotifications: true,
    marketingEmails: false,
    weeklyDigest: true,
    sessionReminders: true
  });

  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'public',
    showEmail: false,
    showLocation: true,
    showSocialLinks: true,
    allowMessages: true,
    allowSkillRequests: true,
    showOnlineStatus: true,
    dataProcessing: true
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorEnabled: false,
    loginAlerts: true,
    sessionTimeout: '24h',
    passwordLastChanged: new Date('2024-01-15')
  });

  // Load user settings
  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || '',
        email: user.email || '',
        bio: user.bio || '',
        location: user.location || '',
        website: user.website || '',
        linkedin: user.linkedin || '',
        github: user.github || '',
        twitter: user.twitter || ''
      });
    }
  }, [user]);

  // Handle profile form changes
  const handleProfileChange = (field, value) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  // Handle notification settings changes
  const handleNotificationChange = (field, value) => {
    setNotificationSettings(prev => ({ ...prev, [field]: value }));
  };

  // Handle privacy settings changes
  const handlePrivacyChange = (field, value) => {
    setPrivacySettings(prev => ({ ...prev, [field]: value }));
  };

  // Handle security settings changes
  const handleSecurityChange = (field, value) => {
    setSecuritySettings(prev => ({ ...prev, [field]: value }));
  };

  // Save profile settings
  const saveProfileSettings = async () => {
    try {
      setSaving(true);
      setError(null);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update user context
      updateUser({ ...user, ...profileData });
      
      setSuccess('Profile settings saved successfully!');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError('Failed to save profile settings');
      console.error('Profile save error:', err);
    } finally {
      setSaving(false);
    }
  };

  // Save notification settings
  const saveNotificationSettings = async () => {
    try {
      setSaving(true);
      setError(null);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setSuccess('Notification settings saved successfully!');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError('Failed to save notification settings');
      console.error('Notification save error:', err);
    } finally {
      setSaving(false);
    }
  };

  // Save privacy settings
  const savePrivacySettings = async () => {
    try {
      setSaving(true);
      setError(null);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setSuccess('Privacy settings saved successfully!');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError('Failed to save privacy settings');
      console.error('Privacy save error:', err);
    } finally {
      setSaving(false);
    }
  };

  // Save security settings
  const saveSecuritySettings = async () => {
    try {
      setSaving(true);
      setError(null);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setSuccess('Security settings saved successfully!');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError('Failed to save security settings');
      console.error('Security save error:', err);
    } finally {
      setSaving(false);
    }
  };

  // Handle account deactivation
  const handleDeactivateAccount = async () => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In real app, this would deactivate the account
      alert('Account deactivated successfully');
      deactivateAccountModal.closeModal();
    } catch (err) {
      setError('Failed to deactivate account');
    } finally {
      setLoading(false);
    }
  };

  // Handle account deletion
  const handleDeleteAccount = async () => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In real app, this would delete the account
      alert('Account deleted successfully');
      deleteAccountModal.closeModal();
    } catch (err) {
      setError('Failed to delete account');
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: '👤' },
    { id: 'notifications', label: 'Notifications', icon: '🔔' },
    { id: 'privacy', label: 'Privacy', icon: '🔒' },
    { id: 'security', label: 'Security', icon: '🛡️' },
    { id: 'appearance', label: 'Appearance', icon: '🎨' },
    { id: 'account', label: 'Account', icon: '⚙️' }
  ];

  return (
    <div className="settings-page">
      <div className="container">
        {/* Settings Header */}
        <div className="settings-header">
          <h1 className="settings-title">Settings</h1>
          <p className="settings-subtitle">
            Manage your account preferences and privacy settings
          </p>
        </div>

        {/* Success/Error Messages */}
        {success && (
          <div className="alert alert-success">
            <span className="alert-icon">✅</span>
            {success}
          </div>
        )}

        {error && (
          <div className="alert alert-error">
            <span className="alert-icon">❌</span>
            {error}
          </div>
        )}

        {/* Settings Content */}
        <div className="settings-content">
          {/* Settings Tabs */}
          <div className="settings-tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`settings-tab ${activeTab === tab.id ? 'active' : ''}`}
              >
                <span className="tab-icon">{tab.icon}</span>
                <span className="tab-label">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Settings Panels */}
          <div className="settings-panels">
            {/* Profile Settings */}
            {activeTab === 'profile' && (
              <div className="settings-panel">
                <div className="panel-header">
                  <h2>Profile Information</h2>
                  <p>Update your personal information and public profile</p>
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input
                      id="name"
                      type="text"
                      value={profileData.name}
                      onChange={(e) => handleProfileChange('name', e.target.value)}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => handleProfileChange('email', e.target.value)}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group full-width">
                    <label htmlFor="bio">Bio</label>
                    <textarea
                      id="bio"
                      value={profileData.bio}
                      onChange={(e) => handleProfileChange('bio', e.target.value)}
                      className="form-input"
                      rows="4"
                      placeholder="Tell others about yourself and your skills..."
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="location">Location</label>
                    <input
                      id="location"
                      type="text"
                      value={profileData.location}
                      onChange={(e) => handleProfileChange('location', e.target.value)}
                      className="form-input"
                      placeholder="City, Country"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="website">Website</label>
                    <input
                      id="website"
                      type="url"
                      value={profileData.website}
                      onChange={(e) => handleProfileChange('website', e.target.value)}
                      className="form-input"
                      placeholder="https://yourwebsite.com"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="linkedin">LinkedIn</label>
                    <input
                      id="linkedin"
                      type="url"
                      value={profileData.linkedin}
                      onChange={(e) => handleProfileChange('linkedin', e.target.value)}
                      className="form-input"
                      placeholder="https://linkedin.com/in/username"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="github">GitHub</label>
                    <input
                      id="github"
                      type="url"
                      value={profileData.github}
                      onChange={(e) => handleProfileChange('github', e.target.value)}
                      className="form-input"
                      placeholder="https://github.com/username"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="twitter">Twitter</label>
                    <input
                      id="twitter"
                      type="url"
                      value={profileData.twitter}
                      onChange={(e) => handleProfileChange('twitter', e.target.value)}
                      className="form-input"
                      placeholder="https://twitter.com/username"
                    />
                  </div>
                </div>

                <div className="panel-actions">
                  <button
                    onClick={saveProfileSettings}
                    disabled={saving}
                    className="btn btn-primary"
                  >
                    {saving ? <LoadingSpinner size="small" /> : 'Save Changes'}
                  </button>
                </div>
              </div>
            )}

            {/* Notification Settings */}
            {activeTab === 'notifications' && (
              <div className="settings-panel">
                <div className="panel-header">
                  <h2>Notification Preferences</h2>
                  <p>Choose how you want to be notified about activity</p>
                </div>

                <div className="settings-groups">
                  <div className="settings-group">
                    <h3>General Notifications</h3>
                    
                    <div className="setting-item">
                      <div className="setting-info">
                        <label>Email Notifications</label>
                        <p>Receive notifications via email</p>
                      </div>
                      <label className="toggle-switch">
                        <input
                          type="checkbox"
                          checked={notificationSettings.emailNotifications}
                          onChange={(e) => handleNotificationChange('emailNotifications', e.target.checked)}
                        />
                        <span className="toggle-slider"></span>
                      </label>
                    </div>

                    <div className="setting-item">
                      <div className="setting-info">
                        <label>Push Notifications</label>
                        <p>Receive push notifications in your browser</p>
                      </div>
                      <label className="toggle-switch">
                        <input
                          type="checkbox"
                          checked={notificationSettings.pushNotifications}
                          onChange={(e) => handleNotificationChange('pushNotifications', e.target.checked)}
                        />
                        <span className="toggle-slider"></span>
                      </label>
                    </div>
                  </div>

                  <div className="settings-group">
                    <h3>Activity Notifications</h3>
                    
                    <div className="setting-item">
                      <div className="setting-info">
                        <label>New Messages</label>
                        <p>When someone sends you a message</p>
                      </div>
                      <label className="toggle-switch">
                        <input
                          type="checkbox"
                          checked={notificationSettings.messageNotifications}
                          onChange={(e) => handleNotificationChange('messageNotifications', e.target.checked)}
                        />
                        <span className="toggle-slider"></span>
                      </label>
                    </div>

                    <div className="setting-item">
                      <div className="setting-info">
                        <label>Skill Requests</label>
                        <p>When someone requests to learn from you</p>
                      </div>
                      <label className="toggle-switch">
                        <input
                          type="checkbox"
                          checked={notificationSettings.skillRequestNotifications}
                          onChange={(e) => handleNotificationChange('skillRequestNotifications', e.target.checked)}
                        />
                        <span className="toggle-slider"></span>
                      </label>
                    </div>

                    <div className="setting-item">
                      <div className="setting-info">
                        <label>Ratings & Reviews</label>
                        <p>When someone rates your teaching</p>
                      </div>
                      <label className="toggle-switch">
                        <input
                          type="checkbox"
                          checked={notificationSettings.ratingNotifications}
                          onChange={(e) => handleNotificationChange('ratingNotifications', e.target.checked)}
                        />
                        <span className="toggle-slider"></span>
                      </label>
                    </div>
                  </div>

                  <div className="settings-group">
                    <h3>Email Preferences</h3>
                    
                    <div className="setting-item">
                      <div className="setting-info">
                        <label>Marketing Emails</label>
                        <p>Receive updates about new features and tips</p>
                      </div>
                      <label className="toggle-switch">
                        <input
                          type="checkbox"
                          checked={notificationSettings.marketingEmails}
                          onChange={(e) => handleNotificationChange('marketingEmails', e.target.checked)}
                        />
                        <span className="toggle-slider"></span>
                      </label>
                    </div>

                    <div className="setting-item">
                      <div className="setting-info">
                        <label>Weekly Digest</label>
                        <p>Weekly summary of your activity and opportunities</p>
                      </div>
                      <label className="toggle-switch">
                        <input
                          type="checkbox"
                          checked={notificationSettings.weeklyDigest}
                          onChange={(e) => handleNotificationChange('weeklyDigest', e.target.checked)}
                        />
                        <span className="toggle-slider"></span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="panel-actions">
                  <button
                    onClick={saveNotificationSettings}
                    disabled={saving}
                    className="btn btn-primary"
                  >
                    {saving ? <LoadingSpinner size="small" /> : 'Save Preferences'}
                  </button>
                </div>
              </div>
            )}

            {/* Privacy Settings */}
            {activeTab === 'privacy' && (
              <div className="settings-panel">
                <div className="panel-header">
                  <h2>Privacy Settings</h2>
                  <p>Control who can see your information and contact you</p>
                </div>

                <div className="settings-groups">
                  <div className="settings-group">
                    <h3>Profile Visibility</h3>
                    
                    <div className="setting-item">
                      <div className="setting-info">
                        <label>Profile Visibility</label>
                        <p>Who can see your profile</p>
                      </div>
                      <select
                        value={privacySettings.profileVisibility}
                        onChange={(e) => handlePrivacyChange('profileVisibility', e.target.value)}
                        className="form-select"
                      >
                        <option value="public">Public</option>
                        <option value="members">Members Only</option>
                        <option value="private">Private</option>
                      </select>
                    </div>

                    <div className="setting-item">
                      <div className="setting-info">
                        <label>Show Email Address</label>
                        <p>Display your email on your public profile</p>
                      </div>
                      <label className="toggle-switch">
                        <input
                          type="checkbox"
                          checked={privacySettings.showEmail}
                          onChange={(e) => handlePrivacyChange('showEmail', e.target.checked)}
                        />
                        <span className="toggle-slider"></span>
                      </label>
                    </div>

                    <div className="setting-item">
                      <div className="setting-info">
                        <label>Show Location</label>
                        <p>Display your location on your profile</p>
                      </div>
                      <label className="toggle-switch">
                        <input
                          type="checkbox"
                          checked={privacySettings.showLocation}
                          onChange={(e) => handlePrivacyChange('showLocation', e.target.checked)}
                        />
                        <span className="toggle-slider"></span>
                      </label>
                    </div>
                  </div>

                  <div className="settings-group">
                    <h3>Communication</h3>
                    
                    <div className="setting-item">
                      <div className="setting-info">
                        <label>Allow Messages</label>
                        <p>Let other members send you messages</p>
                      </div>
                      <label className="toggle-switch">
                        <input
                          type="checkbox"
                          checked={privacySettings.allowMessages}
                          onChange={(e) => handlePrivacyChange('allowMessages', e.target.checked)}
                        />
                        <span className="toggle-slider"></span>
                      </label>
                    </div>

                    <div className="setting-item">
                      <div className="setting-info">
                        <label>Allow Skill Requests</label>
                        <p>Let others request to learn from you</p>
                      </div>
                      <label className="toggle-switch">
                        <input
                          type="checkbox"
                          checked={privacySettings.allowSkillRequests}
                          onChange={(e) => handlePrivacyChange('allowSkillRequests', e.target.checked)}
                        />
                        <span className="toggle-slider"></span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="panel-actions">
                  <button
                    onClick={savePrivacySettings}
                    disabled={saving}
                    className="btn btn-primary"
                  >
                    {saving ? <LoadingSpinner size="small" /> : 'Save Privacy Settings'}
                  </button>
                </div>
              </div>
            )}

            {/* Security Settings */}
            {activeTab === 'security' && (
              <div className="settings-panel">
                <div className="panel-header">
                  <h2>Security Settings</h2>
                  <p>Manage your account security and login preferences</p>
                </div>

                <div className="settings-groups">
                  <div className="settings-group">
                    <h3>Account Security</h3>
                    
                    <div className="setting-item">
                      <div className="setting-info">
                        <label>Two-Factor Authentication</label>
                        <p>Add an extra layer of security to your account</p>
                      </div>
                      <button className="btn btn-outline btn-small">
                        {securitySettings.twoFactorEnabled ? 'Disable 2FA' : 'Enable 2FA'}
                      </button>
                    </div>

                    <div className="setting-item">
                      <div className="setting-info">
                        <label>Password</label>
                        <p>Last changed: {securitySettings.passwordLastChanged.toLocaleDateString()}</p>
                      </div>
                      <button className="btn btn-outline btn-small">
                        Change Password
                      </button>
                    </div>
                  </div>

                  <div className="settings-group">
                    <h3>Login Preferences</h3>
                    
                    <div className="setting-item">
                      <div className="setting-info">
                        <label>Login Alerts</label>
                        <p>Get notified of new login attempts</p>
                      </div>
                      <label className="toggle-switch">
                        <input
                          type="checkbox"
                          checked={securitySettings.loginAlerts}
                          onChange={(e) => handleSecurityChange('loginAlerts', e.target.checked)}
                        />
                        <span className="toggle-slider"></span>
                      </label>
                    </div>

                    <div className="setting-item">
                      <div className="setting-info">
                        <label>Session Timeout</label>
                        <p>Automatically log out after inactivity</p>
                      </div>
                      <select
                        value={securitySettings.sessionTimeout}
                        onChange={(e) => handleSecurityChange('sessionTimeout', e.target.value)}
                        className="form-select"
                      >
                        <option value="1h">1 hour</option>
                        <option value="8h">8 hours</option>
                        <option value="24h">24 hours</option>
                        <option value="7d">7 days</option>
                        <option value="never">Never</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="panel-actions">
                  <button
                    onClick={saveSecuritySettings}
                    disabled={saving}
                    className="btn btn-primary"
                  >
                    {saving ? <LoadingSpinner size="small" /> : 'Save Security Settings'}
                  </button>
                </div>
              </div>
            )}

            {/* Appearance Settings */}
            {activeTab === 'appearance' && (
              <div className="settings-panel">
                <div className="panel-header">
                  <h2>Appearance</h2>
                  <p>Customize how SkillSwap looks and feels</p>
                </div>

                <div className="settings-groups">
                  <div className="settings-group">
                    <ThemeSelector />
                  </div>
                </div>
              </div>
            )}

            {/* Account Settings */}
            {activeTab === 'account' && (
              <div className="settings-panel">
                <div className="panel-header">
                  <h2>Account Management</h2>
                  <p>Manage your account status and data</p>
                </div>

                <div className="settings-groups">
                  <div className="settings-group">
                    <h3>Account Actions</h3>
                    
                    <div className="setting-item danger">
                      <div className="setting-info">
                        <label>Deactivate Account</label>
                        <p>Temporarily disable your account. You can reactivate it anytime.</p>
                      </div>
                      <button
                        onClick={deactivateAccountModal.openModal}
                        className="btn btn-outline btn-small danger"
                      >
                        Deactivate
                      </button>
                    </div>

                    <div className="setting-item danger">
                      <div className="setting-info">
                        <label>Delete Account</label>
                        <p>Permanently delete your account and all data. This cannot be undone.</p>
                      </div>
                      <button
                        onClick={deleteAccountModal.openModal}
                        className="btn btn-outline btn-small danger"
                      >
                        Delete Account
                      </button>
                    </div>
                  </div>

                  <div className="settings-group">
                    <h3>Data & Privacy</h3>
                    
                    <div className="setting-item">
                      <div className="setting-info">
                        <label>Download Your Data</label>
                        <p>Get a copy of all your data in JSON format</p>
                      </div>
                      <button className="btn btn-outline btn-small">
                        Download Data
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Confirmation Modals */}
        <ConfirmModal
          isOpen={deactivateAccountModal.isOpen}
          onClose={deactivateAccountModal.closeModal}
          onConfirm={handleDeactivateAccount}
          title="Deactivate Account"
          message="Are you sure you want to deactivate your account? You can reactivate it anytime by logging in."
          confirmText="Deactivate"
          confirmVariant="warning"
          isLoading={loading}
        />

        <ConfirmModal
          isOpen={deleteAccountModal.isOpen}
          onClose={deleteAccountModal.closeModal}
          onConfirm={handleDeleteAccount}
          title="Delete Account"
          message="Are you sure you want to permanently delete your account? This action cannot be undone and all your data will be lost."
          confirmText="Delete Forever"
          confirmVariant="error"
          isLoading={loading}
        />
      </div>
    </div>
  );
};

export default Settings;
