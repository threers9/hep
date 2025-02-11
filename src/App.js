import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { seminarData } from './seminarData';
import { faculty, researchAreas } from './facultyData';
import { members } from './membersData';

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
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedFaculty, setExpandedFaculty] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [yearFilter, setYearFilter] = useState('all');
  const [publications, setPublications] = useState({});
  const [loading, setLoading] = useState({});
  const [showAllPublications, setShowAllPublications] = useState(false);
  const [expandedMemberCategory, setExpandedMemberCategory] = useState('current');
//  const [expandedMember, setExpandedMember] = useState(null);
    // Add this state for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const publicationsPerPage = 20;
  const [searchQuery, setSearchQuery] = useState('');
  const [forceExpandAll, setForceExpandAll] = useState(false);
  const [expandedMember, setExpandedMember] = useState(null);

  // Keep the original ArXiv fetching functionality
const fetchArxivPublications = async (authorName) => {
  try {
    setLoading(prev => ({ ...prev, [authorName]: true }));
    
    const baseUrl = 'https://export.arxiv.org/api/query';
    // Special case for Tarun Sharma - only search in hep-th
// Special cases for specific faculty members
    let query;
    if (authorName === 'Sharma_Tarun') {
      query = `search_query=au:${authorName}+AND+cat:hep-th&sortBy=submittedDate&sortOrder=descending&max_results=20`;
    } else if (authorName === 'Ghosh_Pradipta') {
      query = `search_query=au:${authorName}+AND+cat:hep-ph&sortBy=submittedDate&sortOrder=descending&max_results=20`;
    } else {
      query = `search_query=au:${authorName}&sortBy=submittedDate&sortOrder=descending&max_results=20`;
    }
    const response = await fetch(`${baseUrl}?${query}`);
    const text = await response.text();
    
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(text, "text/xml");
    const entries = xmlDoc.getElementsByTagName("entry");
    
    const papers = Array.from(entries).map(entry => {
      const title = entry.getElementsByTagName("title")[0]?.textContent || "";
      const published = entry.getElementsByTagName("published")[0]?.textContent || "";
      const abstract = entry.getElementsByTagName("summary")[0]?.textContent || "";
      const arxivId = entry.getElementsByTagName("id")[0]?.textContent?.split("/").pop() || "";
      
      return {
        title: title.replace(/\n/g, " ").trim(),
        year: new Date(published).getFullYear(),
        abstract: abstract.replace(/\n/g, " ").trim(),
        arxivId,
        url: `https://arxiv.org/abs/${arxivId}`
      };
    });

    setPublications(prev => ({
      ...prev,
      [authorName]: papers
    }));
  } catch (error) {
    console.error(`Error fetching publications for ${authorName}:`, error);
    setPublications(prev => ({
      ...prev,
      [authorName]: []
    }));
  } finally {
    setLoading(prev => ({ ...prev, [authorName]: false }));
  }
};

  useEffect(() => {
    if (expandedFaculty !== null && !publications[faculty[expandedFaculty].arxivName]) {
      fetchArxivPublications(faculty[expandedFaculty].arxivName);
    }
  }, [expandedFaculty]);


