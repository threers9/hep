import React, { useState, useEffect } from 'react';
import { Search, ChevronDown, ChevronUp, Filter } from 'lucide-react';

// Create a simple Card component since we can't import from shadcn
const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-lg shadow ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children }) => (
  <div className="p-6 pb-4">{children}</div>
);

const CardTitle = ({ children }) => (
  <h3 className="text-2xl font-semibold">{children}</h3>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`p-6 pt-0 ${className}`}>{children}</div>
);

const ResearchGroup = () => {
  // ... [Previous state and constants remain the same until the return statement]

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2">High Energy Physics Research Group</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Exploring the fundamental constituents of matter and their interactions through the Standard Model and beyond.
        </p>
      </div>

      {/* Navigation */}
      <div className="mb-8 flex justify-center space-x-4">
        <button 
          className={`px-4 py-2 rounded ${activeTab === 'overview' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={`px-4 py-2 rounded ${activeTab === 'faculty' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('faculty')}
        >
          Faculty & Research Groups
        </button>
        <button 
          className={`px-4 py-2 rounded ${activeTab === 'publications' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('publications')}
        >
          Publications & Talks
        </button>
      </div>

      {/* Main Content */}
      <div className="space-y-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>About High Energy Physics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  High Energy Physics (HEP) probes the most elementary units of matter and investigates fundamental interactions 
                  among basic constituents. Our research is founded on the Standard Model (SM) of particle physics, which includes 
                  elementary entities like leptons, quarks, photons, W & Z bosons, gluons, and the Higgs boson.
                </p>
                <p className="text-gray-600 mb-4">
                  The Standard Model has been remarkably successful in understanding nature, earning more than twenty Nobel prizes. 
                  However, there are still theoretical challenges and experimental anomalies that require investigation beyond the 
                  Standard Model, including:
                </p>
                <ul className="list-disc ml-6 text-gray-600 mb-4">
                  <li>Hierarchy problems</li>
                  <li>Unification of fundamental interactions including gravity</li>
                  <li>Non-zero neutrino masses and mixing</li>
                  <li>Dark matter evidence from galaxy rotation curves</li>
                  <li>Matter-antimatter asymmetry of the Universe</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Research Areas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {researchAreas.map(area => (
                    <div key={area} className="p-4 border rounded-lg">
                      <h3 className="font-semibold mb-2">{area}</h3>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'faculty' && (
          <>
            {/* Search and Filter */}
            <div className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  placeholder="Search by name or research area..."
                  className="pl-10 pr-4 py-2 border rounded-lg w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              <div className="w-full sm:w-auto">
                <select 
                  className="border rounded-lg px-4 py-2 w-full"
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                >
                  <option value="all">All Research Areas</option>
                  {researchAreas.map(area => (
                    <option key={area} value={area}>{area}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-4">
              {filteredFaculty.map((f, index) => renderFacultyCard(f, index))}
            </div>
          </>
        )}

        {activeTab === 'publications' && renderPublicationsTab()}
      </div>
    </div>
  );
};

export default ResearchGroup;
