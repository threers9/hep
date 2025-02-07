import React, { useState, useEffect } from 'react';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';

// Simple Card components
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
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedFaculty, setExpandedFaculty] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [yearFilter, setYearFilter] = useState('all');
  const [publications, setPublications] = useState({});
  const [loading, setLoading] = useState({});

  const faculty = [
    {
      name: "Prof. Amruta Mishra",
      area: "Physics of strongly interacting matter",
      website: "https://web.iitd.ac.in/~amruta/",
      description: "Research focuses on medium modifications of hadron properties at high temperatures and densities, relevant to neutron star phenomenology and heavy ion collision experiments.",
      arxivName: "Mishra_A",
      group: {
        phd: ["PhD Scholar 1", "PhD Scholar 2"],
        postdocs: [],
      }
    },
    {
      name: "Prof. Pradipta Ghosh",
      area: "Beyond Standard Model phenomenology",
      website: "https://web.iitd.ac.in/~tphyspg/",
      description: "Research in Supersymmetric Models, R-parity violation, Neutrino physics, Electroweak Phase Transition and Gravitational Waves, Collider, Dark Matter, Charged Lepton Flavour Violation",
      arxivName: "Ghosh_P",
      group: {
        phd: ["PhD Student 1"],
        postdocs: ["Postdoc 1"],
      }
    },
    // ... [rest of faculty data]
  ];

  const talks = [
    {
      title: "Recent Developments in Strong Force Phenomenology",
      speaker: "Prof. Tobias Toll",
      date: "2024-02-01",
      area: "Strong force phenomenology"
    },
    {
      title: "Dark Matter Search Updates",
      speaker: "Prof. Pradipta Ghosh",
      date: "2024-01-15",
      area: "Beyond Standard Model phenomenology"
    }
  ];

  const researchAreas = [
    "Strongly Interacting Matter",
    "Beyond Standard Model",
    "Strong Force Phenomenology",
    "Quantum Fields in Curved Spacetimes",
    "String Theory",
    "QCD and Composite Dynamics",
    "Theoretical High Energy Physics"
  ];

  const fetchArxivPublications = async (authorName) => {
    try {
      setLoading(prev => ({ ...prev, [authorName]: true }));
      
      const baseUrl = 'https://export.arxiv.org/api/query';
      const query = `search_query=au:${authorName}&sortBy=submittedDate&sortOrder=descending&max_results=10`;
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

  const filteredFaculty = faculty.filter(f => 
    (f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     f.area.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedFilter === 'all' || f.area.includes(selectedFilter))
  );

  const handleFacultyClick = (index) => {
    setExpandedFaculty(expandedFaculty === index ? null : index);
  };

  const renderPublications = (facultyMember) => {
    const facultyPubs = publications[facultyMember.arxivName];
    
    if (loading[facultyMember.arxivName]) {
      return <p className="text-gray-500 italic">Loading publications...</p>;
    }
    
    if (!facultyPubs || facultyPubs.length === 0) {
      return <p className="text-gray-500 italic">No publications found</p>;
    }

    return (
      <div className="space-y-4">
        {facultyPubs
          .filter(pub => yearFilter === 'all' || pub.year.toString() === yearFilter)
          .map(pub => (
            <div key={pub.arxivId} className="p-4 border rounded">
              <h4 className="font-semibold">
                <a href={pub.url} target="_blank" rel="noopener noreferrer" 
                   className="text-blue-600 hover:text-blue-800">
                  {pub.title}
                </a>
              </h4>
              <p className="text-gray-600 mt-2">{pub.abstract.substring(0, 200)}...</p>
              <p className="text-gray-500 mt-2">arXiv:{pub.arxivId} ({pub.year})</p>
            </div>
          ))
        }
      </div>
    );
  };

  const renderFacultyCard = (f, index) => (
    <Card key={f.name} className="overflow-hidden">
      <div
        className="p-4 cursor-pointer flex justify-between items-center"
        onClick={() => handleFacultyClick(index)}
      >
        <div>
          <h3 className="text-xl font-semibold">{f.name}</h3>
          <p className="text-gray-600">{f.area}</p>
        </div>
        {expandedFaculty === index ? (
          <ChevronUp className="h-6 w-6" />
        ) : (
          <ChevronDown className="h-6 w-6" />
        )}
      </div>
      {expandedFaculty === index && (
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
          </div>
          <div className="mt-4">
            <h4 className="font-semibold mb-2">Group Members</h4>
            <div className="ml-4">
              {f.group.phd.length > 0 && (
                <>
                  <h5 className="font-medium">PhD Students:</h5>
                  <ul className="list-disc ml-4">
                    {f.group.phd.map(student => (
                      <li key={student}>{student}</li>
                    ))}
                  </ul>
                </>
              )}
              {f.group.postdocs.length > 0 && (
                <>
                  <h5 className="font-medium mt-2">Postdocs:</h5>
                  <ul className="list-disc ml-4">
                    {f.group.postdocs.map(postdoc => (
                      <li key={postdoc}>{postdoc}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>
          <div className="mt-6">
            <h4 className="font-semibold mb-4">Recent Publications</h4>
            {renderPublications(f)}
          </div>
        </CardContent>
      )}
    </Card>
  );

  const renderPublicationsTab = () => {
    const allPublications = Object.entries(publications).flatMap(([authorName, pubs]) => {
      const facultyMember = faculty.find(f => f.arxivName === authorName);
      return pubs.map(pub => ({
        ...pub,
        author: facultyMember?.name || authorName
      }));
    });

    const filteredPublications = allPublications
      .filter(pub => yearFilter === 'all' || pub.year.toString() === yearFilter)
      .sort((a, b) => b.year - a.year);

    return (
      <div className="space-y-4">
        <div className="mb-4 flex justify-end">
          <select 
            className="border rounded-lg px-4 py-2"
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value)}
          >
            <option value="all">All Years</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
          </select>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Publications</CardTitle>
          </CardHeader>
          <CardContent>
            {filteredPublications.length > 0 ? (
              filteredPublications.map(pub => (
                <div key={pub.arxivId} className="mb-4 p-4 border rounded">
                  <h4 className="font-semibold">
                    <a href={pub.url} target="_blank" rel="noopener noreferrer" 
                       className="text-blue-600 hover:text-blue-800">
                      {pub.title}
                    </a>
                  </h4>
                  <p className="text-gray-600">{pub.author}</p>
                  <p className="text-gray-600 mt-2">{pub.abstract.substring(0, 200)}...</p>
                  <p className="text-gray-500 mt-2">arXiv:{pub.arxivId} ({pub.year})</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 italic">No publications found for the selected year</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Talks</CardTitle>
          </CardHeader>
          <CardContent>
            {talks.map(talk => (
              <div key={talk.title} className="mb-4 p-4 border rounded">
                <h4 className="font-semibold">{talk.title}</h4>
                <p className="text-gray-600">{talk.speaker}</p>
                <p className="text-gray-500">{new Date(talk.date).toLocaleDateString()}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    );
  };

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
