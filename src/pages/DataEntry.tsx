import React, { useState, useEffect } from 'react';
import { Save, CheckCircle, Calendar, CalendarDays } from 'lucide-react';

function FormSection({ title, children }) {
  return (
    <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
        {title}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {children}
      </div>
    </section>
  );
}

function InputField({ label, name, type = "number", value, onChange, options = [] }) {
  const inputClasses = "w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200";
  
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {label}
      </label>
      {type === "select" ? (
        <select
          name={name}
          value={value}
          onChange={onChange}
          className={inputClasses}
        >
          {options.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      ) : type === "textarea" ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          rows={4}
          className={inputClasses}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className={inputClasses}
        />
      )}
    </div>
  );
}

function DataEntry({ data, onUpdate }) {
  const [entryType, setEntryType] = useState('weekly'); // 'weekly' or 'annual'
  const [entryDate, setEntryDate] = useState(new Date().toISOString().split('T')[0]);
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Initialize form data based on the selected entry type
  const [formData, setFormData] = useState(() => {
    // Check if data.currentView exists and has the entryType property
    if (data.currentView && data.currentView[entryType]) {
      return data.currentView[entryType];
    }
    // Fallback to the first entry of the selected type if available
    const entriesOfType = data.entries.filter(entry => entry.entryType === entryType);
    if (entriesOfType.length > 0) {
      // Sort by date (newest first) and return the latest
      return entriesOfType.sort((a, b) => 
        new Date(b.entryDate).getTime() - new Date(a.entryDate).getTime()
      )[0];
    }
    // Default empty form data
    return {
      npsNew: 0,
      referredCustomers: 0,
      npsNewAfterYear: 0,
      npsOld: 0,
      deliveryQuality: 0,
      maintenanceQuality: 0,
      callResponseTime: 0,
      callResponseRate: 0,
      csatScore: 0,
      maintenanceClosureSpeed: 0,
      maintenanceReopens: 0,
      salesContribution: 0,
      qualifiedCustomers: 0,
      deliverySatisfaction: 0,
      conversionRate: 0,
      facilityManagement: 0,
      interestedCustomers: 0,
      futureProjectsInterest: 0,
      officeInterest: 0,
      inquiries: 0,
      maintenanceRequests: 0,
      contactRequests: 0,
      complaints: 0,
      soldProjects: 0,
      apartmentRentals: 0,
      deedInquiries: 0,
      documentRequests: 0,
      generalInquiries: 0,
      maintenanceServiceSatisfaction: 'محايد',
      closureTimeSatisfaction: 'محايد',
      firstTimeResolution: 'محايد',
      maintenanceNotes: ''
    };
  });
  
  // Update form data when entry type changes
  useEffect(() => {
    // Check if data.currentView exists and has the entryType property
    if (data.currentView && data.currentView[entryType]) {
      setFormData(data.currentView[entryType]);
    } else {
      // Fallback to the first entry of the selected type if available
      const entriesOfType = data.entries.filter(entry => entry.entryType === entryType);
      if (entriesOfType.length > 0) {
        // Sort by date (newest first) and return the latest
        setFormData(entriesOfType.sort((a, b) => 
          new Date(b.entryDate).getTime() - new Date(a.entryDate).getTime()
        )[0]);
      }
    }
  }, [entryType, data]);

  const satisfactionOptions = [
    'راضي جداً',
    'راضي',
    'محايد',
    'غير راضي',
    'غير راضي جداً'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newValue = e.target.type === 'number' ? parseFloat(value) || 0 : value;
    setFormData(prev => ({ ...prev, [name]: newValue }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create a new data object with the entry type and date
    const dataToSave = {
      ...formData,
      entryType,
      entryDate,
      timestamp: new Date().toISOString()
    };
    
    // Log the data for debugging
    console.log('Submitting data:', dataToSave);
    console.log('Entry type:', entryType);
    
    // Call the update function with the new data
    onUpdate(dataToSave);
    
    // Show success message
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
    
    // Reset form data to prepare for next entry
    setFormData({
      ...formData,
      // Keep the same structure but reset values
      npsNew: 0,
      referredCustomers: 0,
      npsNewAfterYear: 0,
      npsOld: 0,
      deliveryQuality: 0,
      maintenanceQuality: 0,
      callResponseTime: 0,
      callResponseRate: 0,
      csatScore: 0,
      maintenanceClosureSpeed: 0,
      maintenanceReopens: 0,
      salesContribution: 0,
      qualifiedCustomers: 0,
      deliverySatisfaction: 0,
      conversionRate: 0,
      facilityManagement: 0,
      interestedCustomers: 0,
      futureProjectsInterest: 0,
      officeInterest: 0,
      inquiries: 0,
      maintenanceRequests: 0,
      contactRequests: 0,
      complaints: 0,
      soldProjects: 0,
      apartmentRentals: 0,
      deedInquiries: 0,
      documentRequests: 0,
      generalInquiries: 0,
      maintenanceServiceSatisfaction: 'محايد',
      closureTimeSatisfaction: 'محايد',
      firstTimeResolution: 'محايد',
      maintenanceNotes: ''
    });
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">إدخال البيانات</h2>
        <div className="flex items-center gap-4">
          {showSuccess && (
            <div className="flex items-center text-green-600 dark:text-green-400">
              <CheckCircle className="h-5 w-5 ml-2" />
              تم الحفظ بنجاح
            </div>
          )}
          <button
            type="submit"
            onClick={handleSubmit}
            className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
          >
            <Save className="h-5 w-5 ml-2" />
            حفظ البيانات
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              نوع الإدخال
            </label>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setEntryType('weekly')}
                className={`flex items-center px-4 py-2 rounded-lg ${
                  entryType === 'weekly'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                <CalendarDays className="h-5 w-5 ml-2" />
                إدخال أسبوعي
              </button>
              <button
                type="button"
                onClick={() => setEntryType('annual')}
                className={`flex items-center px-4 py-2 rounded-lg ${
                  entryType === 'annual'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                <Calendar className="h-5 w-5 ml-2" />
                إدخال سنوي
              </button>
            </div>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              التاريخ
            </label>
            <input
              type="date"
              value={entryDate}
              onChange={(e) => setEntryDate(e.target.value)}
              className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
            />
          </div>
        </div>
      </div>

      <form className="space-y-8">
        <FormSection title={`مقاييس NPS والجودة - ${entryType === 'weekly' ? 'إدخال أسبوعي' : 'إدخال سنوي'}`}>
          <InputField
            label="نسبة الترشيح NPS للعملاء الجدد"
            name="npsNew"
            value={formData.npsNew}
            onChange={handleInputChange}
          />
          <InputField
            label="عدد العملاء المرشحين"
            name="referredCustomers"
            value={formData.referredCustomers}
            onChange={handleInputChange}
          />
          <InputField
            label="نسبة الترشيح NPS للعملاء الجدد بعد السنة الأولى"
            name="npsNewAfterYear"
            value={formData.npsNewAfterYear}
            onChange={handleInputChange}
          />
          <InputField
            label="نسبة الترشيح NPS للعملاء القدامى"
            name="npsOld"
            value={formData.npsOld}
            onChange={handleInputChange}
          />
          <InputField
            label="نسبة قياس الجودة لعمليات التسليم"
            name="deliveryQuality"
            value={formData.deliveryQuality}
            onChange={handleInputChange}
          />
          <InputField
            label="نسبة قياس الجودة لعمليات الصيانة"
            name="maintenanceQuality"
            value={formData.maintenanceQuality}
            onChange={handleInputChange}
          />
          <InputField
            label="معدل عدد الثواني للرد على المكالمات"
            name="callResponseTime"
            value={formData.callResponseTime}
            onChange={handleInputChange}
          />
          <InputField
            label="معدل الرد على المكالمات"
            name="callResponseRate"
            value={formData.callResponseRate}
            onChange={handleInputChange}
          />
          <InputField
            label="مقياس راحة العميل (CSAT)"
            name="csatScore"
            value={formData.csatScore}
            onChange={handleInputChange}
          />
          <InputField
            label="سرعة إغلاق طلبات الصيانة"
            name="maintenanceClosureSpeed"
            value={formData.maintenanceClosureSpeed}
            onChange={handleInputChange}
          />
          <InputField
            label="نسبة المساهمة في المبيعات"
            name="salesContribution"
            value={formData.salesContribution}
            onChange={handleInputChange}
          />
          <InputField
            label="معدل التحول"
            name="conversionRate"
            value={formData.conversionRate}
            onChange={handleInputChange}
          />
          <InputField
            label="جودة إدارة المرافق في المباني السكنية"
            name="facilityManagement"
            value={formData.facilityManagement}
            onChange={handleInputChange}
          />
        </FormSection>

        <FormSection title="خدمة العملاء - المكالمات">
          <InputField
            label="عملاء مهتمين"
            name="interestedCustomers"
            value={formData.interestedCustomers}
            onChange={handleInputChange}
          />
          <InputField
            label="مهتمين مشاريع قادمة"
            name="futureProjectsInterest"
            value={formData.futureProjectsInterest}
            onChange={handleInputChange}
          />
          <InputField
            label="مهتمين مكاتب"
            name="officeInterest"
            value={formData.officeInterest}
            onChange={handleInputChange}
          />
          <InputField
            label="استفسارات"
            name="inquiries"
            value={formData.inquiries}
            onChange={handleInputChange}
          />
          <InputField
            label="طلبات صيانة"
            name="maintenanceRequests"
            value={formData.maintenanceRequests}
            onChange={handleInputChange}
          />
          <InputField
            label="طلبات تواصل"
            name="contactRequests"
            value={formData.contactRequests}
            onChange={handleInputChange}
          />
          <InputField
            label="شكاوي"
            name="complaints"
            value={formData.complaints}
            onChange={handleInputChange}
          />
        </FormSection>

        <FormSection title="خدمة العملاء - الاستفسارات">
          <InputField
            label="مشاريع مباعة"
            name="soldProjects"
            value={formData.soldProjects}
            onChange={handleInputChange}
          />
          <InputField
            label="إيجارات شقق"
            name="apartmentRentals"
            value={formData.apartmentRentals}
            onChange={handleInputChange}
          />
          <InputField
            label="استفسارات عن الصكوك"
            name="deedInquiries"
            value={formData.deedInquiries}
            onChange={handleInputChange}
          />
          <InputField
            label="طلب أوراق للأهمية"
            name="documentRequests"
            value={formData.documentRequests}
            onChange={handleInputChange}
          />
          <InputField
            label="استفسارات عامة"
            name="generalInquiries"
            value={formData.generalInquiries}
            onChange={handleInputChange}
          />
        </FormSection>

        <FormSection title="رضا العملاء عن الصيانة">
          <InputField
            label="مستوى الرضا عن خدمات الصيانة"
            name="maintenanceServiceSatisfaction"
            type="select"
            value={formData.maintenanceServiceSatisfaction}
            onChange={handleInputChange}
            options={satisfactionOptions}
          />
          <InputField
            label="الرضا عن مدة إغلاق الطلبات"
            name="closureTimeSatisfaction"
            type="select"
            value={formData.closureTimeSatisfaction}
            onChange={handleInputChange}
            options={satisfactionOptions}
          />
          <InputField
            label="إغلاق الطلب من أول مرة"
            name="firstTimeResolution"
            type="select"
            value={formData.firstTimeResolution}
            onChange={handleInputChange}
            options={satisfactionOptions}
          />
          <div className="col-span-2">
            <InputField
              label="ملاحظات حول رضا العملاء عن الصيانة"
              name="maintenanceNotes"
              type="textarea"
              value={formData.maintenanceNotes}
              onChange={handleInputChange}
            />
          </div>
        </FormSection>
      </form>
    </div>
  );
}

export default DataEntry;