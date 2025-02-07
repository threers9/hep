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
  const [showAllPublications, setShowAllPublications] = useState(false);
  const [selectedArea, setSelectedArea] = useState(null);
  const [expandedMemberCategory, setExpandedMemberCategory] = useState('current');

  const members = {
    current: {
      phd: [
        { name: "PhD Scholar 1", advisor: "Prof. Amruta Mishra", year: "2022-present", research: "Strongly Interacting Matter" },
        { name: "PhD Scholar 2", advisor: "Prof. Amruta Mishra", year: "2021-present", research: "Hadron Properties" },
        { name: "PhD Student 1", advisor: "Prof. Pradipta Ghosh", year: "2023-present", research: "Dark Matter Physics" },
        { name: "PhD Scholar 1", advisor: "Prof. Tobias Toll", year: "2022-present", research: "Strong Force Phenomenology" },
        { name: "PhD Scholar 2", advisor: "Prof. Tobias Toll", year: "2023-present", research: "Monte Carlo Simulations" }
      ],
      msc: [
        { name: "MSc Student 1", advisor: "Prof. Suprit Singh", year: "2024", research: "Quantum Fields" },
        { name: "MSc Student 2", advisor: "Prof. Tarun Sharma", year: "2024", research: "String Theory" }
      ],
      undergraduate: [
        { name: "UG Student 1", advisor: "Prof. Abhishek M. Iyer", year: "2024", project: "ML in Particle Physics" },
        { name: "UG Student 2", advisor: "Prof. Sarthak Parikh", year: "2024", project: "Quantum Information" }
      ],
      postdoc: [
        { name: "Postdoc 1", advisor: "Prof. Pradipta Ghosh", year: "2023-present", research: "Beyond Standard Model" }
      ]
    },
    alumni: {
      phd: [
        { name: "PhD Alumni 1", advisor: "Prof. Amruta Mishra", year: "2018-2023", thesis: "Properties of Hadrons in Strong Fields", current: "Postdoc at TIFR" },
        { name: "PhD Alumni 2", advisor: "Prof. Pradipta Ghosh", year: "2017-2022", thesis: "Dark Matter Detection", current: "Faculty at IISER" }
      ],
      msc: [
        { name: "MSc Alumni 1", year: "2023", project: "Quantum Field Theory", current: "PhD at Princeton" },
        { name: "MSc Alumni 2", year: "2022", project: "String Theory", current: "Industry" }
      ],
      undergraduate: [
        { name: "UG Alumni 1", year: "2023", project: "Particle Physics", current: "Graduate School at MIT" },
        { name: "UG Alumni 2", year: "2022", project: "Quantum Computing", current: "Industry" }
      ]
    }
  };

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
    {
      name: "Prof. Tobias Toll",
      area: "Strong force phenomenology",
      website: "https://inspirehep.net/authors/1032510",
      description: "Research focuses on strong force phenomenology and Monte Carlo Event Generators, particularly processes sensitive to high gluon densities.",
      arxivName: "Toll_T",
      group: {
        phd: ["PhD Scholar 1", "PhD Scholar 2"],
        postdocs: [],
      }
    },
    {
      name: "Prof. Suprit Singh",
      area: "Quantum Fields in Curved Spacetimes",
      website: "https://supritsinghlab.github.io/",
      description: "Research in Quantum Fields in Curved Spacetimes, Quantum-to-Classical Transition and Decoherence and Gravitational Quantum Mechanics.",
      arxivName: "Singh_S",
      group: {
        phd: [],
        postdocs: [],
      }
    },
    {
      name: "Prof. Tarun Sharma",
      area: "String Theory",
      website: "https://inspirehep.net/authors/1077841",
      description: "Research in Chern Simons theories & Anyonic statistics, AdS-CFT, Higher Spin gauge theories, Fluid dynamics & gravity, Supersymmetry, String theory.",
      arxivName: "Sharma_T",
      group: {
        phd: [],
        postdocs: [],
      }
    },
    {
      name: "Prof. Abhishek M. Iyer",
      area: "QCD and Composite Dynamics",
      website: "https://inspirehep.net/authors/1272471",
      description: "Research in QCD/Composite dynamics, Physics of Kaons and ML for particle physics and beyond.",
      arxivName: "Iyer_Abhishek",
      group: {
        phd: [],
        postdocs: [],
      }
    },
    {
      name: "Prof. Sarthak Parikh",
      area: "Theoretical High Energy Physics",
      website: "https://web.iitd.ac.in/~sarthak/",
      description: "Research in Theoretical and Mathematical High Energy Physics: Gauge/Gravity Duality (AdS/CFT correspondence), Conformal Field Theories, Quantum Gravity, Discrete Models of Spacetime, Quantum Computation and Quantum Information Theory.",
      arxivName: "parikh_s_1",
      group: {
        phd: [],
        postdocs: [],
      }
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

  const fetchArxivPublications = async (authorName) => {
    try {
      setLoading(prev => ({ ...prev, [authorName]: true }));
      
      const baseUrl = 'https://export.arxiv.org/api/query';
      const query = `search_query=${authorName}&searchtype=all&sortBy=submittedDate&sortOrder=descending&max_results=5`;
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

  const handleFacultyClick = (index) => {
    if (expandedFaculty === index) {
      setExpandedFaculty(null);
    } else {
      setExpandedFaculty(index);
      if (!publications[faculty[index].arxivName]) {
        fetchArxivPublications(faculty[index].arxivName);
      }
    }
  };

  const filteredFaculty = faculty.filter(f => 
    (f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     f.area.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedFilter === 'all' || f.area.includes(selectedFilter))
  );

  const getFacultyByArea = (area) => {
    return faculty.filter(f => f.area.toLowerCase().includes(area.toLowerCase()));
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
            {renderPublications(f, 5)}
          </div>
        </CardContent>
      )}
    </Card>
  );

  const renderMembers = () => {
    const renderMemberList = (memberList, type) => (
      <div className="space-y-4">
        {memberList.map((member, index) => (
          <div key={`${member.name}-${index}`} className="p-4 bg-white rounded-lg shadow">
            <h4 className="font-semibold text-lg">{member.name}</h4>
            {member.advisor && (
              <p className="text-gray-600">Advisor: {member.advisor}</p>
            )}
            <p className="text-gray-600">Year: {member.year}</p>
            {member.research && (
              <p className="text-gray-600">Research: {member.research}</p>
            )}
            {member.project && (
              <p className="text-gray-600">Project: {member.project}</p>
            )}
            {member.thesis && (
              <p className="text-gray-600">Thesis: {member.thesis}</p>
            )}
            {member.current && (
              <p className="text-gray-600">Current Position: {member.current}</p>
            )}
          </div>
        ))}
      </div>
    );

    return (
      <div className="space-y-8">
        <div className="flex justify-center space-x-4 mb-6">
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

        {expandedMemberCategory === 'current' ? (
          <>
            <Card>
              <CardHeader>
                <CardTitle>Current Members</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Postdoctoral Researchers</h3>
                    {renderMemberList(members.current.postdoc, 'postdoc')}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-4">PhD Students</h3>
                    {renderMemberList(members.current.phd, 'phd')}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-4">MSc Students</h3>
                    {renderMemberList(members.current.msc, 'msc')}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Undergraduate Students</h3>
                    {renderMemberList(members.current.undergraduate, 'undergraduate')}
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        ) : (
          <>
            <Card>
              <CardHeader>
                <CardTitle>Alumni</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">PhD Alumni</h3>
                    {renderMemberList(members.alumni.phd, 'phd')}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-4">MSc Alumni</h3>
                    {renderMemberList(members.alumni.msc, 'msc')}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Undergraduate Alumni</h3>
                    {renderMemberList(members.alumni.undergraduate, 'undergraduate')}
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    );
  };

  const renderPublications = (facultyMember, limit = null) => {
    const facultyPubs = publications[facultyMember.arxivName];
    
    if (loading[facultyMember.arxivName]) {
      return <p className="text-gray-500 italic">Loading publications...</p>;
    }
    
    if (!facultyPubs || facultyPubs.length === 0) {
      return <p className="text-gray-500 italic">No publications found</p>;
    }

    const filteredPubs = facultyPubs
      .filter(pub => yearFilter === 'all' || pub.year.toString() === yearFilter);
    
    const displayPubs = limit ? filteredPubs.slice(0, limit) : filteredPubs;

    return (
      <div className="space-y-4">
        {displayPubs.map(pub => (
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
        ))}
        {limit && filteredPubs.length > limit && !showAllPublications && (
          <button 
            onClick={() => setShowAllPublications(true)}
            className="mt-4 text-blue-600 hover:text-blue-800"
          >
            Show More Publications...
          </button>
        )}
      </div>
    );
  };

  const renderResearchAreas = () => (
    <Card>
      <CardHeader>
        <CardTitle>Research Areas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {researchAreas.map(area => (
            <button
              key={area}
              onClick={() => setSelectedArea(selectedArea === area ? null : area)}
              className={`p-4 border rounded-lg text-left transition-colors ${
                selectedArea === area ? 'bg-blue-50 border-blue-500' : 'hover:bg-gray-50'
              }`}
            >
              <h3 className="font-semibold mb-2">{area}</h3>
              {selectedArea === area && (
                <div className="mt-2 text-sm text-gray-600">
                  <h4 className="font-medium mb-1">Faculty working in this area:</h4>
                  <ul className="list-disc ml-4">
                    {getFacultyByArea(area).map(f => (
                      <li key={f.name}>{f.name}</li>
                    ))}
                  </ul>
                </div>
              )}
            </button>
          ))}
        </div>
      </CardContent>
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

    const displayPublications = showAllPublications ? 
      filteredPublications : 
      filteredPublications.slice(0, 5);

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
            {displayPublications.map(pub => (
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
            ))}
            {!showAllPublications && filteredPublications.length > 5 && (
              <button 
                onClick={() => setShowAllPublications(true)}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Show More Publications
              </button>
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
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2">High Energy Physics Research Group</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Exploring the fundamental constituents of matter and their interactions through the Standard Model and beyond.
        </p>
      </div>

      <div className="mb-8 flex justify-center space-x-4">
        <button 
          className={`px-4 py-2 rounded ${activeTab === 'overview' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={`px-4 py-2 rounded ${activeTab === 'members' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('members')}
        >
          Members
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
            {renderResearchAreas()}
          </div>
        )}

        {activeTab === 'members' && renderMembers()}

        {activeTab === 'faculty' && (
          <>
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
