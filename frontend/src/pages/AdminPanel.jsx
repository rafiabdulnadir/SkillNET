import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import Pagination, { usePagination } from '../components/Pagination.jsx';

const AdminPanel = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({});
  const [users, setUsers] = useState([]);
  const [skills, setSkills] = useState([]);
  const [reports, setReports] = useState([]);

  // Check if user is admin
  const isAdmin = user?.role === 'admin' || user?.email === 'admin@skillswap.com';

  // Pagination for users
  const usersPagination = usePagination({
    totalItems: users.length,
    itemsPerPage: 10,
    initialPage: 1
  });

  // Mock admin data
  const mockStats = {
    totalUsers: 5247,
    activeUsers: 3891,
    totalSkills: 12456,
    totalSessions: 8934,
    reportsCount: 23,
    revenue: 45678.90
  };

  const mockUsers = [
    {
      id: 1,
      name: 'Sarah Chen',
      email: 'sarah@example.com',
      joinDate: '2023-10-15',
      status: 'active',
      skillsCount: 3,
      sessionsCount: 12,
      rating: 4.8
    },
    {
      id: 2,
      name: 'Marcus Johnson',
      email: 'marcus@example.com',
      joinDate: '2023-11-02',
      status: 'active',
      skillsCount: 2,
      sessionsCount: 8,
      rating: 4.6
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      email: 'emily@example.com',
      joinDate: '2023-09-20',
      status: 'suspended',
      skillsCount: 1,
      sessionsCount: 3,
      rating: 3.2
    }
  ];

  const mockSkills = [
    {
      id: 1,
      title: 'React Development',
      teacher: 'Sarah Chen',
      category: 'Web Development',
      status: 'approved',
      createdDate: '2023-11-01',
      studentsCount: 15
    },
    {
      id: 2,
      title: 'UI/UX Design',
      teacher: 'Marcus Johnson',
      category: 'Design',
      status: 'pending',
      createdDate: '2023-11-15',
      studentsCount: 0
    }
  ];

  const mockReports = [
    {
      id: 1,
      type: 'inappropriate_content',
      reporter: 'John Doe',
      reported: 'Jane Smith',
      reason: 'Inappropriate skill description',
      status: 'pending',
      date: '2023-11-20'
    },
    {
      id: 2,
      type: 'harassment',
      reporter: 'Alice Brown',
      reported: 'Bob Wilson',
      reason: 'Harassment in messages',
      status: 'resolved',
      date: '2023-11-18'
    }
  ];

  useEffect(() => {
    const fetchAdminData = async () => {
      if (!isAdmin) return;
      
      setLoading(true);
      try {
        // Simulate API calls
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setStats(mockStats);
        setUsers(mockUsers);
        setSkills(mockSkills);
        setReports(mockReports);
      } catch (error) {
        console.error('Error fetching admin data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, [isAdmin]);

  // Handle user actions
  const handleUserAction = async (userId, action) => {
    try {
      console.log(`${action} user ${userId}`);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setUsers(prev => prev.map(user => 
        user.id === userId 
          ? { ...user, status: action === 'suspend' ? 'suspended' : 'active' }
          : user
      ));
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  // Handle skill actions
  const handleSkillAction = async (skillId, action) => {
    try {
      console.log(`${action} skill ${skillId}`);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setSkills(prev => prev.map(skill => 
        skill.id === skillId 
          ? { ...skill, status: action }
          : skill
      ));
    } catch (error) {
      console.error('Error updating skill:', error);
    }
  };

  // Handle report actions
  const handleReportAction = async (reportId, action) => {
    try {
      console.log(`${action} report ${reportId}`);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setReports(prev => prev.map(report => 
        report.id === reportId 
          ? { ...report, status: action }
          : report
      ));
    } catch (error) {
      console.error('Error updating report:', error);
    }
  };

  if (!isAdmin) {
    return (
      <div className="admin-unauthorized">
        <div className="container">
          <div className="unauthorized-content">
            <div className="unauthorized-icon">🚫</div>
            <h1>Access Denied</h1>
            <p>You don't have permission to access the admin panel.</p>
            <a href="/" className="btn btn-primary">
              Go to Homepage
            </a>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="container">
          <LoadingSpinner size="large" />
          <p>Loading admin panel...</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', name: 'Overview', icon: '📊' },
    { id: 'users', name: 'Users', icon: '👥' },
    { id: 'skills', name: 'Skills', icon: '🎯' },
    { id: 'reports', name: 'Reports', icon: '⚠️', badge: reports.filter(r => r.status === 'pending').length }
  ];

  return (
    <div className="admin-panel">
      <div className="container">
        {/* Header */}
        <div className="admin-header">
          <h1>Admin Panel</h1>
          <p>Manage users, skills, and platform content</p>
        </div>

        {/* Navigation Tabs */}
        <div className="admin-tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`admin-tab ${activeTab === tab.id ? 'active' : ''}`}
            >
              <span className="tab-icon">{tab.icon}</span>
              <span className="tab-name">{tab.name}</span>
              {tab.badge > 0 && (
                <span className="tab-badge">{tab.badge}</span>
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="admin-content">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="overview-tab">
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-icon">👥</div>
                  <div className="stat-content">
                    <div className="stat-number">{stats.totalUsers?.toLocaleString()}</div>
                    <div className="stat-label">Total Users</div>
                    <div className="stat-change positive">+12% this month</div>
                  </div>
                </div>
                
                <div className="stat-card">
                  <div className="stat-icon">🎯</div>
                  <div className="stat-content">
                    <div className="stat-number">{stats.totalSkills?.toLocaleString()}</div>
                    <div className="stat-label">Total Skills</div>
                    <div className="stat-change positive">+8% this month</div>
                  </div>
                </div>
                
                <div className="stat-card">
                  <div className="stat-icon">✅</div>
                  <div className="stat-content">
                    <div className="stat-number">{stats.totalSessions?.toLocaleString()}</div>
                    <div className="stat-label">Sessions Completed</div>
                    <div className="stat-change positive">+15% this month</div>
                  </div>
                </div>
                
                <div className="stat-card">
                  <div className="stat-icon">⚠️</div>
                  <div className="stat-content">
                    <div className="stat-number">{stats.reportsCount}</div>
                    <div className="stat-label">Pending Reports</div>
                    <div className="stat-change negative">+3 this week</div>
                  </div>
                </div>
              </div>

              <div className="overview-charts">
                <div className="chart-placeholder">
                  <h3>User Growth</h3>
                  <p>Chart showing user registration trends over time</p>
                </div>
                <div className="chart-placeholder">
                  <h3>Skill Categories</h3>
                  <p>Distribution of skills by category</p>
                </div>
              </div>
            </div>
          )}

          {/* Users Tab */}
          {activeTab === 'users' && (
            <div className="users-tab">
              <div className="tab-header">
                <h2>User Management</h2>
                <div className="tab-actions">
                  <input
                    type="search"
                    placeholder="Search users..."
                    className="search-input"
                  />
                  <button className="btn btn-outline">Export</button>
                </div>
              </div>

              <div className="users-table">
                <table>
                  <thead>
                    <tr>
                      <th>User</th>
                      <th>Email</th>
                      <th>Join Date</th>
                      <th>Skills</th>
                      <th>Sessions</th>
                      <th>Rating</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.slice(
                      (usersPagination.currentPage - 1) * usersPagination.pageSize,
                      usersPagination.currentPage * usersPagination.pageSize
                    ).map(user => (
                      <tr key={user.id}>
                        <td>
                          <div className="user-info">
                            <div className="user-avatar">
                              {user.name.charAt(0)}
                            </div>
                            <span>{user.name}</span>
                          </div>
                        </td>
                        <td>{user.email}</td>
                        <td>{new Date(user.joinDate).toLocaleDateString()}</td>
                        <td>{user.skillsCount}</td>
                        <td>{user.sessionsCount}</td>
                        <td>
                          <div className="rating">
                            ⭐ {user.rating}
                          </div>
                        </td>
                        <td>
                          <span className={`status-badge ${user.status}`}>
                            {user.status}
                          </span>
                        </td>
                        <td>
                          <div className="action-buttons">
                            {user.status === 'active' ? (
                              <button
                                onClick={() => handleUserAction(user.id, 'suspend')}
                                className="btn btn-small btn-outline danger"
                              >
                                Suspend
                              </button>
                            ) : (
                              <button
                                onClick={() => handleUserAction(user.id, 'activate')}
                                className="btn btn-small btn-outline success"
                              >
                                Activate
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {usersPagination.totalPages > 1 && (
                <Pagination
                  currentPage={usersPagination.currentPage}
                  totalPages={usersPagination.totalPages}
                  totalItems={users.length}
                  itemsPerPage={usersPagination.pageSize}
                  onPageChange={usersPagination.goToPage}
                  showInfo={true}
                />
              )}
            </div>
          )}

          {/* Skills Tab */}
          {activeTab === 'skills' && (
            <div className="skills-tab">
              <div className="tab-header">
                <h2>Skill Management</h2>
                <div className="tab-actions">
                  <select className="filter-select">
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              </div>

              <div className="skills-grid">
                {skills.map(skill => (
                  <div key={skill.id} className="skill-admin-card">
                    <div className="skill-header">
                      <h3>{skill.title}</h3>
                      <span className={`status-badge ${skill.status}`}>
                        {skill.status}
                      </span>
                    </div>
                    <div className="skill-details">
                      <p><strong>Teacher:</strong> {skill.teacher}</p>
                      <p><strong>Category:</strong> {skill.category}</p>
                      <p><strong>Students:</strong> {skill.studentsCount}</p>
                      <p><strong>Created:</strong> {new Date(skill.createdDate).toLocaleDateString()}</p>
                    </div>
                    <div className="skill-actions">
                      {skill.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleSkillAction(skill.id, 'approved')}
                            className="btn btn-small btn-success"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleSkillAction(skill.id, 'rejected')}
                            className="btn btn-small btn-danger"
                          >
                            Reject
                          </button>
                        </>
                      )}
                      {skill.status === 'approved' && (
                        <button
                          onClick={() => handleSkillAction(skill.id, 'suspended')}
                          className="btn btn-small btn-outline danger"
                        >
                          Suspend
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Reports Tab */}
          {activeTab === 'reports' && (
            <div className="reports-tab">
              <div className="tab-header">
                <h2>User Reports</h2>
                <div className="tab-actions">
                  <select className="filter-select">
                    <option value="all">All Reports</option>
                    <option value="pending">Pending</option>
                    <option value="resolved">Resolved</option>
                    <option value="dismissed">Dismissed</option>
                  </select>
                </div>
              </div>

              <div className="reports-list">
                {reports.map(report => (
                  <div key={report.id} className="report-card">
                    <div className="report-header">
                      <div className="report-type">
                        <span className="type-badge">{report.type.replace('_', ' ')}</span>
                        <span className={`status-badge ${report.status}`}>
                          {report.status}
                        </span>
                      </div>
                      <div className="report-date">
                        {new Date(report.date).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="report-content">
                      <p><strong>Reporter:</strong> {report.reporter}</p>
                      <p><strong>Reported User:</strong> {report.reported}</p>
                      <p><strong>Reason:</strong> {report.reason}</p>
                    </div>
                    {report.status === 'pending' && (
                      <div className="report-actions">
                        <button
                          onClick={() => handleReportAction(report.id, 'resolved')}
                          className="btn btn-small btn-success"
                        >
                          Resolve
                        </button>
                        <button
                          onClick={() => handleReportAction(report.id, 'dismissed')}
                          className="btn btn-small btn-outline"
                        >
                          Dismiss
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
