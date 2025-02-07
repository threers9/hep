import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

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
  const [expandedMember, setExpandedMember] = useState(null);

  // Keep the original ArXiv fetching functionality
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

  // Full faculty data with photos
  const faculty = [
    {
      name: "Prof. Pradipta Ghosh",
      area: "Beyond Standard Model phenomenology",
      website: "https://web.iitd.ac.in/~tphyspg/",
      description: "Research in Supersymmetric Models, R-parity violation, Neutrino physics, Electroweak Phase Transition and Gravitational Waves, Collider, Dark Matter, Charged Lepton Flavour Violation",
      lastName: "Ghosh",
      arxivName: "Ghosh_Pradipta",
      photoUrl: "/faculty-photos/ghosh.jpg"
    },
    {
      name: "Prof. Abhishek M. Iyer",
      area: "QCD and Composite Dynamics",
      website: "https://inspirehep.net/authors/1272471",
      description: "Research in QCD/Composite dynamics, Physics of Kaons and ML for particle physics and beyond.",
      lastName: "Iyer",
      arxivName: "Iyer_A_M",
      photoUrl: "/faculty-photos/iyer.jpg"
    },
    {
      name: "Prof. Amruta Mishra",
      area: "Physics of strongly interacting matter",
      website: "https://web.iitd.ac.in/~amruta/",
      description: "Research focuses on medium modifications of hadron properties at high temperatures and densities, relevant to neutron star phenomenology and heavy ion collision experiments.",
      lastName: "Mishra",
      arxivName: "Mishra_Amruta",
      photoUrl: "/faculty-photos/mishra.jpg"
    },
    {
      name: "Prof. Sarthak Parikh",
      area: "Theoretical High Energy Physics",
      website: "https://web.iitd.ac.in/~sarthak/",
      description: "Research in Theoretical and Mathematical High Energy Physics: Gauge/Gravity Duality (AdS/CFT correspondence), Conformal Field Theories, Quantum Gravity, Discrete Models of Spacetime, Quantum Computation and Quantum Information Theory.",
      lastName: "Parikh",
      arxivName: "Parikh_Sarthak",
      photoUrl: "/faculty-photos/parikh.jpg"
    },
    {
      name: "Prof. Tarun Sharma",
      area: "String Theory",
      website: "https://inspirehep.net/authors/1077841",
      description: "Research in Chern Simons theories & Anyonic statistics, AdS-CFT, Higher Spin gauge theories, Fluid dynamics & gravity, Supersymmetry, String theory.",
      lastName: "Sharma",
      arxivName: "Sharma_Tarun",
      photoUrl: "/faculty-photos/sharma.jpg"
    },
    {
      name: "Prof. Suprit Singh",
      area: "Quantum Fields in Curved Spacetimes",
      website: "https://supritsinghlab.github.io/",
      description: "Research in Quantum Fields in Curved Spacetimes, Quantum-to-Classical Transition and Decoherence and Gravitational Quantum Mechanics.",
      lastName: "Singh",
      arxivName: "Singh_Suprit",
      photoUrl: "/faculty-photos/ssingh.jpg"
    },
    {
      name: "Prof. Tobias Toll",
      area: "Strong force phenomenology",
      website: "https://inspirehep.net/authors/1032510",
      description: "Research focuses on strong force phenomenology and Monte Carlo Event Generators, particularly processes sensitive to high gluon densities.",
      lastName: "Toll",
      arxivName: "Toll_Tobias",
      photoUrl: "/faculty-photos/toll.jpg"
    }
  ].sort((a, b) => a.lastName.localeCompare(b.lastName));

  // Full research areas data
  const researchAreas = {
    "Strongly Interacting Matter & QCD": {
      description: "Research in strong interactions, hadron properties, and QCD dynamics",
      faculty: ["Prof. Abhishek M. Iyer", "Prof. Amruta Mishra", "Prof. Tobias Toll"]
    },
    "Beyond Standard Model & Particle Physics": {
      description: "Research in supersymmetry, dark matter, and particle phenomenology",
      faculty: ["Prof. Pradipta Ghosh"]
    },
    "Quantum Fields & Gravity": {
      description: "Research in quantum fields, curved spacetimes, and quantum gravity",
      faculty: ["Prof. Sarthak Parikh", "Prof. Tarun Sharma", "Prof. Suprit Singh"]
    },
    "String Theory & Mathematical Physics": {
      description: "Research in string theory, AdS/CFT, and theoretical foundations",
      faculty: ["Prof. Sarthak Parikh", "Prof. Tarun Sharma"]
    }
  };

  // Full members data
  const members = {
    current: {
      postdoc: [
        { name: "Postdoc 1", year: "2023-present", research: "Beyond Standard Model" },
        { name: "Postdoc 1", year: "2023-present", research: "Beyond Standard Model" },
        { name: "Postdoc 1", year: "2023-present", research: "Beyond Standard Model" }
      ],
      phd: [
        { name: "PhD Scholar 1", advisor: "Prof. Amruta Mishra", year: "2022-present", research: "Strongly Interacting Matter" },
        { name: "PhD Scholar 2", advisor: "Prof. Amruta Mishra", year: "2021-present", research: "Hadron Properties" },
        { name: "PhD Scholar 2", advisor: "Prof. Amruta Mishra", year: "2021-present", research: "Hadron Properties" },
        { name: "PhD Scholar 2", advisor: "Prof. Tobias Toll", year: "2021-present", research: "Hadron Properties" },
        { name: "PhD Scholar 2", advisor: "Prof. Tobias Toll", year: "2021-present", research: "Hadron Properties" },
        { name: "PhD Scholar 2", advisor: "Prof. Pradipta Ghosh", year: "2021-present", research: "Hadron Properties" },
        { name: "PhD Scholar 2", advisor: "Prof. Suprit Singh", year: "2021-present", research: "Hadron Properties" },
        { name: "PhD Scholar 2", advisor: "Prof. Abhishek Iyer", year: "2021-present", research: "Hadron Properties" },
        { name: "PhD Scholar 2", advisor: "Prof. Abhishek Iyer", year: "2021-present", research: "Hadron Properties" },
        { name: "PhD Scholar 2", advisor: "Prof. Tarun Sharma", year: "2021-present", research: "Hadron Properties" },
        { name: "Arkapal Mondal", advisor: "Prof. Sarthak Parikh", year: "2022-present", research: "AdS/CFT" },
        { name: "D Chirag", advisor: "Prof. Sarthak Parikh", year: "2024-present", research: "QFT" },
        { name: "Rishav Saha", advisor: "Prof. Sarthak Parikh", year: "2024-present", research: "QFT" }
      ]
    },
    alumni: {
      phd: [
        { name: "PhD Alumni 1", advisor: "Prof. Amruta Mishra", year: "2018-2023", thesis: "Properties of Hadrons in Strong Fields", current: "Postdoc at TIFR" },
        { name: "PhD Alumni 2", advisor: "Prof. Pradipta Ghosh", year: "2017-2022", thesis: "Dark Matter Detection", current: "Faculty at IISER" }
      ]
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>About Our Research</CardTitle>
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
          <div className="space-y-6">
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

      <div className="space-y-4">
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
                    </div>
                    <div className="mt-6">
                      <h4 className="font-semibold mb-4">Recent Publications</h4>
                      {loading[f.arxivName] ? (
                        <p className="text-gray-500 italic">Loading publications...</p>
                      ) : publications[f.arxivName] ? (
                        <div className="space-y-4">
                          {publications[f.arxivName].slice(0, 5).map(pub => (
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
                      {expandedMember === `postdoc-${index}` && (
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
                      {expandedMember === `phd-${index}` && (
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
          <CardContent>
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
                    {expandedMember === `alumni-${index}` && (
                      <div className="px-3 pb-3 border-t">
                        <p className="text-gray-600">Advisor: {member.advisor}</p>
                        <p className="text-gray-600">Year: {member.year}</p>
                        <p className="text-gray-600">Thesis: {member.thesis}</p>
                        <p className="text-gray-600">Current Position: {member.current}</p>
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

  const renderSeminars = () => (
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
          {Object.entries(publications)
            .flatMap(([authorName, pubs]) => {
              const facultyMember = faculty.find(f => f.arxivName === authorName);
              return (pubs || []).map(pub => ({
                ...pub,
                author: facultyMember?.name || authorName
              }));
            })
            .filter(pub => yearFilter === 'all' || pub.year?.toString() === yearFilter)
            .slice(0, showAllPublications ? undefined : 5)
            .map(pub => (
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
                  <p className="text-gray-500 mt-2">arXiv:{pub.arxivId} ({pub.year})</p>
                )}
              </div>
            ))}
        </CardContent>
      </Card>
      

      <Card>
        <CardHeader>
          <CardTitle>Recent Seminars</CardTitle>
        </CardHeader>
        <CardContent>
          {[
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
            },
            {
              title: "Quantum Fields in Curved Spacetime",
              speaker: "Prof. Suprit Singh",
              date: "2024-01-10",
              area: "Quantum Fields & Gravity"
            }
          ].map(talk => (
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

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2">High Energy Physics, Quantum Gravity, and Astrophysics Group at IIT Delhi</h1>
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
      </div>

      <div className="space-y-6">
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'faculty' && renderFaculty()}
        {activeTab === 'members' && renderMembers()}
        {activeTab === 'seminars' && renderSeminars()}
        {activeTab === 'publications' && renderPublications()}
      </div>
    </div>
  );
};

export default ResearchGroup;
