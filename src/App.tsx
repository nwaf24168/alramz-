import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import DataEntry from './pages/DataEntry';
import { Moon, Sun } from 'lucide-react';

// Initial data state with support for both weekly and annual entries
const initialData = {
  entries: [
    {
      entryType: 'weekly',
      entryDate: new Date().toISOString().split('T')[0],
      timestamp: new Date().toISOString(),
      npsNew: 62,
      npsNewAfterYear: 63,
      npsOld: 28,
      deliveryQuality: 98,
      maintenanceQuality: 95,
      callResponseTime: 3.5,
      callResponseRate: 28,
      csatScore: 68,
      maintenanceClosureSpeed: 3.2,
      maintenanceReopens: 2,
      salesContribution: 4.8,
      qualifiedCustomers: 550,
      deliverySatisfaction: 78,
      conversionRate: 1.8,
      facilityManagement: 0.75,
      // Customer service data
      interestedCustomers: 150,
      futureProjectsInterest: 85,
      officeInterest: 45,
      inquiries: 230,
      maintenanceRequests: 120,
      contactRequests: 95,
      complaints: 25,
      // Customer inquiries
      soldProjects: 75,
      apartmentRentals: 120,
      deedInquiries: 90,
      documentRequests: 45,
      generalInquiries: 180,
      // Maintenance satisfaction
      maintenanceServiceSatisfaction: 'راضي',
      closureTimeSatisfaction: 'راضي',
      firstTimeResolution: 'راضي',
      maintenanceNotes: ''
    }
  ],
  // Current view data (will be updated based on selected entry)
  currentView: {
    weekly: {
      npsNew: 62,
      npsNewAfterYear: 63,
      npsOld: 28,
      deliveryQuality: 98,
      maintenanceQuality: 95,
      callResponseTime: 3.5,
      callResponseRate: 28,
      csatScore: 68,
      maintenanceClosureSpeed: 3.2,
      maintenanceReopens: 2,
      salesContribution: 4.8,
      qualifiedCustomers: 550,
      deliverySatisfaction: 78,
      conversionRate: 1.8,
      facilityManagement: 0.75,
      interestedCustomers: 150,
      futureProjectsInterest: 85,
      officeInterest: 45,
      inquiries: 230,
      maintenanceRequests: 120,
      contactRequests: 95,
      complaints: 25,
      soldProjects: 75,
      apartmentRentals: 120,
      deedInquiries: 90,
      documentRequests: 45,
      generalInquiries: 180,
      maintenanceServiceSatisfaction: 'راضي',
      closureTimeSatisfaction: 'راضي',
      firstTimeResolution: 'راضي',
      maintenanceNotes: ''
    },
    annual: {
      npsNew: 65,
      npsNewAfterYear: 67,
      npsOld: 32,
      deliveryQuality: 99,
      maintenanceQuality: 97,
      callResponseTime: 3.0,
      callResponseRate: 32,
      csatScore: 72,
      maintenanceClosureSpeed: 2.8,
      maintenanceReopens: 1,
      salesContribution: 5.2,
      qualifiedCustomers: 584,
      deliverySatisfaction: 82,
      conversionRate: 2.1,
      facilityManagement: 0.82,
      interestedCustomers: 165,
      futureProjectsInterest: 92,
      officeInterest: 48,
      inquiries: 245,
      maintenanceRequests: 125,
      contactRequests: 102,
      complaints: 22,
      soldProjects: 82,
      apartmentRentals: 135,
      deedInquiries: 95,
      documentRequests: 52,
      generalInquiries: 195,
      maintenanceServiceSatisfaction: 'راضي جداً',
      closureTimeSatisfaction: 'راضي',
      firstTimeResolution: 'راضي جداً',
      maintenanceNotes: ''
    }
  }
};

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });

  const [data, setData] = useState(() => {
    const savedData = localStorage.getItem('dashboardData');
    return savedData ? JSON.parse(savedData) : {
      entries: [],
      currentView: {
        weekly: null,
        annual: null
      }
    };
  });

  // Save dark mode preference
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Save dashboard data
  useEffect(() => {
    localStorage.setItem('dashboardData', JSON.stringify(data));
  }, [data]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const updateData = (newEntry) => {
    setData(prevData => {
      const updatedData = {
        entries: [...prevData.entries, newEntry],
        currentView: {
          ...prevData.currentView,
          [newEntry.entryType]: newEntry
        }
      };
      // Immediately save to localStorage
      localStorage.setItem('dashboardData', JSON.stringify(updatedData));
      return updatedData;
    });
  };

  return (
    <Router>
      <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
        <div className="flex bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
          <Sidebar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          <main className="flex-1 p-8">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard data={data} />} />
              <Route path="/data-entry" element={<DataEntry data={data} onUpdate={updateData} />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;