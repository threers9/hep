 // Full faculty data with photos
export const faculty = [
    {
      name: "Prof. Pradipta Ghosh",
      area: "Beyond Standard Model phenomenology",
      website: "https://web.iitd.ac.in/~tphyspg/",
      description: "Research in Supersymmetric Models, R-parity violation, Neutrino physics, Electroweak Phase Transition and Gravitational Waves, Collider, Dark Matter, Charged Lepton Flavour Violation",
      lastName: "Ghosh",
      arxivName: "Ghosh_Pradipta",
      email: "tphyspg at physics.iitd.ac.in",
      photoUrl: "/faculty-photos/ghosh.jpg"
    },
    {
      name: "Prof. Abhishek M. Iyer",
      area: "QCD and Composite Dynamics",
      website: "https://inspirehep.net/authors/1272471",
      description: "Research in QCD/Composite dynamics, Physics of Kaons and ML for particle physics and beyond.",
      lastName: "Iyer",
      arxivName: "Iyer_A_M",
      email: "iyerabhishek at physics.iitd.ac.in",
      photoUrl: "/faculty-photos/iyer.jpg"
    },
    {
      name: "Prof. Amruta Mishra",
      area: "Physics of strongly interacting matter",
      website: "https://web.iitd.ac.in/~amruta/",
      description: "Research focuses on medium modifications of hadron properties at high temperatures and densities, relevant to neutron star phenomenology and heavy ion collision experiments.",
      lastName: "Mishra",
      arxivName: "Mishra_Amruta",
      email: "amruta at physics.iitd.ac.in",
      photoUrl: "/faculty-photos/mishra.jpg"
    },
    {
      name: "Prof. Sarthak Parikh",
      area: "Theoretical High Energy Physics",
      website: "https://web.iitd.ac.in/~sarthak/",
      description: "Research in Theoretical and Mathematical High Energy Physics: Gauge/Gravity Duality (AdS/CFT correspondence), Conformal Field Theories, Quantum Gravity, Discrete Models of Spacetime, Quantum Computation and Quantum Information Theory.",
      lastName: "Parikh",
      arxivName: "Parikh_Sarthak",
      email: "sarthak at physics.iitd.ac.in",
      photoUrl: "/faculty-photos/parikh.jpg"
    },
    {
      name: "Prof. Tarun Sharma",
      area: "String Theory",
      website: "https://inspirehep.net/authors/1077841",
      description: "Research in Chern Simons theories & Anyonic statistics, AdS-CFT, Higher Spin gauge theories, Fluid dynamics & gravity, Supersymmetry, String theory.",
      lastName: "Sharma",
      arxivName: "Sharma_Tarun",
      email: "tks at physics.iitd.ac.in",
      photoUrl: "/faculty-photos/sharma.jpg"
    },
    {
      name: "Prof. Suprit Singh",
      area: "Quantum Fields in Curved Spacetimes",
      website: "https://supritsinghlab.github.io/",
      description: "Research in Quantum Fields in Curved Spacetimes, Quantum-to-Classical Transition and Decoherence and Gravitational Quantum Mechanics.",
      lastName: "Singh",
      arxivName: "Singh_Suprit",
      email: "suprit at physics.iitd.ac.in",
      photoUrl: "/faculty-photos/ssingh.jpg"
    },
    {
      name: "Prof. Tobias Toll",
      area: "Strong force phenomenology",
      website: "https://inspirehep.net/authors/1032510",
      description: "Research focuses on strong force phenomenology and Monte Carlo Event Generators, particularly processes sensitive to high gluon densities.",
      lastName: "Toll",
      arxivName: "Toll_Tobias",
      email: "tobiastoll at physics.iitd.ac.in",
      photoUrl: "/faculty-photos/toll.jpg"
    }
  ].sort((a, b) => a.lastName.localeCompare(b.lastName));


  // Full research areas data
  export const researchAreas = {
    "Strongly Interacting Matter & QCD": {
      description: "Research in strong interactions, hadron properties, and QCD dynamics",
      faculty: ["Prof. Abhishek M. Iyer", "Prof. Amruta Mishra", "Prof. Tobias Toll"]
    },
    "Beyond Standard Model & Particle Physics": {
      description: "Research in supersymmetry, dark matter, and particle phenomenology",
      faculty: ["Prof. Abhishek M. Iyer", "Prof. Pradipta Ghosh"]
    },
    "Quantum Fields & Gravity": {
      description: "Research in quantum fields, curved spacetimes, and quantum gravity",
      faculty: ["Prof. Sarthak Parikh", "Prof. Tarun Sharma", "Prof. Suprit Singh"]
    },
    "String Theory & Mathematical Physics": {
      description: "Research in string theory, gauge/gravity duality, and mathematical foundations",
      faculty: ["Prof. Sarthak Parikh", "Prof. Tarun Sharma"]
    },
    "Quantum Computing & Quantum Information Theory": {
      description: "Research in quantum error-correcting codes, quantum algorithms, and quantum-to-classical transitions",
      faculty: ["Prof. Sarthak Parikh", "Prof. Suprit Singh"]
    },
    "AI/ML in Particle Physics": {
      description: "Research in applications of machine learning to particle physics",
      faculty: ["Prof. Abhishek M. Iyer", "Prof. Tobias Toll"]
    }
  };
