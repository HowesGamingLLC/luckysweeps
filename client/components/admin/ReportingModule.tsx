import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, FileText, BarChart3, Calendar, Filter, Eye, Send, Clock, CheckCircle } from 'lucide-react';

const ReportingModule = () => {
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const [reportType, setReportType] = useState('financial');
  const [dateRange, setDateRange] = useState('monthly');
  const [scheduleReport, setScheduleReport] = useState(false);

  const reports = [
    {
      id: 'financial_report',
      name: 'Financial Report',
      description: 'Revenue, expenses, and profitability analysis',
      icon: '💰',
      lastGenerated: '2024-02-15',
      frequency: 'Weekly',
      format: ['CSV', 'PDF', 'Excel'],
    },
    {
      id: 'user_report',
      name: 'User Report',
      description: 'User demographics, registration, and engagement metrics',
      icon: '👥',
      lastGenerated: '2024-02-15',
      frequency: 'Daily',
      format: ['CSV', 'PDF', 'Excel'],
    },
    {
      id: 'game_report',
      name: 'Game Performance Report',
      description: 'Game statistics, win rates, and player retention',
      icon: '🎮',
      lastGenerated: '2024-02-15',
      frequency: 'Weekly',
      format: ['CSV', 'PDF', 'Excel'],
    },
    {
      id: 'transaction_report',
      name: 'Transaction Report',
      description: 'Deposits, withdrawals, disputes, and chargebacks',
      icon: '💳',
      lastGenerated: '2024-02-14',
      frequency: 'Daily',
      format: ['CSV', 'PDF', 'Excel'],
    },
    {
      id: 'compliance_report',
      name: 'Compliance Report',
      description: 'KYC verification, AML checks, and regulatory compliance',
      icon: '✅',
      lastGenerated: '2024-02-14',
      frequency: 'Monthly',
      format: ['PDF', 'Excel'],
    },
    {
      id: 'fraud_report',
      name: 'Fraud & Risk Report',
      description: 'Suspicious activities, fraud alerts, and risk assessment',
      icon: '⚠️',
      lastGenerated: '2024-02-15',
      frequency: 'Real-time',
      format: ['CSV', 'PDF'],
    },
  ];

  const scheduledReports = [
    {
      id: 'sched_1',
      name: 'Weekly Financial Report',
      type: 'Financial Report',
      recipients: ['admin@mcluck.com', 'finance@mcluck.com'],
      frequency: 'Every Monday 09:00',
      nextRun: '2024-02-19',
      format: 'PDF',
      status: 'active',
    },
    {
      id: 'sched_2',
      name: 'Daily User Metrics',
      type: 'User Report',
      recipients: ['admin@mcluck.com'],
      frequency: 'Daily 08:00',
      nextRun: '2024-02-16',
      format: 'CSV',
      status: 'active',
    },
    {
      id: 'sched_3',
      name: 'Monthly Compliance Check',
      type: 'Compliance Report',
      recipients: ['legal@mcluck.com', 'compliance@mcluck.com'],
      frequency: 'Last day of month',
      nextRun: '2024-02-29',
      format: 'PDF',
      status: 'active',
    },
  ];

  const currentReport = reports.find((r) => r.id === selectedReport);

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  const exportReport = (format: string) => {
    console.log(`Exporting ${currentReport?.name} as ${format}`);
    // In a real app, this would trigger file download
  };

  return (
    <motion.div className="space-y-8" variants={itemVariants}>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Reporting & Analytics</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Generate and export comprehensive business reports
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-border">
        <button
          onClick={() => {
            setReportType('reports');
            setSelectedReport(null);
          }}
          className={`px-4 py-2 font-medium transition-colors border-b-2 ${
            reportType === 'reports'
              ? 'text-primary border-primary'
              : 'text-muted-foreground border-transparent hover:text-foreground'
          }`}
        >
          Available Reports
        </button>
        <button
          onClick={() => setReportType('scheduled')}
          className={`px-4 py-2 font-medium transition-colors border-b-2 ${
            reportType === 'scheduled'
              ? 'text-primary border-primary'
              : 'text-muted-foreground border-transparent hover:text-foreground'
          }`}
        >
          Scheduled Reports
        </button>
        <button
          onClick={() => setReportType('custom')}
          className={`px-4 py-2 font-medium transition-colors border-b-2 ${
            reportType === 'custom'
              ? 'text-primary border-primary'
              : 'text-muted-foreground border-transparent hover:text-foreground'
          }`}
        >
          Custom Reports
        </button>
      </div>

      {/* Available Reports Tab */}
      {reportType === 'reports' && (
        <motion.div className="space-y-6" variants={itemVariants}>
          {/* Quick Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-2 border border-border rounded-lg bg-background/50 focus:outline-none focus:border-primary transition-colors text-sm"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="yearly">Yearly</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>

          {/* Reports Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {reports.map((report) => (
              <motion.div
                key={report.id}
                variants={itemVariants}
                onClick={() => setSelectedReport(report.id)}
                className={`p-5 rounded-xl border-2 cursor-pointer transition-all ${
                  selectedReport === report.id
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div className="text-3xl mb-3">{report.icon}</div>
                <h3 className="font-bold mb-1">{report.name}</h3>
                <p className="text-xs text-muted-foreground mb-4">{report.description}</p>

                <div className="space-y-2 text-sm mb-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Frequency</span>
                    <span className="font-semibold">{report.frequency}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Last Generated</span>
                    <span className="font-semibold text-xs">{report.lastGenerated}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  {report.format.map((fmt) => (
                    <span
                      key={fmt}
                      className="text-xs px-2 py-1 rounded bg-primary/10 text-primary font-medium"
                    >
                      {fmt}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Report Details Panel */}
          {currentReport && (
            <motion.div
              variants={itemVariants}
              className="p-6 rounded-xl border border-border bg-card/50"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{currentReport.icon}</span>
                  <div>
                    <h3 className="text-xl font-bold">{currentReport.name}</h3>
                    <p className="text-sm text-muted-foreground">{currentReport.description}</p>
                  </div>
                </div>
              </div>

              {/* Report Preview */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="p-4 rounded-lg bg-background/50 border border-border">
                  <h4 className="font-semibold mb-3 text-sm">Report Period</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <select className="flex-1 px-3 py-1 border border-border rounded bg-background text-sm">
                        <option>This Month</option>
                        <option>Last Month</option>
                        <option>Last 3 Months</option>
                        <option>Custom Range</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-background/50 border border-border">
                  <h4 className="font-semibold mb-3 text-sm">Export Format</h4>
                  <div className="flex gap-2">
                    {currentReport.format.map((fmt) => (
                      <button
                        key={fmt}
                        onClick={() => exportReport(fmt)}
                        className="flex-1 px-3 py-1.5 rounded border border-border hover:bg-card transition-colors text-sm font-medium"
                      >
                        {fmt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Report Sections */}
              <div className="mb-6">
                <h4 className="font-semibold mb-3">Report Includes</h4>
                <div className="space-y-2">
                  {[
                    'Executive Summary',
                    'Key Performance Indicators',
                    'Detailed Breakdown by Category',
                    'Trends and Comparisons',
                    'Risk Assessment',
                    'Recommendations',
                  ].map((section, i) => (
                    <label key={i} className="flex items-center gap-3 p-2 rounded hover:bg-background/50">
                      <input type="checkbox" defaultChecked className="rounded border-border" />
                      <span className="text-sm">{section}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-medium flex items-center justify-center gap-2">
                  <Download className="w-4 h-4" />
                  Download Report
                </button>
                <button className="flex-1 px-4 py-2 border border-border rounded-lg hover:bg-card transition-colors font-medium flex items-center justify-center gap-2">
                  <Eye className="w-4 h-4" />
                  Preview
                </button>
                <button
                  onClick={() => setScheduleReport(!scheduleReport)}
                  className="flex-1 px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary/5 transition-colors font-medium flex items-center justify-center gap-2"
                >
                  <Clock className="w-4 h-4" />
                  Schedule
                </button>
              </div>

              {/* Schedule Panel */}
              {scheduleReport && (
                <div className="mt-6 p-4 rounded-lg bg-background/50 border border-border space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Frequency</label>
                      <select className="w-full px-4 py-2 border border-border rounded bg-background">
                        <option>Weekly</option>
                        <option>Bi-weekly</option>
                        <option>Monthly</option>
                        <option>Quarterly</option>
                        <option>Yearly</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Day & Time</label>
                      <select className="w-full px-4 py-2 border border-border rounded bg-background">
                        <option>Monday 09:00</option>
                        <option>Friday 15:00</option>
                        <option>Last day of month</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Recipients</label>
                    <textarea
                      placeholder="Enter email addresses (comma separated)"
                      rows={2}
                      className="w-full px-4 py-2 border border-border rounded bg-background"
                    />
                  </div>
                  <div className="flex gap-3">
                    <button className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded hover:opacity-90 font-medium">
                      Schedule Report
                    </button>
                    <button
                      onClick={() => setScheduleReport(false)}
                      className="flex-1 px-4 py-2 border border-border rounded hover:bg-card font-medium"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </motion.div>
      )}

      {/* Scheduled Reports Tab */}
      {reportType === 'scheduled' && (
        <motion.div className="space-y-4" variants={itemVariants}>
          {scheduledReports.map((report) => (
            <div key={report.id} className="p-4 rounded-lg border border-border bg-card/50 hover:bg-background/50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-bold">{report.name}</h4>
                    <span
                      className={`text-xs px-2 py-1 rounded font-medium ${
                        report.status === 'active'
                          ? 'bg-green-500/10 text-green-500'
                          : 'bg-gray-500/10 text-gray-500'
                      }`}
                    >
                      {report.status}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{report.type}</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground text-xs mb-1">Frequency</p>
                      <p className="font-semibold">{report.frequency}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs mb-1">Next Run</p>
                      <p className="font-semibold">{report.nextRun}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs mb-1">Format</p>
                      <p className="font-semibold">{report.format}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs mb-1">Recipients</p>
                      <p className="font-semibold text-xs">{report.recipients.length} emails</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <button className="p-2 hover:bg-card rounded transition-colors">
                    <Eye className="w-4 h-4 text-muted-foreground" />
                  </button>
                  <button className="p-2 hover:bg-card rounded transition-colors">
                    <FileText className="w-4 h-4 text-primary" />
                  </button>
                  <button className="p-2 hover:bg-card rounded transition-colors">
                    <Download className="w-4 h-4 text-green-500" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      )}

      {/* Custom Reports Tab */}
      {reportType === 'custom' && (
        <motion.div
          variants={itemVariants}
          className="p-6 rounded-xl border border-border bg-card/50 space-y-6"
        >
          <h3 className="text-xl font-bold">Create Custom Report</h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Report Name</label>
              <input
                type="text"
                placeholder="e.g., Q1 Financial Summary"
                className="w-full px-4 py-2 border border-border rounded bg-background"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Data Source</label>
                <select className="w-full px-4 py-2 border border-border rounded bg-background">
                  <option>All Data</option>
                  <option>Users Only</option>
                  <option>Transactions Only</option>
                  <option>Games Only</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Date Range</label>
                <div className="flex gap-2">
                  <input type="date" className="flex-1 px-4 py-2 border border-border rounded bg-background" />
                  <input type="date" className="flex-1 px-4 py-2 border border-border rounded bg-background" />
                </div>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Metrics to Include</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {['Revenue', 'Player Count', 'Win Rate', 'Payouts', 'Deposits', 'Withdrawals'].map((metric) => (
                  <label key={metric} className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="rounded border-border" />
                    <span className="text-sm">{metric}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="flex gap-3">
              <button className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded hover:opacity-90 font-medium">
                Generate Report
              </button>
              <button className="flex-1 px-4 py-2 border border-border rounded hover:bg-card font-medium">
                Save as Template
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ReportingModule;
