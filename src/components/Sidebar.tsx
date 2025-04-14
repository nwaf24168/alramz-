import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, ClipboardEdit } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    {
      path: '/',
      name: 'لوحة التحكم',
      icon: LayoutDashboard
    },
    {
      path: '/data-entry',
      name: 'إدخال البيانات',
      icon: ClipboardEdit
    }
  ];

  return (
    <div className="w-64 min-h-screen bg-white dark:bg-gray-800 shadow-sm">
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-8">نظام إدارة الأداء</h2>
        <nav>
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-2 p-3 rounded-lg mb-2 ${
                location.pathname === item.path
                  ? 'bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-300'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}

export default Sidebar;