 // Full faculty data with photos
export const faculty = [
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