// Add this useEffect at the component level (alongside other useEffects)
useEffect(() => {
  const fetchAllPublications = async () => {
    // Fetch publications for all faculty members when component mounts
    for (const facultyMember of faculty) {
      if (!publications[facultyMember.arxivName]) {
        await fetchArxivPublications(facultyMember.arxivName);
      }
    }
  };

  fetchAllPublications();
}, []); // Empty dependency array means this runs once when component mounts


  const renderOverview = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>About our Research</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">
            High Energy Physics probes the most elementary units of matter and investigates fundamental interactions 
            among basic constituents. Our research is founded on the Standard Model of particle physics, which includes 
            elementary entities like leptons, quarks, photons, W & Z bosons, gluons, and the Higgs boson.
          </p>
          <p className="text-gray-600 mb-4">
            The Standard Model has been remarkably successful in understanding nature, earning more than twenty Nobel prizes. 
            However, there are still theoretical challenges and experimental anomalies that require investigation beyond the 
            Standard Model, including:
          </p>
          <ul className="list-disc ml-6 text-gray-600 mb-4">
            <li>Quantum theory of gravity</li>
            <li>Unification of fundamental interactions including gravity</li>
            <li>Hierarchy problems</li>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(researchAreas).map(([area, details]) => (
              <div key={area} className="p-4 border rounded-lg">
                <h3 className="text-xl font-semibold mb-2">{area}</h3>
                <p className="text-gray-600 mb-3">{details.description}</p>
                <div className="mt-2">
                  <h4 className="font-medium mb-1">Faculty:</h4>
                  <ul className="list-disc ml-6 text-gray-600">
                    {details.faculty.map(name => (
                      <li key={name}>{name}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderFaculty = () => (
    <>
      <div className="mb-6">
        <select 
          className="border rounded-lg px-4 py-2 w-full sm:w-auto"
          value={selectedFilter}
          onChange={(e) => setSelectedFilter(e.target.value)}
        >
          <option value="all">All Research Areas</option>
          {Object.keys(researchAreas).map(area => (
            <option key={area} value={area}>{area}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {faculty
          .filter(f => selectedFilter === 'all' || 
            Object.entries(researchAreas).some(([area, data]) => 
              data.faculty.includes(f.name) && (selectedFilter === 'all' || area === selectedFilter)
            ))
          .map((f, index) => {
            const actualIndex = faculty.findIndex(fac => fac.name === f.name);
            return (
              <Card key={f.name} className="overflow-hidden">
                <div
                  className="p-4 cursor-pointer"
                  onClick={() => setExpandedFaculty(expandedFaculty === actualIndex ? null : actualIndex)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <img
                        src={f.photoUrl}
                        alt={f.name}
                        className="w-24 h-24 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="text-xl font-semibold">{f.name}</h3>
                        <p className="text-gray-600">{f.area}</p>
                      </div>
                    </div>
                    {expandedFaculty === actualIndex ? (
                      <ChevronUp className="h-6 w-6" />
                    ) : (
                      <ChevronDown className="h-6 w-6" />
                    )}
                  </div>
                </div>
                {expandedFaculty === actualIndex && (
                  <CardContent className="border-t">
                    <div className="mt-4">
                      <h4 className="font-semibold mb-2">Research Description</h4>
                      <p className="text-gray-600">{f.description}</p>
                      <a 
                        href={f.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 mt-2 inline-block"
                      >
                        Faculty Website →
                      </a>
                      <p className="text-gray-600 font-mono">{f.email}</p>
                    </div>
                    <div className="mt-6">
                      <h4 className="font-semibold mb-4">Recent Publications</h4>
                      {loading[f.arxivName] ? (
                        <p className="text-gray-500 italic">Loading publications...</p>
                      ) : publications[f.arxivName] ? (
                        <div className="space-y-4">
                          {publications[f.arxivName].slice(0, 4).map(pub => (
                            <div key={pub.arxivId} className="p-4 border rounded">
                              <h4 className="font-semibold">
                                <a href={pub.url} target="_blank" rel="noopener noreferrer" 
                                   className="text-blue-600 hover:text-blue-800">
                                  {pub.title}
                                </a>
                              </h4>
                              

                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-500 italic">No publications found</p>
                      )}
                    </div>
                  </CardContent>
                )}
              </Card>
            );
          })}
      </div>
    </>
  );

  const renderMembers = () => (
    <div className="space-y-8">
     <div className="space-y-4 mb-6">
        <div className="flex justify-center space-x-4">
          <button
            className={`px-4 py-2 rounded ${expandedMemberCategory === 'current' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            onClick={() => setExpandedMemberCategory('current')}
          >
            Current Members
          </button>
          <button
            className={`px-4 py-2 rounded ${expandedMemberCategory === 'alumni' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            onClick={() => setExpandedMemberCategory('alumni')}
          >
            Alumni
          </button>
        </div>
        <div className="flex justify-center">
          <button
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
            onClick={() => {
              setForceExpandAll(!forceExpandAll);
              if (!forceExpandAll === false) {  // If we're collapsing
                setExpandedMember(null);  // Reset individual expansions
              }
            }}
          >
            {forceExpandAll ? 'Collapse All' : 'Expand All'}
          </button>
        </div>
      </div>

      {expandedMemberCategory === 'current' ? (
        <Card>
          <CardHeader>
            <CardTitle>Current Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">Postdoctoral Researchers</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {members.current.postdoc.map((member, index) => (
                    <div
                      key={`${member.name}-${index}`}
                      className="border rounded-lg cursor-pointer hover:bg-gray-50"
                      onClick={() => setExpandedMember(expandedMember === `postdoc-${index}` ? null : `postdoc-${index}`)}
                    >
                      <div className="p-3 flex justify-between items-center">
                        <span className="font-medium">{member.name}</span>
                        {expandedMember === `postdoc-${index}` ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      </div>
                      {(forceExpandAll || expandedMember === `postdoc-${index}`) && (
                        <div className="px-3 pb-3 border-t">
                          <p className="text-gray-600">Year: {member.year}</p>
                          <p className="text-gray-600">Research: {member.research}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">PhD Students</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {members.current.phd.map((member, index) => (
                    <div
                      key={`${member.name}-${index}`}
                      className="border rounded-lg cursor-pointer hover:bg-gray-50"
                      onClick={() => setExpandedMember(expandedMember === `phd-${index}` ? null : `phd-${index}`)}
                    >
                      <div className="p-3 flex justify-between items-center">
                        <span className="font-medium">{member.name}</span>
                        {expandedMember === `phd-${index}` ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      </div>
                      {(forceExpandAll || expandedMember === `phd-${index}`) && (
                        <div className="px-3 pb-3 border-t">
                          <p className="text-gray-600">Advisor: {member.advisor}</p>
                          <p className="text-gray-600">Year: {member.year}</p>
                          <p className="text-gray-600">Research: {member.research}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Alumni</CardTitle>
          </CardHeader>
         
                  
            <div>
              <h3 className="text-xl font-semibold mb-3">PhD Alumni</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {members.alumni.phd.map((member, index) => (
                  <div
                    key={`${member.name}-${index}`}
                    className="border rounded-lg cursor-pointer hover:bg-gray-50"
                    onClick={() => setExpandedMember(expandedMember === `alumni-${index}` ? null : `alumni-${index}`)}
                  >
                    <div className="p-3 flex justify-between items-center">
                      <span className="font-medium">{member.name}</span>
                      {expandedMember === `alumni-${index}` ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </div>
                    {(forceExpandAll || expandedMember === `alumni-${index}`) && (
                      <div className="px-3 pb-3 border-t">
                        <p className="text-gray-600">Advisor: {member.advisor}</p>
                        <p className="text-gray-600">Year: {member.year}</p>
                        <p className="text-gray-600">Thesis: {member.thesis}</p>
                        <p className="text-gray-600">Next Position: {member.current}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );

// Function to render the Seminars tab
const renderSeminars = () => (
  <div className="space-y-4">
    <div className="mb-4 flex justify-end">
      <select 
        className="border rounded-lg px-4 py-2"
        value={yearFilter}
        onChange={(e) => setYearFilter(e.target.value)}
      >
        <option value="all">All Years</option>
        <option value="2025">2025</option>
      </select>
    </div>

    <Card>
      <CardHeader>
        <CardTitle>Recent Seminars</CardTitle>
      </CardHeader>
      <CardContent>
        {seminarData
        .filter(talk => yearFilter === 'all' || new Date(talk.date).getFullYear().toString() === yearFilter)
        .map(talk => (
          <div key={talk.title} className="mb-4 p-4 border rounded">
            <h4 className="font-semibold">{talk.title}</h4>
            <p className="text-gray-600">{talk.speaker}</p>
            <p className="text-gray-600">{talk.area}</p>
            <p className="text-gray-500">{new Date(talk.date).toLocaleDateString('en-GB')}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  </div>
);

// Updated renderPublications function
const renderPublications = () => {
  // Get all publications from all faculty members
  const allPublications = Object.entries(publications)
    .flatMap(([authorName, pubs]) => {
      const facultyMember = faculty.find(f => f.arxivName === authorName);
      return (pubs || []).map(pub => ({
        ...pub,
        author: facultyMember?.name || authorName
      }));
    })
    .filter(pub => {
      const matchesYear = yearFilter === 'all' || pub.year?.toString() === yearFilter;
      const matchesSearch = !searchQuery || 
        pub.author.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesYear && matchesSearch;
    })
    .sort((a, b) => b.year - a.year); // Sort by year, newest first

  // Calculate pagination
  const indexOfLastPublication = currentPage * publicationsPerPage;
  const indexOfFirstPublication = indexOfLastPublication - publicationsPerPage;
  const currentPublications = allPublications.slice(indexOfFirstPublication, indexOfLastPublication);
  const totalPages = Math.ceil(allPublications.length / publicationsPerPage);

  return (
    <div className="space-y-4">
     <div className="mb-4 flex justify-end space-x-4">
        <input
          type="text"
          placeholder="Search by faculty name..."
          className="border rounded-lg px-4 py-2 w-40"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
        />
        <select 
          className="border rounded-lg px-4 py-2"
          value={yearFilter}
          onChange={(e) => {
            setYearFilter(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="all">All Years</option>
          <option value="2025">2025</option>
          <option value="2024">2024</option>
          <option value="2023">2023</option>
          <option value="2022">2022</option>
          <option value="2021">2021</option>
          <option value="2020">2020</option>
          <option value="2019">2019</option>
          <option value="2018">2018</option>
        </select>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Publications of the Group</CardTitle>
        </CardHeader>
        <CardContent>
          {currentPublications.map(pub => (
            <div key={pub.arxivId || Math.random()} className="mb-4 p-4 border rounded">
              <h4 className="font-semibold">
                {pub.url ? (
                  <a href={pub.url} target="_blank" rel="noopener noreferrer" 
                     className="text-blue-600 hover:text-blue-800">
                    {pub.title}
                  </a>
                ) : (
                  pub.title
                )}
              </h4>
              <p className="text-gray-600">{pub.author}</p>
              {pub.abstract && (
                <p className="text-gray-600 mt-2">{pub.abstract.substring(0, 200)}...</p>
              )}
              {pub.arxivId && (
                <p className="text-gray-500 mt-2">arXiv:{pub.arxivId} </p>
              )}
            </div>
          ))}

          {/* Pagination controls */}
          {totalPages > 1 && (
            <div className="mt-6 flex justify-center space-x-2">
              <button
                className={`px-4 py-2 rounded ${currentPage === 1 ? 'bg-gray-200' : 'bg-blue-600 text-white'}`}
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span className="px-4 py-2">
                Page {currentPage} of {totalPages}
              </span>
              <button
                className={`px-4 py-2 rounded ${currentPage === totalPages ? 'bg-gray-200' : 'bg-blue-600 text-white'}`}
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

const renderPositions = () => (
  <div className="space-y-6">
    <Card>
      <CardHeader>
        <CardTitle>Faculty Positions</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">
          We welcome applications for faculty positions in High Energy Physics and related areas.
          Faculty positions are advertised through the IIT Delhi recruitment portal.
        </p>
        <a 
          href="https://home.iitd.ac.in/jobs-iitd/index.php"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Apply for Faculty Positions
        </a>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>Postdoctoral Positions</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">
          IIT Delhi offers institute postdoctoral fellowships. These positions are regularly advertised
          through the IIT Delhi recruitment portal.
        </p>
        <a 
          href="https://home.iitd.ac.in/jobs-iitd/index.php"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Apply for Postdoc Positions
        </a>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>PhD Positions</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">
          We are looking for motivated students to join our PhD program. Applications are processed through
          the IIT Delhi PhD admissions portal. We accept students through various fellowship schemes including
          CSIR, UGC, INSPIRE, and institute fellowships.
        </p>
        <a 
          href="https://ecampus.iitd.ac.in/PGADM/login"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Apply for PhD Program
        </a>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>Masters and BTech Students</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">
          Current Masters and BTech students at IIT Delhi who are interested in research projects
          in High Energy Physics are encouraged to directly contact relevant faculty members.
          Please review the faculty profiles and their research areas before reaching out.
        </p>
      </CardContent>
    </Card>
  </div>
);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2">High Energy Physics and Quantum Gravity Group at IIT Delhi</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Exploring the fundamental constituents of matter in our Universe and their interactions
        </p>
      </div>

<div className="mb-8 flex flex-wrap justify-center gap-4">
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
          Faculty
        </button>
        <button 
          className={`px-4 py-2 rounded ${activeTab === 'members' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('members')}
        >
          Members
        </button>
        <button 
          className={`px-4 py-2 rounded ${activeTab === 'seminars' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('seminars')}
        >
          Seminars
        </button>
        <button 
          className={`px-4 py-2 rounded ${activeTab === 'publications' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('publications')}
        >
          Publications
        </button>
        <button 
          className={`px-4 py-2 rounded ${activeTab === 'positions' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('positions')}
        >
          Positions
        </button>            
      </div>

      <div className="space-y-6">
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'faculty' && renderFaculty()}
        {activeTab === 'members' && renderMembers()}
        {activeTab === 'seminars' && renderSeminars()}
        {activeTab === 'publications' && renderPublications()}
        {activeTab === 'positions' && renderPositions()}
      </div>
    </div>
  );
};

export default ResearchGroup;
