import React, { useState } from 'react';
import { 
  BarChart3, Users, Clock, CheckCircle, AlertCircle, PhoneCall, 
  MessageSquare, Target, TrendingUp, Building, UserCheck, 
  ClipboardCheck, Settings, Percent, Calendar, CalendarDays
} from 'lucide-react';

const targets = {
  npsNew: 65,
  referredCustomers: 584,
  npsNewAfterYear: 65,
  npsOld: 30,
  deliveryQuality: 100,
  maintenanceQuality: 100,
  callResponseTime: 3,
  callResponseRate: 30,
  csatScore: 70,
  maintenanceClosureSpeed: 3,
  maintenanceReopens: 0,
  salesContribution: 5,
  qualifiedCustomers: 584,
  deliverySatisfaction: 80,
  conversionRate: 2,
  facilityManagement: 0.8
};

function KPICard({ title, actual, target, unit = '%', icon: Icon }) {
  // Ensure actual and target are numbers
  const actualValue = typeof actual === 'number' ? actual : 0;
  const targetValue = typeof target === 'number' ? target : 0;
  
  // List of metrics that use inverse logic (lower is better)
  const inverseMetrics = [
    'معدل عدد الثواني للرد على المكالمات',
    'معدل الرد على المكالمات'
  ];
  
  // Special handling for maintenance closure speed
  const isMaintenanceClosureSpeed = title === 'سرعة إغلاق طلبات الصيانة';
  
  // Determine if this is an inverse metric
  const isInverseMetric = inverseMetrics.includes(title);
  
  // Calculate percentage based on metric type
  let percentage;
  if (isMaintenanceClosureSpeed) {
    // For maintenance closure speed, less than 3 days is good
    // If actual is less than 3, that's good (100% or more)
    // If actual is more than 3, that's bad (less than 100%)
    percentage = actualValue > 0 ? (3 / actualValue) * 100 : 0;
  } else if (isInverseMetric) {
    // For other inverse metrics, lower is better
    percentage = targetValue > 0 ? (targetValue / actualValue) * 100 : 0;
  } else {
    // For regular metrics, higher is better
    percentage = targetValue > 0 ? (actualValue / targetValue) * 100 : 0;
  }
  
  // Determine status based on percentage and metric type
  let status;
  if (isMaintenanceClosureSpeed) {
    // For maintenance closure speed
    // Less than 3 = green (success)
    // Exactly 3 = yellow (warning)
    // More than 3 = red (danger)
    if (actualValue < 3) {
      status = 'success';
    } else if (actualValue === 3) {
      status = 'warning';
    } else {
      status = 'danger';
    }
  } else if (isInverseMetric) {
    // For other inverse metrics
    status = percentage >= 100 ? 'success' : percentage >= 90 ? 'warning' : 'danger';
  } else {
    // For regular metrics
    status = percentage >= 100 ? 'success' : percentage >= 90 ? 'warning' : 'danger';
  }
  
  // Define status colors
  const statusColors = {
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    danger: 'bg-red-500'
  };
  
  // Define text colors
  const textColors = {
    success: 'text-green-600 dark:text-green-400',
    warning: 'text-yellow-600 dark:text-yellow-400',
    danger: 'text-red-600 dark:text-red-600'
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105">
      <div className={`h-2 ${statusColors[status]}`} />
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
            <div className="flex items-baseline space-x-4 space-x-reverse">
              <p className={`text-3xl font-bold ${textColors[status]}`}>
                {actualValue}{unit}
              </p>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <Target className="h-4 w-4 ml-1" />
                {isMaintenanceClosureSpeed ? '3' : targetValue}{unit}
              </div>
            </div>
          </div>
          <Icon className={`h-8 w-8 ${textColors[status]}`} />
        </div>
      </div>
    </div>
  );
}

