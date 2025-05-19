"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { 
  User, Lock, Palette, Bell, Plug, CreditCard, 
  Shield, Globe, Download, HelpCircle, ChevronRight 
} from "lucide-react";

const settingsSections = [
  // { key: "profile", label: "Profile", icon: <User className="w-4 h-4" /> },
  { key: "account", label: "Account", icon: <Lock className="w-4 h-4" /> },
  { key: "appearance", label: "Appearance", icon: <Palette className="w-4 h-4" /> },
  { key: "notifications", label: "Notifications", icon: <Bell className="w-4 h-4" /> },
  { key: "integrations", label: "Integrations", icon: <Plug className="w-4 h-4" /> },
  { key: "billing", label: "Billing", icon: <CreditCard className="w-4 h-4" /> },
  { key: "security", label: "Security", icon: <Shield className="w-4 h-4" /> },
  { key: "language", label: "Language", icon: <Globe className="w-4 h-4" /> },
  { key: "export", label: "Export Data", icon: <Download className="w-4 h-4" /> },
  { key: "help", label: "Help & Support", icon: <HelpCircle className="w-4 h-4" /> },
];

const sectionDescriptions = {
  profile: "Edit your personal information and avatar.",
  account: "Manage your account details and password.",
  appearance: "Customize your theme, colors, and layout.",
  notifications: "Set your notification preferences.",
  integrations: "Connect with external services.",
  billing: "Manage your subscription and payment methods.",
  security: "Review security settings and active sessions.",
  language: "Change language and timezone preferences.",
  export: "Export your portfolio data.",
  help: "Get help or contact support.",
};

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState(settingsSections[0].key);
  const [showSidebar, setShowSidebar] = useState(false);
  
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-2 md:p-2">
      <div className="flex items-center justify-between ">
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden flex items-center gap-2 px-3 py-2 bg-primary/10 rounded-lg text-primary" 
          onClick={toggleSidebar}
        >
          {settingsSections.find(s => s.key === activeTab)?.label}
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar navigation for desktop */}
        <div className="hidden md:block w-full md:w-64 shrink-0">
          <Card className="sticky top-6">
            <CardContent className="p-3">
              <nav className="space-y-1">
                {settingsSections.map((section) => (
                  <button
                    key={section.key}
                    onClick={() => setActiveTab(section.key)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                      activeTab === section.key
                        ? "bg-primary text-white"
                        : "hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                  >
                    <span className={`${activeTab === section.key ? "text-white" : "text-gray-500 dark:text-gray-400"}`}>
                      {section.icon}
                    </span>
                    <span>{section.label}</span>
                  </button>
                ))}
              </nav>
            </CardContent>
          </Card>
        </div>
        
        {/* Mobile sidebar overlay */}
        {showSidebar && (
          <div className="md:hidden fixed inset-0 bg-black/50 z-40" onClick={toggleSidebar}>
            <div className="absolute right-0 top-0 bottom-0 w-64 bg-background p-4 shadow-xl" 
                 onClick={e => e.stopPropagation()}>
              <h2 className="text-lg font-bold mb-4">Settings</h2>
              <nav className="space-y-1">
                {settingsSections.map((section) => (
                  <button
                    key={section.key}
                    onClick={() => {
                      setActiveTab(section.key);
                      setShowSidebar(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                      activeTab === section.key
                        ? "bg-primary text-white"
                        : "hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                  >
                    <span className={`${activeTab === section.key ? "text-white" : "text-gray-500 dark:text-gray-400"}`}>
                      {section.icon}
                    </span>
                    <span>{section.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>
        )}
        
        {/* Content area */}
        <div className="flex-1">
          <Card className="shadow-sm">
            <CardHeader className="border-b pb-3">
              <CardTitle className="flex items-center gap-2">
                {settingsSections.find(s => s.key === activeTab)?.icon}
                {settingsSections.find(s => s.key === activeTab)?.label}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-muted-foreground mb-6">{sectionDescriptions[activeTab]}</p>
              
              {activeTab === "profile" && (
                <div className="space-y-6">
                  <div className="flex flex-col md:flex-row gap-4 items-start">
                    <div className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center overflow-hidden">
                      <User className="w-10 h-10 text-gray-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-medium mb-1">Profile Picture</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Upload a new profile picture</p>
                      <div className="flex gap-2">
                        <button className="px-3 py-1 bg-primary text-white rounded-md text-sm">Upload</button>
                        <button className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-md text-sm">Remove</button>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Full Name</label>
                      <input type="text" className="w-full p-2 border rounded-md" defaultValue="Alex Johnson" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Email</label>
                      <input type="email" className="w-full p-2 border rounded-md" defaultValue="alex@example.com" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Job Title</label>
                      <input type="text" className="w-full p-2 border rounded-md" defaultValue="Product Designer" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Location</label>
                      <input type="text" className="w-full p-2 border rounded-md" defaultValue="San Francisco, CA" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Bio</label>
                    <textarea className="w-full p-2 border rounded-md h-24" defaultValue="Product designer with 5+ years of experience in creating user-centered digital experiences." />
                  </div>

                  <div className="flex justify-end">
                    <button className="px-4 py-2 bg-primary text-white rounded-md">Save Changes</button>
                  </div>
                </div>
              )}
              
              {activeTab !== "profile" && (
                <div className="min-h-40 flex items-center justify-center text-muted-foreground">
                  <span className="italic">{settingsSections.find(s => s.key === activeTab)?.label} settings coming soon...</span>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}