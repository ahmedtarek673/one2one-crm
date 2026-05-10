import React, { useState, Suspense, lazy } from 'react';
import ProfileLogin from '@/components/ProfileLogin';

const Header = lazy(() => import('@/components/Header'));
const LeadProvider = lazy(() => import('@/contexts/LeadContext').then(m => ({ default: m.LeadProvider })));
const AdminDashboard = lazy(() => import('@/components/AdminDashboard'));
const SalesRepDashboard = lazy(() => import('@/components/SalesRepDashboard'));

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUserType, setCurrentUserType] = useState('admin');
  const [currentUserName, setCurrentUserName] = useState('Admin User');

  const handleLogin = (userType: string, userName: string) => {
    setCurrentUserType(userType);
    setCurrentUserName(userName);
    setIsLoggedIn(true);
  };

  const handleUserChange = (userType: string, userName: string) => {
    setCurrentUserType(userType);
    setCurrentUserName(userName);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUserType('admin');
    setCurrentUserName('Admin User');
  };

  if (!isLoggedIn) {
    return <ProfileLogin onLogin={handleLogin} />;
  }

  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    }>
      <LeadProvider>
        <div className="min-h-screen bg-gray-50">
          <Header 
            userType={currentUserType} 
            userName={currentUserName}
            onUserChange={handleUserChange}
            onLogout={handleLogout}
          />
          
          <Suspense fallback={
            <div className="flex items-center justify-center min-h-96">
              <div className="text-lg">Loading...</div>
            </div>
          }>
            {currentUserType === 'admin' ? (
              <AdminDashboard />
            ) : (
              <SalesRepDashboard repName={currentUserName} />
            )}
          </Suspense>
        </div>
      </LeadProvider>
    </Suspense>
  );
};

export default Index;