function MetricsSection({ title, data, icon: Icon }) {
  // Ensure data is an object
  const metricsData = typeof data === 'object' && data !== null ? data : {};
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <div className="flex items-center mb-6">
        <Icon className="h-6 w-6 text-blue-500 dark:text-blue-400 ml-2" />
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h3>
      </div>
      <div className="space-y-4">
        {Object.entries(metricsData).map(([key, value]) => (
          <div key={key} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <span className="text-gray-700 dark:text-gray-300 font-medium">{key}</span>
            <span className="text-lg font-semibold text-gray-900 dark:text-white">
              {typeof value === 'number' ? value : String(value)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Dashboard({ data }) {
  const [viewType, setViewType] = useState('weekly'); // 'weekly' or 'annual'

  // Get the latest entry of the selected type
  const getLatestEntry = () => {
    // First check if we have a current view for this type
    if (data.currentView && data.currentView[viewType]) {
      return data.currentView[viewType];
    }
    
    // If no current view, check entries
    if (!data.entries || data.entries.length === 0) {
      return {};
    }
    
    // Filter entries by the selected view type
    const filteredEntries = data.entries.filter(entry => entry.entryType === viewType);
    if (filteredEntries.length === 0) {
      return {};
    }
    
    // Sort by date (newest first) and return the latest
    return filteredEntries.sort((a, b) => 
      new Date(b.entryDate).getTime() - new Date(a.entryDate).getTime()
    )[0];
  };

  // Get the data to display based on the selected view type
  const displayData = getLatestEntry();
  
  // Log the data for debugging
  console.log('View Type:', viewType);
  console.log('Display Data:', displayData);

  return (
    <div className="space-y-10 pb-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setViewType('weekly')}
            className={`flex items-center px-4 py-2 rounded-lg ${
              viewType === 'weekly'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            <CalendarDays className="h-5 w-5 ml-2" />
            عرض البيانات الأسبوعية
          </button>
          <button
            type="button"
            onClick={() => setViewType('annual')}
            className={`flex items-center px-4 py-2 rounded-lg ${
              viewType === 'annual'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            <Calendar className="h-5 w-5 ml-2" />
            عرض البيانات السنوية
          </button>
        </div>
      </div>

      {/* NPS and Quality Metrics */}
      <section>
        <div className="flex items-center mb-6">
          <BarChart3 className="h-8 w-8 text-blue-500 dark:text-blue-400 ml-3" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {viewType === 'weekly' ? 'مقاييس NPS والجودة الأسبوعية' : 'مقاييس NPS والجودة السنوية'}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <KPICard
            title="نسبة الترشيح NPS للعملاء الجدد"
            actual={displayData.npsNew}
            target={targets.npsNew}
            icon={Users}
          />
          <KPICard
            title="عدد العملاء المرشحين"
            actual={displayData.referredCustomers}
            target={targets.referredCustomers}
            unit=""
            icon={UserCheck}
          />
          <KPICard
            title="نسبة الترشيح NPS للعملاء الجدد بعد السنة الأولى"
            actual={displayData.npsNewAfterYear}
            target={targets.npsNewAfterYear}
            icon={Users}
          />
          <KPICard
            title="نسبة الترشيح NPS للعملاء القدامى"
            actual={displayData.npsOld}
            target={targets.npsOld}
            icon={Users}
          />
          <KPICard
            title="نسبة قياس الجودة لعمليات التسليم"
            actual={displayData.deliveryQuality}
            target={targets.deliveryQuality}
            icon={CheckCircle}
          />
          <KPICard
            title="نسبة قياس الجودة لعمليات الصيانة"
            actual={displayData.maintenanceQuality}
            target={targets.maintenanceQuality}
            icon={Settings}
          />
          <KPICard
            title="معدل عدد الثواني للرد على المكالمات"
            actual={displayData.callResponseTime}
            target={targets.callResponseTime}
            unit=" ثواني"
            icon={Clock}
          />
          <KPICard
            title="معدل الرد على المكالمات"
            actual={displayData.callResponseRate}
            target={targets.callResponseRate}
            icon={PhoneCall}
          />
          <KPICard
            title="مقياس راحة العميل (CSAT)"
            actual={displayData.csatScore}
            target={targets.csatScore}
            icon={UserCheck}
          />
          <KPICard
            title="سرعة إغلاق طلبات الصيانة"
            actual={displayData.maintenanceClosureSpeed}
            target={targets.maintenanceClosureSpeed}
            unit=" أيام"
            icon={ClipboardCheck}
          />
          <KPICard
            title="نسبة المساهمة في المبيعات"
            actual={displayData.salesContribution}
            target={targets.salesContribution}
            icon={TrendingUp}
          />
          <KPICard
            title="معدل التحول"
            actual={displayData.conversionRate}
            target={targets.conversionRate}
            icon={Percent}
          />
          <KPICard
            title="جودة إدارة المرافق"
            actual={displayData.facilityManagement}
            target={targets.facilityManagement}
            unit=""
            icon={Building}
          />
        </div>
      </section>

      {/* Customer Service */}
      <section>
        <div className="flex items-center mb-6">
          <PhoneCall className="h-8 w-8 text-blue-500 dark:text-blue-400 ml-3" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">خدمة العملاء</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <MetricsSection
            title="مكالمات خدمة العملاء"
            icon={PhoneCall}
            data={{
              'عملاء مهتمين': displayData.interestedCustomers,
              'مهتمين مشاريع قادمة': displayData.futureProjectsInterest,
              'مهتمين مكاتب': displayData.officeInterest,
              'استفسارات': displayData.inquiries,
              'طلبات صيانة': displayData.maintenanceRequests,
              'طلبات تواصل': displayData.contactRequests,
              'شكاوي': displayData.complaints
            }}
          />
          <MetricsSection
            title="استفسارات خدمة العملاء"
            icon={MessageSquare}
            data={{
              'مشاريع مباعة': displayData.soldProjects,
              'إيجارات شقق': displayData.apartmentRentals,
              'استفسارات عن الصكوك': displayData.deedInquiries,
              'طلب أوراق للأهمية': displayData.documentRequests,
              'استفسارات عامة': displayData.generalInquiries
            }}
          />
        </div>
      </section>

      {/* Maintenance Satisfaction */}
      <section>
        <div className="flex items-center mb-6">
          <Settings className="h-8 w-8 text-blue-500 dark:text-blue-400 ml-3" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">رضا العملاء عن الصيانة</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <MetricsSection
            title="تقييمات الصيانة"
            icon={ClipboardCheck}
            data={{
              'مستوى الرضا عن خدمات الصيانة': displayData.maintenanceServiceSatisfaction,
              'الرضا عن مدة إغلاق الطلبات': displayData.closureTimeSatisfaction,
              'إغلاق الطلب من أول مرة': displayData.firstTimeResolution,
              'ملاحظات': displayData.maintenanceNotes || 'لا توجد ملاحظات'
            }}
          />
        </div>
      </section>
    </div>
  );
}

export default Dashboard;